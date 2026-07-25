"use client"

import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { apiFetch } from "@/lib/api"

interface SOPReport {
  sopId: string
  title: string
  category: string
  total: number
  passed: number
  overdue: number
  passRate: number
}

interface DeptReport {
  departmentId: string
  departmentName: string
  staffCount: number
  total: number
  passed: number
  overdue: number
  passRate: number
}

interface Overview {
  compliancePercentage: number
  passedAssignments: number
  overdueAssignments: number
  totalAssignments: number
}

function rateColor(rate: number) {
  if (rate >= 80) return "text-success"
  if (rate >= 60) return "text-warning"
  return "text-destructive"
}

export default function CompliancePage() {
  const [overview, setOverview]   = useState<Overview | null>(null)
  const [sops, setSops]           = useState<SOPReport[]>([])
  const [depts, setDepts]         = useState<DeptReport[]>([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    Promise.all([
      apiFetch("/api/v1/reports/overview"),
      apiFetch("/api/v1/reports/by-sop"),
      apiFetch("/api/v1/reports/by-department"),
    ]).then(([ov, sopData, deptData]) => {
      setOverview(ov)
      setSops(sopData.sops ?? [])
      setDepts(deptData.departments ?? [])
    }).catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex min-h-screen bg-background pt-14 md:pt-0">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Compliance report</h1>
            <p className="text-sm text-muted-foreground">School-wide SOP compliance overview</p>
          </div>
          <button className="flex items-center gap-2 rounded-md border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            <Download className="size-4" />
            Export CSV
          </button>
        </header>

        <main className="flex-1 space-y-6 p-6">
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading report...</div>
          ) : (
            <>
              {/* Overview stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Overall compliance</p>
                  <p className={`mt-1 text-3xl font-bold ${rateColor(overview?.compliancePercentage ?? 0)}`}>
                    {overview?.compliancePercentage ?? 0}%
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Total passed</p>
                  <p className="mt-1 text-3xl font-bold text-success">{overview?.passedAssignments ?? 0}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="mt-1 text-3xl font-bold text-destructive">{overview?.overdueAssignments ?? 0}</p>
                </div>
              </div>

              {/* By SOP table */}
              <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border px-5 py-4">
                  <h2 className="font-medium text-foreground">Compliance by SOP</h2>
                  <p className="text-sm text-muted-foreground">Pass rate per standard operating procedure</p>
                </div>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs text-muted-foreground">
                      <th className="px-5 py-3 font-medium">SOP</th>
                      <th className="px-5 py-3 font-medium">Assigned</th>
                      <th className="px-5 py-3 font-medium">Passed</th>
                      <th className="px-5 py-3 font-medium">Pass rate</th>
                      <th className="px-5 py-3 font-medium">Overdue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sops.length === 0 ? (
                      <tr><td colSpan={5} className="px-5 py-6 text-muted-foreground">No data yet</td></tr>
                    ) : sops.map(sop => (
                      <tr key={sop.sopId} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-foreground">{sop.title}</p>
                          <p className="text-xs text-muted-foreground">{sop.category}</p>
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground">{sop.total}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{sop.passed}</td>
                        <td className={`px-5 py-3.5 font-medium ${rateColor(sop.passRate)}`}>{sop.passRate}%</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{sop.overdue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* By department */}
              <div>
                <h2 className="mb-3 font-medium text-foreground">Compliance by department</h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {depts.filter(d => d.staffCount > 0).map(dept => (
                    <div key={dept.departmentId} className="rounded-xl border border-border bg-card p-4">
                      <p className="text-sm text-muted-foreground">{dept.departmentName}</p>
                      <p className={`mt-1 text-3xl font-bold ${rateColor(dept.passRate)}`}>{dept.passRate}%</p>
                      <p className="mt-1 text-xs text-muted-foreground">{dept.staffCount} staff · {dept.passed}/{dept.total} passed</p>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className={`h-full rounded-full ${dept.passRate >= 80 ? "bg-success" : dept.passRate >= 60 ? "bg-warning" : "bg-destructive"}`}
                          style={{ width: `${dept.passRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
