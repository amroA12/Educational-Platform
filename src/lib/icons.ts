import {
  Award,
  BookOpen,
  Bookmark,
  Brain,
  Briefcase,
  Camera,
  ChartColumn,
  ClipboardCheck,
  Clock,
  Code,
  Crown,
  Flame,
  Megaphone,
  Palette,
  Rocket,
  Sprout,
  Target,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import type { AchievementIcon, CategoryIcon } from '@/types'

export const categoryIcons: Record<CategoryIcon, LucideIcon> = {
  code: Code,
  palette: Palette,
  briefcase: Briefcase,
  brain: Brain,
  megaphone: Megaphone,
  chart: ChartColumn,
  sprout: Sprout,
  camera: Camera,
}

export const achievementIcons: Record<AchievementIcon, LucideIcon> = {
  rocket: Rocket,
  clipboard: ClipboardCheck,
  book: BookOpen,
  flame: Flame,
  crown: Crown,
  award: Award,
  zap: Zap,
  target: Target,
  clock: Clock,
  bookmark: Bookmark,
}
