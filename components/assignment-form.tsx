"use client"

import { useState } from "react"
import { Users } from "lucide-react"
import { sops } from "@/lib/data"

const assignGroups = [
  { value: "teaching", label: "All Teaching Staff", count: 48 },
  { value: "support", label: "All Support Staff", count: 22 },
  { value: "leadership", label: "Leadership Team", count: 9 },
  { value: "everyone", label: "Whole School", count: 79 },
]

export function AssignmentForm() {
  const [group, setGroup] = useState(assignGroups[0].value)
  const selectedGroup =
    assignGroups.find((g) => g.value === group) ?? assignGroups[0]

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="sop"
            className="text-sm font-medium text-card-foreground"
          >
            SOP to assign
          </label>
          <select
            id="sop"
            defaultValue={sops[0].id}
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {sops.map((sop) => (
              <option key={sop.id} value={sop.id}>
                {`${sop.code} ${sop.title}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="assign-to"
            className="text-sm font-medium text-card-foreground"
          >
            Assign to
          </label>
          <select
            id="assign-to"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {assignGroups.map((g) => (
              <option key={g.value} value={g.value}>
                {`${g.label} - ${g.count} members`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="due-date"
            className="text-sm font-medium text-card-foreground"
          >
            Due Date
          </label>
          <input
            id="due-date"
            type="date"
            defaultValue="2026-07-31"
            className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring [color-scheme:dark]"
          />
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3">
          <Users className="size-5 shrink-0 text-blue-400" />
          <p className="text-sm text-foreground">
            <span className="font-semibold">{selectedGroup.count} staff members</span>{" "}
            will receive this assignment
          </p>
        </div>

        <button
          type="button"
          className="mt-1 w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          Create Assignments
        </button>
      </form>
    </section>
  )
}
