import { Search, Bell, CheckCheck } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { QuestionCard } from "@/components/question-card"
import { reviewQuestions, reviewSop } from "@/lib/data"

export default function QuestionReviewPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground text-pretty">
              {`Question Review — ${reviewSop.code} ${reviewSop.title}`}
            </h1>
            <p className="text-sm text-muted-foreground">
              Review and approve auto-generated assessment questions
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
            <button className="flex items-center gap-2 rounded-md bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500">
              <CheckCheck className="size-4" />
              Approve All
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {reviewQuestions.map((question, index) => (
              <QuestionCard key={question.id} question={question} index={index} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
