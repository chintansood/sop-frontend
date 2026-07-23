const steps = [
  {
    title: "Assignment created",
    description: "The selected SOP is assigned to every staff member in the group.",
  },
  {
    title: "Staff notified",
    description: "Each recipient gets an email and in-app notification with the due date.",
  },
  {
    title: "Status: Not Started",
    description: "Assignments begin in a Not Started state until staff open them.",
  },
  {
    title: "Gate: read first",
    description: "Staff must read the full SOP document before the assessment unlocks.",
  },
  {
    title: "Assessment result",
    description: "A passing score marks the assignment Passed and updates compliance.",
  },
]

export function WhatHappensNext() {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-sm font-semibold text-card-foreground">
        What Happens Next
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">
        The lifecycle of every assignment you create
      </p>

      <ol className="mt-5 flex flex-col gap-5">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              {index + 1}
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-card-foreground">
                {step.title}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
