import { Check, X, CircleHelp, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReviewQuestion } from "@/lib/data"

const difficultyStyles: Record<ReviewQuestion["difficulty"], string> = {
  EASY: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  MEDIUM: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  HARD: "bg-red-500/15 text-red-400 border-red-500/30",
}

export function QuestionCard({
  question,
  index,
}: {
  question: ReviewQuestion
  index: number
}) {
  const isAwaiting = question.awaitingReview

  return (
    <article
      className={cn(
        "rounded-xl border border-border bg-card p-5 transition-opacity",
        isAwaiting && "opacity-50",
      )}
      aria-disabled={isAwaiting}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-medium text-muted-foreground">
            Question {index + 1}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide",
              difficultyStyles[question.difficulty],
            )}
          >
            {question.difficulty}
          </span>
        </div>
        {isAwaiting && (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CircleHelp className="size-3.5" />
            Awaiting review
          </span>
        )}
      </div>

      <h2 className="mt-3 text-sm font-semibold leading-relaxed text-card-foreground text-pretty">
        {question.question}
      </h2>

      <ul className="mt-4 space-y-2">
        {question.options.map((option) => {
          const isCorrect = option.label === question.correctLabel && !isAwaiting
          return (
            <li key={option.label}>
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                  isCorrect
                    ? "border-blue-500/50 bg-blue-500/10 text-card-foreground"
                    : "border-border bg-secondary/40 text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold",
                    isCorrect
                      ? "bg-blue-500 text-white"
                      : "bg-secondary text-secondary-foreground",
                  )}
                >
                  {option.label}
                </span>
                <span className="flex-1">{option.text}</span>
                {isCorrect && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400">
                    <Check className="size-3.5" />
                    Correct
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-4 flex gap-2.5 rounded-lg border border-border bg-secondary/40 p-3">
        <Lightbulb className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <div>
          <p className="text-xs font-medium text-card-foreground">Explanation</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {question.explanation}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2 border-t border-border pt-4">
        <button
          disabled={isAwaiting}
          className="flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20 disabled:pointer-events-none"
        >
          <X className="size-4" />
          Reject
        </button>
        <button
          disabled={isAwaiting}
          className="flex items-center gap-2 rounded-md bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 disabled:pointer-events-none"
        >
          <Check className="size-4" />
          Approve
        </button>
      </div>
    </article>
  )
}
