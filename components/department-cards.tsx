import { departmentCompliance } from "@/lib/data"

function barColor(value: number) {
  if (value >= 75) return "bg-emerald-500"
  if (value >= 60) return "bg-amber-500"
  return "bg-red-500"
}

export function DepartmentCards() {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold text-foreground">
        By Department
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {departmentCompliance.map((dept) => (
          <div
            key={dept.id}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-card-foreground">
                {dept.name}
              </p>
              <span className="text-sm font-semibold text-muted-foreground">
                {dept.value}%
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full ${barColor(dept.value)}`}
                style={{ width: `${dept.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
