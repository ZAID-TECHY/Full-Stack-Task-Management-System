// Register.jsx
import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("member");
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState("");

    const handleRegister = async () => {
        setLoading(true);
        try {
            await API.post("/auth/register", {
                name,
                email,
                password,
                role,
            });
            alert("Account created!");
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
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
            <div
                style={{
                    position: "absolute",
                    width: 480,
                    height: 480,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(52,211,153,0.16), transparent 70%)",
                    top: "-100px",
                    right: "-100px",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    width: 420,
                    height: 420,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(139,92,246,0.22), transparent 70%)",
                    bottom: "-100px",
                    left: "-100px",
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
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            background: "linear-gradient(135deg, var(--mint), var(--accent-dark))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 0 1px var(--border-soft), 0 12px 40px -16px rgba(52,211,153,0.4)",
                        }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="8" r="3.4" stroke="white" strokeWidth="2" />
                            <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
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
                    Create your account
                </h2>
                <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: 14, margin: "0 0 32px" }}>
                    Organize work, your way, in minutes.
                </p>

                <Field
                    label="Full name"
                    type="text"
                    placeholder="Jordan Smith"
                    value={name}
                    onChange={setName}
                    focused={focused === "name"}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                />
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
                <div style={{ marginBottom: 18 }}>
                    <label
                        style={{
                            display: "block",
                            fontSize: "12.5px",
                            fontWeight: 600,
                            color: "var(--text-secondary)",
                            marginBottom: 7,
                        }}
                    >
                        Role
                    </label>

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: 10,
                            border: "1px solid var(--border-soft)",
                            background: "var(--bg-input)",
                            color: "var(--text-primary)",
                            fontSize: 14,
                            outline: "none",
                            boxSizing: "border-box",
                        }}
                    >
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button
                    onClick={handleRegister}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "13px",
                        borderRadius: 12,
                        border: "none",
                        background: loading
                            ? "var(--accent-dark)"
                            : "linear-gradient(135deg, var(--mint), var(--accent-dark))",
                        color: "white",
                        fontSize: 14.5,
                        fontWeight: 600,
                        cursor: loading ? "default" : "pointer",
                        marginTop: 8,
                        boxShadow: "0 8px 24px -8px rgba(52,211,153,0.35)",
                        transition: "transform 0.15s ease",
                    }}
                    onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = "translateY(-1px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                    {loading ? "Creating account…" : "Create account"}
                </button>

                <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--text-muted)", marginTop: 24 }}>
                    Already have an account?{" "}
                    <Link to="/" style={{ color: "var(--accent-light)", fontWeight: 600, textDecoration: "none" }}>
                        Sign in
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

// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async () => {
//     try {
//       await API.post("/auth/register", {
//         name,
//         email,
//         password,
//       });

//       alert("Account created!");
//       navigate("/");
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-dark">
//       <div className="w-[400px] p-8 rounded-2xl bg-card shadow-2xl border border-gray-700">

//         <h2 className="text-2xl font-bold mb-6 text-center">
//           📝 Register
//         </h2>

//         <input
//           className="w-full p-3 mb-4 rounded bg-gray-800"
//           placeholder="Name"
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           className="w-full p-3 mb-4 rounded bg-gray-800"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="w-full p-3 mb-4 rounded bg-gray-800"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleRegister}
//           className="w-full bg-primary p-3 rounded hover:opacity-80 transition"
//         >
//           Create Account
//         </button>

//       </div>
//     </div>
//   );
// }