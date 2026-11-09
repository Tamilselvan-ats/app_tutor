export interface RevisionPlan {
  duration: '30 Minutes' | '1 Hour' | '2 Hours' | '3 Hours';
  tagline: string;
  targetMarks: string;
  definitions: { term: string; def: string; mnemonic: string }[];
  faqs: { q: string; a: string; marks: string }[];
  scoringConcepts: { title: string; strategy: string; keywords: string[] }[];
  comparisons: { title: string; keyDiff: string }[];
  codingQuestions: { title: string; lang: string; snippet: string; trapToAvoid: string }[];
}

export const ONE_NIGHT_REVISION_DATA: Record<string, RevisionPlan> = {
  '30 Minutes': {
    duration: '30 Minutes',
    tagline: '🚨 EMERGENCY SPRINT: Survival Mode - Guaranteed Pass Threshold',
    targetMarks: 'Target: 25 - 32 Marks (Pass Guarantee)',
    definitions: [
      { term: 'Thread vs Process', def: 'Process is independent program with private memory; Thread is lightweight execution unit sharing process memory.', mnemonic: 'Factory vs Workers' },
      { term: 'PreparedStatement', def: 'Precompiled SQL template with ? placeholders that completely blocks SQL Injection.', mnemonic: 'Safe template with slots' },
      { term: 'Referential Transparency', def: 'An expression can be replaced by its evaluated value without altering program behavior.', mnemonic: '$10 voucher = $10 bill' },
      { term: 'TCP vs UDP', def: 'TCP is connection-oriented, reliable with 3-way handshake; UDP is connectionless, fast, unreliable datagrams.', mnemonic: 'Registered mail vs Shouted postcard' }
    ],
    faqs: [
      { q: 'Why is PreparedStatement preferred over Statement?', a: 'Precompiled execution plan cached in DB + prevents SQL injection attacks.', marks: '2 Marks' },
      { q: 'What does thread.start() do vs thread.run()?', a: 'start() spawns new thread & call stack; run() merely executes synchronously in caller thread.', marks: '2 Marks' },
      { q: 'What is GIL in Python?', a: 'CPython mutex allowing only one thread to execute bytecode at a time, limiting CPU-bound threads to 1 core.', marks: '2 Marks' }
    ],
    scoringConcepts: [
      { title: 'The 5 Mandatory Steps of JDBC', strategy: 'Write the 5 steps in order with Class.forName and DriverManager.getConnection. 100% chance in exam.', keywords: ['Driver', 'Connection', 'PreparedStatement', 'ResultSet', 'Close'] },
      { title: 'Applet Lifecycle 5 Methods', strategy: 'Draw the linear flow diagram: init -> start -> paint -> stop -> destroy.', keywords: ['init()', 'start()', 'paint()', 'stop()', 'destroy()'] }
    ],
    comparisons: [
      { title: 'Thread vs Process', keyDiff: 'Shared memory vs Isolated memory; Lightweight vs Heavyweight.' },
      { title: 'TCP vs UDP', keyDiff: 'Connection-oriented (3-way handshake) vs Connectionless datagrams.' }
    ],
    codingQuestions: [
      {
        title: 'Java JDBC Insert Template',
        lang: 'java',
        snippet: `PreparedStatement ps = conn.prepareStatement("INSERT INTO t VALUES (?, ?)");
ps.setInt(1, 101); ps.setString(2, "Titan");
ps.executeUpdate();`,
        trapToAvoid: 'Never use executeQuery() for INSERT statements; executeUpdate() must be used.'
      },
      {
        title: 'Python Map & Filter One-Liner',
        lang: 'python',
        snippet: `evens = list(filter(lambda x: x % 2 == 0, nums))
doubled = list(map(lambda x: x * 2, nums))`,
        trapToAvoid: 'In Python 3, map/filter return iterators; wrap in list(...) to print or store values.'
      }
    ]
  },

  '1 Hour': {
    duration: '1 Hour',
    tagline: '⚡ HIGH YIELD CRUNCH: Solid First Class Score',
    targetMarks: 'Target: 35 - 42 Marks',
    definitions: [
      { term: 'Thread Priority', def: 'Integer 1 (MIN) to 10 (MAX), default 5 (NORM), guiding OS scheduling.', mnemonic: 'VIP ticket hierarchy' },
      { term: 'Pure Function', def: 'Function with deterministic output and zero side effects.', mnemonic: 'Clean mirror, no fingerprints' },
      { term: 'Lock vs Semaphore', def: 'Lock is binary mutual exclusion (1 thread); Semaphore maintains N permits for shared resources.', mnemonic: 'Bathroom key vs Parking spots' },
      { term: 'MVC Architecture', def: 'Model (data/state) + View (UI/screen) + Controller (user input & routing).', mnemonic: 'Kitchen + Plate + Waiter' }
    ],
    faqs: [
      { q: 'Explain Inter-thread Communication in Java.', a: 'wait() releases lock and sleeps; notify() wakes one thread; notifyAll() wakes all. Defined in java.lang.Object.', marks: '5 Marks' },
      { q: 'Compare Runnable interface vs Thread class.', a: 'Runnable allows extending another class (overcomes single inheritance) and decouples task from worker.', marks: '5 Marks' },
      { q: 'What is Unification and Backtracking in Logic Programming?', a: 'Unification finds variable substitutions (MGU); Backtracking systematically rewinds choice points on dead-ends.', marks: '5 Marks' }
    ],
    scoringConcepts: [
      { title: 'Producer-Consumer Bounded Buffer Synchronization', strategy: 'Mention mutex lock + empty semaphore + full semaphore. Draw circular buffer diagram.', keywords: ['wait()', 'notify()', 'Bounded Buffer', 'Race Condition'] },
      { title: 'AWT vs Swing Lightweight Advantage', strategy: 'Swing components are 100% pure Java without native OS peers, supporting Pluggable Look and Feel.', keywords: ['Heavyweight', 'Lightweight', 'Pure Java', 'PLAF'] }
    ],
    comparisons: [
      { title: 'Statement vs PreparedStatement vs CallableStatement', keyDiff: 'Static query vs Precompiled parameterized query vs Stored procedures.' },
      { title: 'Lock vs RLock vs Semaphore', keyDiff: 'Single owner vs Recursive owner vs N ticket permits.' }
    ],
    codingQuestions: [
      {
        title: 'Java Multi-threading with Runnable & Lambda',
        lang: 'java',
        snippet: `Thread t = new Thread(() -> {
    System.out.println("Running: " + Thread.currentThread().getName());
});
t.start();`,
        trapToAvoid: 'Do not forget t.start(); calling t.run() will not start a new thread.'
      },
      {
        title: 'TCP Echo Server Core Loop',
        lang: 'java',
        snippet: `ServerSocket server = new ServerSocket(9090);
Socket client = server.accept();
BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
PrintWriter out = new PrintWriter(client.getOutputStream(), true);
out.println("ECHO: " + in.readLine());`,
        trapToAvoid: 'Set autoFlush to true in PrintWriter constructor: new PrintWriter(out, true).'
      }
    ]
  },

  '2 Hours': {
    duration: '2 Hours',
    tagline: '🔥 COMPREHENSIVE BLITZ: Distinction & Topper Tier',
    targetMarks: 'Target: 44 - 48 Marks',
    definitions: [
      { term: 'Closure', def: 'Function bundled with its outer lexical environment, remembering free variables.', mnemonic: 'Function with an outer backpack' },
      { term: 'Immutability', def: 'Data that cannot be modified after creation; updates yield fresh instances.', mnemonic: 'Carved in stone' },
      { term: 'CallableStatement', def: 'Prepares and executes stored procedures with IN and OUT parameters.', mnemonic: 'Direct line to DB procedures' },
      { term: 'DatagramSocket & DatagramPacket', def: 'Java UDP networking classes for sending connectionless independent packet buffers.', mnemonic: 'Postbox and Envelope' }
    ],
    faqs: [
      { q: 'Explain Java Thread Lifecycle with transition diagram.', a: 'NEW -> RUNNABLE -> BLOCKED -> WAITING/TIMED_WAITING -> TERMINATED.', marks: '8 Marks' },
      { q: 'Demonstrate Map, Filter, and Reduce in Python with code.', a: 'Map transforms 1:1, Filter selects predicate matches, Reduce accumulates to scalar using functools.reduce.', marks: '8 Marks' },
      { q: 'Design a database-driven student records manager using JDBC.', a: 'Full CRUD with DriverManager, PreparedStatement, executeUpdate/executeQuery, and ResultSet processing.', marks: '13 Marks' }
    ],
    scoringConcepts: [
      { title: 'JDBC Transaction Demarcation', strategy: 'setAutoCommit(false) -> executeBatch() -> commit() -> catch rollback(). Always write this block in long answers.', keywords: ['setAutoCommit', 'commit()', 'rollback()', 'ACID Atomicity'] },
      { title: 'Multiprocessing vs Threading in Python', strategy: 'Explain GIL impact on CPU-bound vs I/O-bound tasks. Show multiprocessing.Process and Queue.', keywords: ['GIL', 'Bypass GIL', 'True Parallelism', 'Process vs Thread'] }
    ],
    comparisons: [
      { title: 'Functional vs OOP Paradigm', keyDiff: 'Pure functions + immutable data vs Encapsulated objects + mutable state.' },
      { title: 'Shared Memory vs Message Passing IPC', keyDiff: 'Hardware memory bus speeds with locks vs Kernel mediated message queues.' }
    ],
    codingQuestions: [
      {
        title: 'Producer Consumer with wait() and notify()',
        lang: 'java',
        snippet: `synchronized void produce(int item) throws InterruptedException {
    while (queue.size() == CAPACITY) wait();
    queue.add(item);
    notifyAll();
}`,
        trapToAvoid: 'Always use while (condition) wait() instead of if (condition) wait() to guard against spurious wakeups.'
      },
      {
        title: 'UDP Datagram Packet Send and Receive',
        lang: 'java',
        snippet: `DatagramSocket socket = new DatagramSocket(9876);
byte[] buf = new byte[1024];
DatagramPacket packet = new DatagramPacket(buf, buf.length);
socket.receive(packet);`,
        trapToAvoid: 'Use new String(packet.getData(), 0, packet.getLength()) so you do not include trailing empty buffer bytes.'
      }
    ]
  },

  '3 Hours': {
    duration: '3 Hours',
    tagline: '👑 100% MASTERY SPRINT: Professor Slayer - Perfect 50/50',
    targetMarks: 'Target: 50 / 50 Marks (Flawless Paper)',
    definitions: [
      { term: 'Horn Clause', def: 'A clause with at most one positive literal (Head :- Body) forming the core of logic programming.', mnemonic: 'One horn on Head' },
      { term: 'Event Delegation Model', def: 'Event Source generates event, passing Event Object to registered Event Listener interface.', mnemonic: 'Source fires, Listener catches' },
      { term: 'RLock (Reentrant Lock)', def: 'Lock that tracks owner thread ID and recursion counter, permitting multiple nested acquires.', mnemonic: 'Key owner can enter inner rooms' },
      { term: 'Pluggable Look and Feel (PLAF)', def: 'Swing capability allowing GUI visual appearance to change dynamically without rewriting components.', mnemonic: 'Chameleon skin for Java UI' }
    ],
    faqs: [
      { q: 'Design a Complete Multi-Threaded TCP Server with ClientHandler.', a: 'ServerSocket.accept() runs in infinite loop, spawning new Thread(new ClientHandler(socket)).start() for each client.', marks: '13 Marks' },
      { q: 'Explain Unification algorithm steps and Backtracking in Prolog.', a: 'Recursive symbol matching, variable binding, choice point stacks, and trail rewinding.', marks: '8 Marks' },
      { q: 'Implement Banking Fund Transfer with ACID guarantees in JDBC.', a: 'PreparedStatement debit and credit wrapped in setAutoCommit(false) with try-commit and catch-rollback.', marks: '13 Marks' }
    ],
    scoringConcepts: [
      { title: 'Complete Section B Strategy (2 x 13 = 26 Marks)', strategy: 'Choose TCP Client-Server and JDBC CRUD. Both have guaranteed code marks with deterministic outputs.', keywords: ['TCP Sockets', 'JDBC CRUD', '100% Mark Allocation'] },
      { title: 'Keywords Highlighting in Long Answers', strategy: 'Underline or box key terms like PreparedStatement, 3-Way Handshake, Intrinsic Monitor, and Tail Recursion.', keywords: ['Examiner Eye-Tracking', 'Scoring Keywords'] }
    ],
    comparisons: [
      { title: 'Map vs Filter vs Reduce', keyDiff: 'N->N 1:1 transform vs N->M predicate subset vs N->1 binary scalar fold.' },
      { title: 'Applet vs Application', keyDiff: 'Browser sandboxed without main() vs Standalone OS JVM runtime with main().' }
    ],
    codingQuestions: [
      {
        title: 'Full JDBC PreparedStatement CRUD Block',
        lang: 'java',
        snippet: `Class.forName("com.mysql.cj.jdbc.Driver");
try (Connection c = DriverManager.getConnection(URL, U, P);
     PreparedStatement ps = c.prepareStatement("SELECT * FROM s WHERE id=?")) {
    ps.setInt(1, id);
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) { ... }
    }
}`,
        trapToAvoid: 'Use try-with-resources for automatic closing of Connection, PreparedStatement, and ResultSet.'
      },
      {
        title: 'Python Multiprocessing with Queue IPC',
        lang: 'python',
        snippet: `if __name__ == '__main__':
    q = multiprocessing.Queue()
    p = multiprocessing.Process(target=worker, args=(q,))
    p.start(); p.join()
    res = q.get()`,
        trapToAvoid: 'Always protect top-level code with if __name__ == "__main__": on Windows platforms.'
      }
    ]
  }
};
