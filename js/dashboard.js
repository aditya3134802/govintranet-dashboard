// ═══════ Dashboard Manager ═══════
// Handles multiple dashboards, widget layout, drag-reorder, localStorage persistence

const STORAGE_KEY = "of-dashboards";
const DEFAULT_DASHBOARD_NAME = "My Dashboard";

// ── State ──
let dashboards = [];
let activeDashboardId = null;
let widgetDragState = { dragging: null, over: null };

// ── Live Refresh ──
function refreshDashboard() {
  renderActiveDashboard();
  renderKanbanBoard();
  renderIssues();
}

// ── Init ──
function initDashboardManager() {
  loadDashboards();
  if (dashboards.length === 0) {
    createDefaultDashboard();
  }

  // Check for OpenForge embed mode via URL param
  const urlParams = new URLSearchParams(window.location.search);
  const embedDashboardId = urlParams.get("dashboard_id");
  const embedWidgetId = urlParams.get("widget_id");

  if (embedWidgetId) {
    // Single widget embed mode for OpenForge iframe
    document.body.classList.add("embed-mode");
    renderSingleWidgetEmbed(embedWidgetId);
    return;
  }

  if (embedDashboardId) {
    // Full dashboard embed mode for OpenForge iframe
    document.body.classList.add("embed-mode");
    activeDashboardId = embedDashboardId;
  } else {
    activeDashboardId = dashboards[0].id;
  }

  renderDashboardTabs();
  renderActiveDashboard();
}

// ── Storage ──
function loadDashboards() {
  try {
    dashboards = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    dashboards = [];
  }
}

function saveDashboards() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dashboards));
}

// ── Default Dashboard ──
function createDefaultDashboard() {
  const defaultDash = {
    id: "dash-" + Date.now(),
    name: "Default Dashboard",
    createdAt: new Date().toISOString(),
    widgets: [
      { widgetId: "widget-name", config: {} },
      { widgetId: "widget-project-stats", config: {} },
      { widgetId: "widget-my-tasks", config: {} },
      { widgetId: "widget-team-tasks", config: {} },
      { widgetId: "widget-tracker-chart", config: {} },
      { widgetId: "widget-kanban", config: { boardId: "task-board" } },
      { widgetId: "widget-builds-history", config: {} },
      { widgetId: "widget-test-results", config: {} },
      { widgetId: "widget-contacts", config: {} },
      { widgetId: "widget-note", config: { content: "Welcome to OpenForge Dashboard! Click 'Add Widget' to customize." } }
    ]
  };
  dashboards.push(defaultDash);
  saveDashboards();
}

// ── Get Active Dashboard ──
function getActiveDashboard() {
  return dashboards.find(d => d.id === activeDashboardId) || dashboards[0];
}

// ═══════ RENDER: Dashboard Tabs ═══════
function renderDashboardTabs() {
  const container = document.getElementById("dashboard-tabs");
  if (!container) return;

  container.innerHTML = dashboards.map(d => `
    <div class="dash-tab ${d.id === activeDashboardId ? "active" : ""}" data-dash-id="${d.id}">
      <span class="dash-tab-name" ondblclick="renameDashboard('${d.id}')">${d.name}</span>
      <button class="dash-tab-close" onclick="event.stopPropagation();deleteDashboard('${d.id}')" title="Delete dashboard">×</button>
    </div>
  `).join("") + `
    <button class="dash-tab-add" onclick="showCreateDashboardModal()" title="Create new dashboard">+ New</button>
  `;

  container.querySelectorAll(".dash-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      activeDashboardId = tab.dataset.dashId;
      renderDashboardTabs();
      renderActiveDashboard();
    });
  });
}

// ═══════ RENDER: Active Dashboard Widgets ═══════
function renderActiveDashboard() {
  const dashboard = getActiveDashboard();
  if (!dashboard) return;

  const grid = document.getElementById("widget-grid");
  if (!grid) return;

  if (dashboard.widgets.length === 0) {
    grid.innerHTML = `
      <div class="widget-empty-state">
        <div style="font-size:48px;margin-bottom:16px">📊</div>
        <h3>No widgets yet</h3>
        <p style="color:var(--text-secondary);margin:8px 0 16px">Add widgets to build your custom dashboard</p>
        <button class="top-bar-btn primary" onclick="showAddWidgetModal()">+ Add Widget</button>
      </div>`;
    return;
  }

  grid.innerHTML = dashboard.widgets.map((w, index) => {
    const widgetDef = getWidgetById(w.widgetId);
    if (!widgetDef) return "";
    const sizeClass = `widget-size-${widgetDef.size || "medium"}`;
    return `
      <div class="widget-container ${sizeClass}" data-widget-index="${index}" data-widget-id="${w.widgetId}"
           draggable="true"
           ondragstart="handleWidgetDragStart(event, ${index})"
           ondragover="handleWidgetDragOver(event, ${index})"
           ondragenter="handleWidgetDragEnter(event, ${index})"
           ondragleave="handleWidgetDragLeave(event)"
           ondrop="handleWidgetDrop(event, ${index})"
           ondragend="handleWidgetDragEnd(event)">
        <div class="widget-header">
          <div class="widget-drag-handle" title="Drag to reorder">⠿</div>
          <span class="widget-title">${widgetDef.icon} ${widgetDef.name}</span>
          <div class="widget-actions">
            <button class="widget-action-btn" onclick="showWidgetConfigModal('${w.widgetId}', ${index})" title="Configure">⚙</button>
            <button class="widget-action-btn widget-action-remove" onclick="removeWidget(${index})" title="Remove">×</button>
          </div>
        </div>
        <div class="widget-body" id="widget-body-${index}">
          ${widgetDef.render(w.config, w.widgetId)}
        </div>
      </div>`;
  }).join("");

  // Save note edits
  grid.querySelectorAll("[contenteditable='true']").forEach(el => {
    el.addEventListener("blur", () => {
      const wid = el.dataset.widgetId;
      const wIdx = dashboard.widgets.findIndex(w => w.widgetId === wid);
      if (wIdx !== -1) {
        dashboard.widgets[wIdx].config.content = el.innerHTML;
        saveDashboards();
      }
    });
  });
}

// ═══════ RENDER: Single Widget Embed (OpenForge) ═══════
function renderSingleWidgetEmbed(widgetId) {
  const widgetDef = getWidgetById(widgetId);
  const appEl = document.getElementById("app");
  if (!widgetDef || !appEl) return;

  // Hide sidebar, topbar - show only widget
  document.querySelector(".sidebar")?.remove();
  document.querySelector(".top-bar")?.remove();
  document.querySelector(".a11y-trigger")?.remove();
  document.querySelector(".a11y-panel")?.remove();
  document.getElementById("dashboard-tabs")?.remove();
  document.getElementById("dashboard-toolbar")?.remove();

  const contentArea = document.querySelector(".content-area");
  if (contentArea) {
    contentArea.style.padding = "12px";
    contentArea.innerHTML = `
      <div class="widget-container widget-size-full" style="margin:0;border:none;box-shadow:none">
        <div class="widget-body">${widgetDef.render({})}</div>
      </div>`;
  }
}

// ═══════ Widget: Add / Remove ═══════
function addWidgetToDashboard(widgetId) {
  const dashboard = getActiveDashboard();
  if (!dashboard) return;

  const widgetDef = getWidgetById(widgetId);
  if (!widgetDef) return;

  dashboard.widgets.push({
    widgetId: widgetId,
    config: { ...widgetDef.defaultConfig }
  });

  saveDashboards();
  renderActiveDashboard();
  closeAllModals();
}

function removeWidget(index) {
  const dashboard = getActiveDashboard();
  if (!dashboard) return;
  dashboard.widgets.splice(index, 1);
  saveDashboards();
  renderActiveDashboard();
}

// ═══════ Widget: Drag & Drop Reorder ═══════
function handleWidgetDragStart(e, index) {
  widgetDragState.dragging = index;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", index);
  e.target.closest(".widget-container").classList.add("widget-dragging");
}

function handleWidgetDragOver(e, index) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

function handleWidgetDragEnter(e, index) {
  e.preventDefault();
  if (widgetDragState.dragging !== index) {
    const el = e.target.closest(".widget-container");
    if (el) el.classList.add("widget-drag-over");
  }
}

function handleWidgetDragLeave(e) {
  const el = e.target.closest(".widget-container");
  if (el) el.classList.remove("widget-drag-over");
}

function handleWidgetDrop(e, targetIndex) {
  e.preventDefault();
  const el = e.target.closest(".widget-container");
  if (el) el.classList.remove("widget-drag-over");

  const sourceIndex = widgetDragState.dragging;
  if (sourceIndex === null || sourceIndex === targetIndex) return;

  const dashboard = getActiveDashboard();
  if (!dashboard) return;

  const [moved] = dashboard.widgets.splice(sourceIndex, 1);
  dashboard.widgets.splice(targetIndex, 0, moved);

  saveDashboards();
  renderActiveDashboard();
}

function handleWidgetDragEnd(e) {
  widgetDragState.dragging = null;
  document.querySelectorAll(".widget-container").forEach(el => {
    el.classList.remove("widget-dragging", "widget-drag-over");
  });
}

// ═══════ Dashboard: Create / Delete / Rename ═══════
function showCreateDashboardModal() {
  const modal = document.getElementById("modal-overlay");
  const content = document.getElementById("modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="modal-header">
      <h2>Create New Dashboard</h2>
      <button class="modal-close" onclick="closeAllModals()">×</button>
    </div>
    <div class="modal-body">
      <label class="modal-label">Dashboard Name</label>
      <input type="text" id="new-dash-name" class="modal-input" placeholder="e.g. Executive Overview" autofocus>
      <div class="modal-presets" style="margin-top:16px">
        <label class="modal-label">Start from template</label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
          <button class="preset-btn" onclick="createDashboard('blank', '')">Blank</button>
          <button class="preset-btn" onclick="createDashboard('overview', 'Executive Overview')">Overview</button>
          <button class="preset-btn" onclick="createDashboard('devops', 'DevOps Dashboard')">DevOps</button>
          <button class="preset-btn" onclick="createDashboard('project', 'Project Manager')">Project Mgr</button>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="top-bar-btn" onclick="closeAllModals()">Cancel</button>
    </div>`;

  modal.classList.add("open");
  document.getElementById("new-dash-name")?.focus();
}

function createDashboard(preset, nameOverride) {
  const nameInput = document.getElementById("new-dash-name");
  const name = nameOverride || (nameInput?.value.trim() || "New Dashboard");

  const templates = {
    blank: [],
    overview: [
      { widgetId: "widget-name", config: {} },
      { widgetId: "widget-project-stats", config: {} },
      { widgetId: "widget-tracker-chart", config: {} },
      { widgetId: "widget-contacts", config: {} }
    ],
    devops: [
      { widgetId: "widget-name", config: {} },
      { widgetId: "widget-builds-history", config: {} },
      { widgetId: "widget-jenkins-jobs", config: {} },
      { widgetId: "widget-test-results", config: {} },
      { widgetId: "widget-test-trend", config: {} },
      { widgetId: "widget-last-artifacts", config: {} }
    ],
    project: [
      { widgetId: "widget-name", config: {} },
      { widgetId: "widget-kanban", config: { boardId: "task-board" } },
      { widgetId: "widget-tracker-renderer", config: { trackerId: "tasks" } },
      { widgetId: "widget-project-links", config: {} },
      { widgetId: "widget-document-viewer", config: {} },
      { widgetId: "widget-project-team", config: {} }
    ]
  };

  const newDash = {
    id: "dash-" + Date.now(),
    name: name,
    createdAt: new Date().toISOString(),
    widgets: templates[preset] || []
  };

  dashboards.push(newDash);
  activeDashboardId = newDash.id;
  saveDashboards();
  renderDashboardTabs();
  renderActiveDashboard();
  closeAllModals();
}

function deleteDashboard(dashId) {
  if (dashboards.length <= 1) {
    alert("Cannot delete the last dashboard.");
    return;
  }
  if (!confirm("Delete this dashboard?")) return;

  dashboards = dashboards.filter(d => d.id !== dashId);
  if (activeDashboardId === dashId) {
    activeDashboardId = dashboards[0].id;
  }
  saveDashboards();
  renderDashboardTabs();
  renderActiveDashboard();
}

function renameDashboard(dashId) {
  const dash = dashboards.find(d => d.id === dashId);
  if (!dash) return;
  const newName = prompt("Rename dashboard:", dash.name);
  if (newName && newName.trim()) {
    dash.name = newName.trim();
    saveDashboards();
    renderDashboardTabs();
  }
}

// ═══════ Add Widget Modal ═══════
function showAddWidgetModal() {
  const modal = document.getElementById("modal-overlay");
  const content = document.getElementById("modal-content");
  if (!modal || !content) return;

  let categoryHtml = "";
  for (const [catId, cat] of Object.entries(WIDGET_CATEGORIES)) {
    const widgets = getWidgetsByCategory(catId);
    if (widgets.length === 0) continue;
    categoryHtml += `
      <div class="modal-widget-category">
        <div class="modal-category-title">${cat.icon} ${cat.name}</div>
        <div class="modal-widget-list">
          ${widgets.map(w => `
            <div class="modal-widget-card" onclick="addWidgetToDashboard('${w.id}')">
              <div class="modal-widget-icon">${w.icon}</div>
              <div class="modal-widget-name">${w.name}</div>
              <div class="modal-widget-size">${w.size}</div>
            </div>
          `).join("")}
        </div>
      </div>`;
  }

  content.innerHTML = `
    <div class="modal-header">
      <h2>Add Widget</h2>
      <button class="modal-close" onclick="closeAllModals()">×</button>
    </div>
    <div class="modal-body" style="max-height:60vh;overflow-y:auto">
      <input type="text" id="widget-search" class="modal-input" placeholder="Search widgets..."
             oninput="filterWidgets(this.value)" style="margin-bottom:16px">
      <div id="widget-category-list">${categoryHtml}</div>
    </div>
    <div class="modal-footer">
      <button class="top-bar-btn" onclick="closeAllModals()">Cancel</button>
    </div>`;

  modal.classList.add("open");
}

function filterWidgets(query) {
  const q = query.toLowerCase();
  document.querySelectorAll(".modal-widget-card").forEach(card => {
    const name = card.querySelector(".modal-widget-name").textContent.toLowerCase();
    card.style.display = name.includes(q) ? "" : "none";
  });
  document.querySelectorAll(".modal-widget-category").forEach(cat => {
    const visibleCards = cat.querySelectorAll(".modal-widget-card:not([style*='display: none'])");
    cat.style.display = visibleCards.length > 0 ? "" : "none";
  });
}

// ═══════ Widget Config Modal ═══════
function showWidgetConfigModal(widgetId, widgetIndex) {
  const widgetDef = getWidgetById(widgetId);
  if (!widgetDef) return;
  const dashboard = getActiveDashboard();
  if (!dashboard) return;
  const widgetState = dashboard.widgets[widgetIndex];
  if (!widgetState) return;

  const modal = document.getElementById("modal-overlay");
  const content = document.getElementById("modal-content");
  if (!modal || !content) return;

  let configHtml = "";

  // Dynamic config fields based on widget type
  if (widgetId === "widget-name") {
    configHtml = `
      <label class="modal-label">Show Subtitle</label>
      <label class="a11y-toggle" style="margin-top:4px">
        <input type="checkbox" id="cfg-showSubtitle" ${widgetState.config.showSubtitle ? "checked" : ""}>
        <span class="slider"></span>
      </label>`;
  } else if (widgetId === "widget-contacts") {
    configHtml = `
      <label class="modal-label">Max Contacts Shown</label>
      <input type="number" id="cfg-maxShow" class="modal-input" value="${widgetState.config.maxShow || 5}" min="1" max="20">`;
  } else if (widgetId === "widget-kanban") {
    configHtml = `
      <label class="modal-label">Board</label>
      <select id="cfg-boardId" class="modal-input">
        ${PROJECT_DATA.kanbanBoards.map(b => `<option value="${b.id}" ${b.id === widgetState.config.boardId ? "selected" : ""}>${b.name}</option>`).join("")}
      </select>`;
  } else if (widgetId === "widget-tracker-renderer") {
    configHtml = `
      <label class="modal-label">Tracker</label>
      <select id="cfg-trackerId" class="modal-input">
        ${PROJECT_DATA.trackers.map(t => `<option value="${t.id}" ${t.id === widgetState.config.trackerId ? "selected" : ""}>${t.name}</option>`).join("")}
      </select>`;
  } else if (widgetId === "widget-note") {
    configHtml = `
      <label class="modal-label">Editable</label>
      <label class="a11y-toggle" style="margin-top:4px">
        <input type="checkbox" id="cfg-editable" ${widgetState.config.editable ? "checked" : ""}>
        <span class="slider"></span>
      </label>`;
  } else if (widgetId === "widget-image") {
    configHtml = `
      <label class="modal-label">Caption</label>
      <input type="text" id="cfg-caption" class="modal-input" value="${widgetState.config.caption || ""}">`;
  } else {
    configHtml = `<p style="color:var(--text-secondary);font-size:13px">No configurable options for this widget.</p>`;
  }

  content.innerHTML = `
    <div class="modal-header">
      <h2>${widgetDef.icon} Configure ${widgetDef.name}</h2>
      <button class="modal-close" onclick="closeAllModals()">×</button>
    </div>
    <div class="modal-body">
      ${configHtml}
      <div style="margin-top:20px;padding-top:12px;border-top:1px solid var(--border-color)">
        <div class="modal-label" style="margin-bottom:4px">Embed for OpenForge</div>
        <code style="font-size:11px;background:var(--bg-primary);padding:6px 8px;border-radius:var(--radius);display:block;word-break:break-all">
          ${window.location.origin}${window.location.pathname}?widget_id=${widgetId}
        </code>
        <p style="font-size:11px;color:var(--text-secondary);margin-top:4px">Use this URL as an iframe src in OpenForge</p>
      </div>
    </div>
    <div class="modal-footer">
      <button class="top-bar-btn primary" onclick="saveWidgetConfig(${widgetIndex})">Save</button>
      <button class="top-bar-btn" onclick="closeAllModals()">Cancel</button>
    </div>`;

  modal.classList.add("open");
}

function saveWidgetConfig(widgetIndex) {
  const dashboard = getActiveDashboard();
  if (!dashboard) return;
  const ws = dashboard.widgets[widgetIndex];
  if (!ws) return;

  // Read config values from modal
  const showSubtitle = document.getElementById("cfg-showSubtitle");
  const maxShow = document.getElementById("cfg-maxShow");
  const boardId = document.getElementById("cfg-boardId");
  const trackerId = document.getElementById("cfg-trackerId");
  const editable = document.getElementById("cfg-editable");
  const caption = document.getElementById("cfg-caption");

  if (showSubtitle !== null) ws.config.showSubtitle = showSubtitle.checked;
  if (maxShow !== null) ws.config.maxShow = parseInt(maxShow.value) || 5;
  if (boardId !== null) ws.config.boardId = boardId.value;
  if (trackerId !== null) ws.config.trackerId = trackerId.value;
  if (editable !== null) ws.config.editable = editable.checked;
  if (caption !== null) ws.config.caption = caption.value;

  saveDashboards();
  renderActiveDashboard();
  closeAllModals();
}

// ═══════ Modal Utilities ═══════
function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("open"));
}

// ═══════ OpenForge Embed Export ═══════
// Generates embed codes for all widgets and dashboards
function generateOpenForgeEmbedCode(dashId, widgetId) {
  const base = window.location.origin + window.location.pathname;
  if (widgetId) {
    return `<iframe src="${base}?widget_id=${widgetId}" width="100%" height="300" frameborder="0" style="border-radius:6px;border:1px solid var(--border-color)"></iframe>`;
  }
  return `<iframe src="${base}?dashboard_id=${dashId || activeDashboardId}" width="100%" height="800" frameborder="0" style="border-radius:6px;border:1px solid var(--border-color)"></iframe>`;
}

function copyEmbedCode(dashId, widgetId) {
  const code = generateOpenForgeEmbedCode(dashId, widgetId);
  navigator.clipboard.writeText(code).then(() => {
    alert("Embed code copied!");
  });
}
