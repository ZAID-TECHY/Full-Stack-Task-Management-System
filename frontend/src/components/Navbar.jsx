// Navbar.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const initials = (user?.name || "?")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        background: "rgba(23, 20, 48, 0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-soft)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>Welcome back</p>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: 19,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {user?.name || "Guest"}
        </h2>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-light), var(--accent-dark))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "white",
          }}
        >
          {initials}
        </div>

        <button
          onClick={logout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 16px",
            borderRadius: 10,
            border: "1px solid var(--border-medium)",
            background: "transparent",
            color: "var(--text-secondary)",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,107,91,0.12)";
            e.currentTarget.style.color = "var(--coral)";
            e.currentTarget.style.borderColor = "rgba(255,107,91,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.borderColor = "var(--border-medium)";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}


// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <div className="h-16 bg-card flex items-center justify-between px-6 border-b border-gray-700">

//       <h2 className="font-semibold">
//         Welcome, {user?.name}
//       </h2>

//       <button
//         onClick={logout}
//         className="bg-red-500 px-4 py-2 rounded hover:opacity-80"
//       >
//         Logout
//       </button>

//     </div>
//   );
// }