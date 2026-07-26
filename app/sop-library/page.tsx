"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Bell, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { apiFetch, getToken } from "@/lib/api"

interface SOP {
  id: string
  title: string
  category: string
  versionCount: number
  activeVersion: { id: string; versionNumber: number; status: string } | null
  createdAt: string
}

function statusBadge(status: string) {
  if (status === "QUESTIONS_APPROVED")  return { label: "Active",         className: "bg-success/10 text-success" }
  if (status === "QUESTIONS_GENERATED") return { label: "Pending Review", className: "bg-primary/10 text-primary" }
  if (status === "ARCHIVED")            return { label: "Archived",       className: "bg-muted text-muted-foreground" }
  return                                       { label: "Draft",          className: "bg-warning/10 text-warning" }
}

export default function SopLibraryPage() {
  const [sops, setSops]           = useState<SOP[]>([])
  const [loading, setLoading]     = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState<string | null>(null)
  const fileRef                   = useRef<HTMLInputElement>(null)
  const router                    = useRouter()

  function fetchSops() {
    apiFetch("/api/v1/sops")
      .then(data => setSops(data.sops ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchSops() }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadMsg(null)
    try {
      const token = getToken()
      const form  = new FormData()
      form.append("document", file)
      form.append("title", file.name.replace(/\.[^/.]+$/, ""))
      form.append("category", "General")

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/v1/sops`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setUploadMsg(`✓ "${data.title ?? file.name}" uploaded successfully!`)
      fetchSops()
    } catch (err: any) {
      setUploadMsg(`Error: ${err.message}`)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  return (
    <div className="flex min-h-screen bg-background pt-14 md:pt-0">
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
            <button className="flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground">
              <Bell className="size-4" />
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Upload className="size-4" />
              {uploading ? "Uploading..." : "Upload SOP"}
            </button>
            <input ref={fileRef} type="file" accept=".pdf,.docx" className="hidden" onChange={handleUpload} />
          </div>
        </header>

        <main className="flex-1 p-6">
          {uploadMsg && (
            <div className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
              uploadMsg.startsWith("Error")
                ? "border-destructive/30 bg-destructive/10 text-destructive"
                : "border-success/30 bg-success/10 text-success"
            }`}>
              {uploadMsg}
            </div>
          )}

          {loading ? (
            <div className="text-sm text-muted-foreground">Loading SOPs...</div>
          ) : sops.length === 0 ? (
            <div className="text-sm text-muted-foreground">No SOPs yet. Upload your first SOP.</div>
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
                    <p className="mb-4 text-sm text-muted-foreground">
                      {sop.category} · {sop.versionCount} version{sop.versionCount !== 1 ? "s" : ""}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push("/question-review")}
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                      >
                        Review questions
                      </button>
                      <button
                        onClick={() => router.push("/assignments")}
                        className="flex-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        Assign SOP
                      </button>
                    </div>
                    <label className="mt-2 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                      <Upload className="size-3" />
                      Upload new version
                      <input type="file" accept=".pdf,.docx" className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (!file) return
                          const token = getToken()
                          const form = new FormData()
                          form.append("document", file)
                          setUploadMsg("Uploading new version...")
                          const res = await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/v1/sops/${sop.id}/versions`,
                            { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form }
                          )
                          const data = await res.json()
                          if (!res.ok) { setUploadMsg(`Error: ${data.error}`) }
                          else { setUploadMsg(`✓ ${data.message || "New version uploaded! Staff re-assigned."}`); fetchSops() }
                          e.target.value = ""
                        }}
                      />
                    </label>
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
