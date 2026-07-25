"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard, Library, ClipboardCheck,
  Send, BarChart3, Users, ShieldCheck, Menu, X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard",       icon: LayoutDashboard, href: "/" },
  { label: "SOP Library",     icon: Library,         href: "/sop-library" },
  { label: "Question Review", icon: ClipboardCheck,  href: "/question-review" },
  { label: "Assignments",     icon: Send,            href: "/assignments" },
  { label: "Compliance",      icon: BarChart3,       href: "/compliance" },
  { label: "Staff",           icon: Users,           href: "/staff-admin" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const [open, setOpen] = useState(false)

  function logout() {
    localStorage.removeItem("token")
    router.push("/login")
  }

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between border-b border-border px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-secondary">
            <ShieldCheck className="size-4 text-secondary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Northgate Academy</p>
            <p className="text-xs text-muted-foreground">SOP Management</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="md:hidden text-muted-foreground hover:text-foreground">
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                active ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-3">
        <button onClick={logout}
          className="mb-2 flex w-full items-center justify-center rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground hover:text-destructive hover:border-destructive/30">
          Logout
        </button>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">EK</div>
          <div>
            <p className="text-xs font-medium text-foreground">Elena Kovac</p>
            <p className="text-xs text-muted-foreground">Compliance Admin</p>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-40 flex md:hidden size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground"
      >
        <Menu className="size-4" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-background transition-transform md:hidden",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-52 shrink-0 flex-col border-r border-border bg-background">
        <SidebarContent />
      </aside>
    </>
  )
}
