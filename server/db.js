const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'titan.db');
const db = new DatabaseSync(dbPath);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS user_profile (
    id INTEGER PRIMARY KEY,
    xp INTEGER DEFAULT 120,
    rank TEXT DEFAULT 'Apprentice',
    streak INTEGER DEFAULT 3,
    total_study_minutes INTEGER DEFAULT 45,
    focus_minutes INTEGER DEFAULT 25,
    confidence_score INTEGER DEFAULT 68,
    accuracy INTEGER DEFAULT 74,
    last_active_date TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS weaknesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic_id TEXT UNIQUE,
    topic_name TEXT NOT NULL,
    unit TEXT NOT NULL,
    wrong_count INTEGER DEFAULT 1,
    revision_count INTEGER DEFAULT 0,
    last_reviewed TEXT DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'weak'
  );

  CREATE TABLE IF NOT EXISTS flashcard_progress (
    card_id TEXT PRIMARY KEY,
    repetitions INTEGER DEFAULT 0,
    ease_factor REAL DEFAULT 2.5,
    interval_days INTEGER DEFAULT 1,
    next_review TEXT DEFAULT CURRENT_TIMESTAMP,
    correct_count INTEGER DEFAULT 0,
    wrong_count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS sim_exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    percentage REAL NOT NULL,
    time_taken_seconds INTEGER NOT NULL,
    feedback TEXT,
    answers_json TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS notes_uploads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    analysis_json TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed initial profile if not exists
const profileCheck = db.prepare('SELECT COUNT(*) as count FROM user_profile').get();
if (profileCheck.count === 0) {
  db.prepare(`
    INSERT INTO user_profile (id, xp, rank, streak, total_study_minutes, focus_minutes, confidence_score, accuracy)
    VALUES (1, 350, 'Scholar', 4, 110, 45, 72, 78)
  `).run();
}

// Seed initial weaknesses if empty
const weaknessCheck = db.prepare('SELECT COUNT(*) as count FROM weaknesses').get();
if (weaknessCheck.count === 0) {
  const insertWeakness = db.prepare(`
    INSERT INTO weaknesses (topic_id, topic_name, unit, wrong_count, revision_count, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertWeakness.run('u3-jdbc-statement', 'CallableStatement vs PreparedStatement', 'Unit 3', 3, 1, 'weak');
  insertWeakness.run('u4-sync-rlock', 'Lock vs RLock vs Semaphore', 'Unit 4', 4, 0, 'weak');
  insertWeakness.run('u4-func-referential', 'Referential Transparency & Closures', 'Unit 4', 2, 2, 'moderate');
  insertWeakness.run('u3-thread-lifecycle', 'Thread Priority & Daemon Threads', 'Unit 3', 2, 1, 'moderate');
}

module.exports = db;
