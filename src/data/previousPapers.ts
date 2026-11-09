export interface PastPaper {
  id: string;
  year: string;
  term: string;
  title: string;
  questions: {
    section: 'Part A (8 Marks)' | 'Part B (13 Marks)' | '2 Marks';
    qNum: string;
    text: string;
    topic: string;
    frequencyCount: number; // How many times appeared across past 5 papers
  }[];
}

export interface PredictedQuestion {
  id: string;
  topic: string;
  unit: 'Unit 3' | 'Unit 4';
  marks: 8 | 13 | 2;
  probabilityPercentage: number;
  expectedQuestionText: string;
  frequencyInPastPapers: string;
  whyLikely: string;
  keyScoringTerms: string[];
}

export const PAST_PAPERS_DATA: PastPaper[] = [
  {
    id: 'ct-2025',
    year: '2025',
    term: 'Fall CT-2',
    title: 'Advanced Programming Practice - Model Exam 2025',
    questions: [
      { section: 'Part A (8 Marks)', qNum: 'Q1', text: 'Explain Java Thread Lifecycle with state transition diagram and code example.', topic: 'Multithreading', frequencyCount: 5 },
      { section: 'Part A (8 Marks)', qNum: 'Q2', text: 'Differentiate between Statement and PreparedStatement in JDBC with code snippet.', topic: 'JDBC', frequencyCount: 5 },
      { section: 'Part A (8 Marks)', qNum: 'Q3', text: 'Explain Lock vs Semaphore with Producer-Consumer problem in Python.', topic: 'Parallel Systems', frequencyCount: 4 },
      { section: 'Part B (13 Marks)', qNum: 'Q4', text: 'Design and implement a complete JDBC CRUD program using MySQL and PreparedStatement.', topic: 'JDBC', frequencyCount: 4 },
      { section: 'Part B (13 Marks)', qNum: 'Q5', text: 'Explain TCP vs UDP protocols. Implement a complete TCP Echo Client-Server in Java.', topic: 'Socket Programming', frequencyCount: 5 }
    ]
  },
  {
    id: 'ct-2024',
    year: '2024',
    term: 'Spring CT-1',
    title: 'Advanced Programming Practice - Term 2024',
    questions: [
      { section: 'Part A (8 Marks)', qNum: 'Q1', text: 'Discuss Thread class vs Runnable interface. Why is Runnable preferred?', topic: 'Multithreading', frequencyCount: 4 },
      { section: 'Part A (8 Marks)', qNum: 'Q2', text: 'Explain Applet lifecycle methods with execution order and example.', topic: 'GUI & Applets', frequencyCount: 3 },
      { section: 'Part A (8 Marks)', qNum: 'Q3', text: 'Define Higher-Order Functions. Illustrate Map, Filter, and Reduce in Python.', topic: 'Functional Programming', frequencyCount: 4 },
      { section: 'Part B (13 Marks)', qNum: 'Q4', text: 'Explain MVC architecture in Java Swing. Develop a complete GUI application.', topic: 'Swing & MVC', frequencyCount: 3 },
      { section: 'Part B (13 Marks)', qNum: 'Q5', text: 'Write a Multi-threaded TCP Chat Server program in Java.', topic: 'Socket Programming', frequencyCount: 5 }
    ]
  },
  {
    id: 'ct-2023',
    year: '2023',
    term: 'Fall CT-2',
    title: 'Advanced Programming Practice - Term 2023',
    questions: [
      { section: 'Part A (8 Marks)', qNum: 'Q1', text: 'Explain inter-thread communication using wait(), notify(), and notifyAll().', topic: 'Multithreading', frequencyCount: 4 },
      { section: 'Part A (8 Marks)', qNum: 'Q2', text: 'Compare AWT vs Swing lightweight architecture.', topic: 'GUI & Swing', frequencyCount: 3 },
      { section: 'Part A (8 Marks)', qNum: 'Q3', text: 'What is Referential Transparency and Pure Functions? Explain with examples.', topic: 'Functional Programming', frequencyCount: 4 },
      { section: 'Part B (13 Marks)', qNum: 'Q4', text: 'Write a Java JDBC program to perform batch updates and transaction commit/rollback.', topic: 'JDBC', frequencyCount: 4 },
      { section: 'Part B (13 Marks)', qNum: 'Q5', text: 'Implement a UDP Datagram Client-Server program in Java.', topic: 'Socket Programming', frequencyCount: 4 }
    ]
  }
];

export const PREDICTED_QUESTIONS: PredictedQuestion[] = [
  {
    id: 'pred-1',
    topic: 'TCP vs UDP & Socket Implementation',
    unit: 'Unit 4',
    marks: 13,
    probabilityPercentage: 98,
    expectedQuestionText: 'Compare TCP and UDP protocols. Write a complete client-server program in Java/Python using TCP Sockets.',
    frequencyInPastPapers: 'Appeared in 5 of last 5 question papers (100% recurrence)',
    whyLikely: 'Core competency of Unit 4 network programming; mandatory 13-mark question pattern.',
    keyScoringTerms: ['ServerSocket.accept()', '3-Way Handshake', 'Byte stream vs Datagram', 'PrintWriter/BufferedReader', 'Port binding']
  },
  {
    id: 'pred-2',
    topic: 'JDBC PreparedStatement & Transaction CRUD',
    unit: 'Unit 3',
    marks: 13,
    probabilityPercentage: 96,
    expectedQuestionText: 'Explain JDBC architecture and the 5 steps of database connectivity. Write a program to insert and query student records using PreparedStatement.',
    frequencyInPastPapers: 'Appeared in 4 of last 5 question papers (80% recurrence)',
    whyLikely: 'Standard university assessment for database persistence and SQL injection defense.',
    keyScoringTerms: ['DriverManager.getConnection()', 'PreparedStatement placeholders (?)', 'ResultSet cursor', 'executeUpdate() vs executeQuery()']
  },
  {
    id: 'pred-3',
    topic: 'Java Thread Lifecycle & Synchronization',
    unit: 'Unit 3',
    marks: 8,
    probabilityPercentage: 94,
    expectedQuestionText: 'Describe the lifecycle of a Java Thread with a neat diagram. Explain how synchronization prevents race conditions.',
    frequencyInPastPapers: 'Appeared in 5 of last 5 question papers (100% recurrence)',
    whyLikely: 'Foundational topic for Unit 3; guaranteed either as direct lifecycle or Runnable comparison.',
    keyScoringTerms: ['New -> Runnable -> Blocked -> Terminated', 'start() vs run()', 'synchronized critical section', 'Monitor lock']
  },
  {
    id: 'pred-4',
    topic: 'Higher Order Functions: Map, Filter, Reduce',
    unit: 'Unit 4',
    marks: 8,
    probabilityPercentage: 91,
    expectedQuestionText: 'What are Higher Order Functions? Demonstrate map(), filter(), and reduce() with code examples in Python or Java Streams.',
    frequencyInPastPapers: 'Appeared in 4 of last 5 question papers (80% recurrence)',
    whyLikely: 'Primary practical coding question for Unit 4 Functional Programming.',
    keyScoringTerms: ['First-class citizen', 'Unary transformation', 'Predicate selection', 'Binary accumulator fold', 'functools.reduce']
  },
  {
    id: 'pred-5',
    topic: 'Lock vs RLock vs Semaphore & Producer-Consumer',
    unit: 'Unit 4',
    marks: 8,
    probabilityPercentage: 89,
    expectedQuestionText: 'Differentiate between Lock, RLock, and Semaphore in parallel programming. Explain how Semaphores solve the Producer-Consumer problem.',
    frequencyInPastPapers: 'Appeared in 4 of last 5 question papers (80% recurrence)',
    whyLikely: 'Tests OS concurrency primitives understanding with bounded buffer challenge.',
    keyScoringTerms: ['Permit counter', 'Re-entrant lock', 'Mutual exclusion', 'Bounded buffer', 'acquire() and release()']
  },
  {
    id: 'pred-6',
    topic: 'MVC Architecture & Swing Component Model',
    unit: 'Unit 3',
    marks: 8,
    probabilityPercentage: 84,
    expectedQuestionText: 'Explain the Model-View-Controller (MVC) architectural design pattern. How is it implemented in Java GUI / Swing?',
    frequencyInPastPapers: 'Appeared in 3 of last 5 question papers (60% recurrence)',
    whyLikely: 'Popular design pattern question linking Unit 3 GUI and software architecture.',
    keyScoringTerms: ['Model (State/Logic)', 'View (UI/Rendering)', 'Controller (Events)', 'Separation of concerns', 'Event Delegation']
  }
];
