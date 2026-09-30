import type { ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'
import {
  countActiveFilters,
  durationOptions,
  levelOptions,
  priceOptions,
  ratingOptions,
  type CourseFilters,
} from '@/lib/courseFilters'
import { Button } from '@/components/common/Button'
import { Checkbox } from '@/components/common/Checkbox'

interface CourseFilterPanelProps {
  filters: CourseFilters
  onChange: (patch: Partial<CourseFilters>) => void
  onReset: () => void
}

function FilterGroup({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="border-b border-line py-5 first:pt-0 last:border-0">
      <legend className="mb-3 text-sm font-bold">{legend}</legend>
      <div className="space-y-2.5">{children}</div>
    </fieldset>
  )
}

function Radio<T extends string | number>({
  name,
  value,
  current,
  label,
  onSelect,
}: {
  name: string
  value: T
  current: T
  label: string
  onSelect: (value: T) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-fg-muted hover:text-fg">
      <input
        type="radio"
        name={name}
        checked={current === value}
        onChange={() => onSelect(value)}
        className="size-4.5 cursor-pointer accent-brand-600"
      />
      {label}
    </label>
  )
}

/** Sidebar / drawer content for filtering the catalogue. Fully controlled by the page. */
export function CourseFilterPanel({ filters, onChange, onReset }: CourseFilterPanelProps) {
  const activeCount = countActiveFilters(filters)
  const toggleLevel = (level: (typeof levelOptions)[number]) =>
    onChange({
      levels: filters.levels.includes(level)
        ? filters.levels.filter((item) => item !== level)
        : [...filters.levels, level],
    })

  return (
    <div>
      <FilterGroup legend="Level">
        {levelOptions.map((level) => (
          <Checkbox
            key={level}
            label={level}
            checked={filters.levels.includes(level)}
            onChange={() => toggleLevel(level)}
          />
        ))}
      </FilterGroup>
      <FilterGroup legend="Rating">
        {ratingOptions.map((option) => (
          <Radio
            key={option.value}
            name="rating"
            value={option.value}
            current={filters.minRating}
            label={option.label}
            onSelect={(minRating) => onChange({ minRating })}
          />
        ))}
      </FilterGroup>
      <FilterGroup legend="Duration">
        {durationOptions.map((option) => (
          <Radio
            key={option.value}
            name="duration"
            value={option.value}
            current={filters.duration}
            label={option.label}
            onSelect={(duration) => onChange({ duration })}
          />
        ))}
      </FilterGroup>
      <FilterGroup legend="Price">
        {priceOptions.map((option) => (
          <Radio
            key={option.value}
            name="price"
            value={option.value}
            current={filters.price}
            label={option.label}
            onSelect={(price) => onChange({ price })}
          />
        ))}
      </FilterGroup>
      <Button
        variant="outline"
        fullWidth
        onClick={onReset}
        disabled={activeCount === 0}
        leftIcon={<RotateCcw className="size-4" />}
        className="mt-2"
      >
        Reset filters{activeCount > 0 ? ` (${activeCount})` : ''}
      </Button>
    </div>
  )
}
