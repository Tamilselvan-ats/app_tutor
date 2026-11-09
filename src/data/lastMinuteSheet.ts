export interface LastMinuteSheetData {
  top50Definitions: { id: number; term: string; def: string; mnemonic: string }[];
  top50Questions: { id: number; q: string; a: string; marks: string }[];
  top30LongAnswers: { id: number; title: string; unit: string; blueprint: string; keyKeywords: string[] }[];
  top20Programs: { id: number; title: string; lang: string; code: string; notes: string }[];
  top20Differences: { id: number; title: string; keyPoint: string }[];
  topMemoryTricks: { id: number; topic: string; trick: string }[];
  mostImportantTopics: { id: number; name: string; probability: string; estimatedMarks: number; urgency: string }[];
}

export const LAST_MINUTE_SHEET_DATA: LastMinuteSheetData = {
  top50Definitions: [
    { id: 1, term: 'Thread', def: 'Smallest dispatchable unit of execution within a process sharing parent memory.', mnemonic: 'Workers in factory' },
    { id: 2, term: 'Process', def: 'Executing program instance with isolated virtual address space.', mnemonic: 'Separate factory building' },
    { id: 3, term: 'Runnable Interface', def: 'Functional interface with void run() decoupling task from thread execution.', mnemonic: 'Task job sheet' },
    { id: 4, term: 'Main Thread', def: 'Initial JVM thread spawned when program begins from which child threads branch.', mnemonic: 'Root of thread tree' },
    { id: 5, term: 'Thread Priority', def: 'Integer 1 to 10 guiding OS scheduler CPU allocation; default is 5.', mnemonic: 'VIP queue ranking' },
    { id: 6, term: 'Race Condition', def: 'Concurrent access bug where outcome depends unpredictably on execution timing.', mnemonic: 'Runners grabbing one baton' },
    { id: 7, term: 'Thread Synchronization', def: 'Enforcing mutual exclusion across threads accessing shared critical sections.', mnemonic: 'One room key at a time' },
    { id: 8, term: 'Daemon Thread', def: 'Low-priority service thread abruptly killed when all user threads finish.', mnemonic: 'Vanishing ghost helper' },
    { id: 9, term: 'Deadlock', def: 'State where two or more threads are permanently blocked, each holding what the other needs.', mnemonic: 'Traffic gridlock' },
    { id: 10, term: 'JDBC', def: 'Java Database Connectivity API bridging Java with relational database engines.', mnemonic: 'Universal SQL cable' },
    { id: 11, term: 'DriverManager', def: 'Central JDBC class matching connection URLs with loaded vendor database drivers.', mnemonic: 'Telephone switchboard' },
    { id: 12, term: 'Connection', def: 'Active communication session between Java application and specific DBMS.', mnemonic: 'Open call channel' },
    { id: 13, term: 'Statement', def: 'Static SQL query execution interface without precompilation; SQL injection prone.', mnemonic: 'Plain vulnerable postcard' },
    { id: 14, term: 'PreparedStatement', def: 'Precompiled SQL interface with ? placeholders immune to SQL injection.', mnemonic: 'Safe pre-stamped template' },
    { id: 15, term: 'CallableStatement', def: 'Interface used to execute database stored procedures and functions.', mnemonic: 'Stored procedure trigger' },
    { id: 16, term: 'ResultSet', def: 'Tabular database query output navigated row-by-row via cursor.', mnemonic: 'Spreadsheet cursor' },
    { id: 17, term: 'Applet', def: 'Small Java program executed inside a browser sandbox without main().', mnemonic: 'Browser walled garden' },
    { id: 18, term: 'AWT', def: 'Heavyweight Java GUI toolkit wrapping host operating system native peers.', mnemonic: 'Native OS clothes' },
    { id: 19, term: 'Swing', def: 'Lightweight pure Java GUI toolkit supporting Pluggable Look and Feel.', mnemonic: '100% Pure Java paint' },
    { id: 20, term: 'MVC Architecture', def: 'Architectural pattern decoupling Model (data), View (UI), and Controller (input).', mnemonic: 'Kitchen, Plate, Waiter' },
    { id: 21, term: 'Event Delegation Model', def: 'Event Source generates event object and delegates processing to Event Listener.', mnemonic: 'Alarm rings, Guard acts' },
    { id: 22, term: 'Pure Function', def: 'Function with deterministic output and zero observable side effects.', mnemonic: 'Mirror with zero smudges' },
    { id: 23, term: 'Referential Transparency', def: 'Property where an expression can be substituted with its evaluated value.', mnemonic: '$10 voucher = $10 bill' },
    { id: 24, term: 'Immutability', def: 'Inability to mutate object state post-instantiation; modifications yield new instances.', mnemonic: 'Carved in granite' },
    { id: 25, term: 'Higher-Order Function', def: 'Function taking functions as parameters or returning a function.', mnemonic: 'Machine building machines' },
    { id: 26, term: 'Lambda Expression', def: 'Anonymous inline function specifying arguments and body via arrow syntax.', mnemonic: 'Throwaway sticky note' },
    { id: 27, term: 'Closure', def: 'Function enclosing and retaining outer lexical environment variables.', mnemonic: 'Turtle carrying its shell' },
    { id: 28, term: 'Map', def: 'HOF applying 1-to-1 transformation to every item, preserving list length.', mnemonic: '1-to-1 assembly paint' },
    { id: 29, term: 'Filter', def: 'HOF selecting subset of elements satisfying a boolean predicate.', mnemonic: 'Coffee strainer' },
    { id: 30, term: 'Reduce', def: 'HOF combining collection into a single cumulative scalar via binary accumulator.', mnemonic: 'Cash register sum' },
    { id: 31, term: 'Logic Programming', def: 'Declarative paradigm where computation is deduction over facts and rules.', mnemonic: 'Courtroom detective' },
    { id: 32, term: 'Fact', def: 'Unconditional statement of truth in a logic knowledge base.', mnemonic: 'Passport identification' },
    { id: 33, term: 'Rule', def: 'Conditional deduction clause in format Head :- Body.', mnemonic: 'IF green light THEN cross' },
    { id: 34, term: 'Predicate', def: 'Logical relation taking terms and evaluating to true/false.', mnemonic: 'Relationship stamp' },
    { id: 35, term: 'Query', def: 'Goal submitted to logic inference engine to search for truth or variable bindings.', mnemonic: 'Detective inquiry' },
    { id: 36, term: 'Unification', def: 'Pattern matching algorithm finding variable substitutions making terms identical.', mnemonic: 'Key fitting lock' },
    { id: 37, term: 'Backtracking', def: 'Systematic depth-first rewind to previous choice point upon hitting a dead-end.', mnemonic: 'Maze retracing' },
    { id: 38, term: 'GIL', def: 'CPython mutex allowing only one native thread to run Python bytecode at a time.', mnemonic: 'Single microphone' },
    { id: 39, term: 'Lock (Mutex)', def: 'Binary synchronization primitive enforcing mutual exclusion for critical sections.', mnemonic: 'Single bathroom key' },
    { id: 40, term: 'RLock', def: 'Re-entrant lock allowing multiple nested acquires by the same owner thread.', mnemonic: 'Owner recursive key' },
    { id: 41, term: 'Semaphore', def: 'Counting synchronization primitive managing N resource permits via acquire/release.', mnemonic: 'Parking lot gates' },
    { id: 42, term: 'Producer-Consumer', def: 'Concurrency problem of coordinating producer and consumer on bounded buffer.', mnemonic: 'Chef & Diner counter' },
    { id: 43, term: 'Socket', def: 'Bidirectional endpoint abstraction for network communications (IP + Port).', mnemonic: 'Network wall plug' },
    { id: 44, term: 'ServerSocket', def: 'Java TCP listening socket binding to port and accepting client connections.', mnemonic: 'Front desk receptionist' },
    { id: 45, term: 'TCP', def: 'Connection-oriented, reliable byte-stream protocol with 3-way handshake.', mnemonic: 'Certified registered mail' },
    { id: 46, term: 'UDP', def: 'Connectionless, lightweight, unreliable datagram protocol with 8-byte header.', mnemonic: 'Megaphone shout' },
    { id: 47, term: 'DatagramSocket', def: 'Java UDP networking socket for sending/receiving independent packets.', mnemonic: 'Postbox slot' },
    { id: 48, term: 'DatagramPacket', def: 'Java container encapsulating packet bytes, length, destination IP, and port.', mnemonic: 'Sealed postal envelope' },
    { id: 49, term: 'Pluggable Look and Feel', def: 'Swing architecture allowing dynamic switching of visual GUI appearance.', mnemonic: 'Chameleon GUI skin' },
    { id: 50, term: 'Tail Recursion', def: 'Recursive call as the final expression in a function enabling stack frame reuse.', mnemonic: 'End-of-line relay pass' }
  ],

  top50Questions: [
    { id: 1, q: 'Why does calling start() spawn a new thread whereas calling run() does not?', a: 'start() allocates a new native OS call stack; run() merely executes synchronously on the caller stack.', marks: '2 Marks' },
    { id: 2, q: 'What are the two major advantages of PreparedStatement over Statement in JDBC?', a: 'Precompiled query plan caching in DBMS + 100% defense against SQL Injection.', marks: '2 Marks' },
    { id: 3, q: 'What is the return type and meaning of executeUpdate()?', a: 'Returns int representing the number of rows modified by INSERT, UPDATE, DELETE.', marks: '2 Marks' },
    { id: 4, q: 'Why is implementing Runnable preferred over extending Thread class?', a: 'Overcomes Java single inheritance restriction and decouples task from worker execution.', marks: '2 Marks' },
    { id: 5, q: 'Name the 5 Applet lifecycle callback methods in order.', a: 'init() -> start() -> paint(Graphics g) -> stop() -> destroy().', marks: '2 Marks' },
    { id: 6, q: 'Why are Swing components termed lightweight?', a: 'Written 100% in pure Java with no reliance on native OS GUI peer handles.', marks: '2 Marks' },
    { id: 7, q: 'Explain Referential Transparency with an example.', a: 'Replacing an expression with its evaluated value without altering program semantics (e.g. 2+2 replaced by 4).', marks: '2 Marks' },
    { id: 8, q: 'What is the difference between Map and Filter in functional programming?', a: 'Map transforms every element (N->N); Filter selects a subset based on a boolean predicate (N->M).', marks: '2 Marks' },
    { id: 9, q: 'What module provides reduce() in Python 3?', a: 'from functools import reduce.', marks: '2 Marks' },
    { id: 10, q: 'What is the Global Interpreter Lock (GIL) in CPython?', a: 'Mutex restricting Python bytecode execution to 1 thread at a time, limiting CPU-bound threads to 1 core.', marks: '2 Marks' },
    { id: 11, q: 'Distinguish between Lock and RLock in Python threading.', a: 'Lock deadlocks if acquired twice by the same thread; RLock is re-entrant and allows nested acquires.', marks: '2 Marks' },
    { id: 12, q: 'What are the three packets in a TCP connection handshake?', a: 'SYN, SYN-ACK, ACK.', marks: '2 Marks' },
    { id: 13, q: 'What is the fixed header size of a UDP datagram?', a: '8 bytes (Source Port, Dest Port, Length, Checksum).', marks: '2 Marks' },
    { id: 14, q: 'Where are wait() and notify() declared in Java?', a: 'java.lang.Object (because every object has an intrinsic monitor lock).', marks: '2 Marks' },
    { id: 15, q: 'What exception is thrown if wait() is called without synchronizing?', a: 'IllegalMonitorStateException.', marks: '2 Marks' },
    { id: 16, q: 'What is a Daemon Thread? Name one built-in example.', a: 'Low priority service thread that exits when user threads die. Example: Garbage Collector.', marks: '2 Marks' },
    { id: 17, q: 'What is a Horn clause in logic programming?', a: 'A clause with at most one positive literal, written as Head :- Body.', marks: '2 Marks' },
    { id: 18, q: 'Explain the role of the Controller in MVC.', a: 'Listens to user input events, updates Model data, and refreshes the View.', marks: '2 Marks' },
    { id: 19, q: 'What is the difference between TCP and UDP socket classes in Java?', a: 'TCP uses Socket/ServerSocket; UDP uses DatagramSocket/DatagramPacket.', marks: '2 Marks' },
    { id: 20, q: 'What does setAutoCommit(false) achieve in JDBC?', a: 'Enables manual transaction management so multiple queries can be committed or rolled back together.', marks: '2 Marks' },
    { id: 21, q: 'How does Multiprocessing bypass the Python GIL?', a: 'Spawns independent OS processes with separate memory spaces and individual Python interpreters.', marks: '5 Marks' },
    { id: 22, q: 'Explain Java Thread Priority constants.', a: 'MIN_PRIORITY (1), NORM_PRIORITY (5), MAX_PRIORITY (10).', marks: '2 Marks' },
    { id: 23, q: 'What is Unification in Prolog?', a: 'Pattern matching algorithm finding variable bindings that make two terms structurally identical.', marks: '5 Marks' },
    { id: 24, q: 'What is Backtracking in Prolog?', a: 'Depth-first search mechanism that rewinds to the last choice point when a sub-goal fails.', marks: '5 Marks' },
    { id: 25, q: 'Explain the 3 components of Event Delegation.', a: 'Event Source (button), Event Object (ActionEvent), Event Listener (ActionListener).', marks: '5 Marks' },
    { id: 26, q: 'What is a Closure in functional programming?', a: 'A function that remembers variables from its enclosing outer lexical scope even after that scope exits.', marks: '5 Marks' },
    { id: 27, q: 'Compare Type 1 vs Type 4 JDBC Drivers.', a: 'Type 1 is JDBC-ODBC Bridge (obsolete/native); Type 4 is pure Java Thin Driver converting to DB protocol directly.', marks: '5 Marks' },
    { id: 28, q: 'How does Semaphore control access to limited resources?', a: 'Maintains N permits; acquire() decrements and blocks on 0; release() increments and wakes threads.', marks: '5 Marks' },
    { id: 29, q: 'What are the parameters of DatagramPacket for sending vs receiving?', a: 'Receiving: (buf, len). Sending: (buf, len, inetAddress, port).', marks: '5 Marks' },
    { id: 30, q: 'Explain Producer-Consumer using wait() and notify().', a: 'Producer waits if buffer full; Consumer waits if buffer empty. Both notify() after modifying buffer.', marks: '8 Marks' }
  ],

  top30LongAnswers: [
    {
      id: 1,
      title: 'Java Thread Lifecycle & State Transitions',
      unit: 'Unit 3',
      blueprint: '1. Definition of thread. 2. 5 States: NEW, RUNNABLE, BLOCKED, WAITING/TIMED_WAITING, TERMINATED. 3. Transition triggers (start, sleep, wait, notify, run exit). 4. Neat ASCII/diagram. 5. Code sample with join() and sleep().',
      keyKeywords: ['NEW', 'RUNNABLE', 'BLOCKED', 'WAITING', 'TERMINATED', 'start() vs run()', 'Monitor Lock']
    },
    {
      id: 2,
      title: 'Complete JDBC Architecture & 5 Steps CRUD',
      unit: 'Unit 3',
      blueprint: '1. 2-tier JDBC architecture. 2. Driver types 1-4. 3. 5 Sacred Steps (Class.forName, getConnection, prepareStatement, execute, close). 4. Code for INSERT and SELECT using PreparedStatement. 5. Exception handling with try-catch-finally.',
      keyKeywords: ['DriverManager', 'Connection', 'PreparedStatement', 'ResultSet', 'SQL Injection', 'close() reverse order']
    },
    {
      id: 3,
      title: 'TCP vs UDP Protocols & Multi-threaded TCP Echo Server',
      unit: 'Unit 4',
      blueprint: '1. Exhaustive 6-point comparison table (Connection, Reliability, Headers, Flow Control, Java classes). 2. Single-threaded server limitation. 3. Multi-threaded ServerSocket with ClientHandler Runnable. 4. Complete client and server code with BufferedReader/PrintWriter.',
      keyKeywords: ['3-Way Handshake', 'ServerSocket.accept()', 'ClientHandler Runnable', 'Reliable stream vs Datagram', 'Port 9090']
    },
    {
      id: 4,
      title: 'Functional Programming: Map, Filter, Reduce & Pure Functions',
      unit: 'Unit 4',
      blueprint: '1. Functional principles: Immutability, Referential Transparency, Zero side effects. 2. Definitions and signatures of map, filter, reduce. 3. Code examples in Python & Java Streams. 4. Visual table comparing input size, output size, and function types.',
      keyKeywords: ['Unary transform', 'Predicate filter', 'Binary accumulator', 'functools.reduce', 'Immutability']
    },
    {
      id: 5,
      title: 'Lock vs RLock vs Semaphore & Producer Consumer Problem',
      unit: 'Unit 4',
      blueprint: '1. Primitives comparison table (State, Re-entrancy, Ownership, Use case). 2. Problem description of bounded buffer. 3. Solution using Semaphores (mutex=1, empty=N, full=0). 4. Code implementation with synchronization.',
      keyKeywords: ['Binary Mutex', 'Re-entrant lock', 'Counting Semaphore', 'Bounded Buffer', 'Deadlock prevention']
    },
    {
      id: 6,
      title: 'MVC Architectural Pattern in GUI Applications',
      unit: 'Unit 3',
      blueprint: '1. MVC definition and rationale. 2. Detailed explanation of Model, View, and Controller roles. 3. Triangular architecture diagram. 4. Java Swing code implementation demonstrating separation of concerns.',
      keyKeywords: ['Model (State)', 'View (UI)', 'Controller (Events)', 'Separation of concerns', 'Event Delegation']
    }
  ],

  top20Programs: [
    { id: 1, title: 'Java Thread extending Thread Class', lang: 'java', code: `class MyThread extends Thread { public void run() { System.out.println("Running: " + getName()); } }\nMyThread t = new MyThread(); t.start();`, notes: 'Always call start(), not run().' },
    { id: 2, title: 'Java Thread implementing Runnable & Lambda', lang: 'java', code: `new Thread(() -> System.out.println("Lambda thread: " + Thread.currentThread().getName())).start();`, notes: 'Decouples task from thread worker.' },
    { id: 3, title: 'JDBC PreparedStatement INSERT', lang: 'java', code: `PreparedStatement ps = conn.prepareStatement("INSERT INTO students VALUES (?, ?)"); ps.setInt(1, 101); ps.setString(2, "Titan"); ps.executeUpdate();`, notes: 'Prevents SQL injection.' },
    { id: 4, title: 'JDBC ResultSet SELECT Query Loop', lang: 'java', code: `ResultSet rs = stmt.executeQuery("SELECT * FROM students");\nwhile(rs.next()) { System.out.println(rs.getInt(1) + " " + rs.getString(2)); }`, notes: 'Cursor advances with rs.next().' },
    { id: 5, title: 'JDBC Transaction Commit and Rollback', lang: 'java', code: `conn.setAutoCommit(false);\ntry { ps1.executeUpdate(); ps2.executeUpdate(); conn.commit(); } catch(Exception e) { conn.rollback(); }`, notes: 'Guarantees ACID atomicity.' },
    { id: 6, title: 'TCP Server Socket Accept Loop', lang: 'java', code: `ServerSocket ss = new ServerSocket(9090);\nSocket s = ss.accept();\nPrintWriter out = new PrintWriter(s.getOutputStream(), true);\nout.println("Welcome CT Titan");`, notes: 'Blocks until client connects.' },
    { id: 7, title: 'TCP Client Socket Connection', lang: 'java', code: `Socket s = new Socket("localhost", 9090);\nBufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));\nSystem.out.println(in.readLine());`, notes: 'Performs 3-way handshake.' },
    { id: 8, title: 'UDP Datagram Receiver', lang: 'java', code: `DatagramSocket ds = new DatagramSocket(9876);\nbyte[] b = new byte[1024];\nDatagramPacket p = new DatagramPacket(b, b.length);\nds.receive(p);`, notes: 'Connectionless packet reception.' },
    { id: 9, title: 'UDP Datagram Sender', lang: 'java', code: `DatagramSocket ds = new DatagramSocket();\nbyte[] b = "Ping".getBytes();\nDatagramPacket p = new DatagramPacket(b, b.length, InetAddress.getByName("localhost"), 9876);\nds.send(p);`, notes: 'Includes target IP and port in packet.' },
    { id: 10, title: 'Python Map Operation', lang: 'python', code: `squares = list(map(lambda x: x**2, [1, 2, 3, 4, 5]))\nprint(squares) # [1, 4, 9, 16, 25]`, notes: 'Preserves collection length.' },
    { id: 11, title: 'Python Filter Operation', lang: 'python', code: `evens = list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4, 5, 6]))\nprint(evens) # [2, 4, 6]`, notes: 'Boolean predicate filtering.' },
    { id: 12, title: 'Python Reduce Operation', lang: 'python', code: `from functools import reduce\ntotal = reduce(lambda acc, x: acc + x, [1, 2, 3, 4], 0)\nprint(total) # 10`, notes: 'Cumulative binary fold.' },
    { id: 13, title: 'Python Threading with Lock Context Manager', lang: 'python', code: `lock = threading.Lock()\nwith lock:\n    shared_counter += 1`, notes: 'Context manager auto-releases lock.' },
    { id: 14, title: 'Python Multiprocessing with Process & Queue', lang: 'python', code: `q = multiprocessing.Queue()\np = multiprocessing.Process(target=worker, args=(q,))\np.start(); p.join()`, notes: 'Bypasses CPython GIL.' }
  ],

  top20Differences: [
    { id: 1, title: 'Thread vs Process', keyPoint: 'Shared memory & lightweight vs Isolated address space & heavyweight.' },
    { id: 2, title: 'Runnable vs Thread', keyPoint: 'Implements interface (preserves inheritance) vs Extends class (blocks inheritance).' },
    { id: 3, title: 'Statement vs PreparedStatement', keyPoint: 'Static query parsed every time vs Precompiled plan cached in DB with ? placeholders.' },
    { id: 4, title: 'TCP vs UDP', keyPoint: 'Connection-oriented (3-way handshake, reliable stream) vs Connectionless (unreliable datagrams).' },
    { id: 5, title: 'Applet vs Application', keyPoint: 'Browser sandboxed without main() vs Standalone OS JVM execution with main().' },
    { id: 6, title: 'AWT vs Swing', keyPoint: 'Heavyweight native OS peers vs Lightweight 100% pure Java with Pluggable Look & Feel.' },
    { id: 7, title: 'Lock vs RLock', keyPoint: 'Single lock deadlocks on recursive acquire vs Re-entrant lock tracks recursion count.' },
    { id: 8, title: 'Lock vs Semaphore', keyPoint: 'Binary mutual exclusion (1 thread) vs Counting permits for N concurrent resources.' },
    { id: 9, title: 'Shared Memory vs Message Passing', keyPoint: 'Hardware memory bus speeds with locks vs OS kernel mediated message queues.' },
    { id: 10, title: 'Functional vs Procedural', keyPoint: 'Declarative pure functions with immutability vs Imperative step sequences with mutable state.' },
    { id: 11, title: 'Functional vs OOP', keyPoint: 'Separated data and pure transformations vs Encapsulated objects with mutable internal state.' },
    { id: 12, title: 'Map vs Filter vs Reduce', keyPoint: '1:1 transform (N->N) vs Boolean selection (N->M) vs Cumulative fold (N->1 scalar).' }
  ],

  topMemoryTricks: [
    { id: 1, topic: 'Thread vs Process', trick: 'Factory Building (Process) vs Workers inside sharing tools (Threads).' },
    { id: 2, topic: 'JDBC 5 Steps', trick: 'Drivers Can Speak Every Code: Driver -> Connection -> Statement -> Execute -> Close.' },
    { id: 3, topic: 'Applet Lifecycle', trick: 'I Start Painting Some Day: Init -> Start -> Paint -> Stop -> Destroy.' },
    { id: 4, topic: 'TCP vs UDP', trick: 'TCP = Registered Certified Mail with signature; UDP = Shouted message in a stadium.' },
    { id: 5, topic: 'PreparedStatement', trick: 'Safe Cookie Cutter: Shape is pre-cut, only dough (data) goes into slots.' },
    { id: 6, topic: 'MVC Pattern', trick: 'Restaurant: Kitchen (Model) + Plated Dish (View) + Waiter (Controller).' },
    { id: 7, topic: 'Lock vs Semaphore', trick: 'Lock = Single bathroom key; Semaphore = Parking garage with 10 vacant spots.' },
    { id: 8, topic: 'Map, Filter, Reduce', trick: 'Map paints every brick; Filter picks undamaged bricks; Reduce weighs the total pile.' }
  ],

  mostImportantTopics: [
    { id: 1, name: 'JDBC Full CRUD & PreparedStatement', probability: '98%', estimatedMarks: 13, urgency: 'MANDATORY TONIGHT' },
    { id: 2, name: 'TCP vs UDP & Multi-threaded Socket Server', probability: '96%', estimatedMarks: 13, urgency: 'MANDATORY TONIGHT' },
    { id: 3, name: 'Java Thread Lifecycle & Synchronization', probability: '94%', estimatedMarks: 8, urgency: 'HIGH YIELD' },
    { id: 4, name: 'Higher Order Functions: Map, Filter, Reduce', probability: '92%', estimatedMarks: 8, urgency: 'HIGH YIELD' },
    { id: 5, name: 'Lock vs RLock vs Semaphore & Producer-Consumer', probability: '89%', estimatedMarks: 8, urgency: 'HIGH YIELD' },
    { id: 6, name: 'Swing MVC Architecture & Event Delegation', probability: '85%', estimatedMarks: 8, urgency: 'RECOMMENDED' }
  ]
};
