const PROJECT_DATA = {
  name: "Govintranet",
  description: "Private",
  trackers: [
    { id: "bugs", name: "Bugs", icon: "🐛", open: 2, total: 7, color: "#e74c3c" },
    { id: "change-requests", name: "Change Requests", icon: "🔄", open: 0, total: 1, color: "#e67e22" },
    { id: "patches", name: "Patches/Fixes", icon: "🔧", open: 0, total: 1, color: "#27ae60" },
    { id: "requirements", name: "Requirements", icon: "📋", open: 4, total: 4, color: "#3498db" },
    { id: "risks", name: "Risks", icon: "⚠️", open: 0, total: 0, color: "#9b59b6" },
    { id: "support", name: "Support Requests", icon: "🎧", open: 0, total: 0, color: "#1abc9c" },
    { id: "tasks", name: "Tasks", icon: "✅", open: 47, total: 83, color: "#2c3e50" },
    { id: "user-stories", name: "User Stories", icon: "📖", open: 2, total: 2, color: "#f39c12" }
  ],
  kanbanBoards: [
    { id: "bugs-board", name: "Bugs Tracker", tracker: "bugs", open: 2, closed: 5 },
    { id: "cr-board", name: "Change Request Board", tracker: "change-requests", open: 0, closed: 0 },
    { id: "patches-board", name: "Patches/Fixes Board", tracker: "patches", open: 0, closed: 0 },
    { id: "req-board", name: "Project Requirement Board", tracker: "requirements", open: 4, closed: 0 },
    { id: "risk-board", name: "Risk Registers", tracker: "risks", open: 0, closed: 0 },
    { id: "task-board", name: "Task Board", tracker: "tasks", open: 47, closed: 17 }
  ],
  tasks: [
    // Backlog
    { id: 815765, title: "Gov Application - Make owner email id Unique", status: "backlog", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 815764, title: "Gov Application - Allow N/A on Mobile No", status: "backlog", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 815802, title: "Gov Application - Rename 'Gov Application Repository'", status: "backlog", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "Gov Application" },
    { id: 818080, title: "Gov Application - View Page modifications", status: "backlog", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 818084, title: "Gov Application - Application category icons", status: "backlog", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "Gov Application" },
    { id: 821688, title: "Gov Application - Update DB for blank values", status: "backlog", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Gov Application" },
    { id: 821731, title: "Gov Application - Data update for SSL, GIGW & Application Audit status", status: "backlog", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Gov Application" },
    { id: 824733, title: "Gov Application - Updates on 10th AUG 2026", status: "backlog", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 825652, title: "AI Meeting Intelligence platform- Fix Speaker Diarization BUG", status: "backlog", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 827337, title: "Govintranet Database- Remove Unused and duplicate Tables", status: "backlog", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Govintranet Database" },
    { id: 827338, title: "Govintranet Database- Apply all missing Constraints (PK, FK, Unique key)", status: "backlog", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Govintranet Database" },
    { id: 827340, title: "AI Meeting Intelligence platform- DB Schema optimization", status: "backlog", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 828016, title: "Gov Application - Approval Process", status: "backlog", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Gov Application" },
    { id: 828020, title: "Gov Application - Fix Filter bug while filtering SSL/GIGW/Audit Status", status: "backlog", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Gov Application" },
    { id: 828366, title: "AI Meeting Intelligence platform- Enhance AI metrics and prepare reports of recorded videos in details", status: "backlog", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 828368, title: "AI Meeting Intelligence platform- Verification of AI metrics manually", status: "backlog", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 830596, title: "AI Meeting Intelligence platform- Fix Dashboard issues", status: "backlog", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 830600, title: "AI Meeting Intelligence platform- AI Generated Agenda Edit facility", status: "backlog", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 830608, title: "AI Meeting Intelligence platform- New Features, Enhancement in existing features & performancestats", status: "backlog", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "AI Meeting Intelligence" },

    // Open
    { id: 811195, title: "Incident management through Zammad", status: "open", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Infrastructure" },
    { id: 811215, title: "Asset Classification", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Infrastructure" },
    { id: 812245, title: "New Executive Dashboard", status: "open", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Govintranet" },
    { id: 812246, title: "Check Data of Executive Dashboard + Increase cpgrams, 10% gbs in Automation Email", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Govintranet" },
    { id: 812247, title: "Monitoring Dashboard Email", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Govintranet" },
    { id: 815762, title: "Gov Application - by default paging 30", status: "open", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "Gov Application" },
    { id: 815768, title: "Gov Application - Make owner email id Unique", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 828009, title: "Gov Application - Remove Approved Level, Only Green Color", status: "open", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "Gov Application" },
    { id: 815769, title: "Gov Application - Allow N/A on Mobile No", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 815772, title: "Gov Application - Show State/Ministry of application, not of owner", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 815778, title: "Gov Application - In View, Rename level Ministry/State", status: "open", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "Gov Application" },
    { id: 815786, title: "Gov Application - Re-align View Detail popup", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 815790, title: "Gov Application - By default owner detail, FULL name required", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 825185, title: "Remainder Mail for all Meeting govintranet", status: "open", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Govintranet" },
    { id: 827213, title: "Change Image on Help & Getting Started for all videos", status: "open", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "Govintranet" },
    { id: 827332, title: "AI Meeting Intelligence platform - Action Item extraction for creation of task", status: "open", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 827333, title: "AI Meeting Intelligence platform- Agenda wise Decision taken", status: "open", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 827335, title: "Gov Application - Activity Log & Super Admin Approval & Filter by SSL/GIGW/Audit Status", status: "open", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Gov Application" },
    { id: 827494, title: "Microservices complete for Gov.in App", status: "open", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Gov Application" },
    { id: 828022, title: "Gov Application - Fix SuperAdmin, Activity Log and approval Bugs", status: "open", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Gov Application" },
    { id: 828363, title: "AI Meeting Intelligence platform- Agenda wise decision taken - fix bugs and deploy on live", status: "open", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 828365, title: "AI Meeting Intelligence platform- Predefined and LLM generated Agenda score", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 828370, title: "AI Meeting Intelligence platform- Action Item extraction, JSON output (title, description, due date, assigned TO, priority)", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 829944, title: "Cdac Security Audit", status: "open", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Security" },
    { id: 829947, title: "Task Multi Assign Flow", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Govintranet" },
    { id: 830582, title: "Accessibility Audit received from misha mam for Gov.in secure Intranet", status: "open", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Govintranet" },
    { id: 830598, title: "Make Pipeline for Auth Microservices", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Infrastructure" },
    { id: 830599, title: "Jenkins deployment Pipeline from open forge for Calendar Microservice", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Infrastructure" },
    { id: 830601, title: "AI Meeting Intelligence platform- Hide Follow-up Tasks & Next Meeting", status: "open", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 830605, title: "AI Meeting Intelligence platform- MOM Page", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 830606, title: "AI Meeting Intelligence platform- Menu Related", status: "open", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "AI Meeting Intelligence" },
    { id: 830607, title: "AI Meeting Intelligence platform- Complete Task Creation", status: "open", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "AI Meeting Intelligence" },

    // QA Testing
    { id: 811221, title: "Automation of Monitoring Dashboard", status: "qa", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Govintranet" },
    { id: 811165, title: "Multi Level Hierarchy in task module", status: "qa", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Govintranet" },
    { id: 819869, title: "Govin CDAC Audit", status: "qa", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Security" },
    { id: 825184, title: "Mail was not working in Govintranet when create, update meeting", status: "qa", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Govintranet" },

    // Done/Closed
    { id: 812281, title: "Convert Auth + Calendar module into microservices into local setup and show to op sir", status: "done", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Infrastructure" },
    { id: 812252, title: "Set up Kong Api gateway on Etaalk8s", status: "done", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Infrastructure" },
    { id: 812251, title: "Setup Test Cluster Environment for Gov Application on Etaalk8s", status: "done", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Infrastructure" },
    { id: 812284, title: "Run Auth + calendar + monolithic on pods", status: "done", tracker: "tasks", priority: "high", assignee: "Unassigned", project: "Infrastructure" },
    { id: 823069, title: "Duplicate Designation should be removed", status: "done", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Govintranet" },
    { id: 823275, title: "Mention document size on each functionality in utility", status: "done", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "Govintranet" },
    { id: 815801, title: "Gov Application - similarity score must be on individual field", status: "done", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 815814, title: "Gov Application - categorize applications in Domain using LLM", status: "done", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 815829, title: "Gov Application - Enhance AI search and Voice search", status: "done", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 821694, title: "Gov Application - Add My Application Filter", status: "done", tracker: "tasks", priority: "normal", assignee: "Unassigned", project: "Gov Application" },
    { id: 825196, title: "Texttile Data update - raise by sriviwasan", status: "done", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "Govintranet" },

    // Archive (sample)
    { id: 800001, title: "Legacy module migration - Phase 1", status: "archive", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "Govintranet" },
    { id: 800002, title: "Legacy module migration - Phase 2", status: "archive", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "Govintranet" },
    { id: 800003, title: "Old DB schema cleanup", status: "archive", tracker: "tasks", priority: "low", assignee: "Unassigned", project: "Govintranet Database" },

    // Bug tracker items
    { id: 900001, title: "Login page not loading on Firefox", status: "open", tracker: "bugs", priority: "high", assignee: "Unassigned", project: "Govintranet" },
    { id: 900002, title: "Dashboard chart render issue on mobile", status: "open", tracker: "bugs", priority: "normal", assignee: "Unassigned", project: "Govintranet" },
    { id: 900003, title: "Session timeout not working correctly", status: "done", tracker: "bugs", priority: "high", assignee: "Unassigned", project: "Govintranet" },
    { id: 900004, title: "File upload size limit error message unclear", status: "done", tracker: "bugs", priority: "low", assignee: "Unassigned", project: "Govintranet" },
    { id: 900005, title: "Search results pagination broken", status: "done", tracker: "bugs", priority: "normal", assignee: "Unassigned", project: "Govintranet" },
    { id: 900006, title: "Email notification not sent for meeting", status: "done", tracker: "bugs", priority: "high", assignee: "Unassigned", project: "Govintranet" },
    { id: 900007, title: "Export CSV encoding issue", status: "done", tracker: "bugs", priority: "low", assignee: "Unassigned", project: "Govintranet" },

    // Requirements
    { id: 950001, title: "Role-based access control for admin panel", status: "open", tracker: "requirements", priority: "high", assignee: "Unassigned", project: "Govintranet" },
    { id: 950002, title: "Multi-language support (Hindi/English)", status: "open", tracker: "requirements", priority: "normal", assignee: "Unassigned", project: "Govintranet" },
    { id: 950003, title: "Audit trail for all data modifications", status: "open", tracker: "requirements", priority: "high", assignee: "Unassigned", project: "Govintranet" },
    { id: 950004, title: "API documentation with Swagger/OpenAPI", status: "open", tracker: "requirements", priority: "normal", assignee: "Unassigned", project: "Govintranet" },

    // User Stories
    { id: 970001, title: "As an admin, I want to manage user roles so that I can control access", status: "open", tracker: "user-stories", priority: "high", assignee: "Unassigned", project: "Govintranet" },
    { id: 970002, title: "As a user, I want to search applications by name so that I can find them quickly", status: "open", tracker: "user-stories", priority: "normal", assignee: "Unassigned", project: "Gov Application" },

    // Change Requests
    { id: 980001, title: "CR-001: Add new field for Digital India certification", status: "open", tracker: "change-requests", priority: "normal", assignee: "Unassigned", project: "Gov Application" },

    // Patches/Fixes
    { id: 990001, title: "Hotfix: Critical security patch for auth module", status: "done", tracker: "patches", priority: "high", assignee: "Unassigned", project: "Infrastructure" }
  ],
  members: [
    "Aditya Kumar",
    "Rahul Sharma",
    "Priya Patel",
    "Vikram Singh",
    "Neha Gupta"
  ],
  projects: [
    "Govintranet",
    "Gov Application",
    "AI Meeting Intelligence",
    "Govintranet Database",
    "Infrastructure",
    "Security"
  ]
};

const STATUS_COLUMNS = [
  { id: "backlog", name: "Backlog", color: "#6c757d" },
  { id: "open", name: "Open", color: "#0d6efd" },
  { id: "qa", name: "QA Testing", color: "#ffc107" },
  { id: "done", name: "Done / Closed", color: "#198754" },
  { id: "archive", name: "Archive", color: "#6c757d" }
];

const PRIORITY_COLORS = {
  low: "#17a2b8",
  normal: "#6c757d",
  high: "#dc3545",
  urgent: "#ff0000"
};
