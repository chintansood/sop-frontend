export type ComplianceStatus =
  | "Passed"
  | "In Progress"
  | "Overdue"
  | "Not Started"

export type Assignment = {
  id: string
  staff: string
  role: string
  initials: string
  sop: string
  dueDate: string
  progress: number
  status: ComplianceStatus
}

export const stats = {
  overallCompliance: 73,
  overdue: 12,
  passed: 94,
}

export type SopStatus = "Active" | "Pending Review"

export type Sop = {
  id: string
  code: string
  title: string
  department: string
  version: string
  status: SopStatus
}

export const sops: Sop[] = [
  {
    id: "sop-014",
    code: "SOP-014",
    title: "Fire Evacuation Procedure",
    department: "Facilities",
    version: "v3.2",
    status: "Active",
  },
  {
    id: "sop-021",
    code: "SOP-021",
    title: "Child Safeguarding Policy",
    department: "Safeguarding",
    version: "v5.0",
    status: "Active",
  },
  {
    id: "sop-033",
    code: "SOP-033",
    title: "Transport Safety Rules",
    department: "Operations",
    version: "v1.4",
    status: "Pending Review",
  },
  {
    id: "sop-008",
    code: "SOP-008",
    title: "Classroom Conduct Guidelines",
    department: "Teaching",
    version: "v2.1",
    status: "Pending Review",
  },
]

export type QuestionDifficulty = "EASY" | "MEDIUM" | "HARD"

export type ReviewQuestion = {
  id: string
  difficulty: QuestionDifficulty
  question: string
  options: { label: string; text: string }[]
  correctLabel: string
  explanation: string
  awaitingReview: boolean
}

export const reviewSop = {
  code: "SOP-021",
  title: "Child Safeguarding Policy",
}

export const reviewQuestions: ReviewQuestion[] = [
  {
    id: "q1",
    difficulty: "EASY",
    question:
      "What is the first step a teacher must take when a student discloses a safeguarding concern?",
    options: [
      { label: "A", text: "Listen without interrupting and reassure the student" },
      { label: "B", text: "Promise the student to keep the information secret" },
      { label: "C", text: "Investigate the concern independently before reporting" },
      { label: "D", text: "Ask the student to put the concern in writing first" },
    ],
    correctLabel: "A",
    explanation:
      "Staff should listen calmly without leading questions or promising confidentiality, then follow the reporting procedure by informing the Designated Safeguarding Lead as soon as possible.",
    awaitingReview: false,
  },
  {
    id: "q2",
    difficulty: "MEDIUM",
    question:
      "Within what timeframe must a safeguarding concern be recorded and escalated to the Designated Safeguarding Lead?",
    options: [
      { label: "A", text: "Within the same working day" },
      { label: "B", text: "Within 48 hours" },
      { label: "C", text: "By the end of the school week" },
      { label: "D", text: "Only if the concern is repeated" },
    ],
    correctLabel: "A",
    explanation:
      "Concerns must be documented and escalated without delay, ordinarily on the same day, to ensure timely action and an accurate record.",
    awaitingReview: true,
  },
]

export const assignments: Assignment[] = [
  {
    id: "1",
    staff: "Amanda Chen",
    role: "Science Teacher",
    initials: "AC",
    sop: "Laboratory Safety Procedures",
    dueDate: "Mar 12, 2026",
    progress: 100,
    status: "Passed",
  },
  {
    id: "2",
    staff: "Marcus Reed",
    role: "Facilities Manager",
    initials: "MR",
    sop: "Emergency Evacuation Protocol",
    dueDate: "Mar 08, 2026",
    progress: 40,
    status: "Overdue",
  },
  {
    id: "3",
    staff: "Priya Nair",
    role: "Front Office",
    initials: "PN",
    sop: "Visitor Check-In & Safeguarding",
    dueDate: "Mar 20, 2026",
    progress: 65,
    status: "In Progress",
  },
  {
    id: "4",
    staff: "James Okafor",
    role: "PE Instructor",
    initials: "JO",
    sop: "First Aid & Incident Reporting",
    dueDate: "Mar 25, 2026",
    progress: 0,
    status: "Not Started",
  },
  {
    id: "5",
    staff: "Sofia Martinez",
    role: "Head of Year",
    initials: "SM",
    sop: "Student Data Protection (GDPR)",
    dueDate: "Mar 15, 2026",
    progress: 100,
    status: "Passed",
  },
  {
    id: "6",
    staff: "Daniel Wright",
    role: "Cafeteria Lead",
    initials: "DW",
    sop: "Food Hygiene & Allergen Handling",
    dueDate: "Mar 05, 2026",
    progress: 20,
    status: "Overdue",
  },
  {
    id: "7",
    staff: "Grace Liu",
    role: "Art Teacher",
    initials: "GL",
    sop: "Classroom Risk Assessment",
    dueDate: "Mar 22, 2026",
    progress: 80,
    status: "In Progress",
  },
  {
    id: "8",
    staff: "Tom Bennett",
    role: "IT Support",
    initials: "TB",
    sop: "Acceptable Use & Cyber Safety",
    dueDate: "Mar 28, 2026",
    progress: 0,
    status: "Not Started",
  },
  {
    id: "9",
    staff: "Rachel Adams",
    role: "SENCO",
    initials: "RA",
    sop: "Safeguarding & Child Protection",
    dueDate: "Mar 18, 2026",
    progress: 100,
    status: "Passed",
  },
  {
    id: "10",
    staff: "Kevin Park",
    role: "Caretaker",
    initials: "KP",
    sop: "Hazardous Materials (COSHH)",
    dueDate: "Mar 03, 2026",
    progress: 55,
    status: "Overdue",
  },
]

export type RateTone = "green" | "amber" | "red"

export type ComplianceSummary = {
  label: string
  value: number
  tone: RateTone
}

export const complianceSummary: ComplianceSummary[] = [
  { label: "All Staff", value: 73, tone: "green" },
  { label: "Teaching", value: 81, tone: "green" },
  { label: "Non-Teaching", value: 58, tone: "red" },
]

export type ComplianceRow = {
  id: string
  sop: string
  assigned: number
  passed: number
  passRate: number
  passRateTone: RateTone
  overdue: number
}

export const complianceRows: ComplianceRow[] = [
  {
    id: "fire",
    sop: "Fire Evacuation",
    assigned: 48,
    passed: 40,
    passRate: 83,
    passRateTone: "green",
    overdue: 2,
  },
  {
    id: "safeguarding",
    sop: "Child Safeguarding",
    assigned: 52,
    passed: 31,
    passRate: 60,
    passRateTone: "amber",
    overdue: 5,
  },
  {
    id: "transport",
    sop: "Transport Safety",
    assigned: 18,
    passed: 7,
    passRate: 39,
    passRateTone: "red",
    overdue: 6,
  },
  {
    id: "conduct",
    sop: "Classroom Conduct",
    assigned: 42,
    passed: 38,
    passRate: 90,
    passRateTone: "green",
    overdue: 0,
  },
]

export type DepartmentCompliance = {
  id: string
  name: string
  value: number
}

export const departmentCompliance: DepartmentCompliance[] = [
  { id: "science", name: "Science", value: 85 },
  { id: "transport", name: "Transport", value: 44 },
  { id: "admin", name: "Admin", value: 72 },
  { id: "english", name: "English", value: 91 },
]
