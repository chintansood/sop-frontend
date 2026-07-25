"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { setToken } from "@/lib/api"

export default function SignupPage() {
  const [schoolName, setSchoolName] = useState("")
  const [fullName, setFullName]     = useState("")
  const [email, setEmail]           = useState("")
  const [password, setPassword]     = useState("")
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState("")
  const router = useRouter()

  async function handleSignup() {
    if (!schoolName || !fullName || !email || !password) {
      setError("All fields are required")
      return
    }
    setLoading(true)
    setError("")
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

      // Register
      const regRes = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role: "ADMIN", schoolName }),
      })
      if (!regRes.ok) {
        const err = await regRes.json()
        throw new Error(err.error || "Registration failed")
      }

      // Login immediately after
      const loginRes = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!loginRes.ok) {
        throw new Error("Login after signup failed")
      }
      const loginData = await loginRes.json()

      // Store token and school name
      setToken(loginData.accessToken)
      localStorage.setItem("schoolName", schoolName)
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground">Set up your school</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create your admin account to get started</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
        )}

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">School name</label>
            <input type="text" value={schoolName} onChange={e => setSchoolName(e.target.value)}
              placeholder="Greenfield Academy"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Your name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
              placeholder="John Smith"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@yourschool.com"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={handleSignup} disabled={loading}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors">
            {loading ? "Setting up..." : "Create account →"}
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}
