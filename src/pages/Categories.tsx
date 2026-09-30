import { categories } from '@/data/categories'
import { Seo } from '@/components/common/Seo'
import { CategoryCard } from '@/components/course/CategoryCard'

export default function Categories() {
  return (
    <div className="container-page py-10 sm:py-14">
      <Seo title="Categories" description="Explore Learnify course categories: programming, design, business, AI, marketing, data science, and more." />
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Categories</h1>
        <p className="mt-2 text-lg text-fg-muted">Pick a topic to see every course in that area.</p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} detailed />
          </li>
        ))}
      </ul>
    </div>
  )
}
