let currentBoard = "task-board";
let currentFilter = { tracker: "all", project: "all", assignee: "all", search: "" };
let draggedCard = null;

document.addEventListener("DOMContentLoaded", () => {
  initDashboardManager();
  renderKanbanBoard();
  renderIssues();
  setupNavigation();
  setupAccessibility();
  setupSidebarToggle();
  setupSearch();
});

// ── Navigation ──
function setupNavigation() {
  document.querySelectorAll("[data-page]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const page = el.dataset.page;
      document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
      document.getElementById("page-" + page).classList.add("active");
      document.querySelectorAll(".sidebar-item").forEach(s => s.classList.remove("active"));
      el.closest(".sidebar-item")?.classList.add("active");
      if (page === "kanban") renderKanbanBoard();
      if (page === "issues") renderIssues();
    });
  });

  document.querySelectorAll("[data-board]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      currentBoard = el.dataset.board;
      document.querySelectorAll("[data-page]").forEach(p => {
        if (p.dataset.page === "kanban") p.click();
      });
    });
  });
}

// ── Sidebar Toggle ──
function setupSidebarToggle() {
  const toggle = document.querySelector(".sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");
  if (toggle) {
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      toggle.textContent = sidebar.classList.contains("collapsed") ? "»" : "«";
    });
  }
}

// ── Search ──
function setupSearch() {
  const searchInput = document.getElementById("global-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentFilter.search = e.target.value.toLowerCase();
      renderKanbanBoard();
      renderIssues();
    });
  }
}

// ── Navigate to board ──
function navigateToBoard(boardId) {
  currentBoard = boardId;
  document.querySelectorAll("[data-page]").forEach(p => {
    if (p.dataset.page === "kanban") p.click();
  });
}

// ── Kanban Board ──
function getFilteredTasks(trackerFilter) {
  let tasks = PROJECT_DATA.tasks;
  if (trackerFilter && trackerFilter !== "all") {
    tasks = tasks.filter(t => t.tracker === trackerFilter);
  }
  if (currentFilter.project !== "all") {
    tasks = tasks.filter(t => t.project === currentFilter.project);
  }
  if (currentFilter.assignee !== "all") {
    tasks = tasks.filter(t => t.assignee === currentFilter.assignee);
  }
  if (currentFilter.search) {
    tasks = tasks.filter(t =>
      t.title.toLowerCase().includes(currentFilter.search) ||
      String(t.id).includes(currentFilter.search)
    );
  }
  return tasks;
}

function renderKanbanBoard() {
  const board = PROJECT_DATA.kanbanBoards.find(b => b.id === currentBoard);
  if (!board) return;

  document.getElementById("kanban-title").textContent = board.name;

  const boardNameEl = document.getElementById("current-board-name");
  if (boardNameEl) boardNameEl.textContent = board.name;

  const tasks = getFilteredTasks(board.tracker);

  const container = document.getElementById("kanban-columns");
  container.innerHTML = STATUS_COLUMNS.map(col => {
    const colTasks = tasks.filter(t => t.status === col.id);
    return `
      <div class="kanban-column" data-status="${col.id}">
        <div class="kanban-column-header">
          <h3><span class="column-dot" style="background:${col.color}"></span>${col.name}</h3>
          <span class="count">${colTasks.length}</span>
        </div>
        <div class="kanban-column-body" data-status="${col.id}"
             ondragover="handleDragOver(event)"
             ondragenter="handleDragEnter(event)"
             ondragleave="handleDragLeave(event)"
             ondrop="handleDrop(event, '${col.id}')">
          ${colTasks.map(t => renderKanbanCard(t)).join("")}
        </div>
      </div>
    `;
  }).join("");
}

function renderKanbanCard(task) {
  const pColor = PRIORITY_COLORS[task.priority] || "#6c757d";
  return `
    <div class="kanban-card" draggable="true" data-id="${task.id}"
         ondragstart="handleDragStart(event, ${task.id})"
         ondragend="handleDragEnd(event)">
      <div class="kanban-card-id">#${task.id}</div>
      <div class="kanban-card-title">${task.title}</div>
      <div class="kanban-card-meta">
        <span class="kanban-card-priority" style="background:${pColor}">${task.priority}</span>
        <span class="kanban-card-assignee">${task.assignee}</span>
      </div>
      <div class="kanban-card-project">${task.project}</div>
    </div>
  `;
}

// ── Drag & Drop ──
function handleDragStart(e, taskId) {
  draggedCard = taskId;
  e.target.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", taskId);
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging");
  document.querySelectorAll(".kanban-column-body").forEach(col => {
    col.classList.remove("drag-over");
  });
  draggedCard = null;
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

function handleDragEnter(e) {
  e.preventDefault();
  e.currentTarget.classList.add("drag-over");
}

function handleDragLeave(e) {
  e.currentTarget.classList.remove("drag-over");
}

function handleDrop(e, newStatus) {
  e.preventDefault();
  e.currentTarget.classList.remove("drag-over");
  const taskId = parseInt(e.dataTransfer.getData("text/plain"));
  const task = PROJECT_DATA.tasks.find(t => t.id === taskId);
  if (task && task.status !== newStatus) {
    task.status = newStatus;
    renderKanbanBoard();
  }
}

// ── Issues Table ──
function renderIssues() {
  const tbody = document.getElementById("issues-tbody");
  if (!tbody) return;

  let tasks = getFilteredTasks(currentFilter.tracker !== "all" ? currentFilter.tracker : null);

  tbody.innerHTML = tasks.map(t => `
    <tr>
      <td><span class="issue-id">#${t.id}</span></td>
      <td>${t.title}</td>
      <td><span class="issue-status status-${t.status}">${formatStatus(t.status)}</span></td>
      <td><span class="kanban-card-priority" style="background:${PRIORITY_COLORS[t.priority]}">${t.priority}</span></td>
      <td>${t.project}</td>
      <td>${t.assignee}</td>
    </tr>
  `).join("");
}

function formatStatus(status) {
  const map = { backlog: "Backlog", open: "Open", qa: "QA Testing", done: "Done", archive: "Archive" };
  return map[status] || status;
}

// ── Filters ──
function onFilterChange() {
  currentFilter.tracker = document.getElementById("filter-tracker")?.value || "all";
  currentFilter.project = document.getElementById("filter-project")?.value || "all";
  currentFilter.assignee = document.getElementById("filter-assignee")?.value || "all";
  renderKanbanBoard();
  renderIssues();
}

// ── Accessibility ──
function setupAccessibility() {
  const trigger = document.querySelector(".a11y-trigger");
  const panel = document.querySelector(".a11y-panel");
  const close = document.querySelector(".a11y-close");

  if (trigger && panel) {
    trigger.addEventListener("click", () => panel.classList.toggle("open"));
  }
  if (close && panel) {
    close.addEventListener("click", () => panel.classList.remove("open"));
  }

  // Load saved preferences
  const saved = JSON.parse(localStorage.getItem("a11y-prefs") || "{}");
  Object.entries(saved).forEach(([key, val]) => {
    if (typeof val === "boolean" && val) document.body.classList.add(key);
    if (typeof val === "number") applyA11yValue(key, val);
    const el = document.getElementById("a11y-" + key);
    if (el) el.checked = val;
    const slider = document.getElementById("a11y-slider-" + key);
    if (slider) slider.value = val;
  });
}

function toggleA11y(className, enabled) {
  document.body.classList.toggle(className, enabled);
  saveA11yPrefs();
}

function applyA11yValue(key, value) {
  if (key === "fontSize") {
    document.body.classList.remove("large-text", "extra-large-text");
    if (value === 1) document.body.classList.add("large-text");
    if (value === 2) document.body.classList.add("extra-large-text");
  }
  if (key === "lineHeight") {
    document.body.classList.remove("line-height-large", "line-height-extra");
    if (value === 1) document.body.classList.add("line-height-large");
    if (value === 2) document.body.classList.add("line-height-extra");
  }
}

function onA11ySlider(key, value) {
  applyA11yValue(key, parseInt(value));
  saveA11yPrefs();
}

function saveA11yPrefs() {
  const prefs = {};
  document.querySelectorAll("[id^='a11y-']").forEach(el => {
    const key = el.id.replace("a11y-", "");
    if (el.type === "checkbox") prefs[key] = el.checked;
    if (el.type === "range") prefs[key] = parseInt(el.value);
  });
  localStorage.setItem("a11y-prefs", JSON.stringify(prefs));
}

function resetA11y() {
  document.body.className = "";
  document.querySelectorAll("[id^='a11y-']").forEach(el => {
    if (el.type === "checkbox") el.checked = false;
    if (el.type === "range") el.value = 0;
  });
  localStorage.removeItem("a11y-prefs");
}

// ── Dark Mode ──
function toggleDarkMode(enabled) {
  document.documentElement.setAttribute("data-theme", enabled ? "dark" : "light");
  localStorage.setItem("theme", enabled ? "dark" : "light");
}

(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    const toggle = document.getElementById("a11y-darkMode");
    if (toggle) toggle.checked = true;
  }
})();
