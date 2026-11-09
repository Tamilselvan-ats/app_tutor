const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const { callGemini } = require('./gemini');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Rank calculation helper
function calculateRank(xp) {
  if (xp >= 5000) return 'Professor Slayer';
  if (xp >= 2500) return 'CT Monster';
  if (xp >= 1200) return 'Topper';
  if (xp >= 600) return 'Scholar';
  if (xp >= 200) return 'Apprentice';
  return 'Beginner';
}

// ----------------------------------------------------
// Health Check
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'CT TITAN - Advanced Programming Practice',
    timestamp: new Date().toISOString(),
    db: 'SQLite Node:sqlite Active',
  });
});

// ----------------------------------------------------
// Profile & Dashboard
// ----------------------------------------------------
app.get('/api/profile', (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM user_profile WHERE id = 1').get();
    
    // Calculate CT Readiness based on accuracy, study time, and weaknesses
    const weakCount = db.prepare("SELECT COUNT(*) as count FROM weaknesses WHERE status = 'weak'").get().count;
    const strongCount = db.prepare("SELECT COUNT(*) as count FROM weaknesses WHERE status = 'strong'").get().count;
    
    // Readiness formula: baseline weighted by accuracy, reduced by active weaknesses
    let readiness = Math.round(
      (profile.accuracy * 0.5) +
      Math.min(30, (profile.total_study_minutes / 180) * 30) +
      Math.min(20, strongCount * 5) -
      (weakCount * 3)
    );
    readiness = Math.max(25, Math.min(98, readiness));

    // Predicted marks out of 50 for CT
    const predictedMark = Math.min(50, Math.round((readiness / 100) * 50));

    res.json({
      ...profile,
      readiness,
      predictedMark,
      rank: calculateRank(profile.xp),
      topicsCompleted: 14 + strongCount,
      topicsRemaining: Math.max(0, 10 - strongCount),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/profile/add-xp', (req, res) => {
  try {
    const { amount = 50, minutes = 5 } = req.body;
    const profile = db.prepare('SELECT * FROM user_profile WHERE id = 1').get();
    const newXp = (profile.xp || 0) + amount;
    const newRank = calculateRank(newXp);
    const newMinutes = (profile.total_study_minutes || 0) + minutes;

    db.prepare(`
      UPDATE user_profile 
      SET xp = ?, rank = ?, total_study_minutes = ?, last_active_date = CURRENT_TIMESTAMP
      WHERE id = 1
    `).run(newXp, newRank, newMinutes);

    res.json({ success: true, xp: newXp, rank: newRank, addedXp: amount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Weakness Detector
// ----------------------------------------------------
app.get('/api/weaknesses', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM weaknesses ORDER BY wrong_count DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/weaknesses/record', (req, res) => {
  try {
    const { topicId, topicName, unit, isWrong = true } = req.body;
    const existing = db.prepare('SELECT * FROM weaknesses WHERE topic_id = ?').get(topicId);

    if (existing) {
      if (isWrong) {
        const newWrong = existing.wrong_count + 1;
        const status = newWrong >= 3 ? 'weak' : 'moderate';
        db.prepare('UPDATE weaknesses SET wrong_count = ?, status = ?, last_reviewed = CURRENT_TIMESTAMP WHERE topic_id = ?')
          .run(newWrong, status, topicId);
      } else {
        const newRevision = existing.revision_count + 1;
        const status = newRevision >= 3 ? 'strong' : (existing.wrong_count > 2 ? 'moderate' : 'strong');
        db.prepare('UPDATE weaknesses SET revision_count = ?, status = ?, last_reviewed = CURRENT_TIMESTAMP WHERE topic_id = ?')
          .run(newRevision, status, topicId);
      }
    } else {
      const status = isWrong ? 'weak' : 'moderate';
      db.prepare(`
        INSERT INTO weaknesses (topic_id, topic_name, unit, wrong_count, revision_count, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(topicId, topicName, unit, isWrong ? 1 : 0, isWrong ? 0 : 1, status);
    }

    const updated = db.prepare('SELECT * FROM weaknesses WHERE topic_id = ?').get(topicId);
    res.json({ success: true, item: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Flashcard SM-2 Spaced Repetition Engine
// ----------------------------------------------------
app.get('/api/flashcards/progress', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM flashcard_progress').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/flashcards/review', (req, res) => {
  try {
    const { cardId, rating } = req.body; // rating: 0 to 5
    // SM-2 Algorithm calculation
    let card = db.prepare('SELECT * FROM flashcard_progress WHERE card_id = ?').get(cardId);
    
    let repetitions = card ? card.repetitions : 0;
    let easeFactor = card ? card.ease_factor : 2.5;
    let intervalDays = card ? card.interval_days : 1;
    let correctCount = card ? card.correct_count : 0;
    let wrongCount = card ? card.wrong_count : 0;

    if (rating >= 3) {
      correctCount += 1;
      if (repetitions === 0) {
        intervalDays = 1;
      } else if (repetitions === 1) {
        intervalDays = 6;
      } else {
        intervalDays = Math.round(intervalDays * easeFactor);
      }
      repetitions += 1;
    } else {
      wrongCount += 1;
      repetitions = 0;
      intervalDays = 1;
    }

    // Ease Factor adjustment: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays);

    if (card) {
      db.prepare(`
        UPDATE flashcard_progress 
        SET repetitions = ?, ease_factor = ?, interval_days = ?, next_review = ?, correct_count = ?, wrong_count = ?
        WHERE card_id = ?
      `).run(repetitions, easeFactor, intervalDays, nextReviewDate.toISOString(), correctCount, wrongCount, cardId);
    } else {
      db.prepare(`
        INSERT INTO flashcard_progress (card_id, repetitions, ease_factor, interval_days, next_review, correct_count, wrong_count)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(cardId, repetitions, easeFactor, intervalDays, nextReviewDate.toISOString(), correctCount, wrongCount);
    }

    res.json({
      success: true,
      cardId,
      intervalDays,
      easeFactor,
      repetitions,
      nextReview: nextReviewDate.toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Exam Simulator Submissions
// ----------------------------------------------------
app.get('/api/exams/history', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM sim_exams ORDER BY id DESC LIMIT 10').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/exams/submit', (req, res) => {
  try {
    const { score, maxScore = 50, timeTakenSeconds, feedback, answers } = req.body;
    const percentage = ((score / maxScore) * 100).toFixed(1);

    const result = db.prepare(`
      INSERT INTO sim_exams (score, max_score, percentage, time_taken_seconds, feedback, answers_json)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(score, maxScore, percentage, timeTakenSeconds, feedback || '', JSON.stringify(answers || {}));

    // Grant XP for completing exam
    const xpReward = Math.round(score * 8) + 150;
    const profile = db.prepare('SELECT xp FROM user_profile WHERE id = 1').get();
    const updatedXp = (profile.xp || 0) + xpReward;
    db.prepare('UPDATE user_profile SET xp = ?, rank = ? WHERE id = 1')
      .run(updatedXp, calculateRank(updatedXp));

    res.json({
      success: true,
      examId: result.lastInsertRowid,
      score,
      maxScore,
      percentage,
      xpEarned: xpReward,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// AI Endpoints (Gemini + Offline Fallback)
// ----------------------------------------------------

// Smart Search / Doubt Solver
app.post('/api/ai/ask', async (req, res) => {
  const { question, clientApiKey } = req.body;
  const headerKey = req.headers['x-gemini-key'];
  const effectiveKey = headerKey || clientApiKey;

  const systemPrompt = `You are CT TITAN, the ultimate AI coach for the "Advanced Programming Practice" Class Test (CT).
The student has an exam tomorrow covering:
UNIT 3: Multithreading, Thread Class, Runnable Interface, Main Thread, Thread Priority, JDBC, DriverManager, Connection, Statement, PreparedStatement, CallableStatement, ResultSet, Applets, AWT, Swing, MVC, Widgets.
UNIT 4: Functional Programming (Pure functions, Recursion, Referential Transparency, Immutability, Higher Order Functions, Lambda, Closure, Map, Filter, Reduce), Logic Programming (Facts, Rules, Predicates, Queries), Parallel Programming (Threading, Multiprocessing, Race Condition, Lock, RLock, Semaphore, Event, Producer Consumer), Socket Programming (TCP, UDP, Client Server).

Format every answer for MAXIMUM CT MARKS:
1. Exact Definition (1-2 lines)
2. Key Points / Mark-Scoring Technical Keywords (highlighted with bold)
3. Syntax or Code Snippet if applicable
4. One-Line Memory Trick
Keep it punchy, high-yield, and CT-focused (not viva conversation).`;

  const aiResult = await callGemini(question, systemPrompt, effectiveKey);

  if (aiResult.success) {
    return res.json({
      source: 'gemini',
      model: aiResult.model,
      answer: aiResult.text,
      offline: false,
    });
  }

  // Offline Fallback for APP Syllabus Questions
  const offlineAnswer = generateOfflineAnswer(question);
  return res.json({
    source: 'offline-engine',
    answer: offlineAnswer,
    offline: true,
    notice: 'Answer provided by CT TITAN Offline Academic Engine (Gemini API unavailable or offline mode active).',
  });
});

// Notes Analyzer
app.post('/api/ai/analyze-notes', async (req, res) => {
  const { notesText, clientApiKey } = req.body;
  const headerKey = req.headers['x-gemini-key'];
  const effectiveKey = headerKey || clientApiKey;

  if (effectiveKey) {
    const prompt = `Analyze these student notes for an upcoming Class Test on Advanced Programming Practice.
Identify:
1. High Probability CT Topics (90%+ chance)
2. Medium Probability Topics (60-80%)
3. Low Probability Topics (<50%)
4. A "Last Minute Priority List" with estimated marks and time required to master.
Notes text:
${notesText.slice(0, 4000)}`;

    const aiResult = await callGemini(prompt, 'You are an expert university examiner for Advanced Programming Practice.', effectiveKey);
    if (aiResult.success) {
      return res.json({
        analysis: aiResult.text,
        source: 'gemini',
      });
    }
  }

  // Offline analytical generator
  return res.json({
    analysis: generateOfflineNotesAnalysis(notesText),
    source: 'offline-engine',
  });
});

// Test custom Gemini API Key
app.post('/api/ai/test-key', async (req, res) => {
  const { apiKey } = req.body;
  if (!apiKey || apiKey.trim() === '') {
    return res.status(400).json({ success: false, error: 'API key cannot be empty' });
  }

  try {
    const testResult = await callGemini('Reply with only the word "TITAN_READY"', '', apiKey);
    if (testResult.success) {
      res.json({ success: true, message: 'Gemini API key verified successfully! AI features unlocked.' });
    } else {
      res.status(400).json({ success: false, error: testResult.error || 'Failed to authenticate with Gemini API.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Helper: Offline APP Doubt Solver
function generateOfflineAnswer(query) {
  const q = query.toLowerCase();

  if (q.includes('jdbc')) {
    return `### **JDBC (Java Database Connectivity)**

**Definition:**
JDBC is a Java API that provides standard cross-platform database-independent connectivity between Java applications and a wide range of relational databases.

**Key Architecture Components (Scoring Keywords):**
- **DriverManager:** Manages a list of database drivers. Matches connection requests with proper driver using \`getConnection()\`.
- **Connection:** Interface representing an active session with the database. Creates statements.
- **Statement:** Used for executing basic static SQL queries (\`executeQuery\`, \`executeUpdate\`). Vulnerable to SQL injection.
- **PreparedStatement:** Precompiled SQL statement with parameterized queries (\`?\`). Prevents **SQL Injection**, high execution speed for repeated queries.
- **CallableStatement:** Used to execute database stored procedures and functions (\`{call procedure_name(?, ?)}\`).
- **ResultSet:** A table of data representing a database result set generated by executing a statement. Maintained via cursor.

**Memory Trick:**
*DM-C-S-RS* -> **D**river **M**eets **C**ustomer, **S**peaks **R**esults (DriverManager -> Connection -> Statement -> ResultSet).`;
  }

  if (q.includes('thread') && q.includes('process')) {
    return `### **Thread vs Process**

| Feature | Process | Thread |
| :--- | :--- | :--- |
| **Definition** | An independent executing program in its own address space. | Smallest unit of execution / lightweight subprocess within a process. |
| **Memory** | Has isolated, separate memory space. | Shares memory and address space of parent process. |
| **Creation Cost** | Heavyweight; high overhead to create & terminate. | Lightweight; fast creation and low switching overhead. |
| **Communication** | Requires IPC (Inter-Process Communication: Sockets, Pipes). | Direct communication via shared memory and variables. |
| **Crash Impact** | If one process crashes, others continue safely. | If one thread crashes, it may bring down the entire process. |

**Memory Trick:**
*Factory vs Workers* — The Process is the factory building; Threads are the multiple workers sharing tools inside that factory.`;
  }

  if (q.includes('tcp') && q.includes('udp')) {
    return `### **TCP vs UDP**

| Feature | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Connection** | Connection-Oriented (Requires 3-way handshake SYN-SYN/ACK-ACK). | Connectionless (Sends packets without prior setup). |
| **Reliability** | 100% Reliable (Guarantees delivery, sequencing, retransmission of lost packets). | Unreliable (Best-effort delivery; packets can be lost, duplicated, out-of-order). |
| **Speed** | Slower due to header overhead (20-60 bytes), acknowledgments, and flow control. | Fast and lightweight (8-byte fixed header). |
| **Data Stream** | Byte stream protocol. | Datagram packet oriented. |
| **Java Classes** | \`Socket\`, \`ServerSocket\` | \`DatagramSocket\`, \`DatagramPacket\` |
| **Use Cases** | Web (HTTP/HTTPS), File Transfer (FTP), Email (SMTP). | Video Streaming, VoIP, Online Gaming, DNS. |

**Memory Trick:**
*TCP is Registered Post* (needs signature & confirmation); *UDP is a Postcard dropped into the breeze* (fast, no guarantee).`;
  }

  if (q.includes('mvc')) {
    return `### **MVC (Model-View-Controller) Architecture**

**Definition:**
An architectural design pattern that decouples an application into three interconnected components, separating internal data representations from how information is presented to and accepted from the user.

**The 3 Components:**
1. **Model (Data & Logic):** Represents data structures, business rules, and state. Notifies views of changes.
2. **View (Presentation):** Renders UI elements (e.g., Swing \`JFrame\`, \`JPanel\`, web DOM). Displays Model data to the user.
3. **Controller (User Input & Action):** Listens to user interactions (button clicks, key presses via Event Listeners), manipulates the Model, and triggers View updates.

**Flow of Control:**
\`User Interaction -> Controller -> Updates Model -> Notifies View -> View Re-renders\`.

**Memory Trick:**
*Restaurant Analogy:*
- **Model** = Kitchen / Chefs (holds and prepares food).
- **View** = Plated Dish on Table (what customer sees).
- **Controller** = Waiter (takes order from customer and tells kitchen).`;
  }

  return `### **Exam Quick-Revision Guide: ${query}**

**Syllabus Relevance:** Unit 3 / Unit 4 Advanced Programming Practice.

**Core Concept:**
In Advanced Programming Practice, this topic evaluates your understanding of concurrent execution, resource management, and clean functional/object paradigms.

**Scoring Keywords to Include in Answer:**
- Concurrency & Thread Synchronization
- Resource Allocation & Garbage Collection
- Immutability & Side-Effect Free Operations
- Error Handling & Protocol Specification

**Exam Strategy for this Topic:**
- Always begin with the **formal definition** before writing code.
- If writing code, include mandatory imports (e.g. \`import java.sql.*;\` or \`import threading\`).
- Draw a clean architectural box diagram showing state transitions or component interaction.`;
}

function generateOfflineNotesAnalysis(text) {
  return `## 🎯 AI CT Priority Analysis (Advanced Programming Practice)

### 🔴 High Probability CT Topics (95% Exam Probability)
1. **JDBC Full CRUD Lifecycle & PreparedStatement vs Statement** (Expected: 8 Marks or 13 Marks)
   - *Key keywords:* DriverManager, Connection, PreparedStatement, SQL Injection, ResultSet.
2. **Multithreading in Java: Thread vs Runnable & Synchronization** (Expected: 8 Marks)
   - *Key keywords:* \`start()\` vs \`run()\`, race conditions, \`synchronized\` keyword, \`wait()\`, \`notify()\`.
3. **TCP vs UDP Socket Programming Implementation** (Expected: 13 Marks)
   - *Key keywords:* \`ServerSocket\`, 3-way handshake, DatagramSocket, DatagramPacket, stream vs packet.
4. **Higher Order Functions: Map, Filter, Reduce** (Expected: 5 or 8 Marks)
   - *Key keywords:* Pure functions, lambda expressions, referential transparency, immutability.

### 🟡 Medium Probability CT Topics (70% Exam Probability)
1. **Lock vs RLock vs Semaphore in Parallel Programming** (5 Marks)
2. **Applet Lifecycle & Swing vs AWT Lightweight vs Heavyweight** (5 Marks)
3. **Producer-Consumer Problem using Bound Buffer / Locks** (8 Marks)
4. **Logic Programming: Facts, Rules, Predicates, and Unification** (5 Marks)

### 🟢 Low Probability Topics (35% Exam Probability)
1. Java AWT Layout Managers (2 Marks)
2. Thread Priority integer constants (\`MIN_PRIORITY\`, \`NORM_PRIORITY\`, \`MAX_PRIORITY\`) (2 Marks)
3. Applet HTML \`<applet>\` parameter tags (2 Marks)

---
### ⚡ Last Minute Priority Action List
- **Hour 1:** Master JDBC \`PreparedStatement\` code snippet and Thread vs Process difference table.
- **Hour 2:** Practice TCP Client-Server code in Java/Python.
- **Hour 3:** Revise Map/Filter/Reduce in Python/Java and Lock vs Semaphore.`;
}

// Start Server
app.listen(PORT, () => {
  console.log(`>>> CT TITAN Express API Backend running on http://localhost:${PORT}`);
});
