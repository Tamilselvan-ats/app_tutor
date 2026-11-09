export interface CodeMasterItem {
  id: string;
  title: string;
  language: 'java' | 'python';
  unit: 'Unit 3' | 'Unit 4';
  category: string;
  examWeight: '5 Marks' | '8 Marks' | '13 Marks';
  theory: string;
  code: string;
  output: string;
  lineByLine: { lines: string; explanation: string }[];
  scoringTips: string[];
}

export const CODE_MASTER_DATA: CodeMasterItem[] = [
  // 1. Java Thread
  {
    id: 'java-thread',
    title: 'Java Multithreading by Extending Thread Class',
    language: 'java',
    unit: 'Unit 3',
    category: 'Concurrency',
    examWeight: '8 Marks',
    theory: 'In Java, multithreading can be achieved by extending the java.lang.Thread class and overriding its public void run() method. The thread is initiated using the .start() method, which allocates a new JVM call stack and invokes run() asynchronously on the new thread. Direct invocation of .run() will NOT spawn a new thread; it merely executes synchronously in the caller thread.',
    code: `// File: MultiThreadDemo.java
class WorkerThread extends Thread {
    private String workerName;

    public WorkerThread(String name) {
        this.workerName = name;
    }

    @Override
    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println(workerName + " executing step " + i + " on thread: " + Thread.currentThread().getName());
            try {
                Thread.sleep(500); // Pauses thread for 500ms
            } catch (InterruptedException e) {
                System.err.println("Thread interrupted: " + e.getMessage());
            }
        }
        System.out.println(workerName + " completed.");
    }
}

public class MultiThreadDemo {
    public static void main(String[] args) {
        System.out.println("Main thread started: " + Thread.currentThread().getName());

        WorkerThread t1 = new WorkerThread("Worker-Alpha");
        WorkerThread t2 = new WorkerThread("Worker-Beta");

        // CRITICAL: Call start(), NEVER call run() directly!
        t1.start();
        t2.start();

        try {
            t1.join(); // Wait for t1 to complete
            t2.join(); // Wait for t2 to complete
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("All threads finished. Main thread terminates.");
    }
}`,
    output: `Main thread started: main
Worker-Alpha executing step 1 on thread: Thread-0
Worker-Beta executing step 1 on thread: Thread-1
Worker-Alpha executing step 2 on thread: Thread-0
Worker-Beta executing step 2 on thread: Thread-1
Worker-Alpha executing step 3 on thread: Thread-0
Worker-Beta executing step 3 on thread: Thread-1
Worker-Alpha completed.
Worker-Beta completed.
All threads finished. Main thread terminates.`,
    lineByLine: [
      { lines: 'class WorkerThread extends Thread', explanation: 'Declares a thread class by extending Java built-in Thread.' },
      { lines: 'public void run()', explanation: 'Overrides the mandatory entry point method where concurrent business logic lives.' },
      { lines: 'Thread.sleep(500);', explanation: 'Puts the running thread into Timed Waiting state, relinquishing the CPU core.' },
      { lines: 't1.start(); t2.start();', explanation: 'Calls OS/JVM thread scheduler to create brand new call stacks. Moves state from New to Runnable.' },
      { lines: 't1.join(); t2.join();', explanation: 'Forces the calling main thread to pause until t1 and t2 terminate.' }
    ],
    scoringTips: [
      'Examiners deduct 2 marks if you write t1.run() instead of t1.start(). Explicitly mention start() initiates a new call stack.',
      'Always wrap Thread.sleep() and t.join() inside try-catch for InterruptedException.'
    ]
  },

  // 2. Java Runnable
  {
    id: 'java-runnable',
    title: 'Java Multithreading using Runnable Interface & Lambda',
    language: 'java',
    unit: 'Unit 3',
    category: 'Concurrency',
    examWeight: '8 Marks',
    theory: 'The java.lang.Runnable interface is a functional interface representing a task that can run on any thread. Because Java does not support multiple inheritance of classes, implementing Runnable allows your class to extend another business domain class while still enabling multithreading. It also separates the task definition from the execution worker.',
    code: `// File: RunnableDemo.java
class TaskRunner implements Runnable {
    private String taskTitle;

    public TaskRunner(String title) {
        this.taskTitle = title;
    }

    @Override
    public void run() {
        System.out.println("Executing " + taskTitle + " via " + Thread.currentThread().getName());
    }
}

public class RunnableDemo {
    public static void main(String[] args) {
        // Approach 1: Standard Runnable implementation
        TaskRunner task1 = new TaskRunner("Data Sync");
        Thread worker1 = new Thread(task1, "Worker-1");
        worker1.start();

        // Approach 2: Java 8 Lambda Expression Runnable
        Runnable lambdaTask = () -> {
            System.out.println("Executing Lambda Task via " + Thread.currentThread().getName());
        };
        Thread worker2 = new Thread(lambdaTask, "Worker-Lambda");
        worker2.start();
    }
}`,
    output: `Executing Data Sync via Worker-1
Executing Lambda Task via Worker-Lambda`,
    lineByLine: [
      { lines: 'class TaskRunner implements Runnable', explanation: 'Implements the single-method Runnable interface.' },
      { lines: 'Thread worker1 = new Thread(task1, "Worker-1");', explanation: 'Passes the Runnable target instance into Thread constructor (aggregation).' },
      { lines: 'Runnable lambdaTask = () -> { ... }', explanation: 'Demonstrates modern functional lambda syntax for concise thread task creation.' }
    ],
    scoringTips: [
      'Write both the traditional class implementation AND the Java 8 lambda syntax to earn bonus marks.',
      'Highlight that Runnable overcomes Java single inheritance limit.'
    ]
  },

  // 3. JDBC Full Program
  {
    id: 'jdbc-crud',
    title: 'Complete JDBC CRUD with PreparedStatement & ResultSet',
    language: 'java',
    unit: 'Unit 3',
    category: 'Database Connectivity',
    examWeight: '13 Marks',
    theory: 'JDBC involves a strict 5-step lifecycle: 1) Load driver class, 2) Establish Connection via DriverManager, 3) Prepare parameterized SQL with PreparedStatement, 4) Execute query/update, 5) Process ResultSet and close resources. PreparedStatement eliminates SQL injection vulnerabilities and accelerates batch execution.',
    code: `// File: JDBCStudentManager.java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JDBCStudentManager {
    private static final String URL = "jdbc:mysql://localhost:3306/university_db";
    private static final String USER = "root";
    private static final String PASS = "password123";

    public static void main(String[] args) {
        Connection conn = null;
        PreparedStatement pStmt = null;
        ResultSet rs = null;

        try {
            // Step 1: Load and Register JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Step 2: Establish Connection
            conn = DriverManager.getConnection(URL, USER, PASS);
            System.out.println("Connected to MySQL Database successfully!");

            // Step 3: INSERT Operation using PreparedStatement
            String insertSQL = "INSERT INTO students (id, name, marks) VALUES (?, ?, ?)";
            pStmt = conn.prepareStatement(insertSQL);
            pStmt.setInt(1, 101);
            pStmt.setString(2, "Alex Titan");
            pStmt.setDouble(3, 94.5);
            int rowsInserted = pStmt.executeUpdate();
            System.out.println("Rows inserted: " + rowsInserted);
            pStmt.close();

            // Step 4: SELECT Query Execution
            String selectSQL = "SELECT id, name, marks FROM students WHERE marks >= ?";
            pStmt = conn.prepareStatement(selectSQL);
            pStmt.setDouble(1, 90.0);
            rs = pStmt.executeQuery();

            // Step 5: Process ResultSet with internal cursor
            System.out.println("--- High Scorers ---");
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                double marks = rs.getDouble("marks");
                System.out.println("ID: " + id + " | Name: " + name + " | Marks: " + marks);
            }

        } catch (ClassNotFoundException e) {
            System.err.println("JDBC Driver class not found: " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("Database error occurred: " + e.getMessage());
        } finally {
            // Always close resources in reverse order of creation
            try {
                if (rs != null) rs.close();
                if (pStmt != null) pStmt.close();
                if (conn != null) conn.close();
                System.out.println("All JDBC resources closed cleanly.");
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }
}`,
    output: `Connected to MySQL Database successfully!
Rows inserted: 1
--- High Scorers ---
ID: 101 | Name: Alex Titan | Marks: 94.5
All JDBC resources closed cleanly.`,
    lineByLine: [
      { lines: 'Class.forName("com.mysql.cj.jdbc.Driver");', explanation: 'Dynamically loads driver class into JVM and registers it with DriverManager.' },
      { lines: 'conn = DriverManager.getConnection(...)', explanation: 'Factory call establishing network socket session with MySQL server.' },
      { lines: 'conn.prepareStatement(insertSQL)', explanation: 'Sends SQL query template to DBMS for precompilation and syntax validation.' },
      { lines: 'pStmt.setInt(1, 101); pStmt.setString(2, "Alex Titan");', explanation: 'Binds typed parameters to question mark (?) positional placeholders.' },
      { lines: 'pStmt.executeUpdate() vs executeQuery()', explanation: 'executeUpdate for DML (INSERT/UPDATE/DELETE); executeQuery returns ResultSet for SELECT.' },
      { lines: 'while (rs.next())', explanation: 'Advances cursor to next row. Returns false when no more rows exist.' }
    ],
    scoringTips: [
      'Write the 5 distinct JDBC steps as numbered headings for maximum marks.',
      'Explain why PreparedStatement is preferred over Statement (Precompilation + SQL Injection defense).',
      'Always show finally block closing rs, pStmt, and conn in reverse order.'
    ]
  },

  // 4. Java Applet
  {
    id: 'java-applet',
    title: 'Java Applet Lifecycle & Drawing Implementation',
    language: 'java',
    unit: 'Unit 3',
    category: 'GUI Programming',
    examWeight: '8 Marks',
    theory: 'An Applet is a small Java program executed inside a browser or AppletViewer without a main() method. It adheres to an explicit lifecycle: init() initializes variables/GUI, start() begins active processing or animation, paint(Graphics g) draws graphics on the canvas, stop() pauses when user navigates away, and destroy() cleans up resources before unload.',
    code: `// File: BannerApplet.java
import java.applet.Applet;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;

/*
<applet code="BannerApplet.class" width="400" height="200">
</applet>
*/
public class BannerApplet extends Applet {
    private String bannerText;

    // 1. Initialization (called once when applet is loaded)
    @Override
    public void init() {
        bannerText = "CT TITAN - Exam Ready!";
        setBackground(Color.DARK_GRAY);
        setForeground(Color.CYAN);
    }

    // 2. Start (called when browser activates or returns to page)
    @Override
    public void start() {
        System.out.println("Applet execution started.");
    }

    // 3. Paint (called whenever applet surface needs repainting)
    @Override
    public void paint(Graphics g) {
        g.setFont(new Font("Arial", Font.BOLD, 22));
        g.setColor(Color.ORANGE);
        g.drawString(bannerText, 50, 80);

        // Draw a decorative rectangle
        g.setColor(Color.WHITE);
        g.drawRoundRect(30, 40, 340, 90, 15, 15);
    }

    // 4. Stop (called when browser page is minimized/navigated away)
    @Override
    public void stop() {
        System.out.println("Applet paused.");
    }

    // 5. Destroy (called once when applet is permanently unloaded)
    @Override
    public void destroy() {
        System.out.println("Applet destroyed. Freeing resources.");
    }
}`,
    output: `Applet displays a dark gray window with an orange text "CT TITAN - Exam Ready!" bordered by a white rounded rectangle.`,
    lineByLine: [
      { lines: 'public class BannerApplet extends Applet', explanation: 'Inherits java.applet.Applet base class.' },
      { lines: 'public void init()', explanation: 'One-time setup; sets initial background colors and state.' },
      { lines: 'public void paint(Graphics g)', explanation: 'Receives the AWT Graphics context for drawing strings, shapes, and images.' },
      { lines: 'public void stop() and destroy()', explanation: 'Handles suspension and garbage disposal of browser resources.' }
    ],
    scoringTips: [
      'Draw the state diagram of the Applet lifecycle: Born (init) -> Running (start) -> Idle (stop) -> Dead (destroy).',
      'Include the HTML <applet> tag comment inside your Java source code.'
    ]
  },

  // 5. Java Swing GUI
  {
    id: 'java-swing-gui',
    title: 'Java Swing GUI with Event Delegation Model',
    language: 'java',
    unit: 'Unit 3',
    category: 'GUI Programming',
    examWeight: '8 Marks',
    theory: 'Java Swing provides lightweight, pure-Java GUI components (javax.swing). Events are processed via the Event Delegation Model, where an Event Source (such as JButton) fires an ActionEvent, delegating it to an registered ActionListener interface implementation.',
    code: `// File: ExamCalculatorGUI.java
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ExamCalculatorGUI extends JFrame {
    private JTextField markField1, markField2;
    private JButton calculateBtn;
    private JLabel resultLabel;

    public ExamCalculatorGUI() {
        // Frame configuration
        setTitle("CT TITAN - Mark Calculator");
        setSize(350, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null); // Center on screen
        setLayout(new FlowLayout());

        // Create UI Components
        JLabel lbl1 = new JLabel("Unit 3 Marks (out of 25):");
        markField1 = new JTextField(5);
        JLabel lbl2 = new JLabel("Unit 4 Marks (out of 25):");
        markField2 = new JTextField(5);
        calculateBtn = new JButton("Calculate Total");
        resultLabel = new JLabel("Predicted CT Score: -- / 50");

        // Event Handling: Register ActionListener on JButton
        calculateBtn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    double u3 = Double.parseDouble(markField1.getText());
                    double u4 = Double.parseDouble(markField2.getText());
                    double total = u3 + u4;
                    resultLabel.setText("Predicted CT Score: " + total + " / 50");
                    if (total >= 45) {
                        JOptionPane.showMessageDialog(ExamCalculatorGUI.this, "Monster Grade! CT Champion!");
                    }
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(ExamCalculatorGUI.this, "Please enter valid numeric marks.");
                }
            }
        });

        // Add components to JFrame container
        add(lbl1); add(markField1);
        add(lbl2); add(markField2);
        add(calculateBtn);
        add(resultLabel);
    }

    public static void main(String[] args) {
        // Run on Swing Event Dispatch Thread (EDT) for thread safety
        SwingUtilities.invokeLater(() -> {
            new ExamCalculatorGUI().setVisible(true);
        });
    }
}`,
    output: `Interactive GUI window displays text fields for marks, a button, and dynamic output label showing computed score.`,
    lineByLine: [
      { lines: 'extends JFrame', explanation: 'Creates a top-level window container with title bar, close buttons, and border.' },
      { lines: 'calculateBtn.addActionListener(...)', explanation: 'Registers an event listener with the event source (delegation model).' },
      { lines: 'public void actionPerformed(ActionEvent e)', explanation: 'Callback executed whenever user clicks the button.' },
      { lines: 'SwingUtilities.invokeLater(...)', explanation: 'Ensures GUI construction executes safely on the dedicated Event Dispatch Thread (EDT).' }
    ],
    scoringTips: [
      'Mention that Swing is lightweight and runs on the EDT (Event Dispatch Thread).',
      'Identify the three parts of Event Delegation: Event Source (JButton), Event Object (ActionEvent), Event Listener (ActionListener).'
    ]
  },

  // 6. MVC Architecture Implementation
  {
    id: 'mvc-architecture',
    title: 'Model-View-Controller (MVC) Pattern Implementation',
    language: 'java',
    unit: 'Unit 3',
    category: 'Design Patterns',
    examWeight: '13 Marks',
    theory: 'The MVC architectural pattern divides an application into three logical layers: 1) Model: represents data, business logic, and state, 2) View: renders visualization and UI, 3) Controller: receives user input, updates the Model, and synchronizes View. This promotes separation of concerns and maintainability.',
    code: `// File: MVCPatternDemo.java

// 1. MODEL: Pure business entity and state
class StudentModel {
    private String rollNo;
    private String name;
    private double ctScore;

    public StudentModel(String rollNo, String name, double score) {
        this.rollNo = rollNo;
        this.name = name;
        this.ctScore = score;
    }

    public String getRollNo() { return rollNo; }
    public String getName() { return name; }
    public double getCtScore() { return ctScore; }
    public void setCtScore(double ctScore) { this.ctScore = ctScore; }
}

// 2. VIEW: UI presentation layer
class StudentView {
    public void printStudentDetails(String name, String rollNo, double score) {
        System.out.println("=================================");
        System.out.println("   STUDENT CT SCORECARD (VIEW)   ");
        System.out.println("=================================");
        System.out.println("Roll Number : " + rollNo);
        System.out.println("Name        : " + name);
        System.out.println("CT Score    : " + score + " / 50");
        System.out.println("Status      : " + (score >= 25 ? "PASSED" : "RETEST"));
        System.out.println("=================================\n");
    }
}

// 3. CONTROLLER: Mediator managing input and orchestration
class StudentController {
    private StudentModel model;
    private StudentView view;

    public StudentController(StudentModel model, StudentView view) {
        this.model = model;
        this.view = view;
    }

    public void updateScore(double newScore) {
        model.setCtScore(newScore); // Updates model data
    }

    public void updateView() {
        // Transmits model state to the view
        view.printStudentDetails(model.getName(), model.getRollNo(), model.getCtScore());
    }
}

// Execution Driver
public class MVCPatternDemo {
    public static void main(String[] args) {
        // Instantiate Model
        StudentModel model = new StudentModel("21CS045", "Kiran Kumar", 38.5);

        // Instantiate View
        StudentView view = new StudentView();

        // Instantiate Controller connecting Model and View
        StudentController controller = new StudentController(model, view);

        // Initial Display
        controller.updateView();

        // User interacts: Controller updates Model
        System.out.println(">> Re-evaluation bonus applied by Controller...\n");
        controller.updateScore(47.0);

        // View displays updated state
        controller.updateView();
    }
}`,
    output: `=================================
   STUDENT CT SCORECARD (VIEW)   
=================================
Roll Number : 21CS045
Name        : Kiran Kumar
CT Score    : 38.5 / 50
Status      : PASSED
=================================

>> Re-evaluation bonus applied by Controller...

=================================
   STUDENT CT SCORECARD (VIEW)   
=================================
Roll Number : 21CS045
Name        : Kiran Kumar
CT Score    : 47.0 / 50
Status      : PASSED
=================================`,
    lineByLine: [
      { lines: 'class StudentModel', explanation: 'Maintains state without any dependency on UI console/window code.' },
      { lines: 'class StudentView', explanation: 'Renders the data provided to it without business rule calculations.' },
      { lines: 'class StudentController', explanation: 'Contains references to both model and view, acting as mediator.' }
    ],
    scoringTips: [
      'Draw the triangular communication diagram: User -> Controller -> Model -> View -> User.',
      'Explicitly state that Model never directly calls or imports View classes.'
    ]
  },

  // 7. Lambda Expressions (Java & Python)
  {
    id: 'lambda-expressions',
    title: 'Lambda Expressions in Java and Python',
    language: 'java',
    unit: 'Unit 4',
    category: 'Functional Programming',
    examWeight: '5 Marks',
    theory: 'A lambda expression is an anonymous function (without an identifier name) passed directly into higher-order functions or mapped to functional interfaces. In Java, it uses the arrow syntax (parameters) -> { body }; in Python, it uses lambda arguments: expression.',
    code: `// --- JAVA LAMBDA IMPLEMENTATION ---
import java.util.Arrays;
import java.util.List;
import java.util.function.BinaryOperator;
import java.util.function.Predicate;

public class LambdaDemo {
    public static void main(String[] args) {
        // Functional Interface Predicate
        Predicate<Integer> isPassing = mark -> mark >= 25;
        System.out.println("Is 35 passing? " + isPassing.test(35)); // true

        // BinaryOperator Lambda
        BinaryOperator<Integer> add = (a, b) -> a + b;
        System.out.println("Sum of 20 + 30: " + add.apply(20, 30)); // 50

        // List forEach iteration with Lambda
        List<String> topics = Arrays.asList("Threads", "JDBC", "Sockets", "Semaphores");
        topics.forEach(t -> System.out.println("CT Topic: " + t));
    }
}

/*
# --- PYTHON EQUIVALENT ---
is_passing = lambda mark: mark >= 25
add = lambda a, b: a + b
print(is_passing(35)) # True
print(add(20, 30))     # 50
*/`,
    output: `Is 35 passing? true
Sum of 20 + 30: 50
CT Topic: Threads
CT Topic: JDBC
CT Topic: Sockets
CT Topic: Semaphores`,
    lineByLine: [
      { lines: 'Predicate<Integer> isPassing = mark -> mark >= 25;', explanation: 'Lambda expression implementing the single abstract method boolean test(T t).' },
      { lines: 'BinaryOperator<Integer> add = (a, b) -> a + b;', explanation: 'Concise syntax with inferred parameter types returning a sum expression.' }
    ],
    scoringTips: [
      'Mention that in Java, lambdas require a Functional Interface (an interface with exactly one abstract method).',
      'Contrast Java verbose syntax with Python one-liner lambda expression syntax.'
    ]
  },

  // 8. Map Operation
  {
    id: 'map-operation',
    title: 'Map Higher-Order Function (Java Streams & Python)',
    language: 'python',
    unit: 'Unit 4',
    category: 'Functional Programming',
    examWeight: '5 Marks',
    theory: 'The Map higher-order function applies a transformation function to each element of an input collection, returning a new collection of identical length (1-to-1 projection) without mutating original input.',
    code: `# File: map_demo.py
# Python map() takes a function and an iterable

marks_out_of_25 = [18, 22, 15, 24, 20]

# Transform marks to percentage (scale to 100)
percentage_list = list(map(lambda m: (m / 25.0) * 100, marks_out_of_25))

print("Original Marks :", marks_out_of_25)
print("Percentages    :", percentage_list)

# Transform strings to uppercase
topics = ["thread", "jdbc", "socket", "swing"]
upper_topics = list(map(str.upper, topics))
print("Uppercase Topics:", upper_topics)

"""
// Java 8 Streams Equivalent:
List<Integer> marks = Arrays.asList(18, 22, 15, 24, 20);
List<Double> percentages = marks.stream()
    .map(m -> (m / 25.0) * 100)
    .collect(Collectors.toList());
"""`,
    output: `Original Marks : [18, 22, 15, 24, 20]
Percentages    : [72.0, 88.0, 60.0, 96.0, 80.0]
Uppercase Topics: ['THREAD', 'JDBC', 'SOCKET', 'SWING']`,
    lineByLine: [
      { lines: 'map(lambda m: (m / 25.0) * 100, marks_out_of_25)', explanation: 'Applies lambda function individually to each element in marks_out_of_25.' },
      { lines: 'list(...)', explanation: 'Evaluates the lazy iterator returned by map into an in-memory list.' }
    ],
    scoringTips: [
      'State clearly that Map preserves the length of the collection: length(output) == length(input).',
      'Mention that map() returns an iterator in Python 3 (lazy evaluation).'
    ]
  },

  // 9. Filter Operation
  {
    id: 'filter-operation',
    title: 'Filter Higher-Order Function (Java Streams & Python)',
    language: 'python',
    unit: 'Unit 4',
    category: 'Functional Programming',
    examWeight: '5 Marks',
    theory: 'Filter evaluates a boolean predicate against each element in a sequence. Elements for which the predicate returns True are preserved; all others are excluded.',
    code: `# File: filter_demo.py
# Python filter() takes a predicate function and an iterable

student_scores = [45, 18, 38, 22, 49, 12, 33]

# Keep only students who passed the CT (threshold >= 25 marks)
passing_scores = list(filter(lambda score: score >= 25, student_scores))

# Keep only top distinction scores (>= 45 marks)
distinction_scores = list(filter(lambda score: score >= 45, student_scores))

print("All Scores       :", student_scores)
print("Passing Scores   :", passing_scores)
print("Distinction Scores:", distinction_scores)

"""
// Java 8 Streams Equivalent:
List<Integer> scores = Arrays.asList(45, 18, 38, 22, 49, 12, 33);
List<Integer> passing = scores.stream()
    .filter(s -> s >= 25)
    .collect(Collectors.toList());
"""`,
    output: `All Scores       : [45, 18, 38, 22, 49, 12, 33]
Passing Scores   : [45, 38, 49, 33]
Distinction Scores: [45, 49]`,
    lineByLine: [
      { lines: 'filter(lambda score: score >= 25, student_scores)', explanation: 'Applies predicate; retains element only if return value evaluates to True.' }
    ],
    scoringTips: [
      'Emphasize that the predicate must return a BOOLEAN (True/False).',
      'Length of filtered collection is always 0 <= len(output) <= len(input).'
    ]
  },

  // 10. Reduce Operation
  {
    id: 'reduce-operation',
    title: 'Reduce / Fold Higher-Order Function (Java & Python)',
    language: 'python',
    unit: 'Unit 4',
    category: 'Functional Programming',
    examWeight: '5 Marks',
    theory: 'Reduce (from functools in Python) combines all items in an iterable into a single cumulative scalar value using an associative binary accumulator function and an optional initializer.',
    code: `# File: reduce_demo.py
from functools import reduce

marks = [22, 24, 19, 25, 20]

# Calculate cumulative sum of all marks
# Step 1: 22 + 24 = 46
# Step 2: 46 + 19 = 65
# Step 3: 65 + 25 = 90
# Step 4: 90 + 20 = 110
total_marks = reduce(lambda acc, current: acc + current, marks, 0)

# Find maximum mark using reduce
max_mark = reduce(lambda a, b: a if a > b else b, marks)

print("Mark List  :", marks)
print("Total Sum  :", total_marks)
print("Highest Mark:", max_mark)

"""
// Java 8 Streams Equivalent:
int sum = marks.stream().reduce(0, (acc, cur) -> acc + cur);
"""`,
    output: `Mark List  : [22, 24, 19, 25, 20]
Total Sum  : 110
Highest Mark: 25`,
    lineByLine: [
      { lines: 'from functools import reduce', explanation: 'In Python 3, reduce was moved from built-ins to the functools module.' },
      { lines: 'reduce(lambda acc, current: acc + current, marks, 0)', explanation: 'Takes accumulator and current item, returns updated accumulation; 0 is seed.' }
    ],
    scoringTips: [
      'Remember to mention: "In Python 3, reduce must be imported from functools".',
      'Contrast Map (N to N), Filter (N to M), and Reduce (N to 1).'
    ]
  },

  // 11. Python Threading
  {
    id: 'python-threading',
    title: 'Python Threading with Lock & Thread Synchronization',
    language: 'python',
    unit: 'Unit 4',
    category: 'Parallel Systems',
    examWeight: '8 Marks',
    theory: 'Python threading module provides thread creation via threading.Thread. Because multiple threads accessing shared variables create race conditions, threading.Lock provides mutual exclusion with acquire() and release() (or via with statement context manager). CPython Global Interpreter Lock (GIL) prevents concurrent CPU execution of pure Python bytecode.',
    code: `# File: python_thread_demo.py
import threading
import time

# Shared resource
counter = 0
counter_lock = threading.Lock()

def safe_increment(worker_id):
    global counter
    for _ in range(50000):
        # Mutual exclusion critical section
        with counter_lock:
            counter += 1

print("Starting concurrent threads...")
t1 = threading.Thread(target=safe_increment, args=(1,))
t2 = threading.Thread(target=safe_increment, args=(2,))

t1.start()
t2.start()

# Wait for both threads to finish
t1.join()
t2.join()

print("Final Counter Value (Expected 100000):", counter)
print("Thread synchronization successful without race conditions!")`,
    output: `Starting concurrent threads...
Final Counter Value (Expected 100000): 100000
Thread synchronization successful without race conditions!`,
    lineByLine: [
      { lines: 'counter_lock = threading.Lock()', explanation: 'Instantiates a mutual exclusion lock primitive.' },
      { lines: 'with counter_lock:', explanation: 'Context manager automatically calls acquire() on entry and release() on exit, even if exceptions occur.' },
      { lines: 't1.start(); t2.start();', explanation: 'Spawns OS threads running the target function concurrently.' }
    ],
    scoringTips: [
      'Mention that without counter_lock, race conditions result in counter < 100000.',
      'Explain the GIL (Global Interpreter Lock): Python threads are great for I/O-bound tasks, but Multiprocessing is required for multi-core CPU bound tasks.'
    ]
  },

  // 12. Python Multiprocessing
  {
    id: 'python-multiprocessing',
    title: 'Python Multiprocessing with IPC Queue (Bypassing GIL)',
    language: 'python',
    unit: 'Unit 4',
    category: 'Parallel Systems',
    examWeight: '8 Marks',
    theory: 'The multiprocessing module spawns distinct OS processes with independent memory spaces and separate Python interpreter instances, completely bypassing the Global Interpreter Lock (GIL) and achieving true multi-core CPU parallelism. IPC is handled through multiprocessing.Queue or Pipes.',
    code: `# File: multiprocessing_demo.py
import multiprocessing
import os

def compute_square(numbers, result_queue):
    print(f"Process PID: {os.getpid()} calculating squares...")
    results = [n * n for n in numbers]
    result_queue.put(results)

if __name__ == '__main__':
    data1 = [1, 2, 3, 4, 5]
    data2 = [6, 7, 8, 9, 10]

    # Inter-process communication queue
    q = multiprocessing.Queue()

    # Create separate OS processes
    p1 = multiprocessing.Process(target=compute_square, args=(data1, q))
    p2 = multiprocessing.Process(target=compute_square, args=(data2, q))

    p1.start()
    p2.start()

    p1.join()
    p2.join()

    # Retrieve data from IPC Queue
    res1 = q.get()
    res2 = q.get()

    print("Subprocess 1 output:", res1)
    print("Subprocess 2 output:", res2)
    print("True multi-core parallelism achieved!")`,
    output: `Process PID: 8124 calculating squares...
Process PID: 8125 calculating squares...
Subprocess 1 output: [1, 4, 9, 16, 25]
Subprocess 2 output: [36, 49, 64, 81, 100]
True multi-core parallelism achieved!`,
    lineByLine: [
      { lines: 'if __name__ == "__main__":', explanation: 'Mandatory on Windows to prevent recursive process spawning bombs.' },
      { lines: 'q = multiprocessing.Queue()', explanation: 'Thread and process-safe FIFO queue for Inter-Process Communication (IPC).' },
      { lines: 'p1 = multiprocessing.Process(...)', explanation: 'Spawns an isolated OS process with its own dedicated memory space and GIL.' }
    ],
    scoringTips: [
      'Always include if __name__ == "__main__":. On Windows, omission causes an infinite process creation loop.',
      'Explicitly write that Multiprocessing bypasses the CPython GIL.'
    ]
  },

  // 13. Socket Programming Fundamentals
  {
    id: 'socket-fundamentals',
    title: 'Socket Programming Network Architecture',
    language: 'java',
    unit: 'Unit 4',
    category: 'Network Programming',
    examWeight: '5 Marks',
    theory: 'A Socket represents an endpoint for bidirectional communication between two networked machines. In IP networking, a socket address is defined as (IP Address, Port Number). Server sockets bind to a specific local port and listen for client connections; client sockets initiate connections.',
    code: `/*
TCP CLIENT-SERVER WORKFLOW STEPS:
SERVER SIDE:
1. ServerSocket server = new ServerSocket(port);
2. Socket socket = server.accept(); // BLOCKS until client connects
3. InputStream in = socket.getInputStream();
4. OutputStream out = socket.getOutputStream();
5. socket.close(); server.close();

CLIENT SIDE:
1. Socket socket = new Socket("host_ip", port); // Initiates 3-way handshake
2. OutputStream out = socket.getOutputStream();
3. InputStream in = socket.getInputStream();
4. socket.close();
*/`,
    output: `Architecture definition and sequence flow for Socket Networking.`,
    lineByLine: [
      { lines: 'ServerSocket.accept()', explanation: 'Blocks execution until a remote client initiates connection; returns a new Socket for client conversation.' },
      { lines: 'new Socket(host, port)', explanation: 'Executes TCP 3-way handshake with destination server.' }
    ],
    scoringTips: [
      'Draw the client-server timeline diagram with connect() -> accept() -> write() -> read() -> close().'
    ]
  },

  // 14. TCP Client-Server Program
  {
    id: 'tcp-client-server',
    title: 'Complete TCP Echo Client-Server in Java',
    language: 'java',
    unit: 'Unit 4',
    category: 'Network Programming',
    examWeight: '13 Marks',
    theory: 'TCP is a connection-oriented, reliable protocol. In Java, ServerSocket listens on a port and accept() blocks until a client connects. The server and client exchange byte streams via InputStream and OutputStream with full delivery guarantees.',
    code: `// --- SERVER PROGRAM (TCPEchoServer.java) ---
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class TCPEchoServer {
    public static void main(String[] args) {
        int port = 9090;
        System.out.println("TCP Server starting on port " + port + "...");

        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Server listening. Waiting for client...");

            // Blocks until client connects (3-way handshake completes)
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client connected from: " + clientSocket.getRemoteSocketAddress());

            // Setup input and output streams
            BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true); // autoFlush = true

            // Read message from client
            String clientMessage = in.readLine();
            System.out.println("Received from client: " + clientMessage);

            // Echo response back
            String response = "ECHO: " + clientMessage.toUpperCase();
            out.println(response);

            // Clean up
            clientSocket.close();
            System.out.println("Client session finished. Server closing.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

// --- CLIENT PROGRAM (TCPEchoClient.java) ---
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class TCPEchoClient {
    public static void main(String[] args) {
        String host = "127.0.0.1";
        int port = 9090;

        try (Socket socket = new Socket(host, port)) {
            System.out.println("Connected to TCP Server successfully!");

            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            // Send message
            String msg = "Hello CT Titan Examiner";
            out.println(msg);
            System.out.println("Sent to server: " + msg);

            // Read echo response
            String echoReply = in.readLine();
            System.out.println("Received from server: " + echoReply);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`,
    output: `[SERVER CONSOLE]
TCP Server starting on port 9090...
Server listening. Waiting for client...
Client connected from: /127.0.0.1:54321
Received from client: Hello CT Titan Examiner
Client session finished. Server closing.

[CLIENT CONSOLE]
Connected to TCP Server successfully!
Sent to server: Hello CT Titan Examiner
Received from server: ECHO: HELLO CT TITAN EXAMINER`,
    lineByLine: [
      { lines: 'new ServerSocket(9090)', explanation: 'Binds server socket to port 9090 on the local host.' },
      { lines: 'serverSocket.accept()', explanation: 'Listens and blocks until client connects; establishes reliable TCP socket connection.' },
      { lines: 'new PrintWriter(socket.getOutputStream(), true)', explanation: 'Wraps raw byte output stream into buffered text writer with auto-flush.' },
      { lines: 'new Socket("127.0.0.1", 9090)', explanation: 'Client socket initiates 3-way handshake with server.' }
    ],
    scoringTips: [
      'Write BOTH the Server class AND the Client class when asked for TCP Socket Programming for 13 marks.',
      'Show the try-with-resources statement or explicit close() calls for stream and socket cleanup.'
    ]
  },

  // 15. UDP Client-Server Program
  {
    id: 'udp-client-server',
    title: 'Complete UDP Datagram Client-Server in Java',
    language: 'java',
    unit: 'Unit 4',
    category: 'Network Programming',
    examWeight: '13 Marks',
    theory: 'UDP is a connectionless, datagram protocol. In Java, java.net.DatagramSocket is used for sending and receiving packets, while java.net.DatagramPacket encapsulates packet byte array, length, destination IP address, and destination port.',
    code: `// --- UDP SERVER (UDPEchoServer.java) ---
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class UDPEchoServer {
    public static void main(String[] args) {
        int port = 9876;
        try (DatagramSocket serverSocket = new DatagramSocket(port)) {
            System.out.println("UDP Server listening on port " + port + "...");

            byte[] receiveBuffer = new byte[1024];

            // Create packet container for receiving datagram
            DatagramPacket receivePacket = new DatagramPacket(receiveBuffer, receiveBuffer.length);

            // Blocks until packet arrives (No handshake!)
            serverSocket.receive(receivePacket);

            String message = new String(receivePacket.getData(), 0, receivePacket.getLength());
            System.out.println("Received UDP Datagram: " + message);

            // Extract client address and port for reply
            InetAddress clientIP = receivePacket.getAddress();
            int clientPort = receivePacket.getPort();

            // Prepare reply datagram
            String replyMessage = "UDP-ACK: " + message.toUpperCase();
            byte[] sendBuffer = replyMessage.getBytes();

            DatagramPacket sendPacket = new DatagramPacket(
                sendBuffer, sendBuffer.length, clientIP, clientPort
            );

            // Send packet back
            serverSocket.send(sendPacket);
            System.out.println("Reply sent to " + clientIP + ":" + clientPort);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

// --- UDP CLIENT (UDPEchoClient.java) ---
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class UDPEchoClient {
    public static void main(String[] args) {
        try (DatagramSocket clientSocket = new DatagramSocket()) {
            InetAddress serverIP = InetAddress.getByName("localhost");
            int serverPort = 9876;

            String msg = "Ping UDP Titan";
            byte[] sendData = msg.getBytes();

            // Construct datagram with destination IP and port
            DatagramPacket sendPacket = new DatagramPacket(
                sendData, sendData.length, serverIP, serverPort
            );

            // Transmit packet
            clientSocket.send(sendPacket);
            System.out.println("UDP Datagram sent: " + msg);

            // Prepare buffer for response
            byte[] receiveData = new byte[1024];
            DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);

            // Wait for response
            clientSocket.receive(receivePacket);
            String response = new String(receivePacket.getData(), 0, receivePacket.getLength());
            System.out.println("Received from Server: " + response);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`,
    output: `[SERVER CONSOLE]
UDP Server listening on port 9876...
Received UDP Datagram: Ping UDP Titan
Reply sent to 127.0.0.1:52134

[CLIENT CONSOLE]
UDP Datagram sent: Ping UDP Titan
Received from Server: UDP-ACK: PING UDP TITAN`,
    lineByLine: [
      { lines: 'DatagramSocket serverSocket = new DatagramSocket(port)', explanation: 'Creates a datagram socket bound to the specified UDP port.' },
      { lines: 'new DatagramPacket(buffer, length)', explanation: 'Packet container for RECEIVING incoming bytes.' },
      { lines: 'new DatagramPacket(buffer, length, ip, port)', explanation: 'Packet container for SENDING bytes with explicit destination addressing.' },
      { lines: 'serverSocket.receive(packet) and send(packet)', explanation: 'Unreliable datagram I/O primitives without connection state.' }
    ],
    scoringTips: [
      'Note that DatagramSocket() on the client does NOT take a port in its constructor; OS picks an ephemeral port automatically.',
      'Explicitly distinguish DatagramPacket constructor for receiving (2 arguments: buffer, length) vs sending (4 arguments: buffer, length, IP, port).'
    ]
  }
];
