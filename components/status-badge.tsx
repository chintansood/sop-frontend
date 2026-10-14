import { cn } from "@/lib/utils"
import type { ComplianceStatus } from "@/lib/data"

const styles: Record<ComplianceStatus, { dot: string; badge: string }> = {
  Passed: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  },
  "In Progress": {
    dot: "bg-blue-500",
    badge: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
  },
  Overdue: {
    dot: "bg-red-500",
    badge: "bg-red-500/10 text-red-400 ring-red-500/20",
  },
  "Not Started": {
    dot: "bg-zinc-500",
    badge: "bg-zinc-500/10 text-zinc-400 ring-zinc-500/20",
  },
  Failed: {
    dot: "bg-rose-500",
    badge: "bg-rose-500/10 text-rose-400 ring-rose-500/20",
  },
}

export function StatusBadge({ status }: { status: ComplianceStatus }) {
  const s = styles[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        s.badge,
      )}
    >
      <span className={cn("size-1.5 rounded-full", s.dot)} aria-hidden="true" />
      {status}
    </span>
  )
}