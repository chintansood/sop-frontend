"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"
import { apiFetch } from "@/lib/api"

interface SOP { id: string; title: string; category: string }

const roleOptions = [
  { value: "TEACHING_STAFF",     label: "All Teaching Staff" },
  { value: "NON_TEACHING_STAFF", label: "All Non-Teaching Staff" },
]

export function AssignmentForm() {
  const [sops, setSops]         = useState<SOP[]>([])
  const [sopId, setSopId]       = useState("")
  const [role, setRole]         = useState(roleOptions[0].value)
  const [dueDate, setDueDate]   = useState("2026-08-31")
  const [loading, setLoading]   = useState(false)
  const [result, setResult]     = useState<string | null>(null)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    apiFetch("/api/v1/sops")
      .then(data => {
        const s = data.sops ?? []
        setSops(s)
        if (s.length > 0) setSopId(s[0].id)
      })
      .catch(console.error)
  }, [])

  async function handleSubmit() {
    if (!sopId) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const data = await apiFetch("/api/v1/assignments", {
        method: "POST",
        body: JSON.stringify({ sopId, role, dueDate: new Date(dueDate).toISOString() }),
      })
      setResult(`✓ Created ${data.created} assignments. ${data.skipped ?? 0} skipped (already assigned).`)
    } catch (err: any) {
      setError(err.message || "Failed to create assignments")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-card-foreground">SOP to assign</label>
          <select
            value={sopId}
            onChange={e => setSopId(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {sops.map(sop => (
              <option key={sop.id} value={sop.id}>{sop.title}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-card-foreground">Assign to</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {roleOptions.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-card-foreground">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring [color-scheme:dark]"
          />
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3">
          <Users className="size-5 shrink-0 text-blue-400" />
          <p className="text-sm text-foreground">
            Assignments will be created for all staff with role: <span className="font-semibold">{role.replace(/_/g, " ")}</span>
          </p>
        </div>

        {result && (
          <div className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
            {result}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !sopId}
          className="mt-1 w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Assignments"}
        </button>
      </div>
    </section>
  )
}
