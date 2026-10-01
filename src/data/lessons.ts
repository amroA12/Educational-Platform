import type { CourseModule, Lesson, LessonType } from '@/types'

/** [title, minutes, type?] — type defaults to "video". */
type LessonSeed = [title: string, minutes: number, type?: LessonType]
type ModuleSeed = [title: string, lessons: LessonSeed[]]

const curricula: Record<string, ModuleSeed[]> = {
  'complete-react-developer': [
    [
      'Introduction to React',
      [
        ['Welcome to the course', 4],
        ['How React thinks about user interfaces', 11],
        ['Setting up Vite and your editor', 9],
        ['Your first component', 12],
      ],
    ],
    [
      'React Fundamentals',
      [
        ['JSX in depth', 14],
        ['Components and props', 16],
        ['State with useState', 18],
        ['Handling events and forms', 15],
        ['Rendering lists and conditional UI', 13],
      ],
    ],
    [
      'Hooks and Side Effects',
      [
        ['useEffect explained', 19],
        ['Building custom hooks', 17],
        ['useReducer and Context', 21],
        ['Refs and the DOM', 12],
        ['Performance with memo and useMemo', 16],
      ],
    ],
    [
      'Real-World React Apps',
      [
        ['Routing with React Router', 18],
        ['Fetching data like a pro', 20],
        ['Project: build a task dashboard', 35, 'exercise'],
        ['Testing components', 17],
        ['Deploying to production', 10],
      ],
    ],
  ],
  'modern-javascript-mastery': [
    [
      'Language Foundations',
      [
        ['Variables, types and operators', 12],
        ['Functions and scope', 15],
        ['Arrays and objects', 16],
        ['Control flow and loops', 11],
      ],
    ],
    [
      'Modern Syntax',
      [
        ['Destructuring and spread', 13],
        ['Modules and imports', 12],
        ['Template literals and tagged templates', 9, 'reading'],
        ['Optional chaining and nullish coalescing', 10],
      ],
    ],
    [
      'Asynchronous JavaScript',
      [
        ['The event loop demystified', 18],
        ['Promises step by step', 16],
        ['async/await in practice', 17],
        ['Working with the Fetch API', 15],
        ['Error handling patterns', 11],
      ],
    ],
    [
      'Practical Projects',
      [
        ['Building a weather app', 32, 'exercise'],
        ['DOM manipulation essentials', 18],
        ['Writing clean, testable code', 14],
      ],
    ],
  ],
  'advanced-typescript': [
    [
      'Type System Deep Dive',
      [
        ['Structural typing revisited', 14],
        ['Unions, intersections and narrowing', 18],
        ['Generics from the ground up', 20],
        ['Type inference and the satisfies operator', 12],
      ],
    ],
    [
      'Advanced Type Patterns',
      [
        ['Conditional types', 19],
        ['Mapped and template literal types', 18],
        ['Utility types in depth', 15],
        ['Discriminated unions', 13],
      ],
    ],
    [
      'TypeScript in Production',
      [
        ['Typing React components', 17],
        ['Strict config and tsconfig tuning', 10, 'reading'],
        ['Type-safe APIs with Zod', 16],
        ['Refactoring a JavaScript codebase', 30, 'exercise'],
      ],
    ],
  ],
  'ui-ux-design-fundamentals': [
    [
      'Design Thinking',
      [
        ['What makes a great user experience', 10],
        ['User research in practice', 15],
        ['Personas and journey maps', 14],
      ],
    ],
    [
      'Visual Design',
      [
        ['Layout and grids', 16],
        ['Color theory for interfaces', 14],
        ['Typography that works', 15],
        ['Spacing and visual hierarchy', 12],
      ],
    ],
    [
      'Prototyping in Figma',
      [
        ['A tour of the Figma interface', 11],
        ['Components and variants', 18],
        ['Auto layout mastery', 17],
        ['Interactive prototypes', 14],
      ],
    ],
    [
      'Usability and Handoff',
      [
        ['Running usability tests', 16],
        ['Accessibility essentials', 13],
        ['Design handoff and documentation', 10, 'reading'],
        ['Capstone: redesign a mobile app', 40, 'exercise'],
      ],
    ],
  ],
  'brand-identity-design': [
    [
      'Brand Strategy',
      [
        ['Defining brand purpose', 12],
        ['Audience and positioning', 14],
        ['Finding your brand voice', 10],
      ],
    ],
    [
      'Visual Identity',
      [
        ['Logo design principles', 18],
        ['Building a color palette', 13],
        ['Choosing typography systems', 13],
        ['Imagery and iconography', 12],
      ],
    ],
    [
      'Brand in Practice',
      [
        ['Creating brand guidelines', 20],
        ['Designing social and marketing assets', 17],
        ['Presenting work to clients', 11],
        ['Project: rebrand a local business', 38, 'exercise'],
      ],
    ],
  ],
  'python-for-data-analysis': [
    [
      'Python Essentials',
      [
        ['Setting up Python with Jupyter', 9],
        ['Data types and control flow', 14],
        ['Functions and modules', 13],
      ],
    ],
    [
      'Working with Data',
      [
        ['NumPy arrays', 16],
        ['Pandas DataFrames', 19],
        ['Cleaning messy data', 18],
        ['Merging and grouping datasets', 17],
      ],
    ],
    [
      'Visualization and Insight',
      [
        ['Plotting with Matplotlib', 15],
        ['Storytelling with Seaborn', 14],
        ['Exploratory data analysis', 22],
        ['Project: analyse a sales dataset', 35, 'exercise'],
      ],
    ],
  ],
  'machine-learning-foundations': [
    [
      'Core Concepts',
      [
        ['Supervised vs unsupervised learning', 12],
        ['The machine learning workflow', 11],
        ['Bias, variance and overfitting', 16],
      ],
    ],
    [
      'Models That Matter',
      [
        ['Linear and logistic regression', 20],
        ['Decision trees and random forests', 19],
        ['Clustering with k-means', 15],
        ['Evaluating your models', 17],
      ],
    ],
    [
      'Applied Machine Learning',
      [
        ['Feature engineering', 18],
        ['Scikit-learn pipelines', 16],
        ['Model deployment basics', 13],
        ['Project: predict customer churn', 40, 'exercise'],
      ],
    ],
  ],
  'introduction-to-artificial-intelligence': [
    [
      'The AI Landscape',
      [
        ['What AI is (and is not)', 10],
        ['A short history of AI', 12],
        ['Machine learning vs deep learning', 13],
      ],
    ],
    [
      'How Modern AI Works',
      [
        ['Neural networks explained', 18],
        ['Language models and transformers', 20],
        ['Computer vision basics', 15],
      ],
    ],
    [
      'AI in the Real World',
      [
        ['Responsible AI and ethics', 14],
        ['AI in business workflows', 12],
        ['Evaluating AI tools', 10],
        ['Your AI learning roadmap', 8, 'reading'],
      ],
    ],
  ],
  'generative-ai-for-professionals': [
    [
      'Prompting Fundamentals',
      [
        ['How large language models generate text', 13],
        ['Anatomy of a great prompt', 15],
        ['Few-shot and chain-of-thought prompting', 16],
      ],
    ],
    [
      'Building with LLMs',
      [
        ['Calling model APIs', 18],
        ['Structured outputs and function calling', 17],
        ['Retrieval-augmented generation', 21],
        ['Guardrails and evaluation', 14],
      ],
    ],
    [
      'Productivity Workflows',
      [
        ['Automating research and writing', 15],
        ['Project: build a personal AI assistant', 28, 'exercise'],
        ['Privacy and safe usage', 9, 'reading'],
      ],
    ],
  ],
  'digital-marketing-strategy': [
    [
      'Marketing Foundations',
      [
        ['The modern marketing funnel', 12],
        ['Know your customer', 14],
        ['Setting goals and KPIs', 10],
      ],
    ],
    [
      'Channels and Tactics',
      [
        ['SEO essentials', 18],
        ['Content marketing that converts', 16],
        ['Email marketing and automation', 15],
        ['Paid ads on Google and Meta', 19],
        ['Social media strategy', 14],
      ],
    ],
    [
      'Measure and Optimize',
      [
        ['Analytics with GA4', 17],
        ['A/B testing for marketers', 12],
        ['Project: build your 90-day plan', 24, 'exercise'],
      ],
    ],
  ],
  'business-analytics': [
    [
      'Thinking in Data',
      [
        ['From questions to metrics', 12],
        ['Descriptive statistics in Excel', 16],
        ['Data sources and data quality', 11],
      ],
    ],
    [
      'The Analysis Toolkit',
      [
        ['SQL for analysts', 22],
        ['Pivot tables and dashboards', 15],
        ['Cohort and funnel analysis', 17],
        ['Forecasting basics', 18],
      ],
    ],
    [
      'Decision Making',
      [
        ['Visualizing data for executives', 13],
        ['Telling the story behind the numbers', 12],
        ['Case study: growing a SaaS product', 32, 'exercise'],
      ],
    ],
  ],
  'product-management-essentials': [
    [
      'Product Fundamentals',
      [
        ['What product managers actually do', 10],
        ['Discovering customer problems', 15],
        ['Writing a product vision', 12],
      ],
    ],
    [
      'Planning and Delivery',
      [
        ['Prioritization frameworks', 16],
        ['Roadmaps that teams trust', 14],
        ['Working with engineering', 13],
        ['Agile and sprint rituals', 12],
      ],
    ],
    [
      'Launch and Growth',
      [
        ['Go-to-market planning', 15],
        ['Measuring product success', 14],
        ['Capstone: write a product requirements doc', 30, 'exercise'],
      ],
    ],
  ],
  'photography-masterclass': [
    [
      'Camera Basics',
      [
        ['Understanding your camera', 12],
        ['The exposure triangle', 18],
        ['Focus and depth of field', 14],
      ],
    ],
    [
      'Composition and Light',
      [
        ['Rules of composition', 15],
        ['Working with natural light', 16],
        ['Portraits that feel alive', 18],
        ['Street and travel photography', 14],
      ],
    ],
    [
      'Editing and Workflow',
      [
        ['Lightroom essentials', 20],
        ['Color grading your photos', 16],
        ['Building a portfolio', 10, 'reading'],
        ['Assignment: create a photo essay', 30, 'exercise'],
      ],
    ],
  ],
  'deep-work-productivity': [
    [
      'Focus Foundations',
      [
        ['Why focus is a superpower', 9],
        ['How attention really works', 12],
        ['Designing your environment', 11],
      ],
    ],
    [
      'Systems That Stick',
      [
        ['Time blocking in practice', 13],
        ['Building habits with small steps', 15],
        ['Energy management', 12],
        ['Taming digital distractions', 10],
      ],
    ],
    [
      'Sustainable Growth',
      [
        ['Setting meaningful goals', 14],
        ['The weekly review ritual', 10],
        ['Avoiding burnout', 12],
        ['Project: build your personal operating system', 25, 'exercise'],
      ],
    ],
  ],
}

const describe = (title: string, moduleTitle: string, type: LessonType) => {
  const topic = title.replace(/^(Project|Capstone|Assignment):\s*/, '')
  const lower = topic.charAt(0).toLowerCase() + topic.slice(1)
  if (type === 'exercise') {
    return `Put your skills to work in a guided, hands-on task: ${lower}. You will follow along step by step, then extend the result with your own ideas.`
  }
  if (type === 'reading') {
    return `A concise written guide covering ${lower}. Read it at your own pace and keep it as a reference while you work through "${moduleTitle}".`
  }
  return `In this lesson you will learn ${lower}. We walk through the key ideas with practical examples so you can apply them right away in "${moduleTitle}".`
}

const buildCurriculum = (courseId: string, seeds: ModuleSeed[]): CourseModule[] => {
  let order = 0
  return seeds.map(([title, lessonSeeds], moduleIndex) => {
    const moduleId = `${courseId}-m${moduleIndex + 1}`
    const lessons: Lesson[] = lessonSeeds.map(([lessonTitle, durationMinutes, type = 'video']) => {
      order += 1
      return {
        id: `${courseId}-l${order}`,
        courseId,
        moduleId,
        title: lessonTitle,
        description: describe(lessonTitle, title, type),
        durationMinutes,
        type,
        order,
      }
    })
    return { id: moduleId, courseId, title, lessons }
  })
}

const curriculumCache = new Map<string, CourseModule[]>()

export const getCurriculum = (courseId: string): CourseModule[] => {
  const cached = curriculumCache.get(courseId)
  if (cached) return cached
  const built = buildCurriculum(courseId, curricula[courseId] ?? [])
  curriculumCache.set(courseId, built)
  return built
}

export const getLessons = (courseId: string): Lesson[] =>
  getCurriculum(courseId).flatMap((module) => module.lessons)

export const getLesson = (courseId: string, lessonId: string) =>
  getLessons(courseId).find((lesson) => lesson.id === lessonId)
