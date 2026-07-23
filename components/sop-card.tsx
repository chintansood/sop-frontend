import { FileText, UserPlus, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Sop } from "@/lib/data"

const statusStyles: Record<Sop["status"], string> = {
  Active: "bg-emerald-500",
  "Pending Review": "bg-blue-500",
}

export function SopCard({ sop }: { sop: Sop }) {
  const isActive = sop.status === "Active"

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
          <FileText className="size-5" />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
          <span
            className={cn("size-1.5 rounded-full", statusStyles[sop.status])}
            aria-hidden="true"
          />
          {sop.status}
        </span>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-xs font-medium text-muted-foreground">{sop.code}</p>
        <h2 className="text-sm font-semibold leading-snug text-card-foreground text-balance">
          {sop.title}
        </h2>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded-md bg-secondary px-2 py-0.5 text-secondary-foreground">
          {sop.department}
        </span>
        <span>Version {sop.version}</span>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <button
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-border bg-card text-card-foreground hover:bg-secondary",
          )}
        >
          {isActive ? (
            <>
              <UserPlus className="size-4" />
              Assign SOP
            </>
          ) : (
            <>
              <ClipboardList className="size-4" />
              Review Questions
            </>
          )}
        </button>
      </div>
    </article>
  )
}
