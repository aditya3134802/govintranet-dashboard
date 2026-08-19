// ═══════ Project Data (Real OpenForge Data) ═══════

const ADMINS = [
  "misha kapoor", "OP Gupta", "Ritesh Kumar Dwivedi",
  "SHOBHIT VARMA", "Sulbha Bhaisare", "vijay chaudhari"
];

const ALL_MEMBERS = [
  { name: "Aditya Kumar Singh", username: "adityanic", email: "aksingh3134@gmail.com", group: "DevOps", active: true },
  { name: "Ajay Kumar Yadav", username: "ajaykumarnic", email: "ajay1481992@gmail.com", group: "Developer", active: true },
  { name: "Akshit Kumar", username: "akshit1234", email: "akshit.kumarjhinj@gmail.com", group: "Developer", active: true },
  { name: "Biswaranjan Biswal", username: "biswaranjan", email: "iambiswaranjanbiswal@gmail.com", group: "Developer", active: true },
  { name: "Deepak ratra", username: "deepakratra", email: "ratra.mca@gmail.com", group: "Developer", active: true },
  { name: "Deepak Sharma", username: "deepak03499", email: "deepaksharma03499@outlook.com", group: "Developer", active: true },
  { name: "harpreet singh", username: "harpreetnic", email: "harpreet2621990@gmail.com", group: "", active: true },
  { name: "k.r Vamsi", username: "ratnavamsi", email: "krvamsi5@gmail.com", group: "", active: true },
  { name: "karan singh", username: "karan_singh", email: "karansingh5591@gmail.com", group: "", active: true },
  { name: "misha kapoor", username: "mishakapoor", email: "misha.nsit@gmail.com", group: "Project administrators", active: true },
  { name: "Navin Pandey", username: "nkpandey32", email: "nkpandey32@gmail.com", group: "", active: true },
  { name: "OP Gupta", username: "ohmpgupta", email: "ohmpgupta@gmail.com", group: "Project administrators", active: true },
  { name: "Pawan NIC", username: "pawannic", email: "pawan.nic18@gmail.com", group: "Developer", active: true },
  { name: "Priyanshu Sharma", username: "priyanshusharma", email: "priyanshusharmaofficework@gmail.com", group: "", active: true },
  { name: "Ramkishor ojha", username: "ramkishor", email: "ojharamkishor88@gmail.com", group: "Developer", active: true },
  { name: "Renu Pandey", username: "renunic", email: "renupan89@gmail.com", group: "TestersQA", active: true },
  { name: "Ritesh Kumar Dwivedi", username: "ritesh.dwivedi", email: "ritesh.dwivedi@nic.in", group: "Project administrators", active: true },
  { name: "SHOBHIT VARMA", username: "sac2244", email: "shobhit.varma@nic.in", group: "Project administrators", active: true },
  { name: "Shrikant Singh", username: "shrikantjamori", email: "shrikantjamori@gmail.com", group: "", active: true },
  { name: "Sulbha Bhaisare", username: "sulbha", email: "sulbha.bhaisare@nic.in", group: "Project administrators", active: true },
  { name: "vijay chaudhari", username: "vijayetaal", email: "vijay.chaudhari92@nic.in", group: "Project administrators", active: true }
];

const PROJECT_DATA = {
  name: "Govintranet",
  description: "Private",
  trackers: [
    { id: "bugs", name: "Bugs", icon: "\u{1F41B}", open: 2, total: 7, color: "#ef4444" },
    { id: "change-requests", name: "Change Requests", icon: "\u{1F504}", open: 0, total: 1, color: "#f59e0b" },
    { id: "patches", name: "Patches/Fixes", icon: "\u{1F527}", open: 0, total: 1, color: "#10b981" },
    { id: "requirements", name: "Requirements", icon: "\u{1F4CB}", open: 4, total: 4, color: "#3b82f6" },
    { id: "risks", name: "Risks", icon: "\u26A0\uFE0F", open: 0, total: 0, color: "#8b5cf6" },
    { id: "support", name: "Support Requests", icon: "\u{1F3A7}", open: 0, total: 0, color: "#06b6d4" },
    { id: "tasks", name: "Tasks", icon: "\u2705", open: 38, total: 83, color: "#3b82f6" },
    { id: "user-stories", name: "User Stories", icon: "\u{1F4D6}", open: 2, total: 2, color: "#f97316" }
  ],
  kanbanBoards: [
    { id: "bugs-board", name: "Bugs Tracker", tracker: "bugs", open: 2, closed: 5 },
    { id: "cr-board", name: "Change Request Board", tracker: "change-requests", open: 0, closed: 0 },
    { id: "patches-board", name: "Patches/Fixes Board", tracker: "patches", open: 0, closed: 0 },
    { id: "req-board", name: "Project Requirement Board", tracker: "requirements", open: 4, closed: 0 },
    { id: "risk-board", name: "Risk Registers", tracker: "risks", open: 0, closed: 0 },
    { id: "task-board", name: "Task Board", tracker: "tasks", open: 38, closed: 45 }
  ],
  members: ALL_MEMBERS.map(m => m.name),
  projects: [
    "Govintranet", "Gov Application", "AI Meeting Intelligence",
    "Govintranet Database", "Infrastructure", "Security"
  ]
};

const STATUS_COLUMNS = [
  { id: "backlog", name: "Backlog", color: "#6c757d" },
  { id: "open", name: "Open", color: "#3b82f6" },
  { id: "qa", name: "QA Testing", color: "#f59e0b" },
  { id: "done", name: "Done", color: "#10b981" }
];

const PRIORITY_COLORS = {
  low: "#6c757d",
  normal: "#3b82f6",
  high: "#f59e0b",
  urgent: "#ef4444"
};

function isAdmin(userName) {
  return ADMINS.includes(userName);
}

// Current user state (simulated login)
let currentUser = ALL_MEMBERS[0].name; // default to first member

function setCurrentUser(name) {
  currentUser = name;
  localStorage.setItem("of-current-user", name);
}

function getCurrentUser() {
  const saved = localStorage.getItem("of-current-user");
  if (saved && ALL_MEMBERS.find(m => m.name === saved)) {
    currentUser = saved;
  }
  return currentUser;
}

function isCurrentUserAdmin() {
  return isAdmin(getCurrentUser());
}
