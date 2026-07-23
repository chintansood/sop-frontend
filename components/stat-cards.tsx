import { TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"
import { stats } from "@/lib/data"

function OverallComplianceCard() {
  const value = stats.overallCompliance
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          Overall Compliance
        </p>
        <TrendingUp className="size-4 text-emerald-600" />
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-semibold text-card-foreground">
          {value}%
        </span>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Across all active assignments
      </p>
    </div>
  )
}

function StatCard({
  label,
  value,
  caption,
  icon: Icon,
  iconClass,
}: {
  label: string
  value: number
  caption: string
  icon: typeof AlertTriangle
  iconClass: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <Icon className={iconClass} />
      </div>
      <div className="mt-3">
        <span className="text-3xl font-semibold text-card-foreground">
          {value}
        </span>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">{caption}</p>
    </div>
  )
}

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <OverallComplianceCard />
      <StatCard
        label="Overdue"
        value={stats.overdue}
        caption="Assignments past due date"
        icon={AlertTriangle}
        iconClass="size-4 text-red-500"
      />
      <StatCard
        label="Passed"
        value={stats.passed}
        caption="Completed and verified"
        icon={CheckCircle2}
        iconClass="size-4 text-emerald-600"
      />
    </div>
  )
}
