export interface CompressedNotesTier {
  id: '10-page' | '5-page' | '2-page' | '1-page';
  name: string;
  badge: string;
  readingTimeMinutes: number;
  wordCount: string;
  description: string;
  content: string;
}

export const COMPRESSED_NOTES_DATA: Record<string, CompressedNotesTier> = {
  '10-page': {
    id: '10-page',
    name: '10-Page In-Depth Exam Blueprint',
    badge: 'Comprehensive Deep Dive',
    readingTimeMinutes: 30,
    wordCount: '~3,200 Words',
    description: 'Complete breakdown of all Unit 3 and Unit 4 topics with architecture definitions, JDBC steps, thread states, functional paradigms, and socket mechanics.',
    content: `# UNIT 3: CONCURRENCY, JDBC & GUI PROGRAMMING (Pages 1-5)

## 1. Concurrent Programming & Multithreading in Java
- **Thread Concept:** A thread is the smallest dispatchable unit of execution within a process. Threads in the same process share code, heap memory, and open file descriptors, but each thread maintains its own private Program Counter (PC), CPU registers, and execution stack.
- **Thread Creation Mechanisms:**
  1. Extending java.lang.Thread: Override \`public void run()\`. Initiated with \`t.start()\`. Constrains inheritance due to Java single class inheritance.
  2. Implementing java.lang.Runnable: Functional interface with \`void run()\`. Promotes clean separation of task from worker thread, and class can still extend another domain class.
- **Thread Lifecycle States (java.lang.Thread.State):**
  - **NEW:** Instantiated (\`new Thread()\`), not started.
  - **RUNNABLE:** After \`start()\` is called; eligible for CPU timeslice by OS scheduler.
  - **BLOCKED:** Waiting to acquire an intrinsic object monitor lock held by another thread.
  - **WAITING / TIMED_WAITING:** Waiting indefinitely (\`wait()\`, \`join()\`) or for timeout (\`sleep(ms)\`, \`wait(ms)\`).
  - **TERMINATED:** \`run()\` method exits cleanly or with uncaught exception.
- **Thread Priority:** Integer 1 (\`MIN_PRIORITY\`) to 10 (\`MAX_PRIORITY\`), default 5 (\`NORM_PRIORITY\`). Used as scheduling hint.
- **Inter-Thread Communication:**
  - \`wait()\`, \`notify()\`, \`notifyAll()\` defined in \`java.lang.Object\`.
  - Must only be invoked inside synchronized blocks/methods; otherwise \`IllegalMonitorStateException\` is thrown.
  - \`wait()\` releases the monitor lock, enabling other waiting threads to enter.

## 2. JDBC (Java Database Connectivity) Architecture
- **Two-Layer Architecture:**
  - JDBC API (Application level: \`DriverManager\`, \`Connection\`, \`Statement\`, \`ResultSet\`).
  - JDBC Driver (Database specific translation layer: Type 1 to Type 4).
  - Type 4 (Thin Driver) is pure Java, converting JDBC calls directly to database network protocol.
- **The 5 Sacred Steps of JDBC:**
  1. Register Driver: \`Class.forName("com.mysql.cj.jdbc.Driver");\`
  2. Establish Connection: \`Connection conn = DriverManager.getConnection(url, user, pass);\`
  3. Prepare Statement: \`PreparedStatement ps = conn.prepareStatement(sql);\`
  4. Execute: \`ResultSet rs = ps.executeQuery();\` or \`int rows = ps.executeUpdate();\`
  5. Close Resources: in reverse order (\`rs.close()\`, \`ps.close()\`, \`conn.close()\`).
- **Statement Hierarchy:**
  - \`Statement\`: For raw, static SQL. Vulnerable to SQL injection.
  - \`PreparedStatement\`: Precompiled by DBMS; supports \`?\` placeholders. Immune to SQL injection; faster for repeated batch queries.
  - \`CallableStatement\`: For invoking stored procedures and functions with IN/OUT parameters.

## 3. Java GUI, Applets, Swing & MVC
- **Applet Lifecycle:** Container-managed callbacks: \`init()\` -> \`start()\` -> \`paint(Graphics g)\` -> \`stop()\` -> \`destroy()\`.
- **AWT vs Swing:** AWT uses heavyweight native OS peer widgets (platform-dependent appearance). Swing is 100% pure Java lightweight components, supporting Pluggable Look and Feel (PLAF).
- **Event Delegation Model:** Event Source (e.g. \`JButton\`) generates \`ActionEvent\` and delegates processing to registered \`ActionListener\`.
- **MVC Pattern:**
  - Model: Domain data and business state.
  - View: Visual rendering of Model state.
  - Controller: User event handler that mutates Model and notifies View.

---

# UNIT 4: FUNCTIONAL, LOGIC & PARALLEL SYSTEMS (Pages 6-10)

## 4. Functional Programming Paradigm
- **Core Principles:**
  - **Pure Functions:** Deterministic (same input -> same output) with zero side effects.
  - **Referential Transparency:** An expression can be replaced with its evaluated value without altering program semantics.
  - **Immutability:** Data cannot be modified post-creation; modifications yield new data structures.
  - **Higher-Order Functions:** Functions taking functions as arguments or returning functions (\`map\`, \`filter\`, \`reduce\`).
  - **Closures:** A function enclosing its surrounding lexical environment, retaining access to outer variables even after outer execution completes.

## 5. Logic Programming & Prolog
- **Declarative vs Imperative:** Imperative specifies HOW to compute; Declarative specifies WHAT is true.
- **Knowledge Base Building Blocks:**
  - **Facts:** Unconditional truths (e.g., \`parent(pam, bob).\`).
  - **Rules:** Conditional Horn clauses: \`Head :- Body\` (e.g., \`grandparent(X, Z) :- parent(X, Y), parent(Y, Z).\`).
  - **Unification:** The algorithmic matching of two logical terms using variable substitution to find the Most General Unifier (MGU).
  - **Backtracking:** Automatic depth-first rewind to previous choice points when a sub-goal fails.

## 6. Parallel Programming & Concurrency Primitives
- **Threading vs Multiprocessing:**
  - Threading shares memory, bounded by Python CPython GIL (Global Interpreter Lock) for CPU-bound tasks.
  - Multiprocessing spawns separate OS processes with independent memory and separate interpreters, achieving true multi-core speedups.
- **Synchronization Primitives:**
  - **Lock (Mutex):** Binary mutual exclusion flag.
  - **RLock:** Re-entrant lock allowing the same thread to acquire multiple times without self-deadlock.
  - **Semaphore:** Maintains an integer counter representing N shared permits; \`acquire()\` decrements, \`release()\` increments.
  - **Producer-Consumer:** Solved using bounded buffer with mutex and semaphores for empty and full slots.

## 7. Socket Programming & Networking
- **TCP (Transmission Control Protocol):** Connection-oriented, 3-way handshake (SYN, SYN-ACK, ACK), reliable byte stream, in-order delivery, flow control, 20-60 byte header. Classes: \`Socket\`, \`ServerSocket\`.
- **UDP (User Datagram Protocol):** Connectionless, independent datagrams, unreliable best-effort delivery, no handshake, 8-byte fixed header. Classes: \`DatagramSocket\`, \`DatagramPacket\`.`
  },

  '5-page': {
    id: '5-page',
    name: '5-Page High-Yield CT Revision',
    badge: 'Most Popular for Night-Before',
    readingTimeMinutes: 15,
    wordCount: '~1,600 Words',
    description: 'High-density synthesis focusing strictly on the topics tested in 90% of past Class Tests.',
    content: `# HIGH-YIELD CT SUMMARY (Units 3 & 4)

### 1. JAVA MULTITHREADING (Unit 3)
- **start() vs run():** \`start()\` creates a brand new OS call stack and invokes \`run()\` asynchronously. Calling \`run()\` directly executes on caller thread.
- **Runnable vs Thread:** Always implement \`Runnable\` to retain ability to extend another class and decouple task from worker.
- **Synchronization:** Intrinsic monitor locks prevent race conditions on shared state.
- **wait() & notify():** Belong to \`java.lang.Object\`. \`wait()\` releases lock; \`notify()\` wakes one waiting thread. Must be in synchronized context.

### 2. JDBC & DATABASE CONNECTIVITY (Unit 3)
- **5 Steps:** \`Class.forName\` -> \`DriverManager.getConnection\` -> \`conn.prepareStatement\` -> \`ps.executeUpdate/executeQuery\` -> \`close()\`.
- **PreparedStatement vs Statement:** PreparedStatement is precompiled by DBMS, uses \`?\` placeholders, and prevents SQL Injection.
- **Transactions:** \`conn.setAutoCommit(false)\` -> execute queries -> \`conn.commit()\` -> on error \`conn.rollback()\`.

### 3. GUI, SWING & MVC (Unit 3)
- **Applet Lifecycle:** \`init()\` -> \`start()\` -> \`paint(Graphics g)\` -> \`stop()\` -> \`destroy()\`.
- **Swing:** Lightweight (100% pure Java), no native peers, supports Pluggable Look and Feel.
- **MVC:** Model (Data) separated from View (UI) and Controller (Event mediation).

### 4. FUNCTIONAL & LOGIC PROGRAMMING (Unit 4)
- **Referential Transparency:** Expression can be replaced by its evaluated value without side-effects.
- **Higher-Order Functions:** Functions accepting functions or returning functions.
  - \`map\`: 1-to-1 transformation, preserves size.
  - \`filter\`: Predicate selection, subset size.
  - \`reduce\`: Binary accumulator fold, squashes collection into single scalar.
- **Logic Programming:** Knowledge base of Facts and Rules (\`Head :- Body\`). Unification matches terms; Backtracking rewinds choice points.

### 5. PARALLEL & SOCKET PROGRAMMING (Unit 4)
- **Python GIL:** Restricts pure Python threads to single core; use \`multiprocessing\` to bypass GIL.
- **Lock vs Semaphore:** Lock = 1 thread at a time. Semaphore = N available permits.
- **TCP vs UDP:** TCP = connection-oriented, reliable, 3-way handshake, stream (\`ServerSocket\`, \`Socket\`). UDP = connectionless, fast, unreliable datagrams (\`DatagramSocket\`, \`DatagramPacket\`).`
  },

  '2-page': {
    id: '2-page',
    name: '2-Page Rapid Review Blitz',
    badge: '1-Hour Before Exam',
    readingTimeMinutes: 7,
    wordCount: '~750 Words',
    description: 'Ultra-fast memory trigger formulas, critical tables, and keywords.',
    content: `# 2-PAGE RAPID REVIEW BLITZ

## PAGE 1: UNIT 3 MUST-KNOWS
- **Thread Lifecycle:** NEW -> RUNNABLE -> BLOCKED -> WAITING/TIMED_WAITING -> TERMINATED.
- **start() vs run():** \`start()\` = new thread + new call stack; \`run()\` = synchronous method call.
- **Daemon Thread:** Background service (Garbage Collector); dies when user threads die (\`setDaemon(true)\`).
- **JDBC Formula:** \`Class.forName(driver)\` -> \`conn = DriverManager.getConnection(url, u, p)\` -> \`ps = conn.prepareStatement(sql)\` -> \`rs = ps.executeQuery()\` -> \`close()\`.
- **PreparedStatement:** Precompiled template + \`?\` placeholders = Immune to SQL Injection.
- **Applet Lifecycle:** \`init()\` -> \`start()\` -> \`paint(g)\` -> \`stop()\` -> \`destroy()\`.
- **Swing vs AWT:** Swing = Lightweight, 100% Pure Java, PLAF. AWT = Heavyweight native OS peers.
- **MVC:** Model (Data) | View (UI Screen) | Controller (Event Listener).

## PAGE 2: UNIT 4 MUST-KNOWS
- **Pure Function:** Deterministic + Zero side-effects.
- **Referential Transparency:** Replace expression with value safely.
- **Map vs Filter vs Reduce:**
  - \`map(fn, list)\`: N -> N items transformed.
  - \`filter(pred, list)\`: N -> M items satisfying boolean test.
  - \`reduce(fn, list, seed)\`: N -> 1 single scalar result.
- **Horn Clause:** \`Head :- Body\` (Head true IF Body true).
- **Unification & Backtracking:** Unification = Pattern match with variable binding. Backtracking = DFS rewind on dead-end.
- **GIL (Python):** Global Interpreter Lock allows 1 thread on bytecode. Multiprocessing bypasses GIL.
- **Lock vs Semaphore:** Lock = Binary mutual exclusion. Semaphore = Counting N permits.
- **TCP vs UDP:**
  - TCP: Connection-oriented, 3-Way Handshake, Reliable, \`ServerSocket\` / \`Socket\`.
  - UDP: Connectionless, Fast, Datagram, \`DatagramSocket\` / \`DatagramPacket\`.`
  },

  '1-page': {
    id: '1-page',
    name: 'One-Page Revision Cheat-Sheet',
    badge: 'Hall Entrance Cheat Sheet',
    readingTimeMinutes: 3,
    wordCount: '~380 Words',
    description: 'The dense, pocket-sized formula sheet to review 5 minutes before walking into the exam room.',
    content: `========================================================================
CT TITAN - 1-PAGE ULTRA CHEAT SHEET: ADVANCED PROGRAMMING PRACTICE
========================================================================
[UNIT 3: CONCURRENCY, JDBC, GUI]
* Thread.start() creates new call stack & thread. Thread.run() runs synchronously.
* Priority: MIN_PRIORITY=1, NORM_PRIORITY=5, MAX_PRIORITY=10.
* wait() / notify() in java.lang.Object. Must be in synchronized block. wait() releases lock.
* JDBC 5 Steps: Class.forName() -> DriverManager.getConnection() -> prepareStatement() -> executeUpdate()/executeQuery() -> close().
* PreparedStatement: Precompiled plan + '?' placeholder = SQL Injection immunity.
* Applet Order: init() -> start() -> paint(Graphics g) -> stop() -> destroy().
* Swing: Lightweight, Pure Java, no OS peers, Pluggable Look & Feel (PLAF).
* MVC: Model (Data/Logic) -> View (UI Presentation) <- Controller (Event Dispatcher).

[UNIT 4: FUNCTIONAL, LOGIC, PARALLEL, SOCKETS]
* Pure Function: Deterministic, no side effects.
* Referential Transparency: Expr can be replaced by its evaluated value.
* Higher-Order Functions: map (N->N), filter (N->M boolean test), reduce (N->1 scalar).
* Horn Clause: Head :- Body. Unification = Variable substitution (MGU). Backtracking = Depth-first rewind.
* GIL (Python): Mutex on bytecode; CPU-bound multi-core requires multiprocessing module.
* Lock vs Semaphore: Lock = binary mutex (1 thread). Semaphore = counting N permits.
* TCP vs UDP:
  - TCP: Connection-oriented, 3-way handshake (SYN, SYN-ACK, ACK), reliable, byte-stream (ServerSocket, Socket).
  - UDP: Connectionless, fast, unreliable, 8-byte header (DatagramSocket, DatagramPacket).
========================================================================`
  }
};
