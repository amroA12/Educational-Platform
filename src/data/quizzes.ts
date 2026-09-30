import type { Quiz, QuizQuestion } from '@/types'

/** Compact authoring helper: question, options, index of the right answer, explanation. */
const q = (
  quizId: string,
  n: number,
  text: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): QuizQuestion => ({ id: `${quizId}-q${n}`, text, options, correctIndex, explanation })

const reactQuiz = 'react-fundamentals'
const jsQuiz = 'javascript-essentials'
const tsQuiz = 'typescript-types'
const uxQuiz = 'ux-foundations'
const pyQuiz = 'python-data-basics'
const aiQuiz = 'ai-concepts'

export const quizzes: Quiz[] = [
  {
    id: reactQuiz,
    courseId: 'complete-react-developer',
    title: 'React Fundamentals Quiz',
    description: 'Check your understanding of JSX, components, state, and hooks.',
    timeLimitMinutes: 15,
    passingScore: 70,
    questions: [
      q(reactQuiz, 1, 'What is JSX?', ['A database', 'A JavaScript syntax extension that looks like HTML', 'A CSS framework', 'A backend language'], 1, 'JSX is a syntax extension that lets you describe UI structure inside JavaScript. It is compiled to regular function calls.'),
      q(reactQuiz, 2, 'Which hook do you use to add local state to a function component?', ['useEffect', 'useRef', 'useState', 'useContext'], 2, 'useState returns the current state value and a setter function to update it.'),
      q(reactQuiz, 3, 'How does a parent component pass data to a child?', ['Through props', 'Through global variables only', 'By calling the child as a regular function', 'With the DOM API'], 0, 'Props are the read-only inputs a parent passes down to its children.'),
      q(reactQuiz, 4, 'Why do list items rendered with map() need a stable key?', ['To style them individually', 'To help React identify which items changed, were added, or removed', 'Because JSX requires it for every element', 'To make them clickable'], 1, 'Keys let React match elements between renders, so it can update lists efficiently and preserve state correctly.'),
      q(reactQuiz, 5, 'When does useEffect with an empty dependency array ([]) run?', ['After every render', 'Only before the first render', 'Once, after the initial render', 'Never'], 2, 'An empty dependency array means the effect has no reactive dependencies, so it runs after the first render (and cleans up on unmount).'),
      q(reactQuiz, 6, 'What is the correct way to update an object held in state?', ['Mutate the object directly, then call the setter', 'Create a new object with the updated values and pass it to the setter', 'Reassign the state variable', 'Use document.querySelector'], 1, 'React compares state by reference. Always produce a new object or array instead of mutating the old one.'),
      q(reactQuiz, 7, 'What problem does Context help solve?', ['Slow network requests', 'Prop drilling through many component layers', 'Writing CSS', 'Routing between pages'], 1, 'Context lets you share values with deeply nested components without passing props through every level.'),
      q(reactQuiz, 8, 'What does React.memo do?', ['Stores data in localStorage', 'Skips re-rendering a component when its props have not changed', 'Makes network requests faster', 'Converts a component to a class'], 1, 'React.memo memoizes a component so it only re-renders when its props change.'),
      q(reactQuiz, 9, 'Which statement about custom hooks is true?', ['They must start with "use" and can call other hooks', 'They can only be used once per app', 'They replace components', 'They run on the server only'], 0, 'Custom hooks are functions whose names start with "use" and that can call other hooks to share stateful logic.'),
      q(reactQuiz, 10, 'Which is the best place to fetch data when a component first appears?', ['Directly in the function body', 'Inside an event handler that never runs', 'Inside useEffect (or a data library built on it)', 'Inside JSX attributes'], 2, 'Side effects such as data fetching should not run during render. useEffect (or a data-fetching library) is the right place.'),
    ],
  },
  {
    id: jsQuiz,
    courseId: 'modern-javascript-mastery',
    title: 'JavaScript Essentials Quiz',
    description: 'Test your knowledge of scope, async code, and modern syntax.',
    timeLimitMinutes: 12,
    passingScore: 70,
    questions: [
      q(jsQuiz, 1, 'Which keyword declares a block-scoped variable that can be reassigned?', ['var', 'let', 'const', 'static'], 1, 'let is block-scoped and reassignable. const is block-scoped but cannot be reassigned.'),
      q(jsQuiz, 2, 'What does the following evaluate to? typeof null', ['"null"', '"undefined"', '"object"', '"number"'], 2, 'typeof null returns "object", a long-standing quirk of the language.'),
      q(jsQuiz, 3, 'What is a closure?', ['A function bundled with references to its surrounding scope', 'A way to close a browser tab', 'A type of loop', 'A private class field'], 0, 'A closure gives a function access to variables from the scope where it was created, even after that scope has finished.'),
      q(jsQuiz, 4, 'Which method creates a new array by transforming each element?', ['forEach', 'filter', 'map', 'reduce'], 2, 'map returns a new array containing the results of calling the callback on every element.'),
      q(jsQuiz, 5, 'What does the nullish coalescing operator (??) return?', ['The right side if the left side is falsy', 'The right side only if the left side is null or undefined', 'Always the left side', 'A boolean'], 1, '?? falls back only for null or undefined, unlike || which also falls back for 0, "" and false.'),
      q(jsQuiz, 6, 'What does await do inside an async function?', ['Blocks the entire browser', 'Pauses the function until the promise settles, without blocking the thread', 'Cancels the promise', 'Converts a promise into a callback'], 1, 'await suspends the async function and lets other code run until the promise resolves or rejects.'),
      q(jsQuiz, 7, 'Which of these correctly destructures the property "name" from a user object?', ['const [name] = user', 'const { name } = user', 'const name = { user }', 'const name() = user'], 1, 'Object destructuring uses curly braces to pull properties by name.'),
      q(jsQuiz, 8, 'In the event loop, which runs first after the current synchronous code finishes?', ['setTimeout callbacks', 'Promise microtasks', 'Rendering', 'XHR callbacks'], 1, 'Microtasks such as promise callbacks run before the next macrotask like setTimeout.'),
    ],
  },
  {
    id: tsQuiz,
    courseId: 'advanced-typescript',
    title: 'TypeScript Types Quiz',
    description: 'Challenge yourself on generics, narrowing, and advanced types.',
    timeLimitMinutes: 12,
    passingScore: 75,
    questions: [
      q(tsQuiz, 1, 'What does the "unknown" type force you to do before using a value?', ['Nothing, it behaves like any', 'Narrow the type with a check', 'Cast it to string', 'Convert it to JSON'], 1, 'unknown is the type-safe counterpart of any: you must narrow it before performing operations on it.'),
      q(tsQuiz, 2, 'Which utility type makes every property of T optional?', ['Required<T>', 'Readonly<T>', 'Partial<T>', 'Pick<T>'], 2, 'Partial<T> maps every property to optional.'),
      q(tsQuiz, 3, 'What is a discriminated union?', ['A union whose members share a literal property used to tell them apart', 'A union of only string types', 'A type that excludes null', 'An intersection of interfaces'], 0, 'A shared literal "tag" property lets TypeScript narrow the union inside conditionals and switch statements.'),
      q(tsQuiz, 4, 'What does the satisfies operator do?', ['Casts a value to a type', 'Checks a value against a type without widening its inferred type', 'Makes a value readonly', 'Removes null from a type'], 1, 'satisfies validates that an expression matches a type while preserving its more specific inferred type.'),
      q(tsQuiz, 5, 'In a generic function <T extends { id: string }>(item: T), what does "extends" express?', ['Inheritance at runtime', 'A constraint: T must have at least an id string', 'That T is a class', 'That T is optional'], 1, 'The constraint restricts which types can be supplied for T.'),
      q(tsQuiz, 6, 'What is the result of keyof { a: number; b: string }?', ['"a" | "b"', 'string', 'number | string', '["a", "b"]'], 0, 'keyof produces a union of the property names as string literal types.'),
      q(tsQuiz, 7, 'Which conditional type correctly extracts the element type of an array T?', ['T extends (infer U)[] ? U : never', 'T[number] ? U', 'T extends U[] ? never : U', 'infer T[]'], 0, 'Using infer inside a conditional type lets TypeScript capture the element type.'),
      q(tsQuiz, 8, 'Why enable "strict": true in tsconfig?', ['It makes code run faster', 'It enables a family of stricter checks, including strictNullChecks', 'It removes type annotations', 'It enables JSX'], 1, 'Strict mode turns on several checks that catch common bugs, like unhandled null or undefined values.'),
    ],
  },
  {
    id: uxQuiz,
    courseId: 'ui-ux-design-fundamentals',
    title: 'UX Foundations Quiz',
    description: 'Review research methods, visual hierarchy, and usability principles.',
    timeLimitMinutes: 10,
    passingScore: 70,
    questions: [
      q(uxQuiz, 1, 'What is the main goal of user research?', ['To make the product look attractive', 'To understand user needs, behaviours, and pain points', 'To write documentation', 'To choose a colour palette'], 1, 'Research replaces assumptions with evidence about the people you are designing for.'),
      q(uxQuiz, 2, 'Which is the best example of visual hierarchy?', ['Making every element the same size', 'Using size, weight, and contrast to guide attention to key content', 'Using as many colours as possible', 'Centering all text'], 1, 'Hierarchy directs the eye to the most important elements first through size, contrast, and spacing.'),
      q(uxQuiz, 3, 'What is a persona?', ['A real customer interview transcript', 'A fictional but research-based profile representing a user group', 'A visual style guide', 'A type of wireframe'], 1, 'Personas summarise goals and behaviours of a user segment to keep design decisions user-centred.'),
      q(uxQuiz, 4, 'What is the recommended minimum contrast ratio for normal body text under WCAG AA?', ['2:1', '3:1', '4.5:1', '10:1'], 2, 'WCAG AA requires 4.5:1 for normal text and 3:1 for large text.'),
      q(uxQuiz, 5, 'In Figma, what does Auto Layout primarily help with?', ['Exporting code', 'Creating responsive frames that adapt to their content', 'Recording user sessions', 'Managing version control'], 1, 'Auto Layout lets frames resize and reflow as their content changes.'),
      q(uxQuiz, 6, 'How many users typically reveal most major usability problems in a qualitative test round?', ['1', 'About 5', 'About 500', 'Exactly 50'], 1, 'Testing with around five users per round surfaces the majority of recurring usability issues, so you can iterate quickly.'),
      q(uxQuiz, 7, 'Which practice makes an interface more accessible?', ['Relying on colour alone to show errors', 'Providing text labels and visible focus states', 'Removing all keyboard support', 'Using very light grey text'], 1, 'Labels and focus indicators help keyboard and assistive-technology users and do not rely on colour alone.'),
      q(uxQuiz, 8, 'What is a prototype used for?', ['Shipping to production', 'Simulating interactions to test ideas before building them', 'Storing user data', 'Replacing research'], 1, 'Prototypes let you validate flows and ideas cheaply before engineering investment.'),
    ],
  },
  {
    id: pyQuiz,
    courseId: 'python-for-data-analysis',
    title: 'Python Data Basics Quiz',
    description: 'A quick check on Python, Pandas, and data cleaning fundamentals.',
    timeLimitMinutes: 10,
    passingScore: 70,
    questions: [
      q(pyQuiz, 1, 'Which library provides the DataFrame structure?', ['NumPy', 'Pandas', 'Matplotlib', 'Requests'], 1, 'Pandas provides the DataFrame, a labelled two-dimensional table.'),
      q(pyQuiz, 2, 'Which method shows the first five rows of a DataFrame df?', ['df.top()', 'df.first()', 'df.head()', 'df.peek()'], 2, 'df.head() returns the first n rows, five by default.'),
      q(pyQuiz, 3, 'How do you select rows where the "sales" column is greater than 100?', ['df.filter(sales > 100)', 'df[df["sales"] > 100]', 'df.where("sales" > 100)', 'df.select(sales > 100)'], 1, 'Boolean indexing uses a condition inside square brackets to filter rows.'),
      q(pyQuiz, 4, 'Which method counts missing values per column?', ['df.isnull().sum()', 'df.missing()', 'df.count_na()', 'df.blank()'], 0, 'isnull() flags missing values and sum() counts them per column.'),
      q(pyQuiz, 5, 'What does df.groupby("region")["sales"].mean() return?', ['The mean sales for each region', 'The total sales', 'The number of regions', 'A sorted DataFrame'], 0, 'groupby splits the data by region, then mean() is applied to the sales column of each group.'),
      q(pyQuiz, 6, 'Which chart type is best for showing the distribution of a single numeric variable?', ['Pie chart', 'Histogram', 'Line chart of unrelated values', 'Word cloud'], 1, 'Histograms show how values are distributed across ranges.'),
      q(pyQuiz, 7, 'What is a NumPy array primarily good at?', ['Fast numerical operations on homogeneous data', 'Storing HTML pages', 'Making HTTP requests', 'Drawing shapes'], 0, 'NumPy arrays enable fast, vectorised numerical computation.'),
      q(pyQuiz, 8, 'What is the purpose of exploratory data analysis (EDA)?', ['Deploying a model', 'Understanding data patterns, quality, and relationships before modelling', 'Encrypting data', 'Replacing statistics'], 1, 'EDA helps you understand the data and form hypotheses before deeper analysis.'),
    ],
  },
  {
    id: aiQuiz,
    courseId: 'introduction-to-artificial-intelligence',
    title: 'AI Concepts Quiz',
    description: 'See how well you understand the fundamentals of modern AI.',
    timeLimitMinutes: 10,
    passingScore: 70,
    questions: [
      q(aiQuiz, 1, 'Machine learning is best described as:', ['Programming every rule by hand', 'Systems that learn patterns from data', 'A type of database', 'A hardware component'], 1, 'Machine learning algorithms learn statistical patterns from examples rather than following hand-written rules.'),
      q(aiQuiz, 2, 'What is the role of training data?', ['It is used to display results', 'It is what a model learns patterns from', 'It stores the final product', 'It encrypts the model'], 1, 'The quality and diversity of training data strongly shape what a model can do and where it fails.'),
      q(aiQuiz, 3, 'Which architecture powers most modern large language models?', ['Transformers', 'Decision stumps', 'Linear regression', 'Bloom filters'], 0, 'Transformers use attention mechanisms to model relationships between tokens in a sequence.'),
      q(aiQuiz, 4, 'What is "hallucination" in the context of language models?', ['A hardware fault', 'Fluent output that is factually incorrect or unsupported', 'A user interface bug', 'A type of encryption'], 1, 'Models can generate plausible text that is not grounded in facts, so important outputs should be verified.'),
      q(aiQuiz, 5, 'Which is an example of bias in AI systems?', ['A model performing worse for groups under-represented in training data', 'A model running too slowly', 'A model using a lot of memory', 'A model with a long name'], 0, 'Unbalanced or unrepresentative data can cause systematically unfair outcomes for some groups.'),
      q(aiQuiz, 6, 'What does "deep" refer to in deep learning?', ['Models that are hard to understand', 'Neural networks with many layers', 'Data stored deep in a database', 'Very long training sessions'], 1, 'Deep learning uses neural networks with multiple layers to learn hierarchical representations.'),
      q(aiQuiz, 7, 'Which question is most useful when evaluating an AI tool for work?', ['Does it have the flashiest demo?', 'Does it solve a real problem reliably, safely, and measurably?', 'Does it use the newest buzzwords?', 'Is it the most expensive?'], 1, 'Evaluate AI tools against concrete outcomes, reliability, data privacy, and cost.'),
      q(aiQuiz, 8, 'Computer vision systems are designed to:', ['Interpret images and video', 'Translate speech only', 'Write documentation', 'Manage databases'], 0, 'Computer vision enables machines to extract meaning from visual inputs.'),
    ],
  },
]

export const getQuizByCourse = (courseId: string) => quizzes.find((quiz) => quiz.courseId === courseId)
