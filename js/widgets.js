// ═══════ Widget Registry ═══════
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
      return `<div style="padding:4px 0">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
          <div style="width:44px;height:44px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:16px;box-shadow:0 4px 12px rgba(59,130,246,0.3)">OF</div>
          <div>
            <h2 style="font-size:22px;font-weight:800;letter-spacing:-0.03em;line-height:1.2">${PROJECT_DATA.name}</h2>
            ${cfg.showSubtitle ? `<p style="color:var(--text-secondary);font-size:13px;margin-top:2px">${PROJECT_DATA.description}</p>` : ""}
          </div>
        </div>
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
      const colors = ["#3b82f6","#8b5cf6","#ec4899","#f59e0b","#10b981"];
      return `<div style="display:flex;flex-direction:column;gap:8px">
        ${members.map((m,i) => `<div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:var(--bg-primary);border-radius:10px;transition:all 0.15s" onmouseover="this.style.background='var(--accent-light)'" onmouseout="this.style.background='var(--bg-primary)'">
          <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,${colors[i%colors.length]},${colors[(i+1)%colors.length]});color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0;box-shadow:0 2px 8px ${colors[i%colors.length]}40">${m.split(" ").map(n=>n[0]).join("")}</div>
          <div>
            <div style="font-weight:600;font-size:13px">${m}</div>
            <div style="font-size:11px;color:var(--text-secondary)">Team Member</div>
          </div>
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
      return `<div style="text-align:center;padding:8px 0">
        <div style="font-size:36px;margin-bottom:8px">💓</div>
        <div style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;background:rgba(16,185,129,0.1);border-radius:20px;margin-bottom:10px">
          <span style="width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 8px rgba(16,185,129,0.6);animation:pulse 2s infinite"></span>
          <span style="color:#10b981;font-weight:600;font-size:12px">Active</span>
        </div>
        <div style="font-size:13px;font-weight:500;margin-bottom:2px">${now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</div>
        <div style="font-size:11px;color:var(--text-secondary)">Updated ${now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</div>
        <style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}</style>
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
      return `<div>
        <div style="background:linear-gradient(135deg,#3b82f6 0%,#8b5cf6 50%,#ec4899 100%);height:140px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:700;letter-spacing:-0.02em;box-shadow:0 4px 20px rgba(59,130,246,0.3);position:relative;overflow:hidden">
          <div style="position:absolute;inset:0;background:url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");opacity:0.5"></div>
          <span style="position:relative;z-index:1">${PROJECT_DATA.name}</span>
        </div>
        <p style="font-size:12px;color:var(--text-secondary);margin-top:8px;text-align:center;font-weight:500">${cfg.caption}</p>
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
      return `<div>
        <div contenteditable="${cfg.editable}" data-widget-id="${widgetId}"
             style="min-height:80px;padding:12px;border:2px dashed var(--border-color);border-radius:10px;font-size:13px;outline:none;line-height:1.7;transition:border-color 0.2s;color:var(--text-primary)"
             onfocus="this.style.borderColor='var(--accent)';this.style.background='var(--accent-light)'"
             onblur="this.style.borderColor='var(--border-color)';this.style.background='transparent'">${cfg.content}</div>
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
      return `<div style="font-size:13px;line-height:1.8;color:var(--text-secondary)">
        <p style="color:var(--text-primary);font-weight:500">${PROJECT_DATA.name} is a comprehensive intranet and application management platform built for government workflows.</p>
        <div style="display:flex;gap:16px;margin-top:12px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(16,185,129,0.1);border-radius:8px">
            <span style="width:8px;height:8px;border-radius:50%;background:#10b981"></span>
            <span style="font-size:12px;font-weight:600;color:#10b981">Active</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--bg-primary);border-radius:8px">
            <span style="font-size:12px;font-weight:500">🔒 Private</span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--bg-primary);border-radius:8px">
            <span style="font-size:12px;font-weight:500">👥 ${PROJECT_DATA.members.length} members</span>
          </div>
        </div>
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
      { label: "Documentation", url: "#", icon: "📄" },
      { label: "Wiki", url: "#", icon: "📚" },
      { label: "Repository", url: "#", icon: "💻" },
      { label: "CI/CD Pipeline", url: "#", icon: "🔧" }
    ]},
    render(cfg) {
      return `<div style="display:flex;flex-direction:column;gap:6px">
        ${cfg.links.map(l => `<a href="${l.url}" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-primary);border-radius:10px;color:var(--text-primary);text-decoration:none;font-size:13px;font-weight:500;transition:all 0.15s;border:1px solid transparent" onmouseover="this.style.borderColor='var(--accent)';this.style.background='var(--accent-light)'" onmouseout="this.style.borderColor='transparent';this.style.background='var(--bg-primary)'">
          <span style="font-size:16px">${l.icon}</span>
          <span>${l.label}</span>
          <span style="margin-left:auto;color:var(--text-secondary);font-size:12px">→</span>
        </a>`).join("")}
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
      const colors = ["#3b82f6","#8b5cf6","#ec4899","#f59e0b","#10b981"];
      return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:12px">
        ${PROJECT_DATA.members.map((m,i) => `<div style="text-align:center;padding:16px 8px;background:var(--bg-primary);border-radius:12px;transition:all 0.2s;cursor:default" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
          <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,${colors[i%colors.length]},${colors[(i+2)%colors.length]});color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;margin:0 auto 8px;box-shadow:0 4px 12px ${colors[i%colors.length]}30">${m.split(" ").map(n=>n[0]).join("")}</div>
          <div style="font-size:12px;font-weight:600">${m.split(" ")[0]}</div>
          <div style="font-size:10px;color:var(--text-secondary);margin-top:2px">Member</div>
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
      const areas = [
        { name: "News", icon: "📰" },
        { name: "Announcements", icon: "📢" },
        { name: "Documents", icon: "📄" },
        { name: "Wiki", icon: "📚" },
        { name: "Forums", icon: "💬" }
      ];
      return `<div style="display:flex;flex-direction:column;gap:6px">
        ${areas.map(a => `<div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-primary);border-radius:8px;font-size:12px;font-weight:500">
          <span>${a.icon}</span><span>${a.name}</span>
        </div>`).join("")}
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
        { title: "Project update v2.4 released", date: "2026-08-18", tag: "Release" },
        { title: "New team member joined", date: "2026-08-15", tag: "Team" },
        { title: "Sprint planning notes published", date: "2026-08-12", tag: "Planning" }
      ];
      const tagColors = { Release: "#10b981", Team: "#8b5cf6", Planning: "#3b82f6" };
      return `<div style="display:flex;flex-direction:column;gap:4px">
        ${items.map(i => `<div style="display:flex;align-items:flex-start;gap:12px;padding:10px 12px;background:var(--bg-primary);border-radius:10px;font-size:12px;transition:all 0.15s;cursor:pointer" onmouseover="this.style.background='var(--accent-light)'" onmouseout="this.style.background='var(--bg-primary)'">
          <div style="flex:1">
            <div style="font-weight:600;margin-bottom:4px">${i.title}</div>
            <div style="color:var(--text-secondary);font-size:11px">${i.date}</div>
          </div>
          <span style="padding:3px 8px;background:${tagColors[i.tag]||"#64748b"}20;color:${tagColors[i.tag]||"#64748b"};border-radius:6px;font-size:10px;font-weight:600;white-space:nowrap">${i.tag}</span>
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
        { id: "B-1042", status: "success", branch: "main", duration: "3m 24s", date: "2h ago", trigger: "Aditya Kumar Singh" },
        { id: "B-1041", status: "success", branch: "main", duration: "4m 11s", date: "3h ago", trigger: "Aditya Kumar Singh" },
        { id: "B-1040", status: "failed", branch: "main", duration: "2m 08s", date: "1d ago", trigger: "Aditya Kumar Singh" },
        { id: "B-1039", status: "success", branch: "main", duration: "3m 18s", date: "1d ago", trigger: "Aditya Kumar Singh" }
      ];
      const statusConfig = {
        success: { color: "#10b981", bg: "rgba(16,185,129,0.1)", label: "Passed" },
        failed: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "Failed" },
        running: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", label: "Running" }
      };
      return `<div style="display:flex;flex-direction:column;gap:4px">
        ${builds.map(b => {
          const s = statusConfig[b.status];
          return `<div style="display:flex;align-items:center;gap:14px;padding:10px 14px;background:var(--bg-primary);border-radius:10px;font-size:12px;transition:all 0.15s;border-left:3px solid ${s.color}" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'" onmouseout="this.style.boxShadow=''">
            <div style="width:10px;height:10px;border-radius:50%;background:${s.color};flex-shrink:0;box-shadow:0 0 8px ${s.color}60"></div>
            <strong style="min-width:55px">${b.id}</strong>
            <span style="padding:3px 8px;background:var(--bg-secondary);border-radius:6px;font-size:11px;font-weight:500;color:var(--accent)">${b.branch}</span>
            <span style="flex:1;color:var(--text-secondary)">${b.trigger}</span>
            <span style="color:var(--text-secondary)">${b.duration}</span>
            <span style="padding:3px 10px;background:${s.bg};color:${s.color};border-radius:6px;font-size:10px;font-weight:600">${s.label}</span>
            <span style="color:var(--text-secondary);min-width:50px;text-align:right">${b.date}</span>
          </div>`;
        }).join("")}
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
        { name: "govintranet-deploy", status: "success", last: "3m ago", duration: "4m 12s" },
        { name: "auth-service-build", status: "success", last: "1h ago", duration: "2m 55s" },
        { name: "meeting-intel-pipeline", status: "running", last: "Running...", duration: "1m 23s" },
        { name: "db-migration", status: "failed", last: "3h ago", duration: "6m 33s" }
      ];
      const statusConfig = {
        success: { icon: "✅", color: "#10b981" },
        failed: { icon: "❌", color: "#ef4444" },
        running: { icon: "🔄", color: "#f59e0b" }
      };
      return `<div style="display:flex;flex-direction:column;gap:6px">
        ${jobs.map(j => {
          const s = statusConfig[j.status];
          return `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-primary);border-radius:10px;transition:all 0.15s" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'" onmouseout="this.style.boxShadow=''">
            <span style="font-size:16px">${s.icon}</span>
            <div style="flex:1;min-width:0">
              <div style="font-weight:600;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${j.name}</div>
              <div style="font-size:11px;color:var(--text-secondary)">${j.duration}</div>
            </div>
            <span style="font-size:11px;color:var(--text-secondary);white-space:nowrap">${j.last}</span>
          </div>`;
        }).join("")}
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
        { name: "govintranet-2.4.1.war", size: "48.2 MB", date: "Today", type: "WAR" },
        { name: "auth-svc-1.0.0.jar", size: "12.8 MB", date: "Yesterday", type: "JAR" },
        { name: "meeting-intel-3.2.tar.gz", size: "156 MB", date: "2 days ago", type: "TAR" }
      ];
      const typeColors = { WAR: "#3b82f6", JAR: "#8b5cf6", TAR: "#f59e0b" };
      return `<div style="display:flex;flex-direction:column;gap:6px">
        ${artifacts.map(a => `<div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:var(--bg-primary);border-radius:10px;transition:all 0.15s" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'" onmouseout="this.style.boxShadow=''">
          <div style="width:36px;height:36px;border-radius:8px;background:${typeColors[a.type]||"#64748b"}15;color:${typeColors[a.type]||"#64748b"};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700">${a.type}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:600;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.name}</div>
            <div style="font-size:11px;color:var(--text-secondary)">${a.size}</div>
          </div>
          <span style="font-size:11px;color:var(--text-secondary)">${a.date}</span>
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
      const sc = { success: "#10b981", failed: "#ef4444", running: "#f59e0b" };
      return `<div style="display:flex;flex-direction:column;gap:6px">
        ${builds.map(b => `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-primary);border-radius:10px;border-left:3px solid ${sc[b.status]}">
          <strong style="font-size:13px;min-width:40px;color:var(--accent)">${b.id}</strong>
          <span style="flex:1;font-size:12px;font-weight:500">${b.pipeline}</span>
          <span style="font-size:11px;color:var(--text-secondary)">${b.duration}</span>
          <span style="width:8px;height:8px;border-radius:50%;background:${sc[b.status]}"></span>
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
      const items = [
        { label: "Passed", value: 342, color: "#10b981", icon: "✓" },
        { label: "Failed", value: 12, color: "#ef4444", icon: "✗" },
        { label: "Skipped", value: 5, color: "#f59e0b", icon: "—" },
        { label: "Pass Rate", value: "96.6%", color: "#3b82f6", icon: "%" }
      ];
      return `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
        ${items.map(i => `<div style="text-align:center;padding:16px 12px;background:var(--bg-primary);border-radius:12px;border:1px solid var(--border-color)">
          <div style="width:36px;height:36px;border-radius:10px;background:${i.color}15;color:${i.color};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;margin:0 auto 8px">${i.icon}</div>
          <div style="font-size:24px;font-weight:800;color:${i.color};letter-spacing:-0.03em;line-height:1">${i.value}</div>
          <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;font-weight:500">${i.label}</div>
        </div>`).join("")}
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
      return `<div>
        <div style="display:flex;align-items:flex-end;gap:8px;height:120px;padding:12px 0">
          ${passed.map((v,i) => `<div style="flex:1;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%">
            <div style="font-size:10px;font-weight:600;color:var(--text-secondary);margin-bottom:4px">${v}%</div>
            <div style="width:100%;max-width:40px;background:${v>=95?"linear-gradient(180deg,#10b981,#059669)":v>=90?"linear-gradient(180deg,#f59e0b,#d97706)":"linear-gradient(180deg,#ef4444,#dc2626)"};height:${v}%;border-radius:6px 6px 2px 2px;min-height:4px;transition:height 0.5s ease;box-shadow:0 2px 8px ${v>=95?"rgba(16,185,129,0.3)":v>=90?"rgba(245,158,11,0.3)":"rgba(239,68,68,0.3)"}"></div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:6px;font-weight:500">${days[i]}</div>
          </div>`).join("")}
        </div>
        <div style="text-align:center;font-size:11px;color:var(--text-secondary);margin-top:4px;padding-top:8px;border-top:1px solid var(--border-color)">Test pass rate trend (last 7 days)</div>
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
        { name: "PostgreSQL_Backup_Runbook.docx", size: "245 KB", modified: "2026-08-10", icon: "📄" },
        { name: "Incident_Agent_Plan_v1.0.docx", size: "1.2 MB", modified: "2026-08-05", icon: "📄" },
        { name: "API_Documentation.pdf", size: "3.8 MB", modified: "2026-07-28", icon: "📕" }
      ];
      return `<div style="display:flex;flex-direction:column;gap:6px">
        ${docs.map(d => `<div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--bg-primary);border-radius:10px;transition:all 0.15s;cursor:pointer" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'" onmouseout="this.style.boxShadow=''">
          <span style="font-size:20px">${d.icon}</span>
          <div style="flex:1;min-width:0">
            <div style="font-weight:600;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d.name}</div>
            <div style="font-size:11px;color:var(--text-secondary)">${d.modified}</div>
          </div>
          <span style="font-size:11px;color:var(--text-secondary);font-weight:500">${d.size}</span>
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
        { name: "Dockerfile", size: "1.2 KB", type: "Docker", color: "#3b82f6" },
        { name: "Jenkinsfile", size: "3.4 KB", type: "Pipeline", color: "#8b5cf6" },
        { name: "smtp_forward_relay.py", size: "4.8 KB", type: "Python", color: "#10b981" },
        { name: ".env-example", size: "0.6 KB", type: "Config", color: "#f59e0b" }
      ];
      return `<div style="display:flex;flex-direction:column;gap:4px">
        ${files.map(f => `<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--bg-primary);border-radius:8px;font-size:12px">
          <div style="width:6px;height:24px;border-radius:3px;background:${f.color};flex-shrink:0"></div>
          <span style="flex:1;font-weight:600">${f.name}</span>
          <span style="padding:2px 8px;background:${f.color}15;color:${f.color};border-radius:4px;font-size:10px;font-weight:600">${f.type}</span>
          <span style="color:var(--text-secondary);min-width:45px;text-align:right">${f.size}</span>
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
        { version: "v2.4.1", date: "2026-08-18", files: 3, latest: true },
        { version: "v2.4.0", date: "2026-08-01", files: 5, latest: false },
        { version: "v2.3.9", date: "2026-07-15", files: 2, latest: false }
      ];
      return `<div style="display:flex;flex-direction:column;gap:6px">
        ${releases.map(r => `<div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--bg-primary);border-radius:10px;border-left:3px solid ${r.latest?"#10b981":"var(--border-color)"}">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px">
              <strong style="font-size:14px;color:var(--accent)">${r.version}</strong>
              ${r.latest ? '<span style="padding:2px 8px;background:rgba(16,185,129,0.1);color:#10b981;border-radius:6px;font-size:10px;font-weight:600">Latest</span>' : ""}
            </div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">${r.date} · ${r.files} files</div>
          </div>
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
      const tasks = getFilteredTasks(board.tracker).slice(0, 4);
      return `<div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <span style="font-size:12px;color:var(--text-secondary);font-weight:500">${board.name}</span>
          <span style="font-size:11px;color:var(--accent);font-weight:600;cursor:pointer" onclick="navigateToBoard('${board.id}')">View Board →</span>
        </div>
        ${tasks.map(t => `<div style="padding:10px 12px;margin-bottom:6px;background:var(--bg-primary);border-radius:10px;font-size:12px;border-left:3px solid ${PRIORITY_COLORS[t.priority]};transition:all 0.15s;cursor:pointer" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'" onmouseout="this.style.boxShadow=''">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
            <span style="color:var(--accent);font-weight:700;font-size:11px">#${t.id}</span>
            <span style="padding:2px 6px;background:${PRIORITY_COLORS[t.priority]}20;color:${PRIORITY_COLORS[t.priority]};border-radius:4px;font-size:9px;font-weight:700;text-transform:uppercase">${t.priority}</span>
          </div>
          <div style="font-weight:500;line-height:1.4">${t.title.substring(0, 60)}${t.title.length > 60 ? "..." : ""}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px">
            <span class="issue-status status-${t.status}" style="font-size:10px">${formatStatus(t.status)}</span>
            <span style="font-size:10px;color:var(--text-secondary)">${t.project}</span>
          </div>
        </div>`).join("")}
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
      const totalTasks = TASKS.length;
      const openTasks = TASKS.filter(t => t.status === "open" || t.status === "backlog").length;
      const doneTasks = TASKS.filter(t => t.status === "done").length;
      const qaTasks = TASKS.filter(t => t.status === "qa").length;
      const openTrackers = PROJECT_DATA.trackers.reduce((s, t) => s + t.open, 0);
      const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

      const stats = [
        { label: "Total", value: totalTasks, color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
        { label: "Open", value: openTasks, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
        { label: "QA", value: qaTasks, color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
        { label: "Done", value: doneTasks, color: "#10b981", bg: "rgba(16,185,129,0.1)" }
      ];

      return `<div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">
          ${stats.map(s => `<div style="text-align:center;padding:16px 8px;background:${s.bg};border-radius:12px">
            <div style="font-size:32px;font-weight:800;color:${s.color};letter-spacing:-0.03em;line-height:1">${s.value}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:4px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">${s.label}</div>
          </div>`).join("")}
        </div>
        <div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px">
            <span style="font-weight:600">Overall Progress</span>
            <span style="font-weight:700;color:var(--accent)">${pct}%</span>
          </div>
          <div style="height:10px;background:var(--bg-primary);border-radius:8px;overflow:hidden">
            <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#3b82f6,#10b981);border-radius:8px;transition:width 0.8s ease"></div>
          </div>
        </div>
        <div style="font-size:12px;color:var(--text-secondary);text-align:center;padding-top:8px;border-top:1px solid var(--border-color)">
          ${openTrackers} open items across ${PROJECT_DATA.trackers.length} trackers
        </div>
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
      return `<div>
        ${trackers.map(t => {
          const openPct = t.total > 0 ? (t.open / t.total * 100) : 0;
          const closedPct = 100 - openPct;
          return `<div style="margin-bottom:12px;padding:8px 12px;background:var(--bg-primary);border-radius:10px">
            <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;margin-bottom:6px">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:16px">${t.icon}</span>
                <span style="font-weight:600">${t.name}</span>
              </div>
              <span style="font-weight:600;color:${t.color}">${t.open} <span style="color:var(--text-secondary);font-weight:400">/ ${t.total}</span></span>
            </div>
            <div style="height:8px;background:var(--bg-secondary);border-radius:6px;overflow:hidden;display:flex;gap:2px">
              <div style="width:${openPct}%;background:${t.color};border-radius:6px;transition:width 0.5s"></div>
              <div style="width:${closedPct}%;background:var(--border-color);border-radius:6px;transition:width 0.5s"></div>
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
      const tasks = TASKS.filter(t => t.tracker === tracker.id).slice(0, 6);
      return `<div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border-color)">
          <div style="width:32px;height:32px;border-radius:8px;background:${tracker.color}15;color:${tracker.color};display:flex;align-items:center;justify-content:center;font-size:16px">${tracker.icon}</div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:14px">${tracker.name}</div>
          </div>
          <div style="text-align:right">
            <div style="font-weight:700;font-size:14px;color:${tracker.color}">${tracker.open}</div>
            <div style="font-size:10px;color:var(--text-secondary)">open</div>
          </div>
        </div>
        ${tasks.map(t => `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border-color);font-size:12px">
          <span style="color:var(--accent);font-weight:700;min-width:55px">#${t.id}</span>
          <span style="flex:1;font-weight:500">${t.title.substring(0, 50)}${t.title.length > 50 ? "..." : ""}</span>
          <span class="issue-status status-${t.status}" style="font-size:10px">${formatStatus(t.status)}</span>
        </div>`).join("")}
        ${tasks.length === 0 ? '<div style="text-align:center;padding:24px;color:var(--text-secondary);font-size:13px">No items</div>' : ""}
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
        { author: "Aditya Kumar Singh", branch: "main", message: "feat: add real OpenForge tasks, team members, admin role system", date: "2h ago", avatar: "#3b82f6" },
        { author: "Aditya Kumar Singh", branch: "main", message: "Visual overhaul - premium dashboard with proper folder structure", date: "3h ago", avatar: "#3b82f6" },
        { author: "Aditya Kumar Singh", branch: "main", message: "Add files via upload", date: "1d ago", avatar: "#3b82f6" },
        { author: "Aditya Kumar Singh", branch: "main", message: "Initial commit", date: "1d ago", avatar: "#3b82f6" }
      ];
      return `<div style="display:flex;flex-direction:column;gap:6px">
        ${pushes.map(p => `<div style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;background:var(--bg-primary);border-radius:10px;transition:all 0.15s" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'" onmouseout="this.style.boxShadow=''">
          <div style="width:32px;height:32px;border-radius:8px;background:${p.avatar};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;flex-shrink:0">${p.author.split(" ").map(n=>n[0]).join("")}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-weight:600;font-size:12px">${p.author}</span>
              <span style="font-size:10px;color:var(--text-secondary)">${p.date}</span>
            </div>
            <div style="display:inline-block;padding:2px 6px;background:rgba(59,130,246,0.1);color:var(--accent);border-radius:4px;font-size:10px;font-weight:600;margin-bottom:4px">${p.branch}</div>
            <div style="font-size:12px;color:var(--text-secondary);line-height:1.4">${p.message}</div>
          </div>
        </div>`).join("")}
      </div>`;
    }
  }
];

function getWidgetById(id) {
  return WIDGET_REGISTRY.find(w => w.id === id);
}

function getWidgetsByCategory(categoryId) {
  return WIDGET_REGISTRY.filter(w => w.category === categoryId);
}
