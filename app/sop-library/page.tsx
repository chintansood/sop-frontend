"use client"

import { useEffect, useState } from "react"
import { Search, Bell, Upload } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { apiFetch } from "@/lib/api"

interface SOP {
  id: string
  title: string
  category: string
  versionCount: number
  activeVersion: {
    versionNumber: number
    status: string
  } | null
  createdAt: string
}

function statusBadge(status: string) {
  if (status === "QUESTIONS_APPROVED") return { label: "Active", className: "bg-success/10 text-success" }
  if (status === "QUESTIONS_GENERATED") return { label: "Pending Review", className: "bg-primary/10 text-primary" }
  if (status === "ARCHIVED") return { label: "Archived", className: "bg-muted text-muted-foreground" }
  return { label: "Draft", className: "bg-warning/10 text-warning" }
}

export default function SopLibraryPage() {
  const [sops, setSops]       = useState<SOP[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch("/api/v1/sops")
      .then(data => setSops(data.sops ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground">SOP Library</h1>
            <p className="text-sm text-muted-foreground">Manage and assign standard operating procedures</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input type="search" placeholder="Search..." className="w-56 rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button className="flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="size-4" />
            </button>
            <button className="flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              <Upload className="size-4" />
              Upload SOP
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading SOPs...</div>
          ) : sops.length === 0 ? (
            <div className="text-sm text-muted-foreground">No SOPs found.</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {sops.map(sop => {
                const badge = statusBadge(sop.activeVersion?.status ?? "DRAFT")
                return (
                  <div key={sop.id} className="rounded-xl border border-border bg-card p-5">
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badge.className}`}>
                        {badge.label}
                      </span>
                      <span className="text-xs text-muted-foreground">v{sop.activeVersion?.versionNumber ?? 1}</span>
                    </div>
                    <h3 className="mb-1 font-medium text-foreground">{sop.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{sop.category} · {sop.versionCount} version{sop.versionCount !== 1 ? "s" : ""}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted">
                        Review questions
                      </button>
                      <button className="flex-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                        Assign SOP
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
