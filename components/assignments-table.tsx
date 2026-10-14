"use client"

import { useEffect, useState } from "react"
import { StatusBadge } from "@/components/status-badge"
import { apiFetch } from "@/lib/api"
import type { ComplianceStatus } from "@/lib/data"

interface Assignment {
  id: string
  status: string
  dueDate: string
  user: { fullName: string; role: string; department?: { name: string } }
  sop: { title: string; category: string }
}

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
}

function mapStatus(status: string): ComplianceStatus {
  const map: Record<string, ComplianceStatus> = {
    PASSED:      "Passed",
    IN_PROGRESS: "In Progress",
    OVERDUE:     "Overdue",
    NOT_STARTED: "Not Started",
    FAILED:      "Failed",
    STALE:       "Not Started",
  }
  return map[status] ?? "Not Started"
}

export function AssignmentsTable() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    apiFetch("/api/v1/assignments")
      .then(data => setAssignments(data.assignments ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-card-foreground">Staff Assignments</h2>
          <p className="text-xs text-muted-foreground">SOP training progress across all staff</p>
        </div>
        <span className="text-xs text-muted-foreground">{assignments.length} assignments</span>
      </div>

      {loading ? (
        <div className="px-5 py-8 text-sm text-muted-foreground">Loading assignments...</div>
      ) : assignments.length === 0 ? (
        <div className="px-5 py-8 text-sm text-muted-foreground">No assignments found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="px-5 py-3 font-medium">Staff Member</th>
                <th className="px-5 py-3 font-medium">SOP</th>
                <th className="px-5 py-3 font-medium">Department</th>
                <th className="px-5 py-3 font-medium">Due Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(a => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                        {getInitials(a.user?.fullName ?? "?")}
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{a.user?.fullName}</p>
                        <p className="text-xs text-muted-foreground">{a.user?.role?.replace(/_/g, " ")}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.sop?.title}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.user?.department?.name ?? "—"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {a.dueDate ? new Date(a.dueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={mapStatus(a.status)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
