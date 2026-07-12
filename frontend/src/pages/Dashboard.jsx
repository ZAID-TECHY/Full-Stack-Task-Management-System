// Dashboard.jsx
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await API.get("/team/stats");
      setStats(res.data.stats);
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: "Total tasks",
      value: stats?.totalTasks,
      accent: "var(--accent-light)",
      bg: "rgba(139,92,246,0.12)",
      icon: <IconLayers />,
    },
    {
      label: "Pending",
      value: stats?.pendingTasks,
      accent: "var(--amber)",
      bg: "var(--amber-soft)",
      icon: <IconClock />,
    },
    {
      label: "Completed",
      value: stats?.completedTasks,
      accent: "var(--mint)",
      bg: "var(--mint-soft)",
      icon: <IconCheck />,
    },
  ];

  const completionRate =
    stats?.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;

  return (
    <div className="bg-dark" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "32px 36px" }}>
          <div style={{ marginBottom: 28 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                fontWeight: 600,
                margin: 0,
                color: "var(--text-primary)",
              }}
            >
              Dashboard
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 14.5, margin: "6px 0 0" }}>
              A snapshot of how your team is progressing.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
              marginBottom: 28,
            }}
          >
            {cards.map((c) => (
              <div
                key={c.label}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-soft)",
                  borderRadius: "var(--radius-lg)",
                  padding: "22px 22px",
                  boxShadow: "var(--shadow-card)",
                  animation: "fadeUp 0.4s ease",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: c.bg,
                    color: c.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  {c.icon}
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 6px" }}>{c.label}</p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 34,
                    fontWeight: 600,
                    margin: 0,
                    color: "var(--text-primary)",
                  }}
                >
                  {c.value ?? "—"}
                </p>
              </div>
            ))}
          </div>

          {/* Progress overview */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-soft)",
              borderRadius: "var(--radius-lg)",
              padding: "24px 26px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
              <h3 style={{ fontSize: 15.5, fontWeight: 600, margin: 0, color: "var(--text-primary)" }}>
                Completion rate
              </h3>
              <span style={{ fontSize: 13.5, color: "var(--text-secondary)" }}>
                {stats ? `${completionRate}% complete` : "Loading…"}
              </span>
            </div>
            <div
              style={{
                height: 10,
                borderRadius: 99,
                background: "var(--bg-input)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${completionRate}%`,
                  borderRadius: 99,
                  background: "linear-gradient(90deg, var(--accent), var(--mint))",
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconLayers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import { useEffect, useState } from "react";
// import API from "../services/api";

// export default function Dashboard() {

//     const [stats, setStats] = useState(null);

//     useEffect(() => {
//         const fetchStats = async () => {
//             const res = await API.get("/team/stats");
//             setStats(res.data.stats);
//         };

//         fetchStats();
//     }, []);
//     return (

//         <div className="flex">

//             <Sidebar />

//             <div className="flex-1">

//                 <Navbar />

//                 <div className="p-6">

//                     <h1 className="text-3xl font-bold mb-6">
//                         📊 Dashboard
//                     </h1>

//                     <div className="grid grid-cols-3 gap-4">

//                         <div className="bg-card p-5 rounded-xl">
//                             Total Tasks: {stats?.totalTasks}
//                         </div>

//                         <div className="bg-card p-5 rounded-xl">
//                             Pending: {stats?.pendingTasks}
//                         </div>

//                         <div className="bg-card p-5 rounded-xl">
//                             Completed: {stats?.completedTasks}
//                         </div>

//                     </div>

//                 </div>

//             </div>

//         </div>
//     );
// }