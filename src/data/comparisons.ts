export interface ComparisonRow {
  parameter: string;
  itemA: string;
  itemB: string;
  itemC?: string;
  distinction: string;
}

export interface ComparisonTable {
  id: string;
  title: string;
  unit: 'Unit 3' | 'Unit 4';
  conceptA: string;
  conceptB: string;
  conceptC?: string;
  examWeight: '5 Marks' | '8 Marks' | '13 Marks';
  summaryMemoryMnemonic: string;
  rows: ComparisonRow[];
}

export const COMPARISONS_DATA: ComparisonTable[] = [
  // 1. Thread vs Process
  {
    id: 'thread-vs-process',
    title: 'Thread vs Process',
    unit: 'Unit 3',
    conceptA: 'Thread',
    conceptB: 'Process',
    examWeight: '8 Marks',
    summaryMemoryMnemonic: 'Threads are workers inside the Process factory. Process owns the land; threads share the tools.',
    rows: [
      {
        parameter: 'Definition',
        itemA: 'Smallest dispatchable unit of execution within a program.',
        itemB: 'An executing instance of an entire program with system resources.',
        distinction: 'Lightweight unit vs Heavyweight program.'
      },
      {
        parameter: 'Address Space & Memory',
        itemA: 'Shares address space, code section, data section, and OS resources of parent process.',
        itemB: 'Allocated isolated, independent virtual address space protected by hardware MMU.',
        distinction: 'Shared memory vs Isolated private memory.'
      },
      {
        parameter: 'Context Switching Overhead',
        itemA: 'Extremely fast and minimal overhead; only program counter, registers, and stack switch.',
        itemB: 'High overhead; requires TLB flush, page table switch, cache invalidation.',
        distinction: 'Microseconds switch vs Milliseconds switch.'
      },
      {
        parameter: 'Communication Mechanism',
        itemA: 'Direct inter-thread communication via shared variables, memory, and objects.',
        itemB: 'Requires complex IPC (Inter-Process Communication: Sockets, Pipes, Shared Memory, Message Queues).',
        distinction: 'Direct memory access vs Kernel IPC mediation.'
      },
      {
        parameter: 'Crash Independence',
        itemA: 'A fault or uncaught exception in one thread can crash the entire parent process.',
        itemB: 'One process crash does not affect other independent processes.',
        distinction: 'Shared fate vs Protected isolation.'
      },
      {
        parameter: 'Creation & Termination',
        itemA: 'Fast and cheap to create and destroy.',
        itemB: 'Expensive and slow; requires OS process descriptor allocation and page mapping.',
        distinction: 'Lightweight vs Heavyweight.'
      }
    ]
  },

  // 2. Runnable vs Thread
  {
    id: 'runnable-vs-thread',
    title: 'Runnable Interface vs Thread Class',
    unit: 'Unit 3',
    conceptA: 'implements Runnable',
    conceptB: 'extends Thread',
    examWeight: '5 Marks',
    summaryMemoryMnemonic: 'Runnable = Decoupled Job (supports multi-inheritance); extends Thread = Coupled Worker (eats up single inheritance).',
    rows: [
      {
        parameter: 'Inheritance Flexibility',
        itemA: 'Class can still extend another parent class, overcoming Java single inheritance.',
        itemB: 'Class cannot inherit any other class because Java prohibits multiple inheritance of classes.',
        distinction: 'Runnable preserves inheritance hierarchy.'
      },
      {
        parameter: 'Design Principle (Coupling)',
        itemA: 'Decouples task logic (what to run) from thread execution mechanism (how to run).',
        itemB: 'Tightly couples the task code directly with thread management methods.',
        distinction: 'Clean separation of concerns.'
      },
      {
        parameter: 'Resource Sharing',
        itemA: 'A single Runnable instance can be shared across multiple Thread instances (Thread Pool friendly).',
        itemB: 'Each Thread object represents a unique worker; cannot share a single instance across pools easily.',
        distinction: 'Reusable task vs Single-use worker.'
      },
      {
        parameter: 'Method Overhead',
        itemA: 'Provides only single abstract method: public void run(). Lightweight.',
        itemB: 'Inherits all Thread methods (start, yield, sleep, join, interrupt), increasing overhead.',
        distinction: 'Interface contract vs Full class inheritance.'
      },
      {
        parameter: 'Lambda Expression Support',
        itemA: 'Functional interface (@FunctionalInterface), can be instantiated with concise () -> { ... }.',
        itemB: 'Cannot be instantiated via lambda expressions directly.',
        distinction: 'Modern functional syntax enabled.'
      }
    ]
  },

  // 3. Statement vs PreparedStatement vs CallableStatement
  {
    id: 'statement-vs-prepared-vs-callable',
    title: 'Statement vs PreparedStatement vs CallableStatement',
    unit: 'Unit 3',
    conceptA: 'Statement',
    conceptB: 'PreparedStatement',
    conceptC: 'CallableStatement',
    examWeight: '8 Marks',
    summaryMemoryMnemonic: 'Statement = Raw static text; PreparedStatement = Precompiled dynamic template; CallableStatement = Stored procedure runner.',
    rows: [
      {
        parameter: 'Compilation Timing',
        itemA: 'Compiled every time by the DBMS during execution (No caching).',
        itemB: 'Precompiled once by DBMS; binary plan cached in database memory.',
        itemC: 'Precompiled stored procedure logic stored permanently inside DBMS.',
        distinction: 'Repeated parse vs Cached plan vs Stored procedural code.'
      },
      {
        parameter: 'Parameter Passing',
        itemA: 'Does not support parameterized queries; values concatenated as raw strings.',
        itemB: 'Supports IN parameters via positional placeholder ? (e.g. setInt, setString).',
        itemC: 'Supports IN, OUT, and INOUT parameters via placeholders.',
        distinction: 'String concatenation vs Typed parameterized binding.'
      },
      {
        parameter: 'SQL Injection Vulnerability',
        itemA: 'Severely vulnerable to SQL Injection attacks.',
        itemB: 'Completely immune to SQL Injection (treats inputs strictly as literals).',
        itemC: 'Immune to SQL Injection when parameter placeholders are used.',
        distinction: 'High security risk vs Production-grade security.'
      },
      {
        parameter: 'Performance for Repetition',
        itemA: 'Slow for repeated queries (DBMS parses & optimizes every iteration).',
        itemB: 'Fast for repeated batch queries (DBMS reuses execution plan).',
        itemC: 'Fastest for complex server-side business logic routines.',
        distinction: 'Linear parse cost vs Amortized single parse.'
      },
      {
        parameter: 'Use Case',
        itemA: 'One-off DDL statements (CREATE TABLE, DROP TABLE).',
        itemB: 'Dynamic DML operations (INSERT, UPDATE, SELECT with user parameters).',
        itemC: 'Executing complex stored database procedures and functions.',
        distinction: 'DDL vs Parametric DML vs Stored Procedures.'
      }
    ]
  },

  // 4. TCP vs UDP
  {
    id: 'tcp-vs-udp',
    title: 'TCP vs UDP Socket Programming',
    unit: 'Unit 4',
    conceptA: 'TCP (Transmission Control Protocol)',
    conceptB: 'UDP (User Datagram Protocol)',
    examWeight: '8 Marks',
    summaryMemoryMnemonic: 'TCP is Registered Post with signed receipts; UDP is a shouted message across a loud room.',
    rows: [
      {
        parameter: 'Connection Paradigm',
        itemA: 'Connection-oriented (Requires 3-way handshake SYN, SYN-ACK, ACK prior to data transfer).',
        itemB: 'Connectionless (Sends independent datagrams directly without session setup).',
        distinction: 'Handshake connection vs Fire-and-forget.'
      },
      {
        parameter: 'Reliability & Delivery Guarantee',
        itemA: '100% Guaranteed delivery, automatic retransmission of lost segments, positive ACKs.',
        itemB: 'Best-effort delivery; packets may be lost, duplicated, corrupted, or reordered.',
        distinction: 'Guaranteed reliable vs Unreliable.'
      },
      {
        parameter: 'Data Ordering',
        itemA: 'Guarantees in-order arrival using sequence numbers and reassembly buffers.',
        itemB: 'No ordering guarantee; datagrams may take divergent routes and arrive out of order.',
        distinction: 'Sequenced stream vs Unordered datagrams.'
      },
      {
        parameter: 'Header Size & Overhead',
        itemA: 'Heavy header size: 20 bytes (minimum) up to 60 bytes with options.',
        itemB: 'Lightweight fixed header: exactly 8 bytes.',
        distinction: '20+ bytes overhead vs 8 bytes fixed.'
      },
      {
        parameter: 'Flow & Congestion Control',
        itemA: 'Implements sliding window flow control and congestion avoidance (slow start, AIMD).',
        itemB: 'No built-in flow or congestion control.',
        distinction: 'Adaptive rate control vs Raw line speed.'
      },
      {
        parameter: 'Java Networking Classes',
        itemA: 'java.net.Socket and java.net.ServerSocket.',
        itemB: 'java.net.DatagramSocket and java.net.DatagramPacket.',
        distinction: 'Stream socket vs Datagram packet.'
      },
      {
        parameter: 'Typical Real-world Applications',
        itemA: 'HTTP, HTTPS, FTP, SMTP, SSH, Database connections.',
        itemB: 'VoIP, Video streaming, DNS queries, Multiplayer gaming, DHCP.',
        distinction: 'Data integrity critical vs Low-latency critical.'
      }
    ]
  },

  // 5. Applet vs Application
  {
    id: 'applet-vs-application',
    title: 'Applet vs Standalone Application',
    unit: 'Unit 3',
    conceptA: 'Java Applet',
    conceptB: 'Java Application',
    examWeight: '5 Marks',
    summaryMemoryMnemonic: 'Applet lives in a browser sandbox without main(); Application rules the OS starting from main().',
    rows: [
      {
        parameter: 'Entry Point Method',
        itemA: 'Does not contain main() method; execution controlled by lifecycle methods (init, start).',
        itemB: 'Requires public static void main(String[] args) as the starting point.',
        distinction: 'Lifecycle callbacks vs main() entry.'
      },
      {
        parameter: 'Execution Environment',
        itemA: 'Executes inside a Java-enabled web browser or AppletViewer tool.',
        itemB: 'Executes directly on the host operating system via JVM runtime (java command).',
        distinction: 'Browser container vs Standalone OS environment.'
      },
      {
        parameter: 'Security Restrictions',
        itemA: 'Runs in a strict security sandbox; cannot access local file system or arbitrary sockets.',
        itemB: 'Full access to local system resources, disk storage, and network ports.',
        distinction: 'Restricted sandbox vs Unrestricted host access.'
      },
      {
        parameter: 'Installation & Deployment',
        itemA: 'Downloaded dynamically from remote web server via HTML <applet> or <object> tags.',
        itemB: 'Installed locally on the client machine filesystem.',
        distinction: 'Web-delivered on demand vs Locally installed.'
      }
    ]
  },

  // 6. AWT vs Swing
  {
    id: 'awt-vs-swing',
    title: 'AWT (Abstract Window Toolkit) vs Swing',
    unit: 'Unit 3',
    conceptA: 'AWT (java.awt)',
    conceptB: 'Swing (javax.swing)',
    examWeight: '8 Marks',
    summaryMemoryMnemonic: 'AWT = Heavyweight Native Peers (OS dependent); Swing = Lightweight Pure Java (Pluggable Look & Feel).',
    rows: [
      {
        parameter: 'Component Architecture',
        itemA: 'Heavyweight components; mapped 1:1 to underlying host OS GUI peer widgets.',
        itemB: 'Lightweight components; written 100% in pure Java, rendered on empty surface.',
        distinction: 'Native peer wrapper vs 100% Pure Java.'
      },
      {
        parameter: 'Platform Independence of Appearance',
        itemA: 'Platform-dependent; look & feel changes drastically between Windows, Mac, and Linux.',
        itemB: 'Platform-independent; identical look & feel across all operating systems.',
        distinction: 'OS-coupled UI vs Uniform UI.'
      },
      {
        parameter: 'Pluggable Look and Feel (PLAF)',
        itemA: 'Does not support PLAF; tied to native OS desktop theme.',
        itemB: 'Fully supports PLAF; can switch between Metal, Windows, Motif, or custom skins dynamically.',
        distinction: 'Fixed native theme vs Dynamic PLAF switching.'
      },
      {
        parameter: 'Performance & Memory',
        itemA: 'Fast execution speed due to direct native calls, but consumes higher OS resources.',
        itemB: 'Slightly more CPU-intensive rendering, but consumes fewer operating system handles.',
        distinction: 'Native speed vs Low OS resource footprint.'
      },
      {
        parameter: 'Component Diversity',
        itemA: 'Basic components only (Button, Label, TextField, Choice, List).',
        itemB: 'Rich, advanced components (JTable, JTree, JTabbedPane, JColorChooser, Tooltips).',
        distinction: 'Primitive controls vs Enterprise GUI widgets.'
      }
    ]
  },

  // 7. Lock vs RLock vs Semaphore
  {
    id: 'lock-vs-rlock-vs-semaphore',
    title: 'Lock vs RLock vs Semaphore',
    unit: 'Unit 4',
    conceptA: 'Lock (Mutex)',
    conceptB: 'RLock (Re-entrant Lock)',
    conceptC: 'Semaphore',
    examWeight: '8 Marks',
    summaryMemoryMnemonic: 'Lock = Single key; RLock = Recursive owner key; Semaphore = Parking lot with N ticket permits.',
    rows: [
      {
        parameter: 'State & Counter Representation',
        itemA: 'Binary state: 0 (Unlocked) or 1 (Locked). Single owner.',
        itemB: 'Binary state with recursion counter + owning thread ID.',
        itemC: 'Integer counter representing N available access permits.',
        distinction: 'Binary flag vs Recursive counter vs Permit counter.'
      },
      {
        parameter: 'Re-entrancy by Same Thread',
        itemA: 'Non-reentrant; attempting to acquire twice on the same thread triggers immediate DEADLOCK.',
        itemB: 'Fully reentrant; the same owning thread can acquire multiple times without blocking.',
        itemC: 'Non-reentrant; acquiring multiple times simply decrements the permit counter.',
        distinction: 'Self-deadlock vs Recursion safe vs Decrement counter.'
      },
      {
        parameter: 'Release Ownership Enforcement',
        itemA: 'In many implementations, any thread can unlock it; in strict mutex, only owner can unlock.',
        itemB: 'STRICT: Only the exact thread that acquired the RLock can release it.',
        itemC: 'No thread ownership: ANY thread can call release() to increment permit count.',
        distinction: 'Strict thread ownership in RLock; permit signaler in Semaphore.'
      },
      {
        parameter: 'Primary Use Case',
        itemA: 'Simple critical section mutual exclusion.',
        itemB: 'Recursive algorithms, nested synchronized methods, class hierarchy locks.',
        itemC: 'Bounded resource management (Database connection pools, Producer-Consumer).',
        distinction: 'Simple Mutex vs Nested Mutex vs Multi-resource throttling.'
      }
    ]
  },

  // 8. Shared Memory vs Message Passing
  {
    id: 'shared-memory-vs-message-passing',
    title: 'Shared Memory vs Message Passing IPC',
    unit: 'Unit 4',
    conceptA: 'Shared Memory',
    conceptB: 'Message Passing',
    examWeight: '5 Marks',
    summaryMemoryMnemonic: 'Shared Memory = Whiteboard in a shared room; Message Passing = Sending sealed letters through post.',
    rows: [
      {
        parameter: 'Communication Mechanism',
        itemA: 'Processes read and write directly to a shared physical memory segment mapped into their address space.',
        itemB: 'Processes exchange discrete message envelopes via OS kernel queues (send/receive primitives).',
        distinction: 'Direct memory access vs Kernel message mediation.'
      },
      {
        parameter: 'Speed & Latency',
        itemA: 'Extremely high speed; transfers happen at hardware memory bus speeds with zero kernel copying.',
        itemB: 'Slower; requires kernel system calls and copying data from user space to kernel space and back.',
        distinction: 'Zero-copy hardware speed vs Double memory copy overhead.'
      },
      {
        parameter: 'Synchronization Responsibility',
        itemA: 'Application programmer MUST explicitly synchronize access using Mutexes/Semaphores to prevent race conditions.',
        itemB: 'OS kernel automatically handles synchronization, queueing, and blocking during message delivery.',
        distinction: 'Programmer-managed locks vs Kernel-synchronized.'
      },
      {
        parameter: 'Distributed System Suitability',
        itemA: 'Difficult across networks; typically restricted to single-node multi-core systems (NUMA/SMP).',
        itemB: 'Ideal for distributed and cluster environments (Sockets, MPI, RabbitMQ, Kafka).',
        distinction: 'Single-node SMP vs Multi-node distributed clusters.'
      }
    ]
  },

  // 9. Functional vs Procedural
  {
    id: 'functional-vs-procedural',
    title: 'Functional vs Procedural Programming',
    unit: 'Unit 4',
    conceptA: 'Functional Programming',
    conceptB: 'Procedural Programming',
    examWeight: '5 Marks',
    summaryMemoryMnemonic: 'Functional = Mathematical expressions with immutable data; Procedural = Step-by-step cooking instructions with changing state.',
    rows: [
      {
        parameter: 'Core Focus',
        itemA: 'Declarative: Focuses on "WHAT to compute" through mathematical function evaluation.',
        itemB: 'Imperative: Focuses on "HOW to compute" through sequence of step-by-step statements.',
        distinction: 'Mathematical expressions vs Algorithmic step sequences.'
      },
      {
        parameter: 'State Mutability',
        itemA: 'Immutable data; variables are values that cannot be reassigned; no side-effects.',
        itemB: 'Mutable data; variables represent memory locations whose values change frequently.',
        distinction: 'Immutable values vs Mutable variables.'
      },
      {
        parameter: 'Flow Control Mechanism',
        itemA: 'Function recursion, composition, and higher-order functions (map, filter). Avoids loops.',
        itemB: 'Explicit iterative loops (for, while, do-while) and conditional jumps (goto, if-else).',
        distinction: 'Recursion/HOF vs Iterative loop counters.'
      },
      {
        parameter: 'Parallel Execution Safety',
        itemA: 'Naturally thread-safe; absence of mutable state eliminates race conditions and deadlocks.',
        itemB: 'High concurrency risk; requires complex locking to safeguard global/shared variables.',
        distinction: 'Inherent thread safety vs Manual locking hazards.'
      }
    ]
  },

  // 10. Functional vs Object-Oriented Programming (OOP)
  {
    id: 'functional-vs-oop',
    title: 'Functional Programming vs OOP',
    unit: 'Unit 4',
    conceptA: 'Functional Programming',
    conceptB: 'Object-Oriented Programming',
    examWeight: '8 Marks',
    summaryMemoryMnemonic: 'OOP brings data and functions together into Objects; Functional keeps data immutable and passes it through pure Functions.',
    rows: [
      {
        parameter: 'Fundamental Abstraction Unit',
        itemA: 'Pure functions as first-class citizens operating on separated data structures.',
        itemB: 'Objects encapsulating state (fields) and behavior (methods) together.',
        distinction: 'Pure functions vs Encapsulated objects.'
      },
      {
        parameter: 'State Handling',
        itemA: 'Stateless or immutable state; transforms data by returning new versions.',
        itemB: 'Stateful; objects maintain internal mutable state modified by method calls.',
        distinction: 'Stateless transforms vs Mutable encapsulated state.'
      },
      {
        parameter: 'Extensibility Dimension',
        itemA: 'Easy to add new OPERATIONS (functions) on existing data types (Expression Problem).',
        itemB: 'Easy to add new DATA TYPES (classes via polymorphism) implementing existing interfaces.',
        distinction: 'Adding functions vs Adding classes.'
      },
      {
        parameter: 'Primary Polymorphism Mechanism',
        itemA: 'Parametric polymorphism, higher-order functions, and pattern matching.',
        itemB: 'Subtype polymorphism via inheritance and dynamic method dispatch (vtable).',
        distinction: 'Higher-order composition vs Class inheritance.'
      }
    ]
  },

  // 11. MVC Components (Model vs View vs Controller)
  {
    id: 'mvc-components',
    title: 'MVC Components: Model vs View vs Controller',
    unit: 'Unit 3',
    conceptA: 'Model',
    conceptB: 'View',
    conceptC: 'Controller',
    examWeight: '8 Marks',
    summaryMemoryMnemonic: 'Model holds truth; View paints truth; Controller directs truth.',
    rows: [
      {
        parameter: 'Primary Responsibility',
        itemA: 'Manages domain data, business logic, state rules, and database persistence.',
        itemB: 'Renders UI display and presents data visually to the user.',
        itemC: 'Processes user inputs (clicks, keypresses), updates Model, and refreshes View.',
        distinction: 'Data truth vs Visual presentation vs Input dispatcher.'
      },
      {
        parameter: 'Direct Dependencies',
        itemA: 'Independent; has NO direct knowledge of specific UI components or views.',
        itemB: 'Observes or queries Model state; notified when Model changes (Observer pattern).',
        itemC: 'Coordinates between both; holds references to Model and registers with View events.',
        distinction: 'Zero UI dependency vs Model observer vs Two-way coordinator.'
      },
      {
        parameter: 'Java Swing Example',
        itemA: 'DefaultTableModel, Document, BoundedRangeModel.',
        itemB: 'JFrame, JPanel, JTable, JLabel, JButton.',
        itemC: 'ActionListener, MouseListener, KeyListener event handlers.',
        distinction: 'Data model interface vs GUI widget vs Event listener.'
      },
      {
        parameter: 'Change Impact',
        itemA: 'Modifying business logic does not require changing UI layouts.',
        itemB: 'Redesigning visual theme/layout does not affect core business calculations.',
        itemC: 'Adding keyboard shortcuts or routing only modifies controller code.',
        distinction: 'Independent testability and modular maintenance.'
      }
    ]
  },

  // 12. Map vs Filter vs Reduce
  {
    id: 'map-vs-filter-vs-reduce',
    title: 'Map vs Filter vs Reduce',
    unit: 'Unit 4',
    conceptA: 'Map',
    conceptB: 'Filter',
    conceptC: 'Reduce (Fold)',
    examWeight: '8 Marks',
    summaryMemoryMnemonic: 'Map transforms every element; Filter selects qualifying elements; Reduce squashes elements into a single scalar.',
    rows: [
      {
        parameter: 'Transformation Type',
        itemA: 'Element-to-element 1:1 projection/transformation.',
        itemB: 'Inclusion/Exclusion predicate selection based on boolean condition.',
        itemC: 'Many-to-one aggregation / cumulative scalar folding.',
        distinction: '1:1 Transform vs Subset Selection vs Many:1 Aggregation.'
      },
      {
        parameter: 'Output Collection Length',
        itemA: 'Always EXACTLY equal to input length (N -> N).',
        itemB: 'Less than or equal to input length (N -> M, where 0 <= M <= N).',
        itemC: 'Single accumulated value / scalar object (N -> 1).',
        distinction: 'Exact same size vs Filtered subset vs Single scalar.'
      },
      {
        parameter: 'Input Function Signature',
        itemA: 'Function<T, R> (takes single item, returns transformed item).',
        itemB: 'Predicate<T> (takes single item, returns boolean true/false).',
        itemC: 'BiFunction<R, T, R> (takes accumulator and current item, returns updated accumulator).',
        distinction: 'Unary Transform vs Boolean Predicate vs Binary Accumulator.'
      },
      {
        parameter: 'Python & Java Syntax Example',
        itemA: 'Python: list(map(lambda x: x*2, nums))\nJava: stream.map(x -> x * 2)',
        itemB: 'Python: list(filter(lambda x: x%2==0, nums))\nJava: stream.filter(x -> x % 2 == 0)',
        itemC: 'Python: reduce(lambda a,b: a+b, nums, 0)\nJava: stream.reduce(0, (a, b) -> a + b)',
        distinction: 'Concise lambda functional pipeline.'
      }
    ]
  }
];
