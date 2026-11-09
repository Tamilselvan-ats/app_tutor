export interface SyllabusTopic {
  id: string;
  unit: 'Unit 3' | 'Unit 4';
  title: string;
  category: string;
  probability: 'High' | 'Medium' | 'Low';
  probabilityScore: number; // 0 - 100
  marksWeight: number; // Expected marks yield
  subtopics: string[];
  keyTerms: string[];
  examTips: string;
}

export const SYLLABUS_DATA: SyllabusTopic[] = [
  // UNIT 3
  {
    id: 'u3-concurrency',
    unit: 'Unit 3',
    title: 'Concurrent Programming & Multithreading',
    category: 'Concurrency',
    probability: 'High',
    probabilityScore: 96,
    marksWeight: 13,
    subtopics: [
      'Thread Class vs Runnable Interface',
      'Thread Lifecycle (New, Runnable, Running, Blocked/Waiting, Terminated)',
      'Main Thread Control',
      'Thread Priority (MIN_PRIORITY 1, NORM_PRIORITY 5, MAX_PRIORITY 10)',
      'Thread Synchronization & Race Conditions',
      'Inter-thread Communication (wait(), notify(), notifyAll())',
      'Daemon Threads'
    ],
    keyTerms: ['Thread', 'Runnable', 'start() vs run()', 'synchronized', 'Thread.sleep()', 'join()', 'wait/notify', 'Daemon'],
    examTips: 'Always explain the difference between start() and run(). Mention that start() creates a new call stack while run() executes synchronously on the current thread.'
  },
  {
    id: 'u3-jdbc',
    unit: 'Unit 3',
    title: 'JDBC (Java Database Connectivity)',
    category: 'Database Connectivity',
    probability: 'High',
    probabilityScore: 98,
    marksWeight: 13,
    subtopics: [
      'JDBC Architecture & Driver Types (1 to 4)',
      'DriverManager & Connection Establishment',
      'Statement vs PreparedStatement vs CallableStatement',
      'ResultSet Navigation & Concurrency Modes',
      'CRUD Operations Implementation',
      'SQL Injection Prevention'
    ],
    keyTerms: ['DriverManager', 'Connection', 'PreparedStatement', 'CallableStatement', 'ResultSet', 'Class.forName()', 'SQL Injection'],
    examTips: 'Must memorize the 5 steps of JDBC: 1. Load Driver, 2. Establish Connection, 3. Create Statement, 4. Execute Query, 5. Close Connection. Always write the code with try-catch.'
  },
  {
    id: 'u3-gui-applet',
    unit: 'Unit 3',
    title: 'Applets & AWT',
    category: 'GUI Programming',
    probability: 'Medium',
    probabilityScore: 65,
    marksWeight: 8,
    subtopics: [
      'Applet Lifecycle (init(), start(), paint(), stop(), destroy())',
      'Applet Security Sandbox',
      'AWT Components vs Swing Components (Heavyweight vs Lightweight)',
      'Event Delegation Model (Event Source, Event Listener, Event Object)'
    ],
    keyTerms: ['Applet', 'init()', 'paint()', 'Graphics g', 'AWT', 'Heavyweight', 'Peer Components', 'Event Delegation'],
    examTips: 'Applet lifecycle diagram is frequently asked for 5 or 8 marks. Remember order: init -> start -> paint -> stop -> destroy.'
  },
  {
    id: 'u3-swing-mvc',
    unit: 'Unit 3',
    title: 'Swing & MVC Architecture',
    category: 'GUI & Design Patterns',
    probability: 'High',
    probabilityScore: 88,
    marksWeight: 8,
    subtopics: [
      'Swing Component Hierarchy (JFrame, JPanel, JButton, JTextField)',
      'Lightweight Component Advantages',
      'MVC Architecture (Model, View, Controller)',
      'Pluggable Look and Feel (PLAF)',
      'Layout Managers (FlowLayout, BorderLayout, GridLayout)'
    ],
    keyTerms: ['JFrame', 'JComponent', 'MVC', 'Model', 'View', 'Controller', 'Lightweight', 'ActionListener'],
    examTips: 'For MVC, draw the triangular diagram: User -> Controller -> Model -> View -> User. Emphasize separation of concerns.'
  },

  // UNIT 4
  {
    id: 'u4-func-prog',
    unit: 'Unit 4',
    title: 'Functional Programming Paradigm',
    category: 'Functional Programming',
    probability: 'High',
    probabilityScore: 92,
    marksWeight: 13,
    subtopics: [
      'Pure Functions & No Side-Effects',
      'Referential Transparency',
      'Immutability & Persistent Data Structures',
      'Higher Order Functions',
      'First-Class Functions',
      'Lambda Expressions & Anonymous Functions',
      'Closures & Lexical Scoping',
      'Map, Filter, Reduce Operations',
      'Recursion & Tail Call Optimization'
    ],
    keyTerms: ['Pure Function', 'Referential Transparency', 'Immutability', 'Higher Order Function', 'Lambda', 'Closure', 'map', 'filter', 'reduce'],
    examTips: 'Referential transparency means an expression can be replaced by its evaluated value without changing program behavior. Map transforms 1:1, Filter selects subset, Reduce aggregates to single scalar.'
  },
  {
    id: 'u4-logic-prog',
    unit: 'Unit 4',
    title: 'Logic Programming',
    category: 'Logic Programming',
    probability: 'Medium',
    probabilityScore: 68,
    marksWeight: 5,
    subtopics: [
      'Declarative vs Imperative Paradigm',
      'Knowledge Base Construction',
      'Facts (unconditional truths)',
      'Rules (conditional truths with Horn Clauses)',
      'Predicates & Relations',
      'Queries & Goal Satisfaction',
      'Unification & Backtracking Engine'
    ],
    keyTerms: ['Declarative', 'Facts', 'Rules', 'Predicates', 'Queries', 'Unification', 'Backtracking', 'Horn Clause'],
    examTips: 'Know how to define a fact like parent(john, mary) and a rule like grandfather(X, Z) :- father(X, Y), parent(Y, Z).'
  },
  {
    id: 'u4-parallel-prog',
    unit: 'Unit 4',
    title: 'Parallel Programming & Concurrency Primitives',
    category: 'Parallel Systems',
    probability: 'High',
    probabilityScore: 94,
    marksWeight: 13,
    subtopics: [
      'Threading vs Multiprocessing (GIL in Python)',
      'Race Conditions & Critical Section Problem',
      'Lock (Mutual Exclusion)',
      'RLock (Re-entrant Lock)',
      'Semaphore (Counting vs Binary Semaphore)',
      'Event Signaling',
      'Producer-Consumer Problem with Bounded Buffer'
    ],
    keyTerms: ['Multiprocessing', 'GIL', 'Race Condition', 'Lock', 'RLock', 'Semaphore', 'Event', 'Producer-Consumer', 'Bounded Buffer'],
    examTips: 'Crucial 8/13 mark question: Explain Producer-Consumer problem using Semaphores (empty, full, mutex). Contrast Lock (can only be acquired once by anyone) vs RLock (can be acquired multiple times by the SAME thread).'
  },
  {
    id: 'u4-socket-prog',
    unit: 'Unit 4',
    title: 'Socket Programming & Networking',
    category: 'Network Programming',
    probability: 'High',
    probabilityScore: 95,
    marksWeight: 13,
    subtopics: [
      'Client-Server Architecture',
      'TCP Protocol (Connection-Oriented, 3-Way Handshake, Reliable)',
      'UDP Protocol (Connectionless, Datagram, Fast, Best-effort)',
      'Java Socket & ServerSocket Implementation',
      'DatagramSocket & DatagramPacket Implementation',
      'Port Numbers & IP Addressing'
    ],
    keyTerms: ['Socket', 'ServerSocket', 'TCP', 'UDP', 'DatagramSocket', 'DatagramPacket', '3-Way Handshake', 'accept()', 'connect()'],
    examTips: 'TCP Echo Server or UDP Ping is almost guaranteed in Section B (13 Marks). Always include socket creation, bind, listen, accept, read/write, and close.'
  }
];
