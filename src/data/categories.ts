import type { Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'programming',
    name: 'Programming',
    description: 'Build web and software products with modern languages and frameworks.',
    icon: 'code',
    tone: 'violet',
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Craft intuitive interfaces and memorable brand experiences.',
    icon: 'palette',
    tone: 'pink',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Make better decisions with analytics, strategy, and product thinking.',
    icon: 'briefcase',
    tone: 'blue',
  },
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    description: 'Understand and apply modern AI, from fundamentals to generative tools.',
    icon: 'brain',
    tone: 'teal',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Grow audiences and revenue with data-driven digital marketing.',
    icon: 'megaphone',
    tone: 'orange',
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Turn raw data into insight with Python, statistics, and machine learning.',
    icon: 'chart',
    tone: 'emerald',
  },
  {
    id: 'personal-development',
    name: 'Personal Development',
    description: 'Build focus, habits, and systems that help you grow sustainably.',
    icon: 'sprout',
    tone: 'amber',
  },
  {
    id: 'photography',
    name: 'Photography',
    description: 'Learn to see light, compose confidently, and edit like a pro.',
    icon: 'camera',
    tone: 'rose',
  },
]

export const getCategory = (id: string) => categories.find((category) => category.id === id)
