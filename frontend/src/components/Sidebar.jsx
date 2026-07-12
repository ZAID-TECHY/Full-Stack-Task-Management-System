// Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: <IconGrid /> },
  { to: "/tasks", label: "Tasks", icon: <IconList /> },
  { to: "/create-task", label: "Create task", icon: <IconPlus /> },
  { to: "/team", label: "Team", icon: <IconUsers /> },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div
      style={{
        width: 264,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1B1638 0%, #110E24 100%)",
        borderRight: "1px solid var(--border-soft)",
        padding: "28px 18px",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Brand mark */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px", marginBottom: 40 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, var(--accent-light), var(--accent-dark))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-glow)",
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 12L10 18L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 21,
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          Nimbus
        </span>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            padding: "0 12px",
            marginBottom: 8,
          }}
        >
          Workspace
        </p>
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 12px",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 14.5,
                fontWeight: 500,
                color: active ? "var(--text-primary)" : "var(--text-secondary)",
                background: active ? "rgba(139, 92, 246, 0.16)" : "transparent",
                position: "relative",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              {active && (
                <span
                  style={{
                    position: "absolute",
                    left: -18,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 3,
                    height: 18,
                    borderRadius: 4,
                    background: "var(--accent)",
                    boxShadow: "0 0 12px var(--accent-glow)",
                  }}
                />
              )}
              <span style={{ display: "flex", color: active ? "var(--accent-light)" : "var(--text-muted)" }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Upgrade / footer card */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(139,92,246,0.04))",
          border: "1px solid var(--border-soft)",
          borderRadius: 14,
          padding: 16,
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: "var(--text-primary)" }}>
          Stay on track
        </p>
        <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "4px 0 0" }}>
          Your team's momentum, all in one place.
        </p>
      </div>
    </div>
  );
}

function IconGrid() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function IconList() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 4.5c1.4.4 2.4 1.7 2.4 3.2s-1 2.8-2.4 3.2M19 19c0-2.5-1.6-4.3-3.7-4.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// import { Link } from "react-router-dom";

// export default function Sidebar() {
//   return (
//     <div className="w-64 h-screen bg-card p-5 border-r border-gray-700">

//       <h1 className="text-xl font-bold mb-8">
//         ⚡ Task Manager
//       </h1>

//       <div className="flex flex-col gap-4 text-gray-300">

//         <Link to="/dashboard">📊 Dashboard</Link>
//         <Link to="/tasks">📌 Tasks</Link>
//         <Link to="/create-task">➕ Create Task</Link>

//       </div>

//     </div>
//   );
// }