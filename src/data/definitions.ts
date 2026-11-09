export interface DefinitionItem {
  id: string;
  topic: string;
  unit: 'Unit 3' | 'Unit 4';
  category: string;
  definition: string;
  simpleExplanation: string;
  memoryTrick: string;
  examKeywords: string[];
}

export const DEFINITIONS_DATA: DefinitionItem[] = [
  // --- UNIT 3 DEFINITIONS ---
  {
    id: 'def-thread',
    topic: 'Thread',
    unit: 'Unit 3',
    category: 'Multithreading',
    definition: 'The smallest unit of execution within a process that can be scheduled concurrently by the operating system, sharing the parent process address space and resources.',
    simpleExplanation: 'A mini sub-program running inside a main program doing work simultaneously.',
    memoryTrick: 'Many workers inside one factory = Threads inside a Process.',
    examKeywords: ['Smallest unit of execution', 'Lightweight subprocess', 'Shared address space', 'Independent execution path']
  },
  {
    id: 'def-process',
    topic: 'Process',
    unit: 'Unit 3',
    category: 'Multithreading',
    definition: 'An executing instance of a program residing in its own dedicated, isolated memory address space with allocated system resources.',
    simpleExplanation: 'A full running application like Chrome or VLC with its own private memory boundaries.',
    memoryTrick: 'Each separate factory building in the industrial estate is an isolated Process.',
    examKeywords: ['Independent program', 'Isolated address space', 'Heavyweight', 'Protected memory']
  },
  {
    id: 'def-runnable',
    topic: 'Runnable Interface',
    unit: 'Unit 3',
    category: 'Multithreading',
    definition: 'A functional interface in java.lang containing a single abstract method void run(), designed to decouple thread execution logic from thread object management.',
    simpleExplanation: 'A job description for a thread that lets your class still inherit from another class.',
    memoryTrick: 'Runnable = The Job Sheet; Thread = The Worker who performs it.',
    examKeywords: ['Functional interface', 'run() method', 'Decoupling task from thread', 'Overcomes single inheritance']
  },
  {
    id: 'def-main-thread',
    topic: 'Main Thread',
    unit: 'Unit 3',
    category: 'Multithreading',
    definition: 'The initial thread created automatically by the JVM when a Java program starts, from which all other child threads are spawned and managed.',
    simpleExplanation: 'The boss thread that kicks off the program and starts the main() method.',
    memoryTrick: 'Main Thread is the Root of the family tree; all child threads branch out from it.',
    examKeywords: ['Initial execution thread', 'Spawns child threads', 'Thread.currentThread()', 'Last to finish execution']
  },
  {
    id: 'def-thread-priority',
    topic: 'Thread Priority',
    unit: 'Unit 3',
    category: 'Multithreading',
    definition: 'An integer value between 1 (MIN_PRIORITY) and 10 (MAX_PRIORITY), defaulting to 5 (NORM_PRIORITY), used as a hint to the JVM thread scheduler for CPU allocation.',
    simpleExplanation: 'A VIP ranking telling the scheduler which thread should get CPU attention first.',
    memoryTrick: '1 = Economy Class, 5 = Standard, 10 = VIP First Class Ticket.',
    examKeywords: ['MIN_PRIORITY (1)', 'NORM_PRIORITY (5)', 'MAX_PRIORITY (10)', 'Preemptive scheduling hint']
  },
  {
    id: 'def-race-condition',
    topic: 'Race Condition',
    unit: 'Unit 3',
    category: 'Multithreading',
    definition: 'A concurrency flaw where two or more threads access shared data simultaneously, and the final outcome depends unpredictably on the exact order and timing of thread execution.',
    simpleExplanation: 'Two people trying to withdraw the last $50 from the same ATM at the exact same millisecond.',
    memoryTrick: 'Two runners grabbing one baton at the same second = Collision & Chaos.',
    examKeywords: ['Shared mutable state', 'Non-atomic operations', 'Interleaved execution', 'Unpredictable outcome']
  },
  {
    id: 'def-synchronization',
    topic: 'Thread Synchronization',
    unit: 'Unit 3',
    category: 'Multithreading',
    definition: 'The capability to control the access of multiple threads to shared resources using monitors/locks, guaranteeing mutual exclusion in critical sections.',
    simpleExplanation: 'Putting a lock on the single bathroom door so only one person can use it at a time.',
    memoryTrick: 'Synchronized = One key for the room; hand it over when exiting.',
    examKeywords: ['Mutual exclusion', 'Intrinsic lock / Monitor', 'Critical section', 'Atomicity']
  },
  {
    id: 'def-daemon-thread',
    topic: 'Daemon Thread',
    unit: 'Unit 3',
    category: 'Multithreading',
    definition: 'A low-priority service provider thread that runs in the background (such as Garbage Collection) and is abruptly terminated by the JVM when all user threads finish.',
    simpleExplanation: 'A janitor cleaning in the background who gets kicked out the moment the building closes.',
    memoryTrick: 'Daemon = Ghost Assistant; vanishes instantly when the real humans leave.',
    examKeywords: ['Background service provider', 'setDaemon(true)', 'Terminated automatically by JVM', 'Garbage collector']
  },
  {
    id: 'def-jdbc',
    topic: 'JDBC',
    unit: 'Unit 3',
    category: 'Database Connectivity',
    definition: 'Java Database Connectivity: An industry-standard Java API that provides database-independent connectivity between Java applications and diverse relational DBMS.',
    simpleExplanation: 'The universal translator and bridge that connects Java code to SQL databases.',
    memoryTrick: 'JDBC = Universal USB cable connecting Java Laptop to SQL Hard-drive.',
    examKeywords: ['Cross-platform API', 'Relational database bridge', 'java.sql package', 'Driver-based abstraction']
  },
  {
    id: 'def-drivermanager',
    topic: 'DriverManager',
    unit: 'Unit 3',
    category: 'Database Connectivity',
    definition: 'The central backbone class in JDBC that maintains a registry of loaded database drivers and establishes database connections via getConnection() using database URLs.',
    simpleExplanation: 'The phone operator who dials the exact database number and patches you through.',
    memoryTrick: 'DriverManager = Matchmaker between your Java app and the database URL.',
    examKeywords: ['Central registry', 'getConnection()', 'JDBC URL parsing', 'Driver delegation']
  },
  {
    id: 'def-connection',
    topic: 'Connection',
    unit: 'Unit 3',
    category: 'Database Connectivity',
    definition: 'A session interface between a Java application and a specific database, used to manage transactions, auto-commit modes, and create SQL statement objects.',
    simpleExplanation: 'The open phone call channel through which SQL commands are sent back and forth.',
    memoryTrick: 'Connection = The open telephone line; Statement = The message spoken into it.',
    examKeywords: ['Active session', 'Transaction control', 'setAutoCommit()', 'createStatement() factory']
  },
  {
    id: 'def-statement',
    topic: 'Statement',
    unit: 'Unit 3',
    category: 'Database Connectivity',
    definition: 'An interface representing a static SQL statement sent to the database without precompilation, vulnerable to SQL injection attacks.',
    simpleExplanation: 'A basic megaphone that sends raw SQL text directly to the database each time.',
    memoryTrick: 'Statement = Plain Postcard; vulnerable to tampering and parsed from scratch every time.',
    examKeywords: ['Static SQL', 'No precompilation', 'executeQuery()', 'Vulnerable to SQL injection']
  },
  {
    id: 'def-preparedstatement',
    topic: 'PreparedStatement',
    unit: 'Unit 3',
    category: 'Database Connectivity',
    definition: 'A precompiled SQL statement interface that caches execution plans in the database, accepts dynamic placeholders (?), and completely neutralizes SQL injection.',
    simpleExplanation: 'A pre-cooked recipe template where you just plug in the variable ingredients safely.',
    memoryTrick: 'PreparedStatement = Safe Template with Slots; stops hackers from injecting poison.',
    examKeywords: ['Precompiled SQL', 'Placeholder (?)', 'SQL Injection immunity', 'Performance caching']
  },
  {
    id: 'def-callablestatement',
    topic: 'CallableStatement',
    unit: 'Unit 3',
    category: 'Database Connectivity',
    definition: 'A sub-interface of PreparedStatement designed specifically to invoke database stored procedures and functions with IN, OUT, and INOUT parameters.',
    simpleExplanation: 'A remote control that triggers pre-packaged programs stored directly inside MySQL/Oracle.',
    memoryTrick: 'CallableStatement = Speed-dial button for stored procedures inside the database.',
    examKeywords: ['Stored procedures', '{call procedure_name(?,?)}', 'registerOutParameter()', 'IN/OUT parameters']
  },
  {
    id: 'def-resultset',
    topic: 'ResultSet',
    unit: 'Unit 3',
    category: 'Database Connectivity',
    definition: 'A tabular data structure representing the result of an executed SQL query, traversed row-by-row using an internal cursor initialized before the first row.',
    simpleExplanation: 'A virtual spreadsheet grid where a cursor reads one row at a time using next().',
    memoryTrick: 'ResultSet = Spreadsheet cursor; next() moves to the next row, getX() reads the column.',
    examKeywords: ['Tabular query output', 'Internal cursor', 'rs.next()', 'Type-forward-only vs Scrollable']
  },
  {
    id: 'def-applet',
    topic: 'Applet',
    unit: 'Unit 3',
    category: 'GUI Programming',
    definition: 'A small Java program designed to be embedded within an HTML web page and executed securely inside the sandboxed environment of a Java-enabled web browser.',
    simpleExplanation: 'An interactive mini-game or widget that used to run directly inside browser web pages.',
    memoryTrick: 'Applet = A miniature walled-garden app locked safely inside browser boundaries.',
    examKeywords: ['Embedded in HTML', 'Sandboxed security', 'No main() method', 'Lifecycle managed by browser']
  },
  {
    id: 'def-awt',
    topic: 'AWT (Abstract Window Toolkit)',
    unit: 'Unit 3',
    category: 'GUI Programming',
    definition: 'Java’s original GUI toolkit utilizing heavyweight components directly tied to host operating system native GUI peers, resulting in platform-dependent appearance.',
    simpleExplanation: 'Old-school Java buttons that borrow the actual Windows or Mac native button styles.',
    memoryTrick: 'AWT = Heavyweight Native: Borrows OS clothes so looks different on every machine.',
    examKeywords: ['Heavyweight components', 'Native OS peers', 'java.awt package', 'Platform-dependent rendering']
  },
  {
    id: 'def-swing',
    topic: 'Swing',
    unit: 'Unit 3',
    category: 'GUI Programming',
    definition: 'An advanced, lightweight Java GUI toolkit built entirely on top of AWT in pure Java (javax.swing), offering platform-independent rendering and Pluggable Look and Feel (PLAF).',
    simpleExplanation: 'Modern Java UI components painted pixel-by-pixel in pure Java, looking uniform everywhere.',
    memoryTrick: 'Swing = Lightweight Artist: Paints its own buttons without asking the OS for help.',
    examKeywords: ['Lightweight components', '100% Pure Java', 'Pluggable Look & Feel', 'JComponent base']
  },
  {
    id: 'def-mvc',
    topic: 'MVC Architecture',
    unit: 'Unit 3',
    category: 'Design Patterns',
    definition: 'A software design pattern separating an application into Model (data & business logic), View (user interface presentation), and Controller (input processing & coordination).',
    simpleExplanation: 'Dividing code so data math, screen drawings, and button clicks live in separate files.',
    memoryTrick: 'Kitchen (Model) + Plated Food (View) + Waiter (Controller) = Restaurant (MVC).',
    examKeywords: ['Model (Data/State)', 'View (Display/UI)', 'Controller (Input/Orchestration)', 'Separation of concerns']
  },
  {
    id: 'def-event-delegation',
    topic: 'Event Delegation Model',
    unit: 'Unit 3',
    category: 'GUI Programming',
    definition: 'An event handling architecture where an Event Source generates an event and delegates its processing to one or more registered Event Listener objects.',
    simpleExplanation: 'A button doesn’t do the work itself; it yells "I was clicked!" and delegates to a listener.',
    memoryTrick: 'Alarm Button (Source) rings -> Firefighter (Listener) rushes to respond.',
    examKeywords: ['Event Source', 'Event Object', 'Event Listener', 'addActionListener()']
  },

  // --- UNIT 4 DEFINITIONS ---
  {
    id: 'def-functional-programming',
    topic: 'Functional Programming',
    unit: 'Unit 4',
    category: 'Functional Programming',
    definition: 'A declarative programming paradigm where computation is treated as the evaluation of mathematical functions, avoiding changing state and mutable data.',
    simpleExplanation: 'Writing code like pure algebra equations where inputs produce outputs with zero side-effects.',
    memoryTrick: 'Math Formulas on a blackboard: 2+2 is always 4, nothing in the room changes.',
    examKeywords: ['Declarative paradigm', 'Mathematical functions', 'Immutable state', 'Absence of side effects']
  },
  {
    id: 'def-pure-function',
    topic: 'Pure Function',
    unit: 'Unit 4',
    category: 'Functional Programming',
    definition: 'A function that consistently returns the identical output for identical inputs and produces zero observable side-effects (no file I/O, no global mutation).',
    simpleExplanation: 'A calculator button: 5 + 3 will always give 8 and never alter anything else in your computer.',
    memoryTrick: 'Pure Function = Pure Mirror: Same face in = Same reflection out, no makeup smudges.',
    examKeywords: ['Deterministic output', 'No side-effects', 'Idempotent', 'Cacheable (memoization)']
  },
  {
    id: 'def-referential-transparency',
    topic: 'Referential Transparency',
    unit: 'Unit 4',
    category: 'Functional Programming',
    definition: 'A property of expressions in functional programming where an expression can be directly replaced by its evaluated value without altering the program’s behavior.',
    simpleExplanation: 'If square(4) is 16, replacing square(4) with 16 anywhere in code changes nothing.',
    memoryTrick: 'Like replacing a $10 voucher with a crisp $10 bill: identical purchasing power.',
    examKeywords: ['Expression substitution', 'Deterministic equivalence', 'No side effects', 'Compiler optimization']
  },
  {
    id: 'def-immutability',
    topic: 'Immutability',
    unit: 'Unit 4',
    category: 'Functional Programming',
    definition: 'The principle that once an object or data structure is instantiated in memory, its state cannot be modified; modifications yield a brand new instance.',
    simpleExplanation: 'A permanent stone carving: to change a word, you carve a new stone tablet.',
    memoryTrick: 'Carved in Stone: Never overwrite; always create a fresh copy.',
    examKeywords: ['Unchangeable state', 'Thread-safe by default', 'Persistent data structures', 'Defensive copying']
  },
  {
    id: 'def-higher-order-function',
    topic: 'Higher Order Function (HOF)',
    unit: 'Unit 4',
    category: 'Functional Programming',
    definition: 'A function that takes one or more functions as arguments, or returns a function as its result (e.g., map, filter, reduce).',
    simpleExplanation: 'A master machine that accepts other mini-machines as attachments or builds new machines.',
    memoryTrick: 'A Blender that takes recipe attachments or prints out a new recipe.',
    examKeywords: ['Accepts function as argument', 'Returns function as result', 'First-class citizens', 'map/filter/reduce']
  },
  {
    id: 'def-lambda',
    topic: 'Lambda Expression',
    unit: 'Unit 4',
    category: 'Functional Programming',
    definition: 'An anonymous, inline function definition without an identifier name, specifying input parameters and an execution body concisely using arrow syntax (-> or :).',
    simpleExplanation: 'A quick, throwaway one-liner function without writing a full formal method declaration.',
    memoryTrick: 'Lambda = Sticky note function; write it on the fly, paste it in, throw away.',
    examKeywords: ['Anonymous function', 'Concise syntax', 'Arrow notation (->)', 'Functional interface target']
  },
  {
    id: 'def-closure',
    topic: 'Closure',
    unit: 'Unit 4',
    category: 'Functional Programming',
    definition: 'A function bundled together with references to its surrounding lexical environment, allowing it to remember and access variables from its outer enclosing scope even after outer execution ends.',
    simpleExplanation: 'A function with a backpack that carries variables from the room where it was born.',
    memoryTrick: 'A turtle function carrying its outer lexical shell wherever it crawls.',
    examKeywords: ['Lexical scoping', 'Enclosing scope retention', 'Free variables', 'Persistent outer environment']
  },
  {
    id: 'def-map',
    topic: 'Map Operation',
    unit: 'Unit 4',
    category: 'Functional Programming',
    definition: 'A higher-order function that applies a given transformation function to each element of a collection, returning a new collection of identical size with transformed items.',
    simpleExplanation: 'Passes every item through a converter: [1, 2, 3] becomes [2, 4, 6].',
    memoryTrick: 'Map = 1-to-1 Factory Assembly Line: Every raw box gets painted blue.',
    examKeywords: ['1-to-1 transformation', 'Preserves collection size', 'Pure projection', 'Lazy stream evaluation']
  },
  {
    id: 'def-filter',
    topic: 'Filter Operation',
    unit: 'Unit 4',
    category: 'Functional Programming',
    definition: 'A higher-order function that evaluates a boolean predicate against each element in a collection, returning a new collection containing only elements satisfying the predicate.',
    simpleExplanation: 'A security bouncer checking IDs and letting only people who qualify pass through.',
    memoryTrick: 'Filter = Coffee Strainer: Traps the grounds, lets only the clean liquid through.',
    examKeywords: ['Boolean predicate', 'Subset selection', 'Discards false elements', 'Idempotent extraction']
  },
  {
    id: 'def-reduce',
    topic: 'Reduce / Fold Operation',
    unit: 'Unit 4',
    category: 'Functional Programming',
    definition: 'A higher-order function that combines all elements of a collection into a single cumulative scalar result by iteratively applying an associative binary accumulator function.',
    simpleExplanation: 'Rolling a snowball down a hill: aggregates all snow into one giant final ball.',
    memoryTrick: 'Reduce = The Cash Register: Scans 20 groceries and rings up ONE total receipt amount.',
    examKeywords: ['Binary accumulator', 'Collection to scalar fold', 'Initial seed value', 'Associative operation']
  },
  {
    id: 'def-logic-programming',
    topic: 'Logic Programming',
    unit: 'Unit 4',
    category: 'Logic Programming',
    definition: 'A declarative programming paradigm based on formal mathematical logic (Predicate Calculus), where programs express facts and rules, and an inference engine searches for solutions.',
    simpleExplanation: 'You state the facts and rules of the universe; the computer finds the truth for you.',
    memoryTrick: 'Detective Courtroom: You present clues (facts & rules); the judge solves the mystery.',
    examKeywords: ['Declarative', 'First-order predicate calculus', 'Inference engine', 'Goal-driven reasoning']
  },
  {
    id: 'def-fact',
    topic: 'Fact (Logic Programming)',
    unit: 'Unit 4',
    category: 'Logic Programming',
    definition: 'An unconditional assertion of truth regarding entities and their relationships in a logic knowledge base, holding true unconditionally (e.g., father(john, mary).).',
    simpleExplanation: 'A solid truth statement that is unconditionally true in the knowledge database.',
    memoryTrick: 'Fact = A passport photo: it states who you are with zero conditions.',
    examKeywords: ['Unconditional truth', 'Ground atomic formula', 'Predicate assertion', 'Knowledge base entry']
  },
  {
    id: 'def-rule',
    topic: 'Rule (Logic Programming)',
    unit: 'Unit 4',
    category: 'Logic Programming',
    definition: 'A conditional logical relationship expressed as a Horn clause (Head :- Body), asserting that the Head conclusion is true if all conditions in the Body evaluate to true.',
    simpleExplanation: 'An "IF this AND that, THEN this" recipe for deducing new facts.',
    memoryTrick: 'Rule = IF all traffic lights are Green, THEN you may Cross the street.',
    examKeywords: ['Horn clause', 'Head :- Body', 'Conditional deduction', 'Conjunctive conditions']
  },
  {
    id: 'def-predicate',
    topic: 'Predicate',
    unit: 'Unit 4',
    category: 'Logic Programming',
    definition: 'A logical symbol or relationship name taking arguments that evaluates to either true or false based on the defined knowledge base (e.g., is_mortal(Socrates)).',
    simpleExplanation: 'A relationship label that asks: "Does this relationship hold true for these items?"',
    memoryTrick: 'Predicate = A true/false label stamped on a pair of objects.',
    examKeywords: ['Relation name', 'Arity (parameter count)', 'Boolean evaluation', 'Symbolic reasoning']
  },
  {
    id: 'def-query',
    topic: 'Query / Goal',
    unit: 'Unit 4',
    category: 'Logic Programming',
    definition: 'A question posed to the logic inference engine asking whether a specific statement holds true, or seeking variable values that satisfy the knowledge base conditions.',
    simpleExplanation: 'A search question asked to the computer like "Who is John’s child?".',
    memoryTrick: 'Query = The Detective asking: "Who was at the scene of the crime?"',
    examKeywords: ['Goal satisfaction', 'Variable binding', 'Yes/No validation', 'Search trigger']
  },
  {
    id: 'def-unification',
    topic: 'Unification',
    unit: 'Unit 4',
    category: 'Logic Programming',
    definition: 'An algorithmic process in logic programming of finding a Most General Unifier (MGU) — a set of variable substitutions that makes two logical terms structurally identical.',
    simpleExplanation: 'Pattern matching puzzle: figuring out what variables must equal so both sides match.',
    memoryTrick: 'Unification = Key fitting into a lock: shapes must match perfectly to turn.',
    examKeywords: ['Pattern matching algorithm', 'Variable substitution', 'Most General Unifier (MGU)', 'Term resolution']
  },
  {
    id: 'def-backtracking',
    topic: 'Backtracking',
    unit: 'Unit 4',
    category: 'Logic Programming',
    definition: 'A systematic search strategy where the inference engine, upon hitting a dead-end during goal resolution, retreats to the most recent choice point to explore alternative paths.',
    simpleExplanation: 'Walking through a maze: when you hit a wall, you step back to the last fork and try the other way.',
    memoryTrick: 'Backtracking = Maze navigation: Hit a dead end? Rewind to the fork and turn right.',
    examKeywords: ['Depth-first search', 'Choice points', 'Alternative hypothesis testing', 'Automatic rewind']
  },
  {
    id: 'def-gil',
    topic: 'GIL (Global Interpreter Lock)',
    unit: 'Unit 4',
    category: 'Parallel Systems',
    definition: 'A mutex mechanism in CPython preventing multiple native threads from executing Python bytecode simultaneously, restricting pure CPU-bound Python threads to a single core.',
    simpleExplanation: 'A single microphone in a room: even if 8 people want to speak, only one can talk into it at a time.',
    memoryTrick: 'GIL = One Baton in Python: Only the thread holding the baton can run Python bytecode.',
    examKeywords: ['CPython restriction', 'Mutex lock', 'Single-core CPU limitation', 'Bypassed by Multiprocessing']
  },
  {
    id: 'def-lock',
    topic: 'Lock (Mutex)',
    unit: 'Unit 4',
    category: 'Parallel Systems',
    definition: 'A basic synchronization primitive with two states (locked, unlocked); a thread acquiring it blocks all other threads until the holding thread explicitly releases it.',
    simpleExplanation: 'A single latch on a door: whoever enters locks it, and everyone else waits outside.',
    memoryTrick: 'Single Bathroom Key: Once taken, everyone waits in line outside.',
    examKeywords: ['Mutual exclusion', 'acquire() / release()', 'Binary state', 'Deadlock prone if unreleased']
  },
  {
    id: 'def-rlock',
    topic: 'RLock (Re-entrant Lock)',
    unit: 'Unit 4',
    category: 'Parallel Systems',
    definition: 'A synchronization lock that can be acquired multiple times by the SAME thread without deadlocking itself, requiring an equal number of release() calls to unlock.',
    simpleExplanation: 'A VIP pass where the holder can enter recursive rooms without locking themselves out.',
    memoryTrick: 'RLock = Recursive Key: The same owner can unlock doors deeper inside their own house.',
    examKeywords: ['Re-entrant mutual exclusion', 'Ownership tracking', 'Recursion safe', 'Matching acquire/release count']
  },
  {
    id: 'def-semaphore',
    topic: 'Semaphore',
    unit: 'Unit 4',
    category: 'Parallel Systems',
    definition: 'A synchronization variable managing an internal counter representing available permits; acquire() decrements the counter, and release() increments it.',
    simpleExplanation: 'A parking lot with 5 spaces: cars enter until spaces hit 0, then new cars must wait.',
    memoryTrick: 'Semaphore = Parking Lot Gate: Counter starts at N; green light while count > 0.',
    examKeywords: ['Counting semaphore', 'Permits counter', 'P (wait) and V (signal) operations', 'Bounded resource control']
  },
  {
    id: 'def-producer-consumer',
    topic: 'Producer-Consumer Problem',
    unit: 'Unit 4',
    category: 'Parallel Systems',
    definition: 'A classic synchronization challenge where two threads (Producer & Consumer) share a fixed-size buffer, requiring producers to wait when full and consumers to wait when empty.',
    simpleExplanation: 'A bakery shelf: baker stops baking when shelf is full; customer waits when shelf is empty.',
    memoryTrick: 'Chef (Producer) & Diner (Consumer) sharing a 5-plate counter with mutex protection.',
    examKeywords: ['Bounded buffer', 'Empty / Full semaphore', 'Mutex protection', 'Race condition prevention']
  },
  {
    id: 'def-socket',
    topic: 'Socket',
    unit: 'Unit 4',
    category: 'Network Programming',
    definition: 'An endpoint abstraction for bidirectional network communication across a computer network, identified uniquely by an IP address and Port number tuple.',
    simpleExplanation: 'A software plug connecting your application directly to a network wire.',
    memoryTrick: 'Socket = Electrical wall plug (IP Address + Port Number) into which communication cables plug.',
    examKeywords: ['Communication endpoint', 'IP + Port tuple', 'Bidirectional stream/datagram', 'Transport layer abstraction']
  },
  {
    id: 'def-tcp',
    topic: 'TCP (Transmission Control Protocol)',
    unit: 'Unit 4',
    category: 'Network Programming',
    definition: 'A connection-oriented, reliable transport layer protocol that guarantees in-order, error-checked, flow-controlled delivery of a stream of octets via a 3-way handshake.',
    simpleExplanation: 'A certified phone call with delivery receipts where no word is ever lost or out of order.',
    memoryTrick: 'TCP = Registered Certified Mail: Requires signature receipt and verifies every packet.',
    examKeywords: ['Connection-oriented', '3-Way Handshake (SYN-SYN/ACK-ACK)', 'Reliable delivery', 'Byte stream']
  },
  {
    id: 'def-udp',
    topic: 'UDP (User Datagram Protocol)',
    unit: 'Unit 4',
    category: 'Network Programming',
    definition: 'A lightweight, connectionless transport protocol providing minimal best-effort delivery of independent packets (datagrams) without handshakes, acknowledgments, or flow control.',
    simpleExplanation: 'Shouting into a megaphone: ultra-fast and instant, but no guarantee who heard it.',
    memoryTrick: 'UDP = Postcard dropped in the wind: blazingly fast, but zero arrival guarantee.',
    examKeywords: ['Connectionless', 'Datagram packets', 'Low overhead (8 bytes)', 'Best-effort delivery']
  }
];
