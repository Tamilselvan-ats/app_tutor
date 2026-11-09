export interface ExamQuestion {
  id: string;
  section: 'Section A (8 Marks)' | 'Section B (13 Marks)';
  qNum: string;
  marks: 8 | 13;
  unit: 'Unit 3' | 'Unit 4';
  title: string;
  description: string;
  rubricKeywords: string[];
  modelAnswer: string;
  diagramGuide?: string;
}

export interface ExamPaper {
  id: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  sectionA: ExamQuestion[]; // 3 x 8 Marks = 24 Marks
  sectionB: ExamQuestion[]; // 2 x 13 Marks = 26 Marks
}

export const SAMPLE_EXAM_PAPERS: ExamPaper[] = [
  {
    id: 'ct-full-paper-1',
    title: 'CT TITAN Master Class Test: Advanced Programming Practice',
    durationMinutes: 90,
    totalMarks: 50,
    sectionA: [
      {
        id: 'q-sim-a1',
        section: 'Section A (8 Marks)',
        qNum: 'Q1',
        marks: 8,
        unit: 'Unit 3',
        title: 'Thread Lifecycle and Synchronization in Java',
        description: 'Explain the lifecycle of a Java Thread with an appropriate state transition diagram. Discuss how mutual exclusion is achieved in Java to avoid race conditions.',
        rubricKeywords: ['NEW', 'RUNNABLE', 'BLOCKED', 'WAITING', 'TERMINATED', 'start() vs run()', 'synchronized', 'Monitor Lock', 'Race Condition'],
        modelAnswer: `A Java thread undergoes 5 states: NEW (created), RUNNABLE (ready/running on CPU), BLOCKED (waiting for monitor lock), WAITING/TIMED_WAITING (sleeping/waiting), TERMINATED (completed).
Synchronization uses intrinsic locks on objects. Synchronized methods/blocks guarantee mutual exclusion so only one thread executes the critical section, preventing race conditions.`,
        diagramGuide: '[NEW] -> start() -> [RUNNABLE] <-> [BLOCKED / WAITING] -> [TERMINATED]'
      },
      {
        id: 'q-sim-a2',
        section: 'Section A (8 Marks)',
        qNum: 'Q2',
        marks: 8,
        unit: 'Unit 3',
        title: 'Statement vs PreparedStatement vs CallableStatement in JDBC',
        description: 'Compare Statement, PreparedStatement, and CallableStatement in JDBC. Write a code snippet showing how PreparedStatement prevents SQL Injection attacks.',
        rubricKeywords: ['Precompiled', 'Placeholder (?)', 'SQL Injection', 'CallableStatement', 'Stored Procedure', 'DriverManager', 'executeQuery'],
        modelAnswer: `Statement executes static SQL without caching (vulnerable to SQL injection). PreparedStatement precompiles SQL templates with ? placeholders, caching execution plans and treating inputs as literal data values to stop SQL injection. CallableStatement invokes database stored procedures with IN/OUT parameters.`,
        diagramGuide: 'Java App -> PreparedStatement (?) -> DBMS Precompiles & Caches Execution Plan'
      },
      {
        id: 'q-sim-a3',
        section: 'Section A (8 Marks)',
        qNum: 'Q3',
        marks: 8,
        unit: 'Unit 4',
        title: 'Higher-Order Functions and Functional Programming Principles',
        description: 'Define Referential Transparency and Pure Functions. Illustrate map(), filter(), and reduce() with complete Python code examples.',
        rubricKeywords: ['Referential Transparency', 'Pure Function', 'Zero side-effects', 'map()', 'filter()', 'reduce()', 'functools.reduce', 'Lambda'],
        modelAnswer: `Pure functions have deterministic output with no side effects. Referential transparency allows substituting an expression with its value without changing behavior.
map(fn, list) transforms elements 1:1; filter(pred, list) selects elements matching a boolean condition; reduce(fn, list, seed) folds a collection into a single cumulative scalar.`,
        diagramGuide: 'Input [1,2,3] -> map(*2) -> [2,4,6] -> filter(>2) -> [4,6] -> reduce(+) -> 10'
      }
    ],
    sectionB: [
      {
        id: 'q-sim-b1',
        section: 'Section B (13 Marks)',
        qNum: 'Q4',
        marks: 13,
        unit: 'Unit 3',
        title: 'Complete JDBC Architecture & Transaction Management Program',
        description: 'Explain JDBC architecture and the 5 steps of database connectivity. Write a complete Java program to perform student record insertion and query using PreparedStatement with transaction commit and rollback.',
        rubricKeywords: [
          'Class.forName', 'DriverManager.getConnection', 'PreparedStatement', 'ResultSet', 
          'setAutoCommit(false)', 'commit()', 'rollback()', 'ACID Atomicity', 'try-catch-finally'
        ],
        modelAnswer: `JDBC connects Java with databases via Driver Manager. The 5 steps are: 1) Class.forName(driver), 2) DriverManager.getConnection(url, u, p), 3) prepareStatement(sql), 4) executeUpdate()/executeQuery(), 5) close resources in reverse order.
Transactions use conn.setAutoCommit(false), executing batch statements, followed by conn.commit() on success or conn.rollback() in the catch block to guarantee ACID atomicity.`,
        diagramGuide: 'App -> DriverManager -> Type 4 Pure Java Driver -> Database Server'
      },
      {
        id: 'q-sim-b2',
        section: 'Section B (13 Marks)',
        qNum: 'Q5',
        marks: 13,
        unit: 'Unit 4',
        title: 'TCP vs UDP Protocols & Multi-Threaded TCP Server Implementation',
        description: 'Compare TCP and UDP protocols across 6 parameters. Write a complete Java program implementing a Multi-threaded TCP Echo Server that handles concurrent client connections using ServerSocket and worker threads.',
        rubricKeywords: [
          '3-Way Handshake', 'Reliable vs Unreliable', 'Byte stream vs Datagram', '8-byte header',
          'ServerSocket', 'Socket', 'accept()', 'ClientHandler', 'BufferedReader', 'PrintWriter'
        ],
        modelAnswer: `TCP is connection-oriented, reliable with 3-way handshake, in-order byte stream, and 20-60 byte header. UDP is connectionless, fast, unreliable datagrams with 8-byte header.
A multi-threaded server runs ServerSocket.accept() in a loop, delegating each accepted Socket connection to an independent Runnable ClientHandler thread to achieve non-blocking concurrency.`,
        diagramGuide: 'Clients -> ServerSocket.accept() -> Spawn Worker Thread 1, Worker Thread 2'
      }
    ]
  }
];

// Automated Evaluation Engine for Simulated Exam
export function evaluateExamAnswers(answers: Record<string, string>, paper: ExamPaper): {
  totalScore: number;
  maxMarks: number;
  percentage: number;
  grade: string;
  questionScores: {
    qNum: string;
    score: number;
    maxScore: number;
    matchedKeywords: string[];
    missedKeywords: string[];
    feedback: string;
  }[];
  overallReport: string;
} {
  let totalScore = 0;
  const maxMarks = paper.totalMarks;
  const questionScores = [];

  const allQuestions = [...paper.sectionA, ...paper.sectionB];

  for (const q of allQuestions) {
    const userText = (answers[q.id] || '').toLowerCase();
    const matchedKeywords: string[] = [];
    const missedKeywords: string[] = [];

    q.rubricKeywords.forEach((kw) => {
      const cleanKw = kw.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanUser = userText.replace(/[^a-z0-9]/g, '');
      if (cleanUser.includes(cleanKw) || userText.includes(kw.toLowerCase())) {
        matchedKeywords.push(kw);
      } else {
        missedKeywords.push(kw);
      }
    });

    // Score calculation
    const matchRatio = q.rubricKeywords.length > 0 ? matchedKeywords.length / q.rubricKeywords.length : 0;
    const lengthBonus = Math.min(1, userText.trim().split(/\s+/).length / 60); // Length factor
    
    let score = Math.round(q.marks * (matchRatio * 0.75 + lengthBonus * 0.25));
    if (userText.trim().length === 0) score = 0;
    score = Math.max(0, Math.min(q.marks, score));

    totalScore += score;

    let feedback = 'Strong technical formulation.';
    if (score < q.marks * 0.5) {
      feedback = 'Weak answer. Critical examiner keywords missed; review model answer and memory trick.';
    } else if (score < q.marks * 0.8) {
      feedback = 'Moderate answer. Good concept flow, but add missing keywords to secure full marks.';
    }

    questionScores.push({
      qNum: q.qNum,
      score,
      maxScore: q.marks,
      matchedKeywords,
      missedKeywords,
      feedback
    });
  }

  const percentage = Math.round((totalScore / maxMarks) * 100);
  let grade = 'Professor Slayer (Outstanding)';
  if (percentage < 50) grade = 'Needs Urgent Revision (Borderline)';
  else if (percentage < 70) grade = 'Good Progress (Second Class)';
  else if (percentage < 85) grade = 'Strong Performer (First Class)';
  else if (percentage < 95) grade = 'Topper Tier (Distinction)';

  let overallReport = '';
  if (percentage >= 85) {
    overallReport = '🎉 Outstanding Performance! You demonstrated high command of technical terminology, syntax structures, and architecture concepts. You are in prime position to top tomorrow\'s Class Test!';
  } else if (percentage >= 60) {
    overallReport = '👍 Solid Performance! You have a good grasp of the foundational concepts. Focusing on the missed keywords and practicing the exact code templates will bump your score into the 45+ mark bracket.';
  } else {
    overallReport = '⚠️ Urgent Action Needed! You missed key technical keywords that university examiners look for when grading written CT papers. Run the "One Night Revision - 1 Hour Sprint" and review the Last Minute Sheet immediately!';
  }

  return {
    totalScore,
    maxMarks,
    percentage,
    grade,
    questionScores,
    overallReport
  };
}
