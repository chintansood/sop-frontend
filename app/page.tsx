"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Bell } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { AssignmentsTable } from "@/components/assignments-table"
import { apiFetch, getToken } from "@/lib/api"

export default function Page() {
  const [stats, setStats]     = useState({ compliancePercentage: 0, overdueAssignments: 0, passedThisMonth: 0 })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!getToken()) {
      router.push("/login")
      return
    }
    apiFetch("/api/v1/reports/overview")
      .then(setStats)
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex min-h-screen bg-background pt-14 md:pt-0">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Monitor SOP compliance across your school</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input type="search" placeholder="Search..." className="w-56 rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button className="flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="size-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-6">
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Overall compliance</p>
                <p className="mt-1 text-3xl font-bold text-foreground">{stats.compliancePercentage}%</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="mt-1 text-3xl font-bold text-destructive">{stats.overdueAssignments}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">Passed this month</p>
                <p className="mt-1 text-3xl font-bold text-success">{stats.passedThisMonth}</p>
              </div>
            </div>
          )}
          <AssignmentsTable />
        </main>
      </div>
    </div>
  )
}
