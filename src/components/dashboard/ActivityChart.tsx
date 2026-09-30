import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, type TooltipContentProps } from 'recharts'
import type { WeeklyActivityPoint } from '@/lib/stats'

function ChartTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2 text-sm shadow-pop">
      <p className="font-semibold text-fg-muted">{label}</p>
      <p className="font-extrabold text-fg">{Number(payload[0].value)}h learned</p>
    </div>
  )
}

/** Weekly learning hours. Colours come from CSS variables so the chart follows light/dark mode. */
export function ActivityChart({ data }: { data: WeeklyActivityPoint[] }) {
  const total = data.reduce((sum, point) => sum + point.hours, 0)
  const summary = data.map((point) => `${point.day} ${point.hours} hours`).join(', ')
  const max = Math.max(4, ...data.map((point) => point.hours))

  return (
    <div>
      <p className="mb-1 text-sm text-fg-muted">
        <span className="text-2xl font-extrabold text-fg">{Math.round(total * 10) / 10}h</span> in the last 7 days
      </p>
      <div role="img" aria-label={`Learning hours per day: ${summary}`} className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 4, bottom: 0, left: -24 }} barCategoryGap="28%">
            <defs>
              <linearGradient id="bar-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand-400)" />
                <stop offset="100%" stopColor="var(--color-brand-600)" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: 'var(--fg-subtle)', fontSize: 12 }} />
            <YAxis
              tickLine={false}
              axisLine={false}
              domain={[0, Math.ceil(max)]}
              allowDecimals={false}
              tickFormatter={(value: number) => `${value}h`}
              tick={{ fill: 'var(--fg-subtle)', fontSize: 12 }}
            />
            <Tooltip content={ChartTooltip} cursor={{ fill: 'var(--surface-muted)' }} />
            <Bar dataKey="hours" fill="url(#bar-gradient)" radius={[8, 8, 4, 4]} maxBarSize={44} isAnimationActive />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Learning hours in the last 7 days</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Hours</th>
          </tr>
        </thead>
        <tbody>
          {data.map((point) => (
            <tr key={point.key}>
              <th scope="row">{point.day}</th>
              <td>{point.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
