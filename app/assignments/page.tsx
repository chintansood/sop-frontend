import { Search, Bell } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { AssignmentForm } from "@/components/assignment-form"
import { WhatHappensNext } from "@/components/what-happens-next"

export default function AssignmentsPage() {
  return (
    <div className="flex min-h-screen bg-background pt-14 md:pt-0">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground text-pretty">
              Create Assignment
            </h1>
            <p className="text-sm text-muted-foreground">
              Assign an SOP to staff and set a completion deadline
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search"
                className="w-56 rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              className="flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
            <AssignmentForm />
            <WhatHappensNext />
          </div>
        </main>
      </div>
    </div>
  )
}
