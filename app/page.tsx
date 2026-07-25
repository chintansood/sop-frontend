"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getToken } from "@/lib/api"
import Link from "next/link"

// Import dashboard components
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { AssignmentsTable } from "@/components/assignments-table"
import { apiFetch } from "@/lib/api"
import { Search, Bell } from "lucide-react"

export default function Page() {
  const [checking, setChecking] = useState(true)
  const [loggedIn, setLoggedIn]   = useState(false)
  const [stats, setStats]         = useState({ compliancePercentage: 0, overdueAssignments: 0, passedThisMonth: 0 })
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (token) {
      setLoggedIn(true)
      apiFetch("/api/v1/reports/overview")
        .then(setStats)
        .catch(() => {
          setLoggedIn(false)
        })
        .finally(() => setChecking(false))
    } else {
      setChecking(false)
    }
  }, [])

  if (checking) return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  )

  // Not logged in — show landing page
  if (!loggedIn) return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <span className="text-sm font-bold text-primary">S</span>
          </div>
          <span className="text-sm font-semibold text-foreground">SOP Management System</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Login
          </Link>
          <Link href="/signup" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
            SOP compliance,<br />made simple
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Upload standard operating procedures, generate AI-powered assessments, assign to staff, and track compliance — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup" className="w-full sm:w-auto rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Set up your school →
            </Link>
            <Link href="/login" className="w-full sm:w-auto rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Login to dashboard
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full">
          {[
            { title: "AI-powered questions", desc: "Upload any SOP document and AI generates assessment questions automatically" },
            { title: "Reading gate", desc: "Staff must read the full document before the assessment unlocks" },
            { title: "Live compliance", desc: "Real-time dashboard showing pass rates, overdue staff, and department breakdown" },
          ].map(f => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-5 text-left">
              <p className="mb-2 font-medium text-foreground">{f.title}</p>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
        SOP Management System · Built for schools
      </footer>
    </div>
  )

  // Logged in — show dashboard
  return (
    <div className="flex min-h-screen bg-background">
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
          <AssignmentsTable />
        </main>
      </div>
    </div>
  )
}
