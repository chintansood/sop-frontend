import { complianceSummary, type RateTone } from "@/lib/data"

const toneClasses: Record<RateTone, { value: string; bar: string }> = {
  green: { value: "text-emerald-500", bar: "bg-emerald-500" },
  amber: { value: "text-amber-500", bar: "bg-amber-500" },
  red: { value: "text-red-500", bar: "bg-red-500" },
}

export function ComplianceStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {complianceSummary.map((item) => {
        const tone = toneClasses[item.tone]
        return (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {item.label}
            </p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className={`text-3xl font-semibold ${tone.value}`}>
                {item.value}%
              </span>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full ${tone.bar}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Compliance rate
            </p>
          </div>
        )
      })}
    </div>
  )
}
