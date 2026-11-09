# CT TITAN ⚡
### Production-Grade Class Test (CT) Weapon for Advanced Programming Practice

**CT TITAN** is a specialized exam preparation web platform designed specifically to make students score **maximum marks (50/50)** in their written university Class Test for **Advanced Programming Practice** (covering Unit 3: Concurrency & JDBC and Unit 4: Functional, Logic, Parallel & Socket Programming).

> **Note:** This is *NOT* a viva conversational assistant. This is an exam-scoring platform engineered around examiner keywords, model answer blueprints, code templates, mark weightages, memory mnemonics, and real CT patterns.

---

## 🛠 Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TailwindCSS, Framer Motion, Lucide Icons, Canvas Confetti
- **Backend:** Node.js, Express REST API
- **Database:** SQLite (Powered by Node.js native `node:sqlite` standard engine — zero native build dependencies)
- **AI Engine:**
  - Full Google Gemini API Integration (`gemini-1.5-flash` / `gemini-pro`)
  - User can enter and securely store their own Gemini API key
  - **100% Offline Study Mode:** If no key exists or network is unavailable, the application works completely offline with high-yield pre-compiled APP curriculum data, doubt resolution, paper analysis, and exam grading!

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Full Stack
```bash
npm run dev
```
This runs both:
- **Express Backend:** `http://localhost:5001`
- **Next.js Web Frontend:** `http://localhost:3000` (with seamless `/api/v1/*` proxy to Express)

Or run individually:
```bash
npm run dev:server  # Express + SQLite Backend on :5001
npm run dev:client  # Next.js Frontend on :3000
```

---

## 📚 Syllabus Scope Covered

### UNIT 3: Concurrency, JDBC, GUI & MVC
- **Multithreading:** Thread Class vs Runnable Interface, Thread Lifecycle (`NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TERMINATED`), Main Thread, Thread Priority (`MIN_PRIORITY=1`, `NORM_PRIORITY=5`, `MAX_PRIORITY=10`), Synchronization, `wait()`, `notify()`, `notifyAll()`, Daemon Threads.
- **JDBC:** Architecture, Driver Types 1 to 4, `DriverManager`, `Connection`, `Statement` vs `PreparedStatement` (SQL injection defense & precompilation) vs `CallableStatement` (Stored Procedures), `ResultSet`, Transaction commit/rollback.
- **GUI, Applets, Swing & MVC:** Applet Lifecycle (`init`, `start`, `paint`, `stop`, `destroy`), Heavyweight AWT vs Lightweight Swing, Pluggable Look and Feel (PLAF), Event Delegation Model (`Event Source`, `Event Object`, `Event Listener`), MVC Architecture (`Model`, `View`, `Controller`).

### UNIT 4: Functional, Logic, Parallel & Sockets
- **Functional Programming:** Pure Functions, Referential Transparency, Immutability, Higher Order Functions, Lambdas, Closures, `map()`, `filter()`, `reduce()`, Tail Recursion.
- **Logic Programming:** Declarative vs Imperative, Facts, Rules (`Head :- Body`), Predicates, Queries, Unification (MGU), Backtracking.
- **Parallel Programming:** Threading vs Multiprocessing (CPython GIL & bypassing GIL), Race Conditions, `Lock`, `RLock` (Re-entrant Lock), `Semaphore` (Counting permits), Producer-Consumer Problem on Bounded Buffer.
- **Socket Programming:** Client-Server Architecture, TCP (Connection-Oriented, 3-Way Handshake, Reliable) vs UDP (Connectionless, Fast, Datagrams), Java `Socket`, `ServerSocket`, `DatagramSocket`, `DatagramPacket`.

---

## 🎯 The 15 Core Modules

| Module | Name | Features |
| :--- | :--- | :--- |
| **Module 1** | **CT Dashboard** | CT Readiness %, Predicted Mark (out of 50), Topics Done/Left, Accuracy, Streak, Focus Meter, Confidence Score with Green (Strong), Yellow (Moderate), and Red (Weak) indicators. |
| **Module 2** | **AI CT Analyzer** | Scans uploaded notes/slides; identifies repeated concepts, categorizes into High, Medium, and Low probability topics; generates "Last Minute Priority List". |
| **Module 3** | **CT Question Bank** | Unlimited 2M, 5M, 8M & 13M questions with Model Answers, Key Points, Mark-Scoring Keywords, Memory Tricks, and Architecture Diagrams. |
| **Module 4** | **Previous CT Pattern Engine** | Analyzes past 5 CT papers, calculates recurrence rates, scans custom past papers, and generates "Expected CT Questions". |
| **Module 5** | **Exam Simulator** | Full 50-mark test matching university pattern (3 &times; 8 Marks + 2 &times; 13 Marks) with countdown timer, auto-submit, keyword evaluation rubric, and performance report. |
| **Module 6** | **Weakness Detector** | Tracks wrong answers, forgotten topics, and revision counts; alerts with red badges and 1-click "Fix This Weakness" action. |
| **Module 7** | **One Night Revision** | Rapid cramming buttons: **30 Minutes**, **1 Hour**, **2 Hours**, and **3 Hours**, generating targeted Definitions, FAQs, Scoring Concepts, Comparisons, and Code. |
| **Module 8** | **Definitions Master** | 50+ definitions with Formal Academic Definition, Simple Plain-English Explanation, and One-Line Memory Trick. |
| **Module 9** | **Comparison Generator** | Full tabular comparison matrices for all 12 syllabus pairs (Thread vs Process, TCP vs UDP, Statement vs PreparedStatement, Lock vs Semaphore, Map vs Filter vs Reduce, etc.). |
| **Module 10** | **Code Master** | 15 complete executable programs (Java & Python) with Theory, Code, Output, Line-by-Line Breakdown, and Examiner Traps. |
| **Module 11** | **Flashcard Engine** | 1000+ flashcard deck with 3D card flip animation, tracking Correct, Wrong, Mastery %, and SuperMemo SM-2 Spaced Repetition. |
| **Module 12** | **AI Notes Compressor** | Multi-tier summarizer: 10-page, 5-page, 2-page, and 1-page emergency revision sheet. |
| **Module 13** | **Last Minute Sheet** | **"MAKE ME CT READY"** one-click button compiling Top 50 Definitions, Top 50 Questions, Top 30 Long Answers, Top 20 Programs, and Top 20 Differences. |
| **Module 14** | **Gamification** | XP Progression with 6 Ranks: Beginner &rarr; Apprentice &rarr; Scholar &rarr; Topper &rarr; CT Monster &rarr; Professor Slayer, plus achievement badges. |
| **Module 15** | **Smart Search** | Natural language doubt solver answering questions like *"What is JDBC?"*, *"Difference between TCP and UDP"* with offline fallback and Gemini AI support. |

---

## 🔒 Security & Privacy
- Gemini API keys entered by the user are stored locally in `localStorage` and passed only via direct headers.
- Offline mode functions with zero external network connectivity dependencies.
