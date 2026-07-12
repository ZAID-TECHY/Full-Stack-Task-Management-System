// Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-dark"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%)",
          top: "-120px",
          left: "-120px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,91,0.14), transparent 70%)",
          bottom: "-100px",
          right: "-100px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: 420,
          background: "var(--bg-card)",
          border: "1px solid var(--border-soft)",
          borderRadius: "var(--radius-lg)",
          padding: "40px 36px",
          boxShadow: "var(--shadow-card)",
          position: "relative",
          zIndex: 1,
          animation: "fadeUp 0.5s ease",
        }}
      >
        {/* Logo mark */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "linear-gradient(135deg, var(--accent-light), var(--accent-dark))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 12L10 18L20 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 600,
            textAlign: "center",
            margin: "0 0 6px",
            color: "var(--text-primary)",
          }}
        >
          Welcome back
        </h2>
        <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: 14, margin: "0 0 32px" }}>
          Sign in to keep your team moving.
        </p>

        <Field
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={setEmail}
          focused={focused === "email"}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused("")}
        />

        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          focused={focused === "password"}
          onFocus={() => setFocused("password")}
          onBlur={() => setFocused("")}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 12,
            border: "none",
            background: loading
              ? "var(--accent-dark)"
              : "linear-gradient(135deg, var(--accent-light), var(--accent-dark))",
            color: "white",
            fontSize: 14.5,
            fontWeight: 600,
            cursor: loading ? "default" : "pointer",
            marginTop: 8,
            boxShadow: "0 8px 24px -8px var(--accent-glow)",
            transition: "transform 0.15s ease, opacity 0.15s ease",
          }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = "translateY(-1px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--text-muted)", marginTop: 24 }}>
          New to Nimbus?{" "}
          <Link to="/register" style={{ color: "var(--accent-light)", fontWeight: 600, textDecoration: "none" }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, type, placeholder, value, onChange, focused, onFocus, onBlur }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          fontSize: 12.5,
          fontWeight: 600,
          color: "var(--text-secondary)",
          marginBottom: 7,
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 10,
          border: `1px solid ${focused ? "var(--border-strong)" : "var(--border-soft)"}`,
          background: "var(--bg-input)",
          color: "var(--text-primary)",
          fontSize: 14,
          outline: "none",
          boxShadow: focused ? "0 0 0 3px rgba(139,92,246,0.15)" : "none",
          transition: "all 0.15s ease",
        }}
      />
    </div>
  );
}

// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", {
//         email,
//         password,
//       });

//       login(res.data);
//       navigate("/dashboard");

//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-dark">
//       <div className="w-[400px] p-8 rounded-2xl bg-card shadow-2xl border border-gray-700">

//         <h2 className="text-2xl font-bold mb-6 text-center">
//           🔐 Login
//         </h2>

//         <input
//           className="w-full p-3 mb-4 rounded bg-gray-800 outline-none"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="w-full p-3 mb-4 rounded bg-gray-800 outline-none"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full bg-primary p-3 rounded hover:opacity-80 transition"
//         >
//           Login
//         </button>

//         <p className="text-sm text-gray-400 mt-4 text-center">
//           Create account and manage tasks like Jira 🚀
//         </p>

//       </div>
//     </div>
//   );
// }