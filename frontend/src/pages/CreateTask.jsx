
// CreateTask.jsx
import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function CreateTask() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    assignedTo: "",
  });
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/team/users");
      setUsers(res.data.users);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const createTask = async () => {
    setSaving(true);
    try {
      await API.post("/tasks", task);
      toast.success("Task created successfully!");
      navigate("/tasks");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-dark" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "32px 36px" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 30,
              fontWeight: 600,
              margin: "0 0 6px",
              color: "var(--text-primary)",
            }}
          >
            Create task
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14.5, margin: "0 0 28px" }}>
            Add a new task and assign it to a teammate.
          </p>

          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-soft)",
              borderRadius: "var(--radius-lg)",
              padding: 28,
              maxWidth: 560,
              boxShadow: "var(--shadow-card)",
            }}
          >
            <FieldLabel>Title</FieldLabel>
            <input
              name="title"
              placeholder="e.g. Redesign onboarding flow"
              value={task.title}
              onChange={handleChange}
              style={inputStyle}
            />

            <FieldLabel>Description</FieldLabel>
            <textarea
              name="description"
              placeholder="Add some context for your team…"
              value={task.description}
              onChange={handleChange}
              rows={4}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--font-body)" }}
            />

            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <FieldLabel>Priority</FieldLabel>
                <select name="priority" value={task.priority} onChange={handleChange} style={inputStyle}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel>Status</FieldLabel>
                <select name="status" value={task.status} onChange={handleChange} style={inputStyle}>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            <FieldLabel>Assign to</FieldLabel>
            <select
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleChange}
              style={{ ...inputStyle, marginBottom: 22 }}
            >
              <option value="">Unassigned</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>

            <button
              onClick={createTask}
              disabled={saving || !task.title}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: 11,
                border: "none",
                background:
                  saving || !task.title
                    ? "var(--bg-input)"
                    : "linear-gradient(135deg, var(--accent-light), var(--accent-dark))",
                color: saving || !task.title ? "var(--text-muted)" : "white",
                fontSize: 14.5,
                fontWeight: 600,
                cursor: saving || !task.title ? "not-allowed" : "pointer",
                boxShadow: !task.title || saving ? "none" : "0 8px 24px -8px var(--accent-glow)",
                transition: "all 0.15s ease",
              }}
            >
              {saving ? "Creating…" : "Create task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 7 }}>
      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: 10,
  border: "1px solid var(--border-soft)",
  background: "var(--bg-input)",
  color: "var(--text-primary)",
  fontSize: 14,
  outline: "none",
  marginBottom: 18,
  boxSizing: "border-box",
};

// // CreateTask.jsx
// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import toast from "react-hot-toast";

// export default function CreateTask() {
//   const navigate = useNavigate();

//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     priority: "Medium",
//     status: "Pending",
//   });
//   const [saving, setSaving] = useState(false);

//   const handleChange = (e) => {
//     setTask({ ...task, [e.target.name]: e.target.value });
//   };

//   const createTask = async () => {
//     setSaving(true);
//     try {
//       await API.post("/tasks", task);
//       toast.success("Task created successfully");
//       navigate("/tasks");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to create task");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="bg-dark" style={{ display: "flex", minHeight: "100vh" }}>
//       <Sidebar />

//       <div style={{ flex: 1 }}>
//         <Navbar />

//         <div style={{ padding: "32px 36px" }}>
//           <h1
//             style={{
//               fontFamily: "var(--font-display)",
//               fontSize: 30,
//               fontWeight: 600,
//               margin: "0 0 6px",
//               color: "var(--text-primary)",
//             }}
//           >
//             Create task
//           </h1>
//           <p style={{ color: "var(--text-secondary)", fontSize: 14.5, margin: "0 0 28px" }}>
//             Add a new task and assign its priority.
//           </p>

//           <div
//             style={{
//               background: "var(--bg-card)",
//               border: "1px solid var(--border-soft)",
//               borderRadius: "var(--radius-lg)",
//               padding: 28,
//               maxWidth: 560,
//               boxShadow: "var(--shadow-card)",
//             }}
//           >
//             <FieldLabel>Title</FieldLabel>
//             <input
//               name="title"
//               placeholder="e.g. Redesign onboarding flow"
//               value={task.title}
//               onChange={handleChange}
//               style={inputStyle}
//             />

//             <FieldLabel>Description</FieldLabel>
//             <textarea
//               name="description"
//               placeholder="Add some context for your team…"
//               value={task.description}
//               onChange={handleChange}
//               rows={4}
//               style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--font-body)" }}
//             />

//             <div style={{ display: "flex", gap: 16 }}>
//               <div style={{ flex: 1 }}>
//                 <FieldLabel>Priority</FieldLabel>
//                 <select name="priority" value={task.priority} onChange={handleChange} style={inputStyle}>
//                   <option>Low</option>
//                   <option>Medium</option>
//                   <option>High</option>
//                 </select>
//               </div>
//               <div style={{ flex: 1 }}>
//                 <FieldLabel>Status</FieldLabel>
//                 <select name="status" value={task.status} onChange={handleChange} style={inputStyle}>
//                   <option>Pending</option>
//                   <option>In Progress</option>
//                   <option>Completed</option>
//                 </select>
//               </div>
//             </div>

//             <button
//               onClick={createTask}
//               disabled={saving || !task.title}
//               style={{
//                 width: "100%",
//                 padding: "13px",
//                 borderRadius: 11,
//                 border: "none",
//                 marginTop: 12,
//                 background:
//                   saving || !task.title
//                     ? "var(--bg-input)"
//                     : "linear-gradient(135deg, var(--accent-light), var(--accent-dark))",
//                 color: saving || !task.title ? "var(--text-muted)" : "white",
//                 fontSize: 14.5,
//                 fontWeight: 600,
//                 cursor: saving || !task.title ? "not-allowed" : "pointer",
//                 boxShadow: !task.title || saving ? "none" : "0 8px 24px -8px var(--accent-glow)",
//                 transition: "all 0.15s ease",
//               }}
//             >
//               {saving ? "Creating…" : "Create task"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function FieldLabel({ children }) {
//   return (
//     <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 7 }}>
//       {children}
//     </label>
//   );
// }

// const inputStyle = {
//   width: "100%",
//   padding: "11px 14px",
//   borderRadius: 10,
//   border: "1px solid var(--border-soft)",
//   background: "var(--bg-input)",
//   color: "var(--text-primary)",
//   fontSize: 14,
//   outline: "none",
//   marginBottom: 18,
//   boxSizing: "border-box",
// };

// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// export default function CreateTask() {
//   const navigate = useNavigate();

//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     priority: "Medium",
//     status: "Pending",
//   });

//   const handleChange = (e) => {
//     setTask({ ...task, [e.target.name]: e.target.value });
//   };

//   const createTask = async () => {
//     try {
//       await API.post("/tasks", task);
//       alert("Task created successfully!");
//       navigate("/tasks");
//     } catch (err) {
//       alert(err.response?.data?.message);
//     }
//   };

//   return (
//     <div className="flex">

//       <Sidebar />

//       <div className="flex-1">

//         <Navbar />

//         <div className="p-6">

//           <h1 className="text-3xl font-bold mb-6">
//             ➕ Create Task
//           </h1>

//           <div className="bg-card p-6 rounded-xl w-[500px]">

//             <input
//               name="title"
//               placeholder="Title"
//               onChange={handleChange}
//               className="w-full p-3 mb-3 bg-gray-800 rounded"
//             />

//             <textarea
//               name="description"
//               placeholder="Description"
//               onChange={handleChange}
//               className="w-full p-3 mb-3 bg-gray-800 rounded"
//             />

//             <select
//               name="priority"
//               onChange={handleChange}
//               className="w-full p-3 mb-3 bg-gray-800 rounded"
//             >
//               <option>Low</option>
//               <option>Medium</option>
//               <option>High</option>
//             </select>

//             <button
//               onClick={createTask}
//               className="w-full bg-primary p-3 rounded hover:opacity-80"
//             >
//               Create Task
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }