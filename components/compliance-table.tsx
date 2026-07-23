import { complianceRows, type RateTone } from "@/lib/data"

const rateToneClasses: Record<RateTone, string> = {
  green: "text-emerald-500",
  amber: "text-amber-500",
  red: "text-red-500",
}

export function ComplianceTable() {
  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-card-foreground">
          Compliance by SOP
        </h2>
        <p className="text-xs text-muted-foreground">
          Pass rates and overdue counts per procedure
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th scope="col" className="px-5 py-3 font-medium">
                SOP
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Assigned
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Passed
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Pass Rate
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Overdue
              </th>
            </tr>
          </thead>
          <tbody>
            {complianceRows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
              >
                <td className="px-5 py-3.5 font-medium text-card-foreground">
                  {row.sop}
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">
                  {row.assigned}
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">
                  {row.passed}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`font-semibold ${rateToneClasses[row.passRateTone]}`}
                  >
                    {row.passRate}%
                  </span>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">
                  {row.overdue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
