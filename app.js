/* ── Firebase setup ─────────────────────────────────────────────── */
const firebaseConfig = {
  apiKey: "AIzaSyDZA3FhOAmV_W3HHR2Ha6dMzok1HksJmTE",
  authDomain: "fleetguard-51628.firebaseapp.com",
  projectId: "fleetguard-51628",
  storageBucket: "fleetguard-51628.firebasestorage.app",
  messagingSenderId: "590670304554",
  appId: "1:590670304554:web:a881e05e6a9e6093447a53"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();

/* ── Vehicle Type definitions with SVG clipart ──────────────────── */
const VEHICLE_TYPES = {
  car: {
    label: "Car",
    isPublic: false,
    svg: `<svg viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="18" width="52" height="16" rx="4" fill="currentColor" opacity=".85"/>
      <path d="M14 18 L20 8 L44 8 L50 18Z" fill="currentColor"/>
      <circle cx="16" cy="34" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="48" cy="34" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <rect x="22" y="10" width="10" height="7" rx="1" fill="#89d4f5" opacity=".7"/>
      <rect x="34" y="10" width="8" height="7" rx="1" fill="#89d4f5" opacity=".7"/>
      <rect x="6" y="22" width="8" height="4" rx="1" fill="#ffe066" opacity=".9"/>
      <rect x="50" y="22" width="8" height="4" rx="1" fill="#ff6b6b" opacity=".9"/>
    </svg>`
  },
  van: {
    label: "Van",
    isPublic: false,
    svg: `<svg viewBox="0 0 64 42" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="56" height="20" rx="4" fill="currentColor" opacity=".85"/>
      <path d="M4 14 L4 20 L18 20 L22 8 L50 8 L56 14Z" fill="currentColor"/>
      <circle cx="14" cy="34" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="50" cy="34" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <rect x="6" y="10" width="10" height="8" rx="1" fill="#89d4f5" opacity=".7"/>
      <rect x="24" y="10" width="10" height="8" rx="1" fill="#89d4f5" opacity=".7"/>
      <rect x="36" y="10" width="12" height="8" rx="1" fill="#89d4f5" opacity=".7"/>
      <rect x="4" y="18" width="7" height="4" rx="1" fill="#ffe066" opacity=".9"/>
      <rect x="53" y="18" width="7" height="4" rx="1" fill="#ff6b6b" opacity=".9"/>
    </svg>`
  },
  truck: {
    label: "Truck",
    isPublic: false,
    svg: `<svg viewBox="0 0 72 44" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="10" width="46" height="24" rx="3" fill="currentColor" opacity=".85"/>
      <rect x="4" y="18" width="22" height="16" rx="3" fill="currentColor"/>
      <path d="M4 18 L4 22 L26 22 L26 18Z" fill="currentColor" opacity=".3"/>
      <rect x="6" y="20" width="10" height="8" rx="1" fill="#89d4f5" opacity=".7"/>
      <circle cx="12" cy="36" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="54" cy="36" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="64" cy="36" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <rect x="4" y="22" width="6" height="3" rx="1" fill="#ffe066" opacity=".9"/>
      <rect x="62" y="14" width="6" height="3" rx="1" fill="#ff6b6b" opacity=".9"/>
    </svg>`
  },
  bus: {
    label: "Bus (Public)",
    isPublic: true,
    svg: `<svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="64" height="30" rx="5" fill="currentColor" opacity=".9"/>
      <rect x="4" y="30" width="64" height="8" rx="2" fill="currentColor" opacity=".6"/>
      <rect x="8" y="12" width="10" height="10" rx="1.5" fill="#89d4f5" opacity=".8"/>
      <rect x="22" y="12" width="10" height="10" rx="1.5" fill="#89d4f5" opacity=".8"/>
      <rect x="36" y="12" width="10" height="10" rx="1.5" fill="#89d4f5" opacity=".8"/>
      <rect x="50" y="12" width="10" height="10" rx="1.5" fill="#89d4f5" opacity=".8"/>
      <rect x="8" y="24" width="16" height="8" rx="1.5" fill="#89d4f5" opacity=".7"/>
      <rect x="48" y="24" width="16" height="8" rx="1.5" fill="#89d4f5" opacity=".7"/>
      <circle cx="14" cy="40" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="58" cy="40" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <rect x="4" y="14" width="6" height="5" rx="1" fill="#ffe066" opacity=".9"/>
      <rect x="62" y="14" width="6" height="5" rx="1" fill="#ff6b6b" opacity=".9"/>
      <rect x="20" y="4" width="32" height="4" rx="2" fill="currentColor" opacity=".5"/>
    </svg>`
  },
  minibus: {
    label: "Minibus (Public)",
    isPublic: true,
    svg: `<svg viewBox="0 0 68 46" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="12" width="60" height="24" rx="5" fill="currentColor" opacity=".9"/>
      <rect x="4" y="28" width="60" height="8" rx="2" fill="currentColor" opacity=".6"/>
      <path d="M4 12 L10 4 L58 4 L64 12Z" fill="currentColor" opacity=".7"/>
      <rect x="8" y="14" width="10" height="10" rx="1.5" fill="#89d4f5" opacity=".8"/>
      <rect x="22" y="14" width="10" height="10" rx="1.5" fill="#89d4f5" opacity=".8"/>
      <rect x="36" y="14" width="10" height="10" rx="1.5" fill="#89d4f5" opacity=".8"/>
      <rect x="50" y="14" width="10" height="10" rx="1.5" fill="#89d4f5" opacity=".8"/>
      <circle cx="14" cy="38" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="54" cy="38" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <rect x="4" y="16" width="6" height="5" rx="1" fill="#ffe066" opacity=".9"/>
      <rect x="58" y="16" width="6" height="5" rx="1" fill="#ff6b6b" opacity=".9"/>
    </svg>`
  },
  autorickshaw: {
    label: "Auto Rickshaw (Public)",
    isPublic: true,
    svg: `<svg viewBox="0 0 56 46" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20 Q10 10 20 8 L42 8 Q50 8 50 20 L50 32 L10 32Z" fill="currentColor" opacity=".85"/>
      <rect x="14" y="10" width="12" height="10" rx="2" fill="#89d4f5" opacity=".75"/>
      <rect x="30" y="10" width="16" height="10" rx="2" fill="#89d4f5" opacity=".75"/>
      <rect x="10" y="30" width="40" height="6" rx="2" fill="currentColor" opacity=".6"/>
      <circle cx="16" cy="38" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="44" cy="38" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <rect x="10" y="18" width="5" height="4" rx="1" fill="#ffe066" opacity=".9"/>
      <rect x="46" y="20" width="4" height="3" rx="1" fill="#ff6b6b" opacity=".9"/>
      <rect x="20" y="28" width="16" height="5" rx="1" fill="currentColor" opacity=".4"/>
    </svg>`
  },
  motorcycle: {
    label: "Motorcycle",
    isPublic: false,
    svg: `<svg viewBox="0 0 60 44" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="32" r="9" fill="none" stroke="currentColor" stroke-width="3"/>
      <circle cx="14" cy="32" r="4" fill="currentColor" opacity=".5"/>
      <circle cx="46" cy="32" r="9" fill="none" stroke="currentColor" stroke-width="3"/>
      <circle cx="46" cy="32" r="4" fill="currentColor" opacity=".5"/>
      <path d="M14 32 L22 20 L32 18 L40 20 L46 32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 18 L34 10 L40 10 L42 18" fill="currentColor" opacity=".7"/>
      <ellipse cx="32" cy="22" rx="8" ry="5" fill="currentColor" opacity=".4"/>
      <rect x="20" y="16" width="6" height="4" rx="1" fill="#ffe066" opacity=".8"/>
    </svg>`
  },
  suv: {
    label: "SUV / Jeep",
    isPublic: false,
    svg: `<svg viewBox="0 0 66 44" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="16" width="58" height="20" rx="4" fill="currentColor" opacity=".85"/>
      <path d="M10 16 L14 6 L52 6 L56 16Z" fill="currentColor"/>
      <rect x="16" y="8" width="12" height="8" rx="1" fill="#89d4f5" opacity=".7"/>
      <rect x="30" y="8" width="14" height="8" rx="1" fill="#89d4f5" opacity=".7"/>
      <circle cx="16" cy="36" r="6" fill="#222" stroke="currentColor" stroke-width="2"/>
      <circle cx="50" cy="36" r="6" fill="#222" stroke="currentColor" stroke-width="2"/>
      <rect x="4" y="20" width="8" height="5" rx="1" fill="#ffe066" opacity=".9"/>
      <rect x="54" y="20" width="8" height="5" rx="1" fill="#ff6b6b" opacity=".9"/>
      <rect x="58" y="16" width="4" height="10" rx="1" fill="currentColor" opacity=".5"/>
    </svg>`
  },
  ambulance: {
    label: "Ambulance (Public)",
    isPublic: true,
    svg: `<svg viewBox="0 0 72 46" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="56" height="22" rx="4" fill="currentColor" opacity=".85"/>
      <rect x="4" y="14" width="22" height="22" rx="4" fill="currentColor"/>
      <rect x="6" y="16" width="14" height="12" rx="1.5" fill="#89d4f5" opacity=".7"/>
      <rect x="60" y="20" width="8" height="10" rx="2" fill="currentColor" opacity=".7"/>
      <circle cx="14" cy="38" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="50" cy="38" r="5" fill="#222" stroke="currentColor" stroke-width="1.5"/>
      <rect x="30" y="18" width="6" height="14" rx="1" fill="white" opacity=".7"/>
      <rect x="26" y="22" width="14" height="6" rx="1" fill="white" opacity=".7"/>
      <rect x="4" y="18" width="5" height="4" rx="1" fill="#ffe066" opacity=".9"/>
      <circle cx="64" cy="16" r="3" fill="#ff6b6b" opacity=".8"/>
    </svg>`
  }
};

/* ── In-memory state (synced to localStorage) ───────────────────── */
const STORE_KEY = "fleetguard_data";

function loadData() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return { vehicles: [], drivers: [], trips: [], maintenance: [], fuel: [], alerts: [] };
}

function saveData(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

let DATA = loadData();
function getVehicles()     { return DATA.vehicles; }
function getDrivers()      { return DATA.drivers; }
function getTrips()        { return DATA.trips; }
function getMaintenance()  { return DATA.maintenance; }
function getFuel()         { return DATA.fuel; }
function getAlerts()       { return DATA.alerts; }

function persist() { saveData(DATA); }

/* ── ID generator ───────────────────────────────────────────────── */
function uid(prefix) {
  return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/* ── Helper functions ───────────────────────────────────────────── */
function vehicleName(id) {
  const v = getVehicles().find(v => v.id === id);
  return v ? `${v.plate} (${v.brand} ${v.model})` : id || "—";
}
function vehiclePlate(id) {
  const v = getVehicles().find(v => v.id === id);
  return v ? v.plate : "—";
}
function driverName(id) {
  const d = getDrivers().find(d => d.id === id);
  return d ? d.name : id || "—";
}

function chip(status) {
  const cls = (status || "unknown").toLowerCase().replace(/[^a-z]/g, "-");
  return `<span class="chip chip-${cls}">${status}</span>`;
}
function sevChip(sev) {
  return `<span class="chip sev-${sev}">${sev}</span>`;
}

function fuelBar(pct) {
  const cls = pct >= 40 ? "fuel-hi" : pct >= 20 ? "fuel-mid" : "fuel-lo";
  return `<div class="fuel-bar-wrap">
    <div class="fuel-bar-track"><div class="fuel-bar-fill ${cls}" style="width:${pct}%"></div></div>
    <span class="fuel-pct">${pct}%</span>
  </div>`;
}

function scoreBar(score) {
  return `<div class="score-bar-wrap">
    <div class="score-bar-track"><div class="score-bar-fill" style="width:${score}%"></div></div>
    <span class="score-val">${score}</span>
  </div>`;
}

function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  return Math.round((new Date(dateStr) - new Date()) / 86400000);
}

function complianceStatus(dateStr) {
  if (!dateStr) return { cls: "chip-offline", label: "Not Set" };
  const days = daysUntil(dateStr);
  if (days < 0) return { cls: "sev-critical", label: `Expired ${Math.abs(days)}d ago` };
  if (days <= 30) return { cls: "sev-warning", label: `Expires in ${days}d` };
  return { cls: "chip-active", label: `Valid (${days}d left)` };
}

function vehicleTypeIcon(type, color = "#2196f3", size = 64) {
  const vt = VEHICLE_TYPES[type];
  if (!vt) return `<svg viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg"><text x="8" y="28" font-size="24">🚗</text></svg>`;
  return vt.svg.replace('fill="currentColor"', `fill="${color}"`)
              .replace(/fill="currentColor"/g, `fill="${color}"`);
}

/* ── Chart.js helpers ───────────────────────────────────────────── */
let activeCharts = [];
function destroyCharts() { activeCharts.forEach(c => c.destroy()); activeCharts = []; }
function mkChart(id, cfg) {
  const el = document.getElementById(id);
  if (!el || typeof Chart === "undefined") return;
  activeCharts.push(new Chart(el, cfg));
}
const CHART_DEFAULTS = {
  plugins: { legend: { labels: { color: "#9e9e9e", boxWidth: 12, font: { size: 11 } } } },
  scales: { x: { ticks: { color: "#9e9e9e" }, grid: { color: "#2a2a2a" } }, y: { ticks: { color: "#9e9e9e" }, grid: { color: "#2a2a2a" } } }
};

/* ── Modal ──────────────────────────────────────────────────────── */
function openModal(title, bodyHTML, onSave) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-body").innerHTML = bodyHTML;
  document.getElementById("modal-overlay").classList.remove("hidden");
  const saveBtn = document.getElementById("modal-save-btn");
  if (saveBtn && onSave) {
    saveBtn.onclick = onSave;
  }
}
function closeModal() {
  document.getElementById("modal-overlay").classList.add("hidden");
}

/* ── Alert auto-generator ───────────────────────────────────────── */
function autoCheckAlerts() {
  const now = new Date().toISOString();
  const newAlerts = [];

  getVehicles().forEach(v => {
    const vt = VEHICLE_TYPES[v.type];
    if (vt && vt.isPublic && v.compliance) {
      const checks = [
        { field: "fitnessExpiry", title: "Fitness Certificate" },
        { field: "taxExpiry", title: "Road Tax" },
        { field: "fireExtExpiry", title: "Fire Extinguisher" },
        { field: "firstAidExpiry", title: "First Aid Kit" },
        { field: "permitExpiry", title: "Route Permit" },
      ];
      checks.forEach(({ field, title }) => {
        const days = daysUntil(v.compliance[field]);
        if (days !== null && days <= 30 && days >= 0) {
          const exists = getAlerts().some(a => a.vehicleId === v.id && a.complianceField === field && !a.resolved);
          if (!exists) {
            newAlerts.push({
              id: uid("a"), type: "compliance", severity: days <= 7 ? "critical" : "warning",
              title: `${title} Expiry Soon`,
              message: `${v.plate} ${title} expires in ${days} day(s)`,
              timestamp: now, read: false, resolved: false,
              vehicleId: v.id, complianceField: field
            });
          }
        } else if (days !== null && days < 0) {
          const exists = getAlerts().some(a => a.vehicleId === v.id && a.complianceField === field && !a.resolved);
          if (!exists) {
            newAlerts.push({
              id: uid("a"), type: "compliance", severity: "critical",
              title: `${title} EXPIRED`,
              message: `${v.plate} ${title} expired ${Math.abs(days)} day(s) ago!`,
              timestamp: now, read: false, resolved: false,
              vehicleId: v.id, complianceField: field
            });
          }
        }
      });
    }
  });

  if (newAlerts.length) {
    DATA.alerts = [...newAlerts, ...DATA.alerts];
    persist();
    updateAlertBadge();
  }
}

function updateAlertBadge() {
  const unread = getAlerts().filter(a => !a.read).length;
  const badge = document.getElementById("alert-count");
  if (badge) {
    badge.textContent = unread;
    badge.style.display = unread ? "flex" : "none";
  }
}

/* ── Dashboard ──────────────────────────────────────────────────── */
function renderDashboard() {
  const vehicles = getVehicles();
  const drivers  = getDrivers();
  const alerts   = getAlerts();
  const fuel     = getFuel();

  const activeVehicles = vehicles.filter(v => v.status === "active").length;
  const onTripDrivers  = drivers.filter(d => d.status === "on-trip").length;
  const unread         = alerts.filter(a => !a.read);
  const weekFuelCost   = fuel.reduce((s, f) => s + (f.cost || 0), 0).toFixed(0);
  const publicVehicles = vehicles.filter(v => VEHICLE_TYPES[v.type]?.isPublic).length;

  const recentAlerts = unread.slice(0, 4).map(a => `
    <div class="recent-alert">
      <div class="alert-dot dot-${a.severity}"></div>
      <div>
        <div class="ra-title">${a.title}</div>
        <div class="ra-msg">${a.message}</div>
      </div>
    </div>`).join("") || `<p style="color:var(--text-dim);font-size:13px;padding:8px 0">No unread alerts 🎉</p>`;

  const typeBreakdown = {};
  vehicles.forEach(v => {
    const label = VEHICLE_TYPES[v.type]?.label || v.type || "Other";
    typeBreakdown[label] = (typeBreakdown[label] || 0) + 1;
  });

  document.getElementById("page-content").innerHTML = `
    <div class="kpi-grid">
      <div class="kpi-card"><div class="kpi-label">Total Vehicles</div><div class="kpi-value" style="color:#2196f3">${vehicles.length}</div><div class="kpi-sub">${activeVehicles} active</div></div>
      <div class="kpi-card"><div class="kpi-label">Drivers</div><div class="kpi-value" style="color:#4caf50">${drivers.length}</div><div class="kpi-sub">${onTripDrivers} on-trip</div></div>
      <div class="kpi-card"><div class="kpi-label">Public Vehicles</div><div class="kpi-value" style="color:#ff9800">${publicVehicles}</div><div class="kpi-sub">compliance tracked</div></div>
      <div class="kpi-card"><div class="kpi-label">Fuel Cost</div><div class="kpi-value" style="color:#f44336">₹${weekFuelCost}</div><div class="kpi-sub">total recorded</div></div>
    </div>

    ${vehicles.length === 0 ? `
    <div class="card" style="text-align:center;padding:48px 20px">
      <div style="font-size:64px;margin-bottom:16px">🚗</div>
      <h3 style="margin-bottom:8px;font-size:18px">No vehicles yet</h3>
      <p style="color:var(--text-dim);margin-bottom:20px">Start by adding your first vehicle to the fleet.</p>
      <button class="btn btn-primary" onclick="navigate('vehicles')">+ Add Vehicle</button>
    </div>` : `
    <div class="grid-2" style="margin-bottom:20px">
      <div class="card">
        <div class="card-title">Fleet by Type</div>
        <div class="vehicle-type-grid" id="type-breakdown">
          ${Object.entries(typeBreakdown).map(([label, count]) => {
            const type = Object.keys(VEHICLE_TYPES).find(k => VEHICLE_TYPES[k].label === label) || "car";
            return `<div class="type-tile">
              <div class="type-icon" style="color:var(--primary)">${vehicleTypeIcon(type)}</div>
              <div class="type-label">${label}</div>
              <div class="type-count">${count}</div>
            </div>`;
          }).join("") || '<p style="color:var(--text-dim);font-size:13px">No vehicles</p>'}
        </div>
      </div>
      <div class="card">
        <div class="card-title">Unread Alerts (${unread.length})</div>
        ${recentAlerts}
        ${unread.length > 4 ? `<button class="btn btn-text btn-sm" onclick="navigate('alerts')" style="margin-top:8px">View all ${unread.length} alerts →</button>` : ""}
      </div>
    </div>

    <div class="card">
      <div class="card-title">Recent Vehicles</div>
      <div class="vehicle-card-list">
        ${vehicles.slice(-4).reverse().map(v => renderVehicleCard(v)).join("")}
      </div>
    </div>`}`;
}

function renderVehicleCard(v) {
  const driver = getDrivers().find(d => d.id === v.driverId);
  const vt = VEHICLE_TYPES[v.type];
  const statusColor = v.status === "active" ? "#4caf50" : v.status === "maintenance" ? "#ff9800" : v.status === "offline" ? "#f44336" : "#9e9e9e";
  return `<div class="v-card" onclick="navigate('vehicles')">
    <div class="v-card-icon" style="color:${statusColor}">${vehicleTypeIcon(v.type)}</div>
    <div class="v-card-info">
      <div class="v-card-plate">${v.plate}</div>
      <div class="v-card-meta">${v.brand} ${v.model} · ${v.year}</div>
      <div class="v-card-meta">${driver ? driver.name : "No driver assigned"}</div>
    </div>
    <div class="v-card-status">${chip(v.status)}</div>
  </div>`;
}

/* ── Vehicles Page ──────────────────────────────────────────────── */
function renderVehicles() {
  const vehicles = getVehicles();

  document.getElementById("page-content").innerHTML = `
    <div class="toolbar">
      <input class="search-input" id="veh-search" placeholder="Search plate, brand, model…">
      <select class="filter-select" id="veh-type-filter">
        <option value="">All Types</option>
        ${Object.entries(VEHICLE_TYPES).map(([k,v]) => `<option value="${k}">${v.label}</option>`).join("")}
      </select>
      <button class="btn btn-primary btn-sm" id="add-veh-btn">+ Add Vehicle</button>
    </div>
    <div id="veh-list"></div>`;

  function renderList(list) {
    const el = document.getElementById("veh-list");
    if (!list.length) {
      el.innerHTML = `<div class="card" style="text-align:center;padding:40px;color:var(--text-dim)">
        No vehicles found. <button class="btn btn-text" id="add-veh-btn2">+ Add one</button>
      </div>`;
      document.getElementById("add-veh-btn2")?.addEventListener("click", openAddVehicle);
      return;
    }
    el.innerHTML = list.map(v => {
      const vt = VEHICLE_TYPES[v.type];
      const driver = getDrivers().find(d => d.id === v.driverId);
      const isPublic = vt?.isPublic;
      const complianceWarnings = isPublic ? getComplianceWarnings(v) : [];

      return `<div class="card veh-card" style="margin-bottom:12px">
        <div class="veh-card-header">
          <div class="veh-icon-wrap" style="color:${v.status==='active'?'#4caf50':v.status==='offline'?'#f44336':'#ff9800'}">${vehicleTypeIcon(v.type)}</div>
          <div class="veh-card-main">
            <div class="veh-plate">${v.plate} ${isPublic ? '<span class="chip sev-info" style="font-size:10px">PUBLIC</span>' : ""}</div>
            <div class="veh-meta">${v.brand} ${v.model} · ${v.year} ${v.vehicleType ? `· ${v.vehicleType}` : ""}</div>
            <div class="veh-meta" style="margin-top:2px">
              👤 ${driver ? driver.name : '<em style="color:var(--text-dim)">No driver</em>'}
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            ${chip(v.status)}
            <div style="display:flex;gap:4px">
              <button class="btn btn-outline btn-sm" onclick="editVehicle('${v.id}')">Edit</button>
              <button class="btn btn-sm" style="background:rgba(244,67,54,.15);color:#ef9a9a" onclick="deleteVehicle('${v.id}')">Del</button>
            </div>
          </div>
        </div>
        <div class="veh-card-body">
          <div class="veh-stat"><span>Fuel</span>${fuelBar(v.fuelLevel || 0)}</div>
          <div class="veh-stat"><span>Mileage</span><strong>${(v.mileage||0).toLocaleString()} km</strong></div>
          <div class="veh-stat"><span>Last Service</span><strong>${v.lastService || "—"}</strong></div>
        </div>
        ${isPublic && v.compliance ? `
        <div class="compliance-grid">
          <div class="compliance-title">📋 Compliance Status</div>
          ${renderComplianceChips(v.compliance)}
        </div>` : ""}
        ${complianceWarnings.length ? `<div style="margin-top:8px">${complianceWarnings.map(w => `<div class="compliance-warning">${w}</div>`).join("")}</div>` : ""}
      </div>`;
    }).join("");
  }

  renderList(vehicles);

  function filter() {
    const q = document.getElementById("veh-search").value.toLowerCase();
    const t = document.getElementById("veh-type-filter").value;
    renderList(getVehicles().filter(v =>
      (!q || (v.plate + " " + v.brand + " " + v.model).toLowerCase().includes(q)) &&
      (!t || v.type === t)
    ));
  }

  document.getElementById("veh-search").addEventListener("input", filter);
  document.getElementById("veh-type-filter").addEventListener("change", filter);
  document.getElementById("add-veh-btn").addEventListener("click", openAddVehicle);
}

function getComplianceWarnings(v) {
  if (!v.compliance) return [];
  const warnings = [];
  const checks = [
    ["fitnessExpiry", "Fitness"], ["taxExpiry", "Road Tax"],
    ["fireExtExpiry", "Fire Extinguisher"], ["firstAidExpiry", "First Aid Kit"],
    ["permitExpiry", "Permit"]
  ];
  checks.forEach(([field, label]) => {
    const days = daysUntil(v.compliance[field]);
    if (days !== null && days < 0) warnings.push(`⚠️ ${label} EXPIRED ${Math.abs(days)}d ago`);
    else if (days !== null && days <= 14) warnings.push(`⚠️ ${label} expires in ${days}d`);
  });
  return warnings;
}

function renderComplianceChips(c) {
  const fields = [
    ["fitnessExpiry", "Fitness Cert"],
    ["taxExpiry", "Road Tax"],
    ["fireExtExpiry", "Fire Ext."],
    ["firstAidExpiry", "First Aid"],
    ["permitExpiry", "Permit"],
    ["insuranceExpiry", "Insurance"],
    ["pollutionExpiry", "PUC"],
  ];
  return `<div class="compliance-chips">${fields.map(([field, label]) => {
    if (!c[field]) return "";
    const s = complianceStatus(c[field]);
    return `<span class="chip ${s.cls}" title="${label}: ${c[field]}">${label}: ${s.label}</span>`;
  }).join("")}</div>`;
}

function openAddVehicle(editId = null) {
  const existing = editId ? getVehicles().find(v => v.id === editId) : null;
  const drivers = getDrivers();
  const title = editId ? "Edit Vehicle" : "Add Vehicle";

  const isPublic = existing ? (VEHICLE_TYPES[existing.type]?.isPublic || false) : false;

  openModal(title, `
    <div class="form-grid">
      <label class="form-label">Vehicle Type *
        <select class="field" id="f-type">
          ${Object.entries(VEHICLE_TYPES).map(([k,v]) => `<option value="${k}" ${existing?.type===k?"selected":""}>${v.label}</option>`).join("")}
        </select>
      </label>
      <label class="form-label">Registration Plate *
        <input class="field" id="f-plate" type="text" placeholder="e.g. KL-01-AB-1234" value="${existing?.plate||""}">
      </label>
      <label class="form-label">Brand / Make *
        <input class="field" id="f-brand" type="text" placeholder="e.g. Toyota, Tata, Ashok Leyland" value="${existing?.brand||""}">
      </label>
      <label class="form-label">Model *
        <input class="field" id="f-model" type="text" placeholder="e.g. Innova, Winger, Starbus" value="${existing?.model||""}">
      </label>
      <label class="form-label">Year *
        <input class="field" id="f-year" type="number" placeholder="e.g. 2022" min="1990" max="2030" value="${existing?.year||new Date().getFullYear()}">
      </label>
      <label class="form-label">Vehicle Sub-Type / Body
        <input class="field" id="f-vtype" type="text" placeholder="e.g. Sleeper, Seater, AC" value="${existing?.vehicleType||""}">
      </label>
      <label class="form-label">Assigned Driver
        <select class="field" id="f-driver">
          <option value="">— Not Assigned —</option>
          ${drivers.map(d => `<option value="${d.id}" ${existing?.driverId===d.id?"selected":""}>${d.name}</option>`).join("")}
        </select>
      </label>
      <label class="form-label">Status
        <select class="field" id="f-status">
          <option value="active" ${existing?.status==="active"?"selected":""}>Active</option>
          <option value="idle" ${existing?.status==="idle"?"selected":""}>Idle</option>
          <option value="maintenance" ${existing?.status==="maintenance"?"selected":""}>Maintenance</option>
          <option value="offline" ${existing?.status==="offline"?"selected":""}>Offline</option>
        </select>
      </label>
      <label class="form-label">Fuel Level (%)
        <input class="field" id="f-fuel" type="number" min="0" max="100" placeholder="0-100" value="${existing?.fuelLevel||""}">
      </label>
      <label class="form-label">Mileage (km)
        <input class="field" id="f-mileage" type="number" placeholder="e.g. 45000" value="${existing?.mileage||""}">
      </label>
      <label class="form-label">Last Service Date
        <input class="field" id="f-service" type="date" value="${existing?.lastService||""}">
      </label>
    </div>

    <div id="public-compliance-section" style="display:${isPublic?'block':'none'}">
      <hr class="divider">
      <div class="compliance-section-title">📋 Public Vehicle Compliance</div>
      <div class="form-grid">
        <label class="form-label">Fitness Certificate Expiry
          <input class="field" id="f-fitness" type="date" value="${existing?.compliance?.fitnessExpiry||""}">
        </label>
        <label class="form-label">Road Tax Expiry
          <input class="field" id="f-tax" type="date" value="${existing?.compliance?.taxExpiry||""}">
        </label>
        <label class="form-label">Fire Extinguisher Expiry
          <input class="field" id="f-fireext" type="date" value="${existing?.compliance?.fireExtExpiry||""}">
        </label>
        <label class="form-label">First Aid Kit Expiry
          <input class="field" id="f-firstaid" type="date" value="${existing?.compliance?.firstAidExpiry||""}">
        </label>
        <label class="form-label">Route Permit Expiry
          <input class="field" id="f-permit" type="date" value="${existing?.compliance?.permitExpiry||""}">
        </label>
        <label class="form-label">Insurance Expiry
          <input class="field" id="f-insurance" type="date" value="${existing?.compliance?.insuranceExpiry||""}">
        </label>
        <label class="form-label">Pollution (PUC) Expiry
          <input class="field" id="f-puc" type="date" value="${existing?.compliance?.pollutionExpiry||""}">
        </label>
        <label class="form-label">Seating Capacity
          <input class="field" id="f-seats" type="number" placeholder="e.g. 52" value="${existing?.compliance?.seats||""}">
        </label>
      </div>
    </div>

    <div style="display:flex;gap:10px;margin-top:20px;justify-content:flex-end">
      <button class="btn btn-text" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="modal-save-btn">${editId ? "Save Changes" : "Add Vehicle"}</button>
    </div>
  `);

  // Show/hide compliance section when type changes
  document.getElementById("f-type").addEventListener("change", function() {
    const vt = VEHICLE_TYPES[this.value];
    document.getElementById("public-compliance-section").style.display = vt?.isPublic ? "block" : "none";
  });

  document.getElementById("modal-save-btn").onclick = () => {
    const type  = document.getElementById("f-type").value;
    const plate = document.getElementById("f-plate").value.trim().toUpperCase();
    const brand = document.getElementById("f-brand").value.trim();
    const model = document.getElementById("f-model").value.trim();
    const year  = parseInt(document.getElementById("f-year").value) || new Date().getFullYear();

    if (!plate || !brand || !model) { alert("Please fill in required fields: Plate, Brand, Model"); return; }

    const vt = VEHICLE_TYPES[type];
    const compliance = vt?.isPublic ? {
      fitnessExpiry:   document.getElementById("f-fitness").value,
      taxExpiry:       document.getElementById("f-tax").value,
      fireExtExpiry:   document.getElementById("f-fireext").value,
      firstAidExpiry:  document.getElementById("f-firstaid").value,
      permitExpiry:    document.getElementById("f-permit").value,
      insuranceExpiry: document.getElementById("f-insurance").value,
      pollutionExpiry: document.getElementById("f-puc").value,
      seats:           parseInt(document.getElementById("f-seats").value) || 0,
    } : null;

    const vehicleData = {
      id: editId || uid("v"),
      type, plate, brand, model, year,
      vehicleType:  document.getElementById("f-vtype").value.trim(),
      driverId:     document.getElementById("f-driver").value || null,
      status:       document.getElementById("f-status").value,
      fuelLevel:    parseInt(document.getElementById("f-fuel").value) || 0,
      mileage:      parseInt(document.getElementById("f-mileage").value) || 0,
      lastService:  document.getElementById("f-service").value,
      compliance
    };

    if (editId) {
      DATA.vehicles = DATA.vehicles.map(v => v.id === editId ? vehicleData : v);
    } else {
      DATA.vehicles.push(vehicleData);
    }

    // Update driver assignment
    DATA.drivers = DATA.drivers.map(d => {
      if (d.id === vehicleData.driverId) return { ...d, vehicleId: vehicleData.id, status: "on-trip" };
      if (d.vehicleId === vehicleData.id && d.id !== vehicleData.driverId) return { ...d, vehicleId: null, status: "available" };
      return d;
    });

    persist();
    autoCheckAlerts();
    closeModal();
    renderVehicles();
  };
}

function editVehicle(id) { openAddVehicle(id); }

function deleteVehicle(id) {
  if (!confirm("Delete this vehicle? This cannot be undone.")) return;
  DATA.vehicles = DATA.vehicles.filter(v => v.id !== id);
  DATA.trips = DATA.trips.filter(t => t.vehicleId !== id);
  DATA.maintenance = DATA.maintenance.filter(m => m.vehicleId !== id);
  DATA.fuel = DATA.fuel.filter(f => f.vehicleId !== id);
  DATA.drivers = DATA.drivers.map(d => d.vehicleId === id ? { ...d, vehicleId: null } : d);
  persist();
  renderVehicles();
}

/* ── Drivers Page ───────────────────────────────────────────────── */
function renderDrivers() {
  const drivers = getDrivers();

  document.getElementById("page-content").innerHTML = `
    <div class="toolbar">
      <input class="search-input" id="drv-search" placeholder="Search drivers…">
      <select class="filter-select" id="drv-filter">
        <option value="">All Statuses</option>
        <option value="on-trip">On-Trip</option>
        <option value="available">Available</option>
        <option value="off-duty">Off-Duty</option>
      </select>
      <button class="btn btn-primary btn-sm" id="add-drv-btn">+ Add Driver</button>
    </div>
    <div id="drv-list"></div>`;

  function renderList(list) {
    const el = document.getElementById("drv-list");
    if (!list.length) {
      el.innerHTML = `<div class="card" style="text-align:center;padding:40px;color:var(--text-dim)">No drivers found.</div>`;
      return;
    }
    el.innerHTML = list.map(d => {
      const vehicle = getVehicles().find(v => v.id === d.vehicleId);
      const today = new Date();
      const expiryDays = daysUntil(d.licenseExpiry);
      const expiryColor = expiryDays < 0 ? "var(--error)" : expiryDays < 90 ? "var(--warning)" : "var(--text)";
      return `<div class="card driver-card" style="margin-bottom:12px">
        <div class="driver-header">
          <div class="driver-avatar">${d.name.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2)}</div>
          <div class="driver-info">
            <div class="driver-name">${d.name}</div>
            <div class="driver-meta">📞 ${d.phone || "—"}</div>
            <div class="driver-meta">🪪 ${d.license || "—"} · <span style="color:${expiryColor}">Exp: ${d.licenseExpiry || "—"}</span></div>
            ${vehicle ? `<div class="driver-meta">🚗 ${vehicle.plate} — ${vehicle.brand} ${vehicle.model}</div>` : `<div class="driver-meta" style="color:var(--text-dim)">No vehicle assigned</div>`}
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            ${chip(d.status)}
            <div style="display:flex;gap:4px">
              <button class="btn btn-outline btn-sm" onclick="editDriver('${d.id}')">Edit</button>
              <button class="btn btn-sm" style="background:rgba(244,67,54,.15);color:#ef9a9a" onclick="deleteDriver('${d.id}')">Del</button>
            </div>
          </div>
        </div>
        ${d.safetyScore ? `<div style="display:flex;align-items:center;gap:8px;margin-top:8px"><span style="font-size:12px;color:var(--text-dim)">Safety Score</span>${scoreBar(d.safetyScore)}</div>` : ""}
      </div>`;
    }).join("");
  }

  renderList(drivers);

  function filter() {
    const q = document.getElementById("drv-search").value.toLowerCase();
    const s = document.getElementById("drv-filter").value;
    renderList(getDrivers().filter(d =>
      (!q || d.name.toLowerCase().includes(q)) && (!s || d.status === s)
    ));
  }

  document.getElementById("drv-search").addEventListener("input", filter);
  document.getElementById("drv-filter").addEventListener("change", filter);
  document.getElementById("add-drv-btn").addEventListener("click", () => openAddDriver());
}

function openAddDriver(editId = null) {
  const existing = editId ? getDrivers().find(d => d.id === editId) : null;
  const vehicles = getVehicles();

  openModal(editId ? "Edit Driver" : "Add Driver", `
    <div class="form-grid">
      <label class="form-label">Full Name *
        <input class="field" id="d-name" type="text" placeholder="e.g. Raju Kumar" value="${existing?.name||""}">
      </label>
      <label class="form-label">Phone Number
        <input class="field" id="d-phone" type="tel" placeholder="+91 98765 43210" value="${existing?.phone||""}">
      </label>
      <label class="form-label">License Number *
        <input class="field" id="d-license" type="text" placeholder="e.g. KL0119900012345" value="${existing?.license||""}">
      </label>
      <label class="form-label">License Expiry Date *
        <input class="field" id="d-expiry" type="date" value="${existing?.licenseExpiry||""}">
      </label>
      <label class="form-label">Address
        <input class="field" id="d-address" type="text" placeholder="City, State" value="${existing?.address||""}">
      </label>
      <label class="form-label">Status
        <select class="field" id="d-status">
          <option value="available" ${existing?.status==="available"?"selected":""}>Available</option>
          <option value="on-trip" ${existing?.status==="on-trip"?"selected":""}>On-Trip</option>
          <option value="off-duty" ${existing?.status==="off-duty"?"selected":""}>Off-Duty</option>
        </select>
      </label>
      <label class="form-label">Assigned Vehicle
        <select class="field" id="d-vehicle">
          <option value="">— Not Assigned —</option>
          ${vehicles.map(v => `<option value="${v.id}" ${existing?.vehicleId===v.id?"selected":""}>${v.plate} — ${v.brand} ${v.model}</option>`).join("")}
        </select>
      </label>
      <label class="form-label">Safety Score (0-100)
        <input class="field" id="d-safety" type="number" min="0" max="100" placeholder="e.g. 87" value="${existing?.safetyScore||""}">
      </label>
    </div>
    <div style="display:flex;gap:10px;margin-top:20px;justify-content:flex-end">
      <button class="btn btn-text" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" id="modal-save-btn">${editId ? "Save Changes" : "Add Driver"}</button>
    </div>
  `);

  document.getElementById("modal-save-btn").onclick = () => {
    const name    = document.getElementById("d-name").value.trim();
    const license = document.getElementById("d-license").value.trim();
    const expiry  = document.getElementById("d-expiry").value;
    if (!name || !license) { alert("Name and License are required."); return; }

    const driverData = {
      id: editId || uid("d"), name,
      phone:        document.getElementById("d-phone").value.trim(),
      license,
      licenseExpiry: expiry,
      address:      document.getElementById("d-address").value.trim(),
      status:       document.getElementById("d-status").value,
      vehicleId:    document.getElementById("d-vehicle").value || null,
      safetyScore:  parseInt(document.getElementById("d-safety").value) || null,
      trips:        existing?.trips || 0
    };

    if (editId) {
      DATA.drivers = DATA.drivers.map(d => d.id === editId ? driverData : d);
    } else {
      DATA.drivers.push(driverData);
    }

    // Sync vehicle assignment
    if (driverData.vehicleId) {
      DATA.vehicles = DATA.vehicles.map(v => v.id === driverData.vehicleId ? { ...v, driverId: driverData.id } : v);
    }

    persist();
    closeModal();
    renderDrivers();
  };
}

function editDriver(id) { openAddDriver(id); }

function deleteDriver(id) {
  if (!confirm("Delete this driver?")) return;
  DATA.drivers = DATA.drivers.filter(d => d.id !== id);
  DATA.vehicles = DATA.vehicles.map(v => v.driverId === id ? { ...v, driverId: null } : v);
  persist();
  renderDrivers();
}

/* ── Trips ──────────────────────────────────────────────────────── */
function renderTrips() {
  const trips = getTrips();

  document.getElementById("page-content").innerHTML = `
    <div class="toolbar">
      <input class="search-input" id="trp-search" placeholder="Search trips…">
      <select class="filter-select" id="trp-filter">
        <option value="">All</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      <button class="btn btn-primary btn-sm" id="add-trp-btn">+ Log Trip</button>
    </div>
    <div id="trp-list"></div>`;

  function renderList(list) {
    const el = document.getElementById("trp-list");
    if (!list.length) { el.innerHTML = `<div class="card" style="text-align:center;padding:40px;color:var(--text-dim)">No trips logged.</div>`; return; }
    el.innerHTML = list.slice().reverse().map(t => `
      <div class="card" style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
          <div>
            <div style="font-weight:600;margin-bottom:4px">🚗 ${vehiclePlate(t.vehicleId)} &nbsp; 👤 ${driverName(t.driverId)}</div>
            <div style="font-size:13px;color:var(--text-dim)">${t.startLocation} → ${t.endLocation}</div>
            <div style="font-size:12px;color:var(--text-dim);margin-top:4px">${t.startTime ? new Date(t.startTime).toLocaleString() : "—"}</div>
            <div style="font-size:12px;margin-top:4px">
              ${t.distance ? `📍 ${t.distance} km` : ""} 
              ${t.fuelUsed ? `⛽ ${t.fuelUsed}L` : ""} 
              ${t.cost ? `💰 ₹${t.cost}` : ""}
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
            ${chip(t.status)}
            <button class="btn btn-sm" style="background:rgba(244,67,54,.15);color:#ef9a9a;margin-top:4px" onclick="deleteTrip('${t.id}')">Delete</button>
          </div>
        </div>
      </div>`).join("");
  }

  renderList(trips);

  function filter() {
    const q = document.getElementById("trp-search").value.toLowerCase();
    const s = document.getElementById("trp-filter").value;
    renderList(getTrips().filter(t =>
      (!q || (vehiclePlate(t.vehicleId) + t.startLocation + t.endLocation + driverName(t.driverId)).toLowerCase().includes(q)) &&
      (!s || t.status === s)
    ));
  }

  document.getElementById("trp-search").addEventListener("input", filter);
  document.getElementById("trp-filter").addEventListener("change", filter);
  document.getElementById("add-trp-btn").addEventListener("click", () => {
    openModal("Log Trip", `
      <div class="form-grid">
        <label class="form-label">Vehicle *
          <select class="field" id="t-vehicle">
            <option value="">Select vehicle…</option>
            ${getVehicles().map(v => `<option value="${v.id}">${v.plate} — ${v.brand} ${v.model}</option>`).join("")}
          </select>
        </label>
        <label class="form-label">Driver *
          <select class="field" id="t-driver">
            <option value="">Select driver…</option>
            ${getDrivers().map(d => `<option value="${d.id}">${d.name}</option>`).join("")}
          </select>
        </label>
        <label class="form-label">Start Location *
          <input class="field" id="t-from" type="text" placeholder="e.g. Thrissur Depot">
        </label>
        <label class="form-label">End Location *
          <input class="field" id="t-to" type="text" placeholder="e.g. Palakkad Bus Stand">
        </label>
        <label class="form-label">Start Date/Time
          <input class="field" id="t-time" type="datetime-local" value="${new Date().toISOString().slice(0,16)}">
        </label>
        <label class="form-label">Distance (km)
          <input class="field" id="t-dist" type="number" placeholder="e.g. 85">
        </label>
        <label class="form-label">Fuel Used (Liters)
          <input class="field" id="t-fuel" type="number" placeholder="e.g. 12.5">
        </label>
        <label class="form-label">Cost (₹)
          <input class="field" id="t-cost" type="number" placeholder="e.g. 950">
        </label>
        <label class="form-label">Status
          <select class="field" id="t-status">
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px;justify-content:flex-end">
        <button class="btn btn-text" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" id="modal-save-btn">Log Trip</button>
      </div>
    `);
    document.getElementById("modal-save-btn").onclick = () => {
      const vehicleId = document.getElementById("t-vehicle").value;
      const driverId  = document.getElementById("t-driver").value;
      const from      = document.getElementById("t-from").value.trim();
      const to        = document.getElementById("t-to").value.trim();
      if (!vehicleId || !from || !to) { alert("Vehicle, Start and End locations required."); return; }
      DATA.trips.push({
        id: uid("t"), vehicleId, driverId: driverId || null,
        startLocation: from, endLocation: to,
        startTime: document.getElementById("t-time").value,
        distance:  parseFloat(document.getElementById("t-dist").value) || 0,
        fuelUsed:  parseFloat(document.getElementById("t-fuel").value) || 0,
        cost:      parseFloat(document.getElementById("t-cost").value) || 0,
        status:    document.getElementById("t-status").value
      });
      persist();
      closeModal();
      renderTrips();
    };
  });
}

function deleteTrip(id) {
  if (!confirm("Delete trip?")) return;
  DATA.trips = DATA.trips.filter(t => t.id !== id);
  persist(); renderTrips();
}

/* ── Maintenance ────────────────────────────────────────────────── */
function renderMaintenance() {
  const mnt = getMaintenance();

  document.getElementById("page-content").innerHTML = `
    <div class="toolbar">
      <select class="filter-select" id="mnt-filter">
        <option value="">All</option>
        <option value="overdue">Overdue</option>
        <option value="in-progress">In Progress</option>
        <option value="scheduled">Scheduled</option>
        <option value="completed">Completed</option>
      </select>
      <button class="btn btn-primary btn-sm" id="add-mnt-btn">+ Add Record</button>
    </div>
    <div id="mnt-list"></div>`;

  function renderList(list) {
    const el = document.getElementById("mnt-list");
    if (!list.length) { el.innerHTML = `<div class="card" style="text-align:center;padding:40px;color:var(--text-dim)">No maintenance records.</div>`; return; }
    el.innerHTML = list.slice().reverse().map(m => `
      <div class="card" style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="font-weight:600;margin-bottom:4px">🔧 ${m.type}</div>
            <div style="font-size:13px;color:var(--text-dim)">🚗 ${vehiclePlate(m.vehicleId)}</div>
            <div style="font-size:12px;margin-top:4px">📅 ${m.scheduledDate} · 👨‍🔧 ${m.technician || "—"} · 💰 ₹${(m.cost||0).toLocaleString()}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
            ${chip(m.status)}
            <button class="btn btn-sm" style="background:rgba(244,67,54,.15);color:#ef9a9a;margin-top:4px" onclick="deleteMnt('${m.id}')">Delete</button>
          </div>
        </div>
      </div>`).join("");
  }

  renderList(mnt);

  document.getElementById("mnt-filter").addEventListener("change", function() {
    const s = this.value;
    renderList(s ? getMaintenance().filter(m => m.status === s) : getMaintenance());
  });

  document.getElementById("add-mnt-btn").addEventListener("click", () => {
    openModal("Add Maintenance Record", `
      <div class="form-grid">
        <label class="form-label">Vehicle *
          <select class="field" id="m-veh">
            <option value="">Select…</option>
            ${getVehicles().map(v => `<option value="${v.id}">${v.plate} — ${v.brand} ${v.model}</option>`).join("")}
          </select>
        </label>
        <label class="form-label">Service Type *
          <input class="field" id="m-type" type="text" placeholder="e.g. Oil Change, Tyre Replacement">
        </label>
        <label class="form-label">Scheduled Date *
          <input class="field" id="m-date" type="date">
        </label>
        <label class="form-label">Status
          <select class="field" id="m-status">
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </label>
        <label class="form-label">Cost (₹)
          <input class="field" id="m-cost" type="number" placeholder="e.g. 2500">
        </label>
        <label class="form-label">Technician
          <input class="field" id="m-tech" type="text" placeholder="Name or workshop">
        </label>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px;justify-content:flex-end">
        <button class="btn btn-text" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" id="modal-save-btn">Add Record</button>
      </div>
    `);
    document.getElementById("modal-save-btn").onclick = () => {
      const vehicleId = document.getElementById("m-veh").value;
      const type = document.getElementById("m-type").value.trim();
      const date = document.getElementById("m-date").value;
      if (!vehicleId || !type || !date) { alert("Vehicle, Type and Date required."); return; }
      DATA.maintenance.push({
        id: uid("m"), vehicleId, type,
        scheduledDate: date,
        status:     document.getElementById("m-status").value,
        cost:       parseFloat(document.getElementById("m-cost").value) || 0,
        technician: document.getElementById("m-tech").value.trim()
      });
      persist(); closeModal(); renderMaintenance();
    };
  });
}

function deleteMnt(id) {
  if (!confirm("Delete maintenance record?")) return;
  DATA.maintenance = DATA.maintenance.filter(m => m.id !== id);
  persist(); renderMaintenance();
}

/* ── Fuel Tracking ──────────────────────────────────────────────── */
function renderFuel() {
  const fuel = getFuel();
  const totalL    = fuel.reduce((s, f) => s + (f.liters||0), 0).toFixed(1);
  const totalCost = fuel.reduce((s, f) => s + (f.cost||0), 0).toFixed(0);

  document.getElementById("page-content").innerHTML = `
    <div class="kpi-grid" style="margin-bottom:16px">
      <div class="kpi-card"><div class="kpi-label">Total Fuel</div><div class="kpi-value">${totalL} L</div></div>
      <div class="kpi-card"><div class="kpi-label">Total Cost</div><div class="kpi-value">₹${totalCost}</div></div>
    </div>
    <div class="toolbar"><button class="btn btn-primary btn-sm" id="add-fuel-btn">+ Log Fuel</button></div>
    <div id="fuel-list"></div>`;

  function renderList() {
    const el = document.getElementById("fuel-list");
    if (!fuel.length) { el.innerHTML = `<div class="card" style="text-align:center;padding:40px;color:var(--text-dim)">No fuel records.</div>`; return; }
    el.innerHTML = getFuel().slice().reverse().map(f => `
      <div class="card" style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between">
          <div>
            <div style="font-weight:600">⛽ ${vehiclePlate(f.vehicleId)}</div>
            <div style="font-size:13px;color:var(--text-dim)">👤 ${f.driverId ? driverName(f.driverId) : "—"} · 📅 ${f.date}</div>
            <div style="font-size:12px;margin-top:4px">${f.liters}L · ₹${f.cost} · ${f.odometer?f.odometer.toLocaleString()+" km":""} · ${f.station||""}</div>
          </div>
          <button class="btn btn-sm" style="background:rgba(244,67,54,.15);color:#ef9a9a;align-self:flex-start" onclick="deleteFuel('${f.id}')">Del</button>
        </div>
      </div>`).join("");
  }

  renderList();

  document.getElementById("add-fuel-btn").addEventListener("click", () => {
    openModal("Log Fuel Fill-up", `
      <div class="form-grid">
        <label class="form-label">Vehicle *
          <select class="field" id="fu-veh">
            <option value="">Select…</option>
            ${getVehicles().map(v => `<option value="${v.id}">${v.plate} — ${v.brand}</option>`).join("")}
          </select>
        </label>
        <label class="form-label">Driver
          <select class="field" id="fu-drv">
            <option value="">— Optional —</option>
            ${getDrivers().map(d => `<option value="${d.id}">${d.name}</option>`).join("")}
          </select>
        </label>
        <label class="form-label">Date *
          <input class="field" id="fu-date" type="date" value="${new Date().toISOString().slice(0,10)}">
        </label>
        <label class="form-label">Liters *
          <input class="field" id="fu-liters" type="number" step="0.1" placeholder="e.g. 45.5">
        </label>
        <label class="form-label">Cost (₹) *
          <input class="field" id="fu-cost" type="number" placeholder="e.g. 4500">
        </label>
        <label class="form-label">Odometer (km)
          <input class="field" id="fu-odo" type="number" placeholder="e.g. 45200">
        </label>
        <label class="form-label">Station / Location
          <input class="field" id="fu-station" type="text" placeholder="e.g. BPCL Thrissur">
        </label>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px;justify-content:flex-end">
        <button class="btn btn-text" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" id="modal-save-btn">Log Fuel</button>
      </div>
    `);
    document.getElementById("modal-save-btn").onclick = () => {
      const vehicleId = document.getElementById("fu-veh").value;
      const liters = parseFloat(document.getElementById("fu-liters").value);
      const cost = parseFloat(document.getElementById("fu-cost").value);
      const date = document.getElementById("fu-date").value;
      if (!vehicleId || !liters || !cost || !date) { alert("Vehicle, Liters, Cost and Date required."); return; }
      DATA.fuel.push({
        id: uid("f"), vehicleId,
        driverId: document.getElementById("fu-drv").value || null,
        date, liters, cost,
        odometer: parseInt(document.getElementById("fu-odo").value) || 0,
        station:  document.getElementById("fu-station").value.trim()
      });
      persist(); closeModal(); renderFuel();
    };
  });
}

function deleteFuel(id) {
  if (!confirm("Delete fuel record?")) return;
  DATA.fuel = DATA.fuel.filter(f => f.id !== id);
  persist(); renderFuel();
}

/* ── Alerts ─────────────────────────────────────────────────────── */
function renderAlerts() {
  let filter = "all";

  function render() {
    let list = [...getAlerts()].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    if (filter === "unread") list = list.filter(a => !a.read);
    if (filter === "unresolved") list = list.filter(a => !a.resolved);

    document.getElementById("alert-list").innerHTML = list.map(a => `
      <div class="alert-item ${!a.read ? "unread" : ""}">
        <div class="alert-dot dot-${a.severity}"></div>
        <div class="alert-body">
          <div class="alert-title">${a.title}</div>
          <div class="alert-msg">${a.message}</div>
          <div class="alert-meta">
            ${sevChip(a.severity)}
            ${a.resolved ? '<span class="chip chip-completed">resolved</span>' : ""}
            <span class="alert-time">${timeAgo(a.timestamp)}</span>
            ${!a.read ? `<button class="btn btn-text btn-sm" onclick="markAlertRead('${a.id}')">Mark Read</button>` : ""}
            ${!a.resolved ? `<button class="btn btn-text btn-sm" onclick="resolveAlert('${a.id}')">Resolve</button>` : ""}
          </div>
        </div>
      </div>`).join("") || `<p style="color:var(--text-dim);padding:16px">No alerts</p>`;
  }

  const alertsArr = getAlerts();
  document.getElementById("page-content").innerHTML = `
    <div class="card">
      <div class="tab-bar" id="alert-tabs" style="margin-bottom:8px">
        <button class="tab active" data-filter="all">All (${alertsArr.length})</button>
        <button class="tab" data-filter="unread">Unread (${alertsArr.filter(a=>!a.read).length})</button>
        <button class="tab" data-filter="unresolved">Unresolved (${alertsArr.filter(a=>!a.resolved).length})</button>
      </div>
      <div id="alert-list"></div>
    </div>`;

  render();

  document.getElementById("alert-tabs").addEventListener("click", e => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    document.querySelectorAll("#alert-tabs .tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  });
}

function markAlertRead(id) {
  DATA.alerts = DATA.alerts.map(a => a.id === id ? { ...a, read: true } : a);
  persist(); updateAlertBadge(); renderAlerts();
}
function resolveAlert(id) {
  DATA.alerts = DATA.alerts.map(a => a.id === id ? { ...a, read: true, resolved: true } : a);
  persist(); updateAlertBadge(); renderAlerts();
}

/* ── Analytics ──────────────────────────────────────────────────── */
function renderAnalytics() {
  const vehicles = getVehicles();
  const trips = getTrips();
  const fuel = getFuel();

  const fuelByVehicle = {};
  fuel.forEach(f => {
    const plate = vehiclePlate(f.vehicleId);
    fuelByVehicle[plate] = (fuelByVehicle[plate] || 0) + (f.cost || 0);
  });

  document.getElementById("page-content").innerHTML = `
    <div class="grid-2" style="margin-bottom:16px">
      <div class="card">
        <div class="card-title">Fleet by Status</div>
        <div class="chart-box"><canvas id="chart-status"></canvas></div>
      </div>
      <div class="card">
        <div class="card-title">Fuel Cost by Vehicle (₹)</div>
        <div class="chart-box"><canvas id="chart-fuel"></canvas></div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">Vehicle Compliance Summary</div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Vehicle</th><th>Type</th><th>Fitness</th><th>Road Tax</th><th>Fire Ext.</th><th>First Aid</th><th>Permit</th></tr></thead>
          <tbody>
            ${vehicles.filter(v => VEHICLE_TYPES[v.type]?.isPublic).map(v => {
              const c = v.compliance || {};
              const col = (d) => { const s = complianceStatus(d); return `<span class="chip ${s.cls}" style="font-size:10px">${s.label}</span>`; };
              return `<tr>
                <td><strong>${v.plate}</strong></td>
                <td>${VEHICLE_TYPES[v.type]?.label||v.type}</td>
                <td>${col(c.fitnessExpiry)}</td>
                <td>${col(c.taxExpiry)}</td>
                <td>${col(c.fireExtExpiry)}</td>
                <td>${col(c.firstAidExpiry)}</td>
                <td>${col(c.permitExpiry)}</td>
              </tr>`;
            }).join("") || `<tr><td colspan="7" style="text-align:center;color:var(--text-dim);padding:20px">No public vehicles tracked.</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>`;

  const statusCounts = {};
  vehicles.forEach(v => { statusCounts[v.status] = (statusCounts[v.status] || 0) + 1; });

  const colors = ["#4caf50","#ff9800","#9e9e9e","#f44336","#2196f3"];
  mkChart("chart-status", {
    type: "doughnut",
    data: {
      labels: Object.keys(statusCounts).map(s => s.charAt(0).toUpperCase()+s.slice(1)),
      datasets: [{ data: Object.values(statusCounts), backgroundColor: colors, borderWidth: 0 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: CHART_DEFAULTS.plugins }
  });

  const fuelLabels = Object.keys(fuelByVehicle);
  mkChart("chart-fuel", {
    type: "bar",
    data: {
      labels: fuelLabels.length ? fuelLabels : ["No Data"],
      datasets: [{ label: "Cost (₹)", data: fuelLabels.length ? Object.values(fuelByVehicle) : [0],
        backgroundColor: "#2196f3", borderRadius: 4 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: CHART_DEFAULTS.plugins, scales: CHART_DEFAULTS.scales }
  });
}

/* ── Settings ───────────────────────────────────────────────────── */
function renderSettings(user) {
  const email = user ? user.email : "";
  document.getElementById("page-content").innerHTML = `
    <div class="grid-2">
      <div>
        <div class="card settings-section" style="margin-bottom:16px">
          <h3>Profile</h3>
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
            <div class="avatar" style="width:52px;height:52px;font-size:20px">${email ? email[0].toUpperCase() : "?"}</div>
            <div>
              <div style="font-weight:600">${email}</div>
              <div style="color:var(--text-dim);font-size:12px">Fleet Manager</div>
            </div>
          </div>
          <input type="text" class="field" placeholder="Full Name" style="margin-bottom:10px">
          <input type="tel" class="field" placeholder="Phone Number" style="margin-bottom:16px">
          <button class="btn btn-primary btn-sm">Save Profile</button>
        </div>

        <div class="card settings-section">
          <h3>Data Management</h3>
          <div class="settings-row">
            <span>Export all data as JSON</span>
            <button class="btn btn-outline btn-sm" onclick="exportData()">Export</button>
          </div>
          <div class="settings-row">
            <span>Import data from JSON</span>
            <label class="btn btn-outline btn-sm" style="cursor:pointer">Import<input type="file" accept=".json" style="display:none" onchange="importData(event)"></label>
          </div>
          <div class="settings-row">
            <span style="color:var(--error)">Reset all data</span>
            <button class="btn btn-sm" style="background:rgba(244,67,54,.15);color:#ef9a9a" onclick="resetData()">Reset</button>
          </div>
        </div>
      </div>
      <div class="card settings-section">
        <h3>App Info</h3>
        <div class="settings-row"><span>App Version</span><strong>2.0.0</strong></div>
        <div class="settings-row"><span>Vehicles</span><strong>${getVehicles().length}</strong></div>
        <div class="settings-row"><span>Drivers</span><strong>${getDrivers().length}</strong></div>
        <div class="settings-row"><span>Public Vehicles</span><strong>${getVehicles().filter(v=>VEHICLE_TYPES[v.type]?.isPublic).length}</strong></div>
        <div class="settings-row"><span>Trips Logged</span><strong>${getTrips().length}</strong></div>
        <div class="settings-row"><span>Fuel Records</span><strong>${getFuel().length}</strong></div>
        <hr class="divider">
        <button class="btn btn-text btn-block" id="settings-signout" style="color:var(--error);margin-top:8px">Sign Out</button>
      </div>
    </div>`;

  document.getElementById("settings-signout").addEventListener("click", () => auth.signOut());
}

function exportData() {
  const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "fleetguard_export.json";
  a.click();
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.vehicles !== undefined) {
        DATA = imported;
        persist();
        alert("Data imported successfully!");
        navigate("dashboard");
      } else {
        alert("Invalid file format.");
      }
    } catch { alert("Failed to parse JSON."); }
  };
  reader.readAsText(file);
}

function resetData() {
  if (!confirm("This will DELETE ALL your fleet data. Are you absolutely sure?")) return;
  DATA = { vehicles: [], drivers: [], trips: [], maintenance: [], fuel: [], alerts: [] };
  persist();
  navigate("dashboard");
}

/* ── Navigation ─────────────────────────────────────────────────── */
const PAGE_TITLES = {
  dashboard: "Dashboard", vehicles: "Fleet Vehicles", drivers: "Drivers",
  trips: "Trip History", maintenance: "Maintenance", fuel: "Fuel Tracking",
  alerts: "Alerts", analytics: "Analytics", settings: "Settings"
};

let currentUser = null;

function navigate(page) {
  destroyCharts();
  document.querySelectorAll(".nav-link").forEach(l => l.classList.toggle("active", l.dataset.page === page));
  document.getElementById("page-title").textContent = PAGE_TITLES[page] || page;

  // Close mobile sidebar
  document.getElementById("sidebar").classList.remove("open");

  switch (page) {
    case "dashboard":   renderDashboard(); break;
    case "vehicles":    renderVehicles();  break;
    case "drivers":     renderDrivers();   break;
    case "trips":       renderTrips();     break;
    case "maintenance": renderMaintenance(); break;
    case "fuel":        renderFuel();      break;
    case "alerts":      renderAlerts();    break;
    case "analytics":   renderAnalytics(); break;
    case "settings":    renderSettings(currentUser); break;
  }
}

/* ── Auth ───────────────────────────────────────────────────────── */
function showApp(user) {
  currentUser = user;
  const email = user.email || "";
  document.getElementById("user-email").textContent = email;
  document.getElementById("user-avatar").textContent = email ? email[0].toUpperCase() : "?";
  document.getElementById("auth-screen").classList.add("hidden");
  document.getElementById("app-screen").classList.remove("hidden");
  autoCheckAlerts();
  updateAlertBadge();
  navigate("dashboard");
}

function showAuth() {
  currentUser = null;
  document.getElementById("app-screen").classList.add("hidden");
  document.getElementById("auth-screen").classList.remove("hidden");
}

function setAuthMsg(type, text) {
  const err = document.getElementById("auth-error");
  const ok  = document.getElementById("auth-success");
  err.textContent = ""; err.classList.add("hidden");
  ok.textContent  = ""; ok.classList.add("hidden");
  if (!text) return;
  if (type === "error") { err.textContent = text; err.classList.remove("hidden"); }
  else                  { ok.textContent  = text; ok.classList.remove("hidden"); }
}

/* ── Boot ───────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  // Auth tabs
  document.querySelectorAll(".tab-bar .tab[data-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll(".tab-bar .tab[data-tab]").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("panel-signin").classList.toggle("hidden", tab !== "signin");
      document.getElementById("panel-signup").classList.toggle("hidden", tab !== "signup");
      setAuthMsg(null, "");
    });
  });

  document.getElementById("toggle-pw").addEventListener("click", function () {
    const pw = document.getElementById("signin-password");
    const isText = pw.type === "text";
    pw.type = isText ? "password" : "text";
    this.textContent = isText ? "Show" : "Hide";
  });

  document.getElementById("signin-btn").addEventListener("click", async () => {
    const email = document.getElementById("signin-email").value.trim();
    const pw    = document.getElementById("signin-password").value;
    if (!email || !pw) { setAuthMsg("error", "Please enter your email and password."); return; }
    try { await auth.signInWithEmailAndPassword(email, pw); }
    catch (e) { setAuthMsg("error", friendlyAuthError(e.code)); }
  });

  document.getElementById("signup-btn").addEventListener("click", async () => {
    const email = document.getElementById("signup-email").value.trim();
    const pw    = document.getElementById("signup-password").value;
    if (!email || !pw) { setAuthMsg("error", "Please fill in all fields."); return; }
    try { await auth.createUserWithEmailAndPassword(email, pw); }
    catch (e) { setAuthMsg("error", friendlyAuthError(e.code)); }
  });

  document.getElementById("forgot-btn").addEventListener("click", async () => {
    const email = document.getElementById("signin-email").value.trim();
    if (!email) { setAuthMsg("error", "Enter your email address first."); return; }
    try {
      await auth.sendPasswordResetEmail(email);
      setAuthMsg("success", "Password reset email sent.");
    } catch (e) { setAuthMsg("error", friendlyAuthError(e.code)); }
  });

  document.getElementById("signout-btn").addEventListener("click", () => auth.signOut());

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => { e.preventDefault(); navigate(link.dataset.page); });
  });

  document.getElementById("alerts-header-btn").addEventListener("click", () => navigate("alerts"));

  // Mobile hamburger
  document.getElementById("hamburger-btn")?.addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
  });

  // Sidebar overlay click
  document.getElementById("sidebar-overlay")?.addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
  });

  // Modal close
  document.getElementById("modal-close-x").addEventListener("click", closeModal);
  document.getElementById("modal-overlay").addEventListener("click", e => {
    if (e.target === document.getElementById("modal-overlay")) closeModal();
  });

  auth.onAuthStateChanged(user => { if (user) showApp(user); else showAuth(); });
});

function friendlyAuthError(code) {
  const map = {
    "auth/invalid-email": "Invalid email address.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/invalid-credential": "Invalid email or password."
  };
  return map[code] || "Authentication failed.";
}
