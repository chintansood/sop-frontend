"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Library,
  ClipboardCheck,
  ListChecks,
  ShieldCheck,
  Users,
  GraduationCap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "SOP Library", icon: Library, href: "/sop-library" },
  { label: "Question Review", icon: ClipboardCheck, href: "/question-review" },
  { label: "Assignments", icon: ListChecks, href: "/assignments" },
  { label: "Compliance", icon: ShieldCheck, href: "/compliance" },
  { label: "Staff", icon: Users, href: "/staff" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  function logout() {
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-2.5 px-6 py-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-sidebar-foreground">
            Northgate Academy
          </p>
          <p className="text-xs text-muted-foreground">SOP Management</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border px-3 py-4">
        <button
          onClick={logout}
          className="mb-2 flex w-full items-center justify-center rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-destructive hover:border-destructive/30"
        >
          Logout
        </button>
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
            EK
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-sidebar-foreground">
              Elena Kovac
            </p>
            <p className="text-xs text-muted-foreground">Compliance Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
