'use client'

/**
 * ScheduleTable — renders a weekly workout schedule.
 *
 * Shows a full HTML table on desktop (lg+) and stacked cards on mobile/tablet.
 * Rest days use a simplified layout with a "colSpan" on desktop.
 */
interface ScheduleRow {
  isRest?: boolean
  day: string
  exercise: string
  sets?: string
  reps?: string
  muscle?: string
}

interface ScheduleTableProps {
  title: string
  headers: string[]
  rows: ScheduleRow[]
}

export default function ScheduleTable({ title, headers, rows }: ScheduleTableProps) {
  return (
    <div className="reveal">
      <h3 className="font-bold text-2xl mb-6 text-center text-white">{title}</h3>

      {/* Desktop: full HTML table */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-white/10">
        <table className="workout-table">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.isRest ? (
                  <>
                    <td className="font-bold text-white/50">{row.day}</td>
                    <td colSpan={4} className="text-center text-accent-light font-bold">
                      {row.exercise}
                    </td>
                  </>
                ) : (
                  <>
                    <td className="font-bold text-accent-light">{row.day}</td>
                    <td className="text-white/80">{row.exercise}</td>
                    <td className="text-white/80">{row.sets}</td>
                    <td className="text-white/80">{row.reps}</td>
                    <td className="text-white/80">{row.muscle}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet: stacked cards */}
      <div className="lg:hidden grid gap-2 sm:gap-3">
        {rows.map((row, i) =>
          row.isRest ? (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center justify-between" >
              <span className="font-bold text-white/50">{row.day}</span>
              <span className="text-accent-light font-bold">{row.exercise}</span>
            </div>
          ) : (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3" >
              <div className="flex items-center justify-between">
                <span className="font-bold text-accent-light">{row.day}</span>
                <span className="text-xs text-white/40 bg-white/5 px-2.5 py-1 rounded-full">
                  {row.sets}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">{row.exercise}</span>
                <span className="text-white/60">{row.reps}</span>
              </div>
              <div className="text-xs text-white/40 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-accent/50" />
                {row.muscle}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
