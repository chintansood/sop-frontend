# 🏫 SOP Management System — Admin & Compliance Portal

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.2-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel)](https://sop-frontend-three.vercel.app)

The **Admin & Compliance Portal** provides school administrators, principals, and compliance officers with a centralized dashboard to author, revise, assign, and audit Standard Operating Procedures (SOPs) across academic and administrative departments.

---

## 🌐 Live Deployments

- **Admin & Compliance Portal:** [https://sop-frontend-three.vercel.app](https://sop-frontend-three.vercel.app)
- **Staff Learning Portal:** [https://sop-frontend-staff-henna.vercel.app](https://sop-frontend-staff-henna.vercel.app)
- **Backend API:** [https://sop-backend-x9x2.onrender.com](https://sop-backend-x9x2.onrender.com)

---

## ✨ Features

- **📊 Comprehensive Dashboard:** Instant visibility into school-wide compliance rates, pending staff signoffs, active assignments, and recent test results.
- **📁 SOP Document Management:** Upload `.pdf` and `.docx` policy files, view automatically extracted text, manage versions, and publish official revisions.
- **🤖 AI Assessment Generator & Review:** Trigger Google Gemini AI to draft 5 multiple-choice questions from policy documents, with full inline editing and approval before deployment.
- **🎯 Granular Assignments:** Bulk assign SOPs to all staff, filter by role (`Teaching Staff`, `Non-Teaching Staff`), or target specific individuals with dynamic due date selection (+14 days default).
- **📈 Compliance Audit Trail & CSV Export:** Filter compliance tables by status, score, or department, and download full CSV audit records for inspection reporting.
- **👥 Staff Onboarding Queue:** Review self-registered staff accounts, approve or decline pending access requests, and enforce institutional isolation.

---

## 🧭 Application Pages

| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/login` | Authentication | Sign in with email and password |
| `/signup` | Registration | Register a new administrator account |
| `/` | Dashboard | High-level metrics, compliance scorecards, and quick action shortcuts |
| `/sop-library` | SOP Library | Upload documents, inspect text extraction, and manage version history |
| `/question-review` | AI Question Review | Review, revise, and approve Gemini-generated quiz questions |
| `/assignments` | Assignment Manager | Dispatch SOPs to individuals or roles with custom deadlines |
| `/compliance` | Compliance & Audit | Filter staff completion progress and export reports as CSV |
| `/staff` | Staff Directory | Approve pending signups and manage staff roles |

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- **Node.js** 18.x or 20.x
- **pnpm** (preferred) or **npm**

### 2. Installation
```bash
git clone https://github.com/chintansood/sop-frontend.git
cd sop-frontend
pnpm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
# Backend API Base URL
NEXT_PUBLIC_API_URL="https://sop-backend-x9x2.onrender.com"
# Or for local development:
# NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 4. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied) in your browser.

### 5. Build for Production
```bash
pnpm build
pnpm start
```

---

## 🔑 Demo Credentials

| Role | Email | Password | School |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@school.test` | `password` | My School |
| **Tamil School Admin** | `admintt@school.test` | `123456` | Tamil School |

---

## 🔗 Related Repositories

- **Backend API:** [sop-management-system](https://github.com/chintansood/sop-management-system)
- **Staff Learning Portal:** [sop-frontend-staff](https://github.com/chintansood/sop-frontend-staff)

---

## 📄 License
This project is licensed under the ISC License.
