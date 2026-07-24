"use client"

import { useEffect, useState } from "react"
import { CheckCheck, Bell } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { apiFetch } from "@/lib/api"

interface Option { id: string; text: string; isCorrect: boolean }
interface Question {
  id: string
  text: string
  difficulty: string
  status: string
  explanation: string | null
  options: Option[]
}

interface SOP { id: string; title: string; activeVersion: { id: string; versionNumber: number; status: string } | null }

function difficultyColor(d: string) {
  if (d === "EASY")   return "bg-success/10 text-success"
  if (d === "MEDIUM") return "bg-warning/10 text-warning"
  return "bg-destructive/10 text-destructive"
}

export default function QuestionReviewPage() {
  const [sops, setSops]               = useState<SOP[]>([])
  const [selectedSop, setSelectedSop] = useState<SOP | null>(null)
  const [questions, setQuestions]     = useState<Question[]>([])
  const [loading, setLoading]         = useState(false)
  const [actionMsg, setActionMsg]     = useState<string | null>(null)

  useEffect(() => {
    apiFetch("/api/v1/sops")
      .then(data => {
        const s = data.sops ?? []
        setSops(s)
        if (s.length > 0) setSelectedSop(s[0])
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!selectedSop?.activeVersion?.id) return
    setLoading(true)
    apiFetch(`/api/v1/sops/versions/${selectedSop.activeVersion.id}/questions`)
      .then(data => setQuestions(data.questions ?? []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [selectedSop])

  async function handleReview(questionId: string, action: "APPROVE" | "REJECT") {
    try {
      await apiFetch(`/api/v1/sops/questions/${questionId}/review`, {
        method: "PATCH",
        body: JSON.stringify({ action }),
      })
      setQuestions(prev => prev.map(q =>
        q.id === questionId
          ? { ...q, status: action === "APPROVE" ? "APPROVED" : "REJECTED" }
          : q
      ))
      setActionMsg(`Question ${action === "APPROVE" ? "approved" : "rejected"} successfully`)
      setTimeout(() => setActionMsg(null), 3000)
    } catch (err: any) {
      setActionMsg(`Error: ${err.message}`)
    }
  }

  async function handleApproveAll() {
    const drafts = questions.filter(q => q.status === "DRAFT")
    await Promise.all(drafts.map(q => handleReview(q.id, "APPROVE")))
  }

  const draftCount = questions.filter(q => q.status === "DRAFT").length

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Question Review</h1>
            <p className="text-sm text-muted-foreground">Review and approve AI-generated questions</p>
          </div>
          <div className="flex items-center gap-2">
            {/* SOP selector */}
            <select
              value={selectedSop?.id ?? ""}
              onChange={e => setSelectedSop(sops.find(s => s.id === e.target.value) ?? null)}
              className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none"
            >
              {sops.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
            <button
              onClick={handleApproveAll}
              disabled={draftCount === 0}
              className="flex items-center gap-2 rounded-md bg-success/10 px-3.5 py-2 text-sm font-medium text-success transition-colors hover:bg-success/20 disabled:opacity-40"
            >
              <CheckCheck className="size-4" />
              Approve all ({draftCount})
            </button>
            <button className="flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground">
              <Bell className="size-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 space-y-4 p-6">
          {actionMsg && (
            <div className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
              {actionMsg}
            </div>
          )}

          {loading ? (
            <div className="text-sm text-muted-foreground">Loading questions...</div>
          ) : questions.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              No questions found for this SOP. Generate questions from the SOP Library first.
            </div>
          ) : (
            questions.map(q => (
              <div key={q.id} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${difficultyColor(q.difficulty)}`}>
                    AI generated · {q.difficulty}
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    q.status === "APPROVED" ? "bg-success/10 text-success" :
                    q.status === "REJECTED" ? "bg-destructive/10 text-destructive" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {q.status}
                  </span>
                </div>

                <p className="mb-4 font-medium text-foreground">{q.text}</p>

                <div className="mb-4 space-y-2">
                  {q.options.map((opt, i) => (
                    <div key={opt.id} className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 text-sm ${
                      opt.isCorrect
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background text-muted-foreground"
                    }`}>
                      <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                        opt.isCorrect ? "border-primary text-primary" : "border-muted-foreground text-muted-foreground"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt.text}
                      {opt.isCorrect && <span className="ml-auto text-xs text-primary">✓ Correct</span>}
                    </div>
                  ))}
                </div>

                {q.explanation && (
                  <p className="mb-3 text-xs text-muted-foreground italic">{q.explanation}</p>
                )}

                {q.status === "DRAFT" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReview(q.id, "REJECT")}
                      className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/20"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleReview(q.id, "APPROVE")}
                      className="rounded-lg border border-success/30 bg-success/10 px-4 py-1.5 text-sm font-medium text-success hover:bg-success/20"
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  )
}
