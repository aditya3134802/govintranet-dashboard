// ═══════ Widget Registry ═══════
// Each widget defines: id, name, category, icon, size, defaultConfig, render(config)

const WIDGET_CATEGORIES = {
  general: { name: "General", icon: "📌" },
  continuous_integration: { name: "Continuous Integration", icon: "🔧" },
  document_manager: { name: "Document Manager", icon: "📁" },
  kanban: { name: "Kanban", icon: "📋" },
  project_statistics: { name: "Project Statistics", icon: "📊" },
  source_code: { name: "Source Code Management", icon: "💻" },
  trackers: { name: "Trackers", icon: "🎯" }
};

const WIDGET_REGISTRY = [
  // ── General ──
  {
    id: "widget-name",
    name: "Name",
    category: "general",
    icon: "🏷️",
    size: "small",
    defaultConfig: { showSubtitle: true },
    render(cfg) {
      return `<div class="widget-name-block">
        <h2 style="font-size:20px;font-weight:700">${PROJECT_DATA.name}</h2>
        ${cfg.showSubtitle ? `<p style="color:var(--text-secondary);font-size:13px;margin-top:4px">${PROJECT_DATA.description}</p>` : ""}
      </div>`;
    }
  },
  {
    id: "widget-contacts",
    name: "Contacts",
    category: "general",
    icon: "👤",
    size: "medium",
    defaultConfig: { maxShow: 5 },
    render(cfg) {
      const members = PROJECT_DATA.members.slice(0, cfg.maxShow);
      return `<div class="widget-contacts-list">
        ${members.map(m => `<div class="widget-contact-item">
          <div class="user-avatar" style="width:28px;height:28px;font-size:11px">${m.split(" ").map(n=>n[0]).join("")}</div>
          <span>${m}</span>
        </div>`).join("")}
      </div>`;
    }
  },
  {
    id: "widget-heartbeat",
    name: "Heartbeat",
    category: "general",
    icon: "💓",
    size: "small",
    defaultConfig: { interval: "daily" },
    render() {
      const now = new Date();
      return `<div class="widget-heartbeat">
        <div class="heartbeat-time">${now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
        <div class="heartbeat-status" style="color:#198754;font-weight:600;margin-top:8px">● Active</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:4px">Last updated: ${now.toLocaleTimeString()}</div>
      </div>`;
    }
  },
  {
    id: "widget-image",
    name: "Image",
    category: "general",
    icon: "🖼️",
    size: "medium",
    defaultConfig: { caption: "Project Banner" },
    render(cfg) {
      return `<div class="widget-image-block">
        <div style="background:linear-gradient(135deg,var(--accent),#6c5ce7);height:120px;border-radius:var(--radius);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:600">
          ${PROJECT_DATA.name}
        </div>
        <p style="font-size:12px;color:var(--text-secondary);margin-top:6px;text-align:center">${cfg.caption}</p>
      </div>`;
    }
  },
  {
    id: "widget-note",
    name: "Note",
    category: "general",
    icon: "📝",
    size: "medium",
    defaultConfig: { content: "Click to edit this note...", editable: true },
    render(cfg, widgetId) {
      return `<div class="widget-note-block">
        <div class="widget-note-content" contenteditable="${cfg.editable}" data-widget-id="${widgetId}"
             style="min-height:60px;padding:8px;border:1px dashed var(--border-color);border-radius:var(--radius);font-size:13px;outline:none">${cfg.content}</div>
      </div>`;
    }
  },
  {
    id: "widget-project-desc",
    name: "Project Description",
    category: "general",
    icon: "📄",
    size: "medium",
    defaultConfig: {},
    render() {
      return `<div style="font-size:13px;line-height:1.6">
        <p>${PROJECT_DATA.name} is a comprehensive intranet and application management platform.</p>
        <p style="margin-top:8px;color:var(--text-secondary)">Status: <strong style="color:#198754">Active</strong> | Visibility: <strong>Private</strong></p>
      </div>`;
    }
  },
  {
    id: "widget-project-links",
    name: "Project Links",
    category: "general",
    icon: "🔗",
    size: "small",
    defaultConfig: { links: [
      { label: "Documentation", url: "#" },
      { label: "Wiki", url: "#" },
      { label: "Repository", url: "#" }
    ]},
    render(cfg) {
      return `<div class="widget-links-list">
        ${cfg.links.map(l => `<a href="${l.url}" class="widget-link-item" style="display:flex;align-items:center;gap:6px;padding:6px 0;color:var(--accent);text-decoration:none;font-size:13px">→ ${l.label}</a>`).join("")}
      </div>`;
    }
  },
  {
    id: "widget-project-team",
    name: "Project Team",
    category: "general",
    icon: "👥",
    size: "medium",
    defaultConfig: {},
    render() {
      return `<div class="widget-team-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px">
        ${PROJECT_DATA.members.map(m => `<div class="widget-team-member" style="text-align:center;padding:8px;background:var(--bg-primary);border-radius:var(--radius)">
          <div class="user-avatar" style="width:36px;height:36px;font-size:12px;margin:0 auto 6px">${m.split(" ").map(n=>n[0]).join("")}</div>
          <div style="font-size:12px;font-weight:500">${m.split(" ")[0]}</div>
        </div>`).join("")}
      </div>`;
    }
  },
  {
    id: "widget-public-areas",
    name: "Public Areas",
    category: "general",
    icon: "🌐",
    size: "small",
    defaultConfig: {},
    render() {
      const areas = ["News", "Announcements", "Documents", "Wiki", "Forums"];
      return `<div style="display:flex;flex-wrap:wrap;gap:6px">
        ${areas.map(a => `<span style="padding:4px 10px;background:var(--bg-primary);border:1px solid var(--border-color);border-radius:20px;font-size:12px">${a}</span>`).join("")}
      </div>`;
    }
  },
  {
    id: "widget-rss",
    name: "RSS Reader",
    category: "general",
    icon: "📡",
    size: "medium",
    defaultConfig: { feedUrl: "" },
    render(cfg) {
      const items = [
        { title: "Project update v2.4 released", date: "2026-08-18" },
        { title: "New team member joined", date: "2026-08-15" },
        { title: "Sprint planning notes", date: "2026-08-12" }
      ];
      return `<div class="widget-rss-list">
        ${items.map(i => `<div style="padding:6px 0;border-bottom:1px solid var(--border-color);font-size:12px">
          <div style="font-weight:500">${i.title}</div>
          <div style="color:var(--text-secondary);font-size:11px;margin-top:2px">${i.date}</div>
        </div>`).join("")}
      </div>`;
    }
  },

  // ── Continuous Integration ──
  {
    id: "widget-builds-history",
    name: "Builds History",
    category: "continuous_integration",
    icon: "🔨",
    size: "large",
    defaultConfig: {},
    render() {
      const builds = [
        { id: "B-1042", status: "success", branch: "main", duration: "3m 24s", date: "2h ago" },
        { id: "B-1041", status: "success", branch: "feat/dashboard", duration: "4m 11s", date: "5h ago" },
        { id: "B-1040", status: "failed", branch: "fix/auth", duration: "2m 08s", date: "1d ago" },
        { id: "B-1039", status: "success", branch: "main", duration: "3m 18s", date: "1d ago" }
      ];
      const statusColors = { success: "#198754", failed: "#dc3545", running: "#ffc107" };
      return `<div class="widget-builds-list">
        ${builds.map(b => `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border-color);font-size:12px">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="width:8px;height:8px;border-radius:50%;background:${statusColors[b.status]}"></span>
            <strong>${b.id}</strong>
            <span style="color:var(--text-secondary)">${b.branch}</span>
          </div>
          <div style="display:flex;gap:12px;color:var(--text-secondary)">
            <span>${b.duration}</span>
            <span>${b.date}</span>
          </div>
        </div>`).join("")}
      </div>`;
    }
  },
  {
    id: "widget-jenkins-jobs",
    name: "Jenkins Jobs",
    category: "continuous_integration",
    icon: "🤖",
    size: "medium",
    defaultConfig: {},
    render() {
      const jobs = [
        { name: "govintranet-deploy", status: "success", last: "3m ago" },
        { name: "auth-service-build", status: "success", last: "1h ago" },
        { name: "meeting-intel-pipeline", status: "running", last: "Running..." },
        { name: "db-migration", status: "failed", last: "3h ago" }
      ];
      const statusMap = { success: "✅", failed: "❌", running: "🔄" };
      return `<div>
        ${jobs.map(j => `<div style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-color);font-size:12px">
          <div style="display:flex;align-items:center;gap:8px">
            <span>${statusMap[j.status]}</span>
            <span style="font-weight:500">${j.name}</span>
          </div>
          <span style="color:var(--text-secondary)">${j.last}</span>
        </div>`).join("")}
      </div>`;
    }
  },
  {
    id: "widget-last-artifacts",
    name: "Last Artifacts",
    category: "continuous_integration",
    icon: "📦",
    size: "medium",
    defaultConfig: {},
    render() {
      const artifacts = [
        { name: "govintranet-2.4.1.war", size: "48.2 MB", date: "Today" },
        { name: "auth-svc-1.0.0.jar", size: "12.8 MB", date: "Yesterday" },
        { name: "meeting-intel-3.2.tar.gz", size: "156 MB", date: "2 days ago" }
      ];
      return `<div>
        ${artifacts.map(a => `<div style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-color);font-size:12px">
          <div><span style="font-weight:500">${a.name}</span></div>
          <div style="display:flex;gap:12px;color:var(--text-secondary)">
            <span>${a.size}</span><span>${a.date}</span>
          </div>
        </div>`).join("")}
      </div>`;
    }
  },
  {
    id: "widget-last-builds",
    name: "Last Builds",
    category: "continuous_integration",
    icon: "🏗️",
    size: "medium",
    defaultConfig: {},
    render() {
      const builds = [
        { id: "#204", pipeline: "govintranet-deploy", status: "success", duration: "4m 12s" },
        { id: "#87", pipeline: "auth-service-build", status: "success", duration: "2m 55s" },
        { id: "#45", pipeline: "meeting-intel-pipeline", status: "failed", duration: "6m 33s" }
      ];
      const statusMap = { success: "#198754", failed: "#dc3545", running: "#ffc107" };
      return `<div>
        ${builds.map(b => `<div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--border-color);font-size:12px">
          <span style="width:8px;height:8px;border-radius:50%;background:${statusMap[b.status]};flex-shrink:0"></span>
          <span style="font-weight:500">${b.id}</span>
          <span style="flex:1;color:var(--text-secondary)">${b.pipeline}</span>
          <span style="color:var(--text-secondary)">${b.duration}</span>
        </div>`).join("")}
      </div>`;
    }
  },
  {
    id: "widget-test-results",
    name: "Test Results",
    category: "continuous_integration",
    icon: "🧪",
    size: "medium",
    defaultConfig: {},
    render() {
      return `<div class="widget-test-results" style="display:flex;gap:16px;flex-wrap:wrap">
        <div style="text-align:center;flex:1;min-width:80px">
          <div style="font-size:28px;font-weight:700;color:#198754">342</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">Passed</div>
        </div>
        <div style="text-align:center;flex:1;min-width:80px">
          <div style="font-size:28px;font-weight:700;color:#dc3545">12</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">Failed</div>
        </div>
        <div style="text-align:center;flex:1;min-width:80px">
          <div style="font-size:28px;font-weight:700;color:#ffc107">5</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">Skipped</div>
        </div>
        <div style="text-align:center;flex:1;min-width:80px">
          <div style="font-size:28px;font-weight:700;color:var(--accent)">96.6%</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">Pass Rate</div>
        </div>
      </div>`;
    }
  },
  {
    id: "widget-test-trend",
    name: "Test Result Trend",
    category: "continuous_integration",
    icon: "📈",
    size: "large",
    defaultConfig: {},
    render() {
      const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
      const passed = [94,96,95,97,93,98,96.6];
      const barMax = 100;
      return `<div>
        <div style="display:flex;align-items:flex-end;gap:6px;height:100px;padding-top:8px">
          ${passed.map((v,i) => `<div style="flex:1;text-align:center">
            <div style="background:${v>=95?"#198754":v>=90?"#ffc107":"#dc3545"};height:${v}%;border-radius:3px 3px 0 0;min-height:4px;transition:height 0.3s"></div>
            <div style="font-size:10px;color:var(--text-secondary);margin-top:4px">${days[i]}</div>
          </div>`).join("")}
        </div>
        <div style="font-size:11px;color:var(--text-secondary);margin-top:8px;text-align:center">Test pass rate trend (last 7 days)</div>
      </div>`;
    }
  },

  // ── Document Manager ──
  {
    id: "widget-document-viewer",
    name: "Document Viewer",
    category: "document_manager",
    icon: "📖",
    size: "large",
    defaultConfig: {},
    render() {
      const docs = [
        { name: "PostgreSQL_Backup_Runbook.docx", size: "245 KB", modified: "2026-08-10" },
        { name: "Incident_Agent_Plan_v1.0.docx", size: "1.2 MB", modified: "2026-08-05" },
        { name: "API_Documentation.pdf", size: "3.8 MB", modified: "2026-07-28" }
      ];
      return `<div>
        ${docs.map(d => `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border-color);font-size:12px">
          <div style="display:flex;align-items:center;gap:8px">
            <span>📄</span><span style="font-weight:500">${d.name}</span>
          </div>
          <div style="display:flex;gap:12px;color:var(--text-secondary)">
            <span>${d.size}</span><span>${d.modified}</span>
          </div>
        </div>`).join("")}
      </div>`;
    }
  },
  {
    id: "widget-files",
    name: "Files",
    category: "document_manager",
    icon: "📂",
    size: "medium",
    defaultConfig: {},
    render() {
      const files = [
        { name: "Dockerfile", size: "1.2 KB", type: "Docker" },
        { name: "Jenkinsfile", size: "3.4 KB", type: "Pipeline" },
        { name: "smtp_forward_relay.py", size: "4.8 KB", type: "Python" },
        { name: ".env-example", size: "0.6 KB", type: "Config" }
      ];
      return `<div>
        ${files.map(f => `<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border-color);font-size:12px">
          <span style="font-weight:500">📎 ${f.name}</span>
          <span style="color:var(--text-secondary)">${f.size}</span>
        </div>`).join("")}
      </div>`;
    }
  },
  {
    id: "widget-latest-releases",
    name: "Latest File Releases",
    category: "document_manager",
    icon: "🚀",
    size: "medium",
    defaultConfig: {},
    render() {
      const releases = [
        { version: "v2.4.1", date: "2026-08-18", files: 3 },
        { version: "v2.4.0", date: "2026-08-01", files: 5 },
        { version: "v2.3.9", date: "2026-07-15", files: 2 }
      ];
      return `<div>
        ${releases.map(r => `<div style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-color);font-size:12px">
          <div>
            <strong style="color:var(--accent)">${r.version}</strong>
            <span style="color:var(--text-secondary);margin-left:8px">${r.date}</span>
          </div>
          <span style="color:var(--text-secondary)">${r.files} files</span>
        </div>`).join("")}
      </div>`;
    }
  },

  // ── Kanban ──
  {
    id: "widget-kanban",
    name: "Kanban",
    category: "kanban",
    icon: "📌",
    size: "large",
    defaultConfig: { boardId: "task-board", compact: true },
    render(cfg) {
      const board = PROJECT_DATA.kanbanBoards.find(b => b.id === cfg.boardId) || PROJECT_DATA.kanbanBoards[0];
      const tasks = getFilteredTasks(board.tracker).slice(0, 3);
      return `<div>
        <div style="font-size:12px;color:var(--text-secondary);margin-bottom:8px">${board.name} - ${tasks.length} tasks (compact view)</div>
        ${tasks.map(t => `<div style="padding:6px 8px;margin-bottom:4px;background:var(--bg-primary);border-radius:var(--radius);font-size:12px;border-left:3px solid ${PRIORITY_COLORS[t.priority]}">
          <span style="color:var(--text-secondary)">#${t.id}</span> ${t.title.substring(0, 50)}${t.title.length > 50 ? "..." : ""}
        </div>`).join("")}
        <div style="text-align:center;margin-top:8px">
          <a href="#" onclick="navigateToBoard('${board.id}');return false" style="font-size:12px;color:var(--accent);text-decoration:none">View full board →</a>
        </div>
      </div>`;
    }
  },

  // ── Project Statistics ──
  {
    id: "widget-project-stats",
    name: "Project Statistics",
    category: "project_statistics",
    icon: "📊",
    size: "large",
    defaultConfig: {},
    render() {
      const totalTasks = PROJECT_DATA.tasks.length;
      const openTasks = PROJECT_DATA.tasks.filter(t => t.status === "open" || t.status === "backlog").length;
      const doneTasks = PROJECT_DATA.tasks.filter(t => t.status === "done").length;
      const totalTrackers = PROJECT_DATA.trackers.reduce((s, t) => s + t.total, 0);
      const openTrackers = PROJECT_DATA.trackers.reduce((s, t) => s + t.open, 0);
      const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
      return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center">
        <div>
          <div style="font-size:28px;font-weight:700;color:var(--accent)">${totalTasks}</div>
          <div style="font-size:11px;color:var(--text-secondary)">Total Tasks</div>
        </div>
        <div>
          <div style="font-size:28px;font-weight:700;color:#ffc107">${openTasks}</div>
          <div style="font-size:11px;color:var(--text-secondary)">Open / Backlog</div>
        </div>
        <div>
          <div style="font-size:28px;font-weight:700;color:#198754">${doneTasks}</div>
          <div style="font-size:11px;color:var(--text-secondary)">Completed</div>
        </div>
      </div>
      <div style="margin-top:16px">
        <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
          <span>Progress</span><span style="font-weight:600">${pct}%</span>
        </div>
        <div style="height:8px;background:var(--bg-primary);border-radius:4px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--accent),#198754);border-radius:4px;transition:width 0.5s"></div>
        </div>
      </div>
      <div style="margin-top:12px;font-size:12px;color:var(--text-secondary)">
        ${openTrackers} open items across ${PROJECT_DATA.trackers.length} trackers
      </div>`;
    }
  },
  {
    id: "widget-tracker-chart",
    name: "Tracker Chart",
    category: "trackers",
    icon: "🎯",
    size: "large",
    defaultConfig: {},
    render() {
      const trackers = PROJECT_DATA.trackers.filter(t => t.total > 0);
      const maxTotal = Math.max(...trackers.map(t => t.total));
      return `<div>
        ${trackers.map(t => {
          const openPct = t.total > 0 ? (t.open / t.total * 100) : 0;
          const closedPct = 100 - openPct;
          return `<div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px">
              <span>${t.icon} ${t.name}</span>
              <span style="color:var(--text-secondary)">${t.open}/${t.total}</span>
            </div>
            <div style="height:8px;background:var(--bg-primary);border-radius:4px;overflow:hidden;display:flex">
              <div style="width:${openPct}%;background:${t.color};border-radius:4px 0 0 4px;transition:width 0.5s"></div>
              <div style="width:${closedPct}%;background:#e0e0e0;border-radius:0 4px 4px 0;transition:width 0.5s"></div>
            </div>
          </div>`;
        }).join("")}
      </div>`;
    }
  },
  {
    id: "widget-tracker-renderer",
    name: "Tracker Renderer",
    category: "trackers",
    icon: "📋",
    size: "large",
    defaultConfig: { trackerId: "tasks" },
    render(cfg) {
      const tracker = PROJECT_DATA.trackers.find(t => t.id === cfg.trackerId) || PROJECT_DATA.trackers[0];
      const tasks = PROJECT_DATA.tasks.filter(t => t.tracker === tracker.id).slice(0, 8);
      return `<div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <div class="tracker-icon" style="background:${tracker.color}20;color:${tracker.color};width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px">${tracker.icon}</div>
          <span style="font-weight:600;font-size:13px">${tracker.name}</span>
          <span style="color:var(--text-secondary);font-size:12px;margin-left:auto">${tracker.open} open / ${tracker.total} total</span>
        </div>
        ${tasks.map(t => `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border-color);font-size:12px">
          <span style="color:var(--accent);font-weight:600">#${t.id}</span>
          <span style="flex:1">${t.title.substring(0, 55)}${t.title.length > 55 ? "..." : ""}</span>
          <span class="issue-status status-${t.status}" style="font-size:10px">${formatStatus(t.status)}</span>
        </div>`).join("")}
        ${tasks.length === 0 ? '<div style="text-align:center;padding:16px;color:var(--text-secondary);font-size:13px">No items</div>' : ""}
      </div>`;
    }
  },
  {
    id: "widget-last-pushes",
    name: "Last Git Pushes",
    category: "source_code",
    icon: "📤",
    size: "medium",
    defaultConfig: {},
    render() {
      const pushes = [
        { author: "Aditya K.", branch: "main", message: "Fix auth microservice JWT validation", date: "2h ago" },
        { author: "Rahul S.", branch: "feat/dashboard", message: "Add widget system for dashboard", date: "5h ago" },
        { author: "Priya P.", branch: "fix/mail", message: "Fix email notification for meetings", date: "1d ago" },
        { author: "Vikram S.", branch: "main", message: "Update DB schema constraints", date: "2d ago" }
      ];
      return `<div>
        ${pushes.map(p => `<div style="padding:7px 0;border-bottom:1px solid var(--border-color);font-size:12px">
          <div style="display:flex;justify-content:space-between">
            <span style="font-weight:500">${p.author}</span>
            <span style="color:var(--text-secondary)">${p.date}</span>
          </div>
          <div style="color:var(--accent);font-size:11px;margin-top:2px">${p.branch}</div>
          <div style="color:var(--text-secondary);margin-top:2px">${p.message}</div>
        </div>`).join("")}
      </div>`;
    }
  }
];

// ── Helper: Find widget by ID ──
function getWidgetById(id) {
  return WIDGET_REGISTRY.find(w => w.id === id);
}

// ── Helper: Get widgets by category ──
function getWidgetsByCategory(categoryId) {
  return WIDGET_REGISTRY.filter(w => w.category === categoryId);
}
