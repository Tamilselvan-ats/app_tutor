export interface QuestionItem {
  id: string;
  marks: 2 | 5 | 8 | 13;
  unit: 'Unit 3' | 'Unit 4';
  topic: string;
  question: string;
  answer: string;
  keyPoints: string[];
  scoringKeywords: string[];
  memoryTrick: string;
  diagramAscii?: string;
}

export const QUESTIONS_BANK: QuestionItem[] = [
  // ==========================================
  // 2 MARKS QUESTIONS
  // ==========================================
  {
    id: 'q-2m-01',
    marks: 2,
    unit: 'Unit 3',
    topic: 'Multithreading',
    question: 'What is the difference between Thread.start() and Thread.run() in Java?',
    answer: 'Thread.start() creates a new native OS thread, allocates a distinct call stack, and moves the thread state to Runnable, subsequently executing run() asynchronously. Calling Thread.run() directly does not spawn a new thread; it executes synchronously like a standard method call within the current calling thread.',
    keyPoints: [
      'start() allocates a new call stack; run() executes on the existing caller stack.',
      'start() changes thread state to Runnable; run() does not change thread state.',
      'Calling start() twice throws IllegalThreadStateException; run() can be called repeatedly.'
    ],
    scoringKeywords: ['New call stack', 'Asynchronous execution', 'IllegalThreadStateException', 'Current calling thread'],
    memoryTrick: 'start() launches the rocket into orbit; run() just test-fires the engine inside the garage.'
  },
  {
    id: 'q-2m-02',
    marks: 2,
    unit: 'Unit 3',
    topic: 'Multithreading',
    question: 'What are Daemon threads in Java? Give an example.',
    answer: 'A Daemon thread is a low-priority service provider thread that runs in the background to serve user threads. The JVM terminates automatically when all non-daemon (user) threads finish, abruptly killing any active daemon threads. Example: Java Garbage Collector (GC).',
    keyPoints: [
      'Low priority background service thread.',
      'JVM terminates without waiting for daemon threads to finish.',
      'Created using thread.setDaemon(true) before calling start().'
    ],
    scoringKeywords: ['Background service provider', 'setDaemon(true)', 'JVM auto-exit', 'Garbage Collector'],
    memoryTrick: 'Daemon = Ghost assistant; disappears the second all living human workers leave the building.'
  },
  {
    id: 'q-2m-03',
    marks: 2,
    unit: 'Unit 3',
    topic: 'JDBC',
    question: 'Why is PreparedStatement preferred over Statement in JDBC?',
    answer: 'PreparedStatement is precompiled by the database engine, improving execution performance when queries are run repeatedly with varying parameters. Crucially, it neutralizes SQL Injection vulnerabilities by binding parameters as strictly typed literals using the ? placeholder rather than raw string concatenation.',
    keyPoints: [
      'Precompilation & query plan caching in DBMS.',
      'Prevents SQL Injection attacks.',
      'Supports parameterized queries via ? placeholders.'
    ],
    scoringKeywords: ['Precompiled SQL', 'Execution plan caching', 'SQL Injection immunity', 'Placeholder (?)'],
    memoryTrick: 'PreparedStatement = Cookie cutter: shape is pre-stamped, only fresh dough is inserted safely.'
  },
  {
    id: 'q-2m-04',
    marks: 2,
    unit: 'Unit 3',
    topic: 'JDBC',
    question: 'What is the role of DriverManager in JDBC architecture?',
    answer: 'DriverManager acts as the factory and management backbone of JDBC. It tracks registered database driver classes, matches incoming JDBC connection URLs with the correct driver, and establishes an active database Connection object via DriverManager.getConnection().',
    keyPoints: [
      'Maintains registry of loaded JDBC drivers.',
      'Parses JDBC connection URLs (jdbc:subprotocol:subname).',
      'Factory method getConnection() returns active Connection session.'
    ],
    scoringKeywords: ['Driver registry', 'getConnection()', 'JDBC URL resolution', 'Factory manager'],
    memoryTrick: 'DriverManager = Airport dispatcher: pairs each flight request with the correct pilot.'
  },
  {
    id: 'q-2m-05',
    marks: 2,
    unit: 'Unit 3',
    topic: 'GUI & Swing',
    question: 'Why are Swing components called "lightweight" compared to AWT?',
    answer: 'Swing components are called lightweight because they are written entirely in 100% pure Java and do not rely on underlying host operating system native GUI peers. AWT components are heavyweight because each component wraps a native OS window/widget handle.',
    keyPoints: [
      'Written 100% in pure Java (javax.swing).',
      'No native OS peer handles attached.',
      'Enables Pluggable Look and Feel (PLAF) and uniform rendering.'
    ],
    scoringKeywords: ['100% Pure Java', 'No native OS peers', 'Lightweight vs Heavyweight', 'Pluggable Look & Feel'],
    memoryTrick: 'Lightweight = Painted on paper by Java; Heavyweight = Carved out of OS marble blocks.'
  },
  {
    id: 'q-2m-06',
    marks: 2,
    unit: 'Unit 4',
    topic: 'Functional Programming',
    question: 'Define Referential Transparency with a short example.',
    answer: 'Referential Transparency is a property of functional expressions where an expression can be directly replaced by its evaluated value at any point without altering program behavior. Example: In y = add(3, 4) * 2, replace add(3, 4) with 7 -> y = 7 * 2; output remains identical.',
    keyPoints: [
      'Expression substitution with its evaluated result.',
      'Requires deterministic output and zero side effects.',
      'Enables compiler optimizations like subexpression elimination.'
    ],
    scoringKeywords: ['Expression substitution', 'Zero side-effects', 'Deterministic value', 'Compiler optimization'],
    memoryTrick: 'A $5 note and five $1 coins: exchangeable anywhere without changing your net worth.'
  },
  {
    id: 'q-2m-07',
    marks: 2,
    unit: 'Unit 4',
    topic: 'Functional Programming',
    question: 'What is a Pure Function? State its two primary properties.',
    answer: 'A Pure Function is a function whose return value depends exclusively on its input parameters and produces zero observable side effects. The two primary properties are: 1) Determinism (same arguments always produce identical output), 2) No side effects (no global state mutation, no file I/O, no hardware changes).',
    keyPoints: [
      'Deterministic output for given input arguments.',
      'Absence of side effects (no I/O, no mutation of outer state).',
      'Thread-safe and easily memoizable.'
    ],
    scoringKeywords: ['Determinism', 'Zero side-effects', 'Immutable state', 'Memoization'],
    memoryTrick: 'Pure Mirror: clean reflection of inputs, never leaves fingerprints on the glass.'
  },
  {
    id: 'q-2m-08',
    marks: 2,
    unit: 'Unit 4',
    topic: 'Logic Programming',
    question: 'Distinguish between a Fact and a Rule in Logic Programming.',
    answer: 'A Fact is an unconditional assertion of truth in the knowledge base (e.g., father(tom, bob).). A Rule is a conditional relationship expressed as a Horn clause (Head :- Body), meaning the Head is true only if all goals in the Body evaluate to true (e.g., grandfather(X, Z) :- father(X, Y), father(Y, Z).).',
    keyPoints: [
      'Fact: Unconditional ground statement.',
      'Rule: Conditional implication with Head and Body.',
      'Horn clause notation: Head :- Body.'
    ],
    scoringKeywords: ['Unconditional truth', 'Horn clause (Head :- Body)', 'Conditional implication', 'Knowledge base'],
    memoryTrick: 'Fact = Sunlight is warm; Rule = IF you go outside in sunlight THEN you feel warm.'
  },
  {
    id: 'q-2m-09',
    marks: 2,
    unit: 'Unit 4',
    topic: 'Parallel Systems',
    question: 'What is the Global Interpreter Lock (GIL) in Python?',
    answer: 'The Global Interpreter Lock (GIL) is a mutex in CPython that prevents multiple native OS threads from executing Python bytecode simultaneously. Consequently, multi-threaded CPU-bound programs cannot exploit multiple CPU cores in Python unless multiprocessing is utilized.',
    keyPoints: [
      'CPython mutex lock.',
      'Restricts bytecode execution to one thread at a time.',
      'Limits CPU-bound concurrency; bypassed by multiprocessing.'
    ],
    scoringKeywords: ['CPython mutex', 'Bytecode lock', 'Single-core restriction', 'Bypassed by multiprocessing'],
    memoryTrick: 'GIL = Single microphone: Even with 8 singers on stage, only one can sing at any instant.'
  },
  {
    id: 'q-2m-10',
    marks: 2,
    unit: 'Unit 4',
    topic: 'Network Programming',
    question: 'Why is UDP preferred over TCP for video streaming and online gaming?',
    answer: 'UDP has virtually zero connection setup overhead (no 3-way handshake) and an 8-byte header compared to TCP’s 20-60 bytes. It drops retransmission delays and flow control buffering, delivering minimal packet latency which is critical for real-time audio, video, and gaming where losing a single frame is preferable to stalling.',
    keyPoints: [
      'Ultra-low latency with no connection handshake.',
      'Small 8-byte fixed header overhead.',
      'No retransmission stalling (no Head-of-Line blocking).'
    ],
    scoringKeywords: ['Low latency', 'No handshake overhead', '8-byte header', 'No retransmission stall'],
    memoryTrick: 'Live concert shout: You care about what is being sung right NOW, not recovering a missed word from 5 seconds ago.'
  },

  // ==========================================
  // 5 MARKS QUESTIONS
  // ==========================================
  {
    id: 'q-5m-01',
    marks: 5,
    unit: 'Unit 3',
    topic: 'Multithreading',
    question: 'Explain the Thread Lifecycle in Java with a neat state transition diagram.',
    answer: `A Java thread undergoes 5 primary states defined in java.lang.Thread.State:
1. NEW: Thread object is instantiated (new Thread()) but start() has not been called.
2. RUNNABLE: start() is invoked. Thread is eligible for CPU allocation by the OS scheduler (includes Ready and Running).
3. BLOCKED: Waiting to acquire an intrinsic monitor lock held by another thread in a synchronized block.
4. WAITING / TIMED_WAITING: Pauses execution indefinitely via wait()/join(), or for a specified duration via sleep(ms)/wait(ms).
5. TERMINATED: run() method completes normally or terminates abruptly due to an uncaught exception.`,
    keyPoints: [
      '5 States: New -> Runnable -> Blocked / Waiting -> Terminated.',
      'start() moves from New to Runnable.',
      'sleep() / wait(ms) enters Timed Waiting; wait() enters Waiting.',
      'Cannot restart a Terminated thread.'
    ],
    scoringKeywords: ['NEW', 'RUNNABLE', 'BLOCKED', 'WAITING / TIMED_WAITING', 'TERMINATED', 'State transitions'],
    memoryTrick: 'N-R-B-W-T -> Never Run Behind Wild Tigers (New, Runnable, Blocked, Waiting, Terminated).',
    diagramAscii: `
  [ NEW ]
     |  t.start()
     v
  [ RUNNABLE ] <--------------------+
     |      ^                       |
     |      | lock acquired         | notify() / timeout / join()
     v      |                       |
  [ BLOCKED ]                   [ WAITING / TIMED_WAITING ]
     |                               |
     +--------------> [ TERMINATED ] <+
                     (run() exits)
`
  },
  {
    id: 'q-5m-02',
    marks: 5,
    unit: 'Unit 3',
    topic: 'GUI & Applets',
    question: 'Describe the Applet lifecycle in Java and explain when each method is invoked.',
    answer: `The Applet lifecycle consists of 5 fundamental callback methods executed by the browser container:
1. public void init(): Executed exactly once when the applet is loaded into memory. Used for one-time initialization (setting layout, colors, reading parameters).
2. public void start(): Invoked immediately after init(), and restarted whenever the browser page is re-visited or unminimized. Starts background animations or threads.
3. public void paint(Graphics g): Automatically invoked to render text, graphics, and geometric shapes onto the applet canvas whenever the window requires redrawing.
4. public void stop(): Invoked when the user navigates away from the HTML page or minimizes the browser. Suspends active processing to save CPU cycles.
5. public void destroy(): Executed once before the applet is removed from browser memory to release heavy allocated resources.`,
    keyPoints: [
      'Lifecycle controlled by browser/container, not main().',
      'init() and destroy() called ONCE per lifecycle.',
      'start() and stop() can be called MULTIPLE times.',
      'paint(Graphics g) draws the GUI.'
    ],
    scoringKeywords: ['init()', 'start()', 'paint(Graphics g)', 'stop()', 'destroy()', 'Browser sandbox'],
    memoryTrick: 'I Start Painting Some Day: Init -> Start -> Paint -> Stop -> Destroy.',
    diagramAscii: `
  [ Born ] ---> init() ---> start() <---> stop()
                               |            |
                             paint()        v
                                        destroy() ---> [ Dead ]
`
  },
  {
    id: 'q-5m-03',
    marks: 5,
    unit: 'Unit 4',
    topic: 'Functional Programming',
    question: 'Explain Higher-Order Functions with examples of Map, Filter, and Reduce in Python.',
    answer: `A Higher-Order Function (HOF) is a function that either takes one or more functions as input arguments, or returns a function as its output.
1. Map: Applies a function to all elements in an iterable, preserving collection length (1:1 transform).
   Example: list(map(lambda x: x * 2, [1, 2, 3])) -> [2, 4, 6]
2. Filter: Evaluates a boolean predicate on each element, returning only elements that satisfy the condition.
   Example: list(filter(lambda x: x > 2, [1, 2, 3, 4])) -> [3, 4]
3. Reduce: Iteratively folds elements of a collection into a single cumulative scalar using a binary operation.
   Example: reduce(lambda a, b: a + b, [1, 2, 3, 4], 0) -> 10`,
    keyPoints: [
      'HOF definition: accepts function as parameter or returns function.',
      'Map: 1-to-1 transformation, preserves size.',
      'Filter: boolean predicate filter, reduces count.',
      'Reduce: cumulative binary aggregation to scalar.'
    ],
    scoringKeywords: ['First-class citizen', 'Function as argument', 'Map (1:1)', 'Filter (predicate)', 'Reduce (accumulator)'],
    memoryTrick: 'Map paints all walls; Filter selects good bricks; Reduce counts total weight.'
  },
  {
    id: 'q-5m-04',
    marks: 5,
    unit: 'Unit 4',
    topic: 'Parallel Systems',
    question: 'Explain Lock vs Semaphore with real-time concurrency examples.',
    answer: `Lock (Mutual Exclusion) and Semaphore are concurrency synchronization primitives:
1. Lock (Mutex):
   - Binary state (Locked / Unlocked).
   - Only ONE thread can hold the lock at any given moment.
   - Strict ownership: the holding thread is responsible for releasing it.
   - Example: Single-person fitting room in a clothing store.
2. Semaphore:
   - Maintains an integer permit counter (initialized to N).
   - acquire() decrements permit count; if count == 0, threads block.
   - release() increments permit count, waking blocked threads.
   - Any thread can release a permit (no strict ownership).
   - Example: A parking garage with 10 vacant parking slots.`,
    keyPoints: [
      'Lock = Binary mutual exclusion (1 thread at a time).',
      'Semaphore = Counting primitive managing N shared resources.',
      'Binary Semaphore (N=1) acts like a Mutex without ownership.',
      'Operations: acquire() [P] and release() [V].'
    ],
    scoringKeywords: ['Mutual exclusion', 'Permit counter', 'acquire() / release()', 'P and V operations', 'Strict ownership'],
    memoryTrick: 'Lock = Single bathroom key; Semaphore = Parking garage ticket counter with 10 spots.'
  },

  // ==========================================
  // 8 MARKS QUESTIONS
  // ==========================================
  {
    id: 'q-8m-01',
    marks: 8,
    unit: 'Unit 3',
    topic: 'Multithreading',
    question: 'Explain Inter-thread Communication in Java using wait(), notify(), and notifyAll() with the Producer-Consumer problem.',
    answer: `Inter-thread communication allows synchronized threads to cooperate without busy-waiting (polling), using monitor methods from java.lang.Object:
1. wait(): Releases the intrinsic monitor lock and puts current thread into Waiting state until another thread invokes notify().
2. notify(): Wakes up a single arbitrary thread waiting on the same object monitor.
3. notifyAll(): Wakes up all threads waiting on that monitor.
These methods MUST strictly be called within a synchronized block/method; otherwise IllegalMonitorStateException is thrown.

Producer-Consumer Implementation with Shared Buffer:
Producer produces items into buffer; when full, producer invokes wait().
Consumer removes items; when empty, consumer invokes wait().
After producing/consuming, threads call notify() to wake the partner.`,
    keyPoints: [
      'Methods defined in java.lang.Object, not Thread.',
      'Must be executed inside synchronized contexts.',
      'wait() automatically releases the object lock.',
      'Prevents CPU cycle waste from busy polling.'
    ],
    scoringKeywords: ['wait() releases lock', 'notify() wakes one', 'notifyAll() wakes all', 'IllegalMonitorStateException', 'Producer-Consumer buffer'],
    memoryTrick: 'Wait drops the microphone; Notify taps the shoulder of the next singer.',
    diagramAscii: `
   PRODUCER THREAD                  SHARED BUFFER (Capacity N)            CONSUMER THREAD
   ----------------                 --------------------------            ---------------
  [Produce Item] --------> [Buffer Full?]                               
                                | Yes -> wait() (releases lock)
                                | No  -> Insert Item
                                         notify() ---------------------> [Wake Consumer]
                                                                                |
                                                                         [Consume Item]
                                                                         [Buffer Empty?]
                                                                            | Yes -> wait()
                                                                            | No  -> Extract
                                         [Wake Producer] <-------------- notify()
`
  },
  {
    id: 'q-8m-02',
    marks: 8,
    unit: 'Unit 3',
    topic: 'JDBC',
    question: 'Explain the 5 core steps in JDBC with code snippets and JDBC Architecture.',
    answer: `JDBC (Java Database Connectivity) architecture links Java applications with relational DBMS through two layers: JDBC API (application layer) and JDBC Driver (database-specific translation layer).

The 5 Core Steps:
1. Load JDBC Driver:
   Class.forName("com.mysql.cj.jdbc.Driver");
2. Establish Connection:
   Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/db", "user", "pass");
3. Create Statement / PreparedStatement:
   PreparedStatement pStmt = conn.prepareStatement("SELECT * FROM emp WHERE dept = ?");
   pStmt.setString(1, "IT");
4. Execute Query & Process Results:
   ResultSet rs = pStmt.executeQuery();
   while (rs.next()) { System.out.println(rs.getString("name")); }
5. Close Resources:
   rs.close(); pStmt.close(); conn.close();`,
    keyPoints: [
      'Two-tier architecture: JDBC API and Driver Manager + Vendor Drivers.',
      'Driver Types: Type 1 (ODBC Bridge), Type 2 (Native API), Type 3 (Network Protocol), Type 4 (Thin Pure Java).',
      'Step-by-step pipeline execution.',
      'Closing resources in reverse order of creation.'
    ],
    scoringKeywords: ['Class.forName()', 'DriverManager.getConnection()', 'PreparedStatement', 'ResultSet cursor', 'Resource closure in reverse order'],
    memoryTrick: 'D-C-S-E-C -> Drivers Can Speak Every Code (Driver, Connection, Statement, Execute, Close).',
    diagramAscii: `
  +---------------------------------------------+
  |             Java Application                |
  +---------------------------------------------+
                        |  (JDBC API)
                        v
  +---------------------------------------------+
  |               DriverManager                 |
  +---------------------------------------------+
        |                 |                 |
        v                 v                 v
  +-----------+     +-----------+     +-----------+
  |  MySQL    |     |  Oracle   |     |PostgreSQL |  (Type 4 Thin Drivers)
  |  Driver   |     |  Driver   |     |  Driver   |
  +-----------+     +-----------+     +-----------+
        |                 |                 |
        v                 v                 v
   [ MySQL DB ]      [Oracle DB]       [Postgres DB]
`
  },
  {
    id: 'q-8m-03',
    marks: 8,
    unit: 'Unit 4',
    topic: 'Logic Programming',
    question: 'Explain the working of Unification and Backtracking in Logic Programming with a family tree knowledge base.',
    answer: `Logic programming relies on an inference engine powered by two core algorithms: Unification and Backtracking.

1. Unification:
   The algorithm that attempts to match two symbolic terms by determining a set of variable bindings (substitutions) called the Most General Unifier (MGU).
   Example: Matching parent(X, bob) with parent(pam, Y) succeeds with bindings: {X = pam, Y = bob}.

2. Backtracking:
   When searching for variable solutions to satisfy a query goal, the engine searches the knowledge base depth-first from top to bottom. If a sub-goal fails or the user requests alternative solutions (;), the engine retreats to the most recent choice point, unbinds variables, and tries the next matching rule/fact.

Knowledge Base Example:
parent(pam, bob).
parent(tom, bob).
parent(bob, ann).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).

Query: ?- grandparent(pam, Grandchild).
- Unifies parent(pam, Y) -> binds Y = bob.
- Unifies parent(bob, Z) -> binds Z = ann.
- Returns Grandchild = ann.`,
    keyPoints: [
      'Unification is pattern matching with variable substitution.',
      'Most General Unifier (MGU).',
      'Backtracking is automatic depth-first search rewind.',
      'Choice points allow exploring alternative goal paths.'
    ],
    scoringKeywords: ['Unification', 'Most General Unifier (MGU)', 'Backtracking', 'Depth-first search', 'Choice points', 'Variable binding'],
    memoryTrick: 'Unification finds the key that fits; Backtracking retraces footsteps in the maze.'
  },

  // ==========================================
  // 13 MARKS QUESTIONS
  // ==========================================
  {
    id: 'q-13m-01',
    marks: 13,
    unit: 'Unit 3',
    topic: 'JDBC & Concurrency',
    question: 'Design a Complete Database-Driven Banking System in Java. Implement thread-safe fund transfer between two accounts using JDBC transactions (commit/rollback) and Thread Synchronization.',
    answer: `To design a robust, production-grade Banking System, we combine:
1. Java Multithreading & Synchronization: Ensuring simultaneous transfer requests on the same account do not produce race conditions.
2. JDBC Transaction Management: Disabling auto-commit (conn.setAutoCommit(false)), executing debit and credit statements atomically, and issuing conn.commit() or conn.rollback() upon exception.

Full Architecture:
- Account Lock: synchronized(this) ensures thread safety.
- Transactional Atomic Unit:
  Step A: Verify sender balance >= amount.
  Step B: Debit sender (UPDATE accounts SET balance = balance - ? WHERE id = ?).
  Step C: Credit receiver (UPDATE accounts SET balance = balance + ? WHERE id = ?).
  Step D: conn.commit() on success, conn.rollback() inside catch block.`,
    keyPoints: [
      'Transaction atomicity (ACID properties).',
      'setAutoCommit(false) enables manual transaction demarcations.',
      'commit() permanently saves; rollback() restores pre-transaction state.',
      'Synchronized block guarantees mutual exclusion across concurrent transfer threads.'
    ],
    scoringKeywords: ['setAutoCommit(false)', 'conn.commit()', 'conn.rollback()', 'ACID Atomicity', 'synchronized', 'PreparedStatement batch'],
    memoryTrick: 'AutoCommit OFF -> Try Debit & Credit -> Commit; On failure -> Rollback!',
    diagramAscii: `
  [ Thread 1: User A -> User B ]         [ Thread 2: User A -> User C ]
                |                                      |
                +-----------> [ Synchronized Block ] <--+
                                      |
                             setAutoCommit(false)
                                      |
                         +------------+------------+
                         |                         |
               [ Debit User A (-$100) ]   [ Credit User B (+$100) ]
                         |                         |
                         +------------+------------+
                                      |
                              Success? ---> conn.commit()
                              Failure? ---> conn.rollback()
`
  },
  {
    id: 'q-13m-02',
    marks: 13,
    unit: 'Unit 4',
    topic: 'Socket Programming & Concurrency',
    question: 'Compare TCP and UDP protocols in detail. Implement a Multi-threaded TCP Chat/Echo Server in Java capable of handling concurrent client connections simultaneously.',
    answer: `1. Comprehensive TCP vs UDP Protocol Comparison:
- Connection: TCP is connection-oriented (3-way handshake); UDP is connectionless.
- Reliability: TCP provides guaranteed delivery with sequence numbers & ACKs; UDP provides best-effort delivery.
- Overhead: TCP has 20-60 byte header; UDP has a fixed 8-byte header.
- Flow/Congestion Control: TCP implements sliding window and AIMD; UDP has none.

2. Multi-threaded TCP Architecture:
A single-threaded TCP server blocks during I/O with one client. To serve multiple clients concurrently, the ServerSocket.accept() loop accepts incoming connections and immediately spawns an independent worker thread (implementing Runnable) for each connected client.

Core Server Loop:
ServerSocket server = new ServerSocket(9090);
while (true) {
    Socket client = server.accept();
    new Thread(new ClientHandler(client)).start();
}`,
    keyPoints: [
      'Contrast TCP reliability vs UDP speed and header footprint.',
      'Single-threaded server limitation (blocking on readLine()).',
      'Worker thread per client (ClientHandler Runnable).',
      'Independent I/O streams for each active socket session.'
    ],
    scoringKeywords: ['3-Way Handshake', 'Reliable stream vs Datagram', 'ServerSocket.accept()', 'Multi-threaded worker pool', 'ClientHandler Runnable'],
    memoryTrick: 'Server is the Hotel Receptionist: takes client at front desk, delegates to a personal Bellboy worker thread.'
  }
];
