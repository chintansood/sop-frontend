"use client"

import { useEffect, useState } from "react"
import { Search, Bell, Plus, MoreHorizontal, Filter } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { apiFetch } from "@/lib/api"

interface User {
  id: string
  fullName: string
  email: string
  role: string
  isActive: boolean
  department: { name: string } | null
}

interface StaffCompliance {
  userId: string
  fullName: string
  email: string
  role: string
  compliancePercentage: number
  totalAssigned: number
  totalPassed: number
  totalOverdue: number
}

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
}

function statusBadge(pct: number, overdue: number) {
  if (overdue > 0) return { label: "Overdue",     dot: "bg-destructive",     text: "text-destructive" }
  if (pct === 100)  return { label: "Compliant",   dot: "bg-success",         text: "text-success" }
  if (pct > 0)      return { label: "In Progress", dot: "bg-primary",         text: "text-primary" }
  return              { label: "Not Started", dot: "bg-muted-foreground", text: "text-muted-foreground" }
}

const avatarColors = [
  "bg-emerald-700", "bg-blue-700", "bg-orange-700",
  "bg-purple-700",  "bg-zinc-600",  "bg-pink-700",
  "bg-yellow-700",  "bg-teal-700",
]

export default function StaffPage() {
  const [staff, setStaff]     = useState<StaffCompliance[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState("")

  useEffect(() => {
    apiFetch("/api/v1/auth/users")
      .then(async data => {
        const users: User[] = data.users ?? []
        const results = await Promise.all(
          users.map(u =>
            apiFetch(`/api/v1/reports/staff/${u.id}`).catch(() => ({
              userId: u.id,
              fullName: u.fullName,
              email: u.email,
              role: u.role,
              compliancePercentage: 0,
              totalAssigned: 0,
              totalPassed: 0,
              totalOverdue: 0,
            }))
          )
        )
        setStaff(results)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = staff.filter(s =>
    s.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Staff</h1>
            <p className="text-sm text-muted-foreground">Manage staff members and track individual compliance</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search staff..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-56 rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button className="flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="size-4" />
            </button>
            <button className="flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              <Plus className="size-4" />
              Add Staff
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p className="font-medium text-foreground">All Staff Members</p>
                <p className="text-sm text-muted-foreground">{filtered.length} members</p>
              </div>
              <button className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                <Filter className="size-3.5" /> Filter
              </button>
            </div>

            {loading ? (
              <div className="px-5 py-8 text-sm text-muted-foreground">Loading staff...</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Staff Member</th>
                    <th className="px-5 py-3 font-medium">Role</th>
                    <th className="px-5 py-3 font-medium">SOPs</th>
                    <th className="px-5 py-3 font-medium">Compliance</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => {
                    const badge = statusBadge(s.compliancePercentage, s.totalOverdue)
                    return (
                      <tr key={s.userId} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColors[i % avatarColors.length]}`}>
                              {getInitials(s.fullName)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{s.fullName}</p>
                              <p className="text-xs text-muted-foreground">{s.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-muted-foreground">
                          {s.role.replace(/_/g, " ")}
                        </td>
                        <td className="px-5 py-4 text-sm text-foreground">
                          {s.totalPassed} / {s.totalAssigned} passed
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-secondary">
                              <div
                                className={`h-full rounded-full ${
                                  s.compliancePercentage === 100 ? "bg-success" :
                                  s.compliancePercentage === 0   ? "bg-muted-foreground" :
                                  "bg-primary"
                                }`}
                                style={{ width: `${s.compliancePercentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{s.compliancePercentage}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground">
                            <span className={`size-1.5 rounded-full ${badge.dot}`} />
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <MoreHorizontal className="size-4 text-muted-foreground" />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
