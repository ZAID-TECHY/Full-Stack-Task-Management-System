// EditTask.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    assignedTo: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchTask = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTask({
        title: res.data.task.title || "",
        description: res.data.task.description || "",
        status: res.data.task.status || "Pending",
        priority: res.data.task.priority || "Medium",
        assignedTo: res.data.task.assignedTo?._id || "",
      });
    } catch (err) {
      toast.error("Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/team/users");
      setUsers(res.data.users);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchTask();
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const updateTask = async () => {
    setSaving(true);
    try {
      await API.put(`/tasks/${id}`, task);
      toast.success("Task updated successfully");
      navigate("/tasks");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
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
            Edit task
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14.5, margin: "0 0 28px" }}>
            Update the details and keep your team in sync.
          </p>

          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-soft)",
              borderRadius: "var(--radius-lg)",
              padding: 28,
              maxWidth: 560,
              boxShadow: "var(--shadow-card)",
              opacity: loading ? 0.5 : 1,
              transition: "opacity 0.2s ease",
            }}
          >
            <FieldLabel>Title</FieldLabel>
            <input
              name="title"
              placeholder="Task title"
              value={task.title}
              onChange={handleChange}
              style={inputStyle}
            />

            <FieldLabel>Description</FieldLabel>
            <textarea
              name="description"
              placeholder="Task description"
              value={task.description}
              onChange={handleChange}
              rows={4}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--font-body)" }}
            />

            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <FieldLabel>Status</FieldLabel>
                <select name="status" value={task.status} onChange={handleChange} style={inputStyle}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <FieldLabel>Priority</FieldLabel>
                <select name="priority" value={task.priority} onChange={handleChange} style={inputStyle}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
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

            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <button
                onClick={() => navigate("/tasks")}
                style={{
                  flex: 1,
                  padding: "13px",
                  borderRadius: 11,
                  border: "1px solid var(--border-medium)",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  fontSize: 14.5,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={updateTask}
                disabled={saving}
                style={{
                  flex: 2,
                  padding: "13px",
                  borderRadius: 11,
                  border: "none",
                  background: saving
                    ? "var(--bg-input)"
                    : "linear-gradient(135deg, var(--accent-light), var(--accent-dark))",
                  color: saving ? "var(--text-muted)" : "white",
                  fontSize: 14.5,
                  fontWeight: 600,
                  cursor: saving ? "default" : "pointer",
                  boxShadow: saving ? "none" : "0 8px 24px -8px var(--accent-glow)",
                }}
              >
                {saving ? "Saving…" : "Update task"}
              </button>
            </div>
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



// // EditTask.jsx
// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { useParams, useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import toast from "react-hot-toast";

// export default function EditTask() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     priority: "Medium",
//     status: "Pending",
//   });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const res = await API.get(`/tasks/${id}`);
//         setTask(res.data.task);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTask();
//   }, [id]);

//   const handleChange = (e) => {
//     setTask({ ...task, [e.target.name]: e.target.value });
//   };

//   const updateTask = async () => {
//     setSaving(true);
//     try {
//       await API.put(`/tasks/${id}`, task);
//       toast.success("Task updated");
//       navigate("/tasks");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update task");
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
//             Edit task
//           </h1>
//           <p style={{ color: "var(--text-secondary)", fontSize: 14.5, margin: "0 0 28px" }}>
//             Update the details and keep your team in sync.
//           </p>

//           <div
//             style={{
//               background: "var(--bg-card)",
//               border: "1px solid var(--border-soft)",
//               borderRadius: "var(--radius-lg)",
//               padding: 28,
//               maxWidth: 560,
//               boxShadow: "var(--shadow-card)",
//               opacity: loading ? 0.5 : 1,
//               transition: "opacity 0.2s ease",
//             }}
//           >
//             <FieldLabel>Title</FieldLabel>
//             <input name="title" value={task.title} onChange={handleChange} style={inputStyle} />

//             <FieldLabel>Description</FieldLabel>
//             <textarea
//               name="description"
//               value={task.description}
//               onChange={handleChange}
//               rows={4}
//               style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--font-body)" }}
//             />

//             <div style={{ display: "flex", gap: 16 }}>
//               <div style={{ flex: 1 }}>
//                 <FieldLabel>Status</FieldLabel>
//                 <select name="status" value={task.status} onChange={handleChange} style={inputStyle}>
//                   <option>Pending</option>
//                   <option>In Progress</option>
//                   <option>Completed</option>
//                 </select>
//               </div>
//               <div style={{ flex: 1 }}>
//                 <FieldLabel>Priority</FieldLabel>
//                 <select name="priority" value={task.priority} onChange={handleChange} style={inputStyle}>
//                   <option>Low</option>
//                   <option>Medium</option>
//                   <option>High</option>
//                 </select>
//               </div>
//             </div>

//             <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
//               <button
//                 onClick={() => navigate("/tasks")}
//                 style={{
//                   flex: 1,
//                   padding: "13px",
//                   borderRadius: 11,
//                   border: "1px solid var(--border-medium)",
//                   background: "transparent",
//                   color: "var(--text-secondary)",
//                   fontSize: 14.5,
//                   fontWeight: 600,
//                   cursor: "pointer",
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={updateTask}
//                 disabled={saving}
//                 style={{
//                   flex: 2,
//                   padding: "13px",
//                   borderRadius: 11,
//                   border: "none",
//                   background: saving
//                     ? "var(--bg-input)"
//                     : "linear-gradient(135deg, var(--accent-light), var(--accent-dark))",
//                   color: saving ? "var(--text-muted)" : "white",
//                   fontSize: 14.5,
//                   fontWeight: 600,
//                   cursor: saving ? "default" : "pointer",
//                   boxShadow: saving ? "none" : "0 8px 24px -8px var(--accent-glow)",
//                 }}
//               >
//                 {saving ? "Saving…" : "Update task"}
//               </button>
//             </div>
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

// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { useParams, useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// export default function EditTask() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     priority: "Medium",
//     status: "Pending",
//   });

//   useEffect(() => {
//     const fetchTask = async () => {
//       const res = await API.get(`/tasks/${id}`);
//       setTask(res.data.task);
//     };
//     fetchTask();
//   }, [id]);

//   const handleChange = (e) => {
//     setTask({ ...task, [e.target.name]: e.target.value });
//   };

//   const updateTask = async () => {
//     try {
//       await API.put(`/tasks/${id}`, task);
//       alert("Task updated!");
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

//           <h1 className="text-3xl font-bold mb-6">✏️ Edit Task</h1>

//           <div className="bg-card p-6 rounded-xl w-[500px]">

//             <input
//               name="title"
//               value={task.title}
//               onChange={handleChange}
//               className="w-full p-3 mb-3 bg-gray-800 rounded"
//             />

//             <textarea
//               name="description"
//               value={task.description}
//               onChange={handleChange}
//               className="w-full p-3 mb-3 bg-gray-800 rounded"
//             />

//             <select
//               name="status"
//               value={task.status}
//               onChange={handleChange}
//               className="w-full p-3 mb-3 bg-gray-800 rounded"
//             >
//               <option>Pending</option>
//               <option>In Progress</option>
//               <option>Completed</option>
//             </select>

//             <select
//               name="priority"
//               value={task.priority}
//               onChange={handleChange}
//               className="w-full p-3 mb-3 bg-gray-800 rounded"
//             >
//               <option>Low</option>
//               <option>Medium</option>
//               <option>High</option>
//             </select>

//             <button
//               onClick={updateTask}
//               className="w-full bg-primary p-3 rounded"
//             >
//               Update Task
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }