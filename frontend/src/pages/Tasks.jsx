// Tasks.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PriorityBadge, StatusBadge, AssigneeChip, PRIORITY_SPINE } from "../components/Badge";

export default function Tasks() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => (filterStatus === "All" ? true : task.status === filterStatus))
    .filter((task) => (filterPriority === "All" ? true : task.priority === filterPriority));

  return (
    <div className="bg-dark" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "32px 36px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 30,
                fontWeight: 600,
                margin: 0,
                color: "var(--text-primary)",
              }}
            >
              Tasks
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 14.5, margin: "6px 0 0" }}>
              {filteredTasks.length} of {tasks.length} tasks shown
            </p>
          </div>

          {/* Search + filter bar */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 24,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", flex: "1 1 280px", minWidth: 220 }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                placeholder="Search tasks…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px 11px 38px",
                  borderRadius: 10,
                  border: "1px solid var(--border-soft)",
                  background: "var(--bg-input)",
                  color: "var(--text-primary)",
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>

            <Select value={filterStatus} onChange={setFilterStatus} options={["All", "Pending", "In Progress", "Completed"]} />
            <Select value={filterPriority} onChange={setFilterPriority} options={["All", "Low", "Medium", "High"]} />
          </div>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 170,
                    borderRadius: "var(--radius-lg)",
                    background: "linear-gradient(90deg, var(--bg-card) 25%, var(--bg-card-hover) 50%, var(--bg-card) 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.4s ease infinite",
                    border: "1px solid var(--border-soft)",
                  }}
                />
              ))}
            </div>
          ) : filteredTasks.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "var(--text-secondary)",
                border: "1px dashed var(--border-medium)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              No tasks match your filters.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-soft)",
                    borderLeft: `4px solid ${PRIORITY_SPINE[task.priority] || "var(--accent)"}`,
                    borderRadius: "var(--radius-lg)",
                    padding: "20px 20px 18px",
                    boxShadow: "var(--shadow-card)",
                    transition: "transform 0.15s ease, border-color 0.15s ease",
                    animation: "fadeUp 0.4s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <h2
                    style={{
                      fontSize: 16.5,
                      fontWeight: 600,
                      margin: "0 0 8px",
                      color: "var(--text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {task.title}
                  </h2>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: 13.5,
                      margin: "0 0 16px",
                      lineHeight: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {task.description}
                  </p>

                  <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                    <StatusBadge value={task.status} />
                    <PriorityBadge value={task.priority} />
                  </div>

                  <div
                    style={{
                      paddingTop: 12,
                      marginBottom: 16,
                      borderTop: "1px solid var(--border-soft)",
                    }}
                  >
                    <AssigneeChip user={task.assignedTo} />
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => navigate(`/tasks/edit/${task._id}`)}
                      style={{
                        flex: 1,
                        padding: "9px",
                        borderRadius: 9,
                        border: "1px solid var(--border-medium)",
                        background: "rgba(139,92,246,0.1)",
                        color: "var(--accent-light)",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    {user?.role === "admin" && (
                      <button
                        onClick={() => deleteTask(task._id)}
                        style={{
                          flex: 1,
                          padding: "9px",
                          borderRadius: 9,
                          border: "1px solid rgba(255,107,91,0.35)",
                          background: "var(--coral-soft)",
                          color: "var(--coral)",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "11px 14px",
        borderRadius: 10,
        border: "1px solid var(--border-soft)",
        background: "var(--bg-input)",
        color: "var(--text-primary)",
        fontSize: 13.5,
        fontWeight: 500,
        outline: "none",
        cursor: "pointer",
      }}
    >
      {options.map((o) => (
        <option key={o} value={o} style={{ background: "var(--bg-card)" }}>
          {o}
        </option>
      ))}
    </select>
  );
}


// // Tasks.jsx
// import { useEffect, useState } from "react";
// import API from "../services/api";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { PriorityBadge, StatusBadge, PRIORITY_SPINE } from "../components/Badge";

// export default function Tasks() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [filterPriority, setFilterPriority] = useState("All");

//   const navigate = useNavigate();

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/tasks");
//       setTasks(res.data.tasks);
//     } catch (err) {
//       toast.error("Failed to load tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await API.delete(`/tasks/${id}`);
//       toast.success("Task deleted");
//       fetchTasks();
//     } catch (err) {
//       toast.error(err.response?.data?.message);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const filteredTasks = tasks
//     .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
//     .filter((task) => (filterStatus === "All" ? true : task.status === filterStatus))
//     .filter((task) => (filterPriority === "All" ? true : task.priority === filterPriority));

//   return (
//     <div className="bg-dark" style={{ display: "flex", minHeight: "100vh" }}>
//       <Sidebar />

//       <div style={{ flex: 1 }}>
//         <Navbar />

//         <div style={{ padding: "32px 36px" }}>
//           <div style={{ marginBottom: 24 }}>
//             <h1
//               style={{
//                 fontFamily: "var(--font-display)",
//                 fontSize: 30,
//                 fontWeight: 600,
//                 margin: 0,
//                 color: "var(--text-primary)",
//               }}
//             >
//               Tasks
//             </h1>
//             <p style={{ color: "var(--text-secondary)", fontSize: 14.5, margin: "6px 0 0" }}>
//               {filteredTasks.length} of {tasks.length} tasks shown
//             </p>
//           </div>

//           {/* Search + filter bar */}
//           <div
//             style={{
//               display: "flex",
//               gap: 12,
//               marginBottom: 24,
//               flexWrap: "wrap",
//               alignItems: "center",
//             }}
//           >
//             <div style={{ position: "relative", flex: "1 1 280px", minWidth: 220 }}>
//               <svg
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
//               >
//                 <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
//                 <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
//               </svg>
//               <input
//                 placeholder="Search tasks…"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 style={{
//                   width: "100%",
//                   padding: "11px 14px 11px 38px",
//                   borderRadius: 10,
//                   border: "1px solid var(--border-soft)",
//                   background: "var(--bg-input)",
//                   color: "var(--text-primary)",
//                   fontSize: 14,
//                   outline: "none",
//                 }}
//               />
//             </div>

//             <Select value={filterStatus} onChange={setFilterStatus} options={["All", "Pending", "In Progress", "Completed"]} />
//             <Select value={filterPriority} onChange={setFilterPriority} options={["All", "Low", "Medium", "High"]} />
//           </div>

//           {loading ? (
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     height: 170,
//                     borderRadius: "var(--radius-lg)",
//                     background: "linear-gradient(90deg, var(--bg-card) 25%, var(--bg-card-hover) 50%, var(--bg-card) 75%)",
//                     backgroundSize: "200% 100%",
//                     animation: "shimmer 1.4s ease infinite",
//                     border: "1px solid var(--border-soft)",
//                   }}
//                 />
//               ))}
//             </div>
//           ) : filteredTasks.length === 0 ? (
//             <div
//               style={{
//                 textAlign: "center",
//                 padding: "60px 20px",
//                 color: "var(--text-secondary)",
//                 border: "1px dashed var(--border-medium)",
//                 borderRadius: "var(--radius-lg)",
//               }}
//             >
//               No tasks match your filters.
//             </div>
//           ) : (
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
//               {filteredTasks.map((task) => (
//                 <div
//                   key={task._id}
//                   style={{
//                     background: "var(--bg-card)",
//                     border: "1px solid var(--border-soft)",
//                     borderLeft: `4px solid ${PRIORITY_SPINE[task.priority] || "var(--accent)"}`,
//                     borderRadius: "var(--radius-lg)",
//                     padding: "20px 20px 18px",
//                     boxShadow: "var(--shadow-card)",
//                     transition: "transform 0.15s ease, border-color 0.15s ease",
//                     animation: "fadeUp 0.4s ease",
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
//                   onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
//                 >
//                   <h2
//                     style={{
//                       fontSize: 16.5,
//                       fontWeight: 600,
//                       margin: "0 0 8px",
//                       color: "var(--text-primary)",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     {task.title}
//                   </h2>

//                   <p
//                     style={{
//                       color: "var(--text-secondary)",
//                       fontSize: 13.5,
//                       margin: "0 0 16px",
//                       lineHeight: 1.5,
//                       display: "-webkit-box",
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: "vertical",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {task.description}
//                   </p>

//                   <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
//                     <StatusBadge value={task.status} />
//                     <PriorityBadge value={task.priority} />
//                   </div>

//                   <div style={{ display: "flex", gap: 8 }}>
//                     <button
//                       onClick={() => navigate(`/tasks/edit/${task._id}`)}
//                       style={{
//                         flex: 1,
//                         padding: "9px",
//                         borderRadius: 9,
//                         border: "1px solid var(--border-medium)",
//                         background: "rgba(139,92,246,0.1)",
//                         color: "var(--accent-light)",
//                         fontSize: 13,
//                         fontWeight: 600,
//                         cursor: "pointer",
//                       }}
//                     >
//                       Edit
//                     </button>

//                     {user?.role === "admin" && (
//                       <button
//                         onClick={() => deleteTask(task._id)}
//                         style={{
//                           flex: 1,
//                           padding: "9px",
//                           borderRadius: 9,
//                           border: "1px solid rgba(255,107,91,0.35)",
//                           background: "var(--coral-soft)",
//                           color: "var(--coral)",
//                           fontSize: 13,
//                           fontWeight: 600,
//                           cursor: "pointer",
//                         }}
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Select({ value, onChange, options }) {
//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       style={{
//         padding: "11px 14px",
//         borderRadius: 10,
//         border: "1px solid var(--border-soft)",
//         background: "var(--bg-input)",
//         color: "var(--text-primary)",
//         fontSize: 13.5,
//         fontWeight: 500,
//         outline: "none",
//         cursor: "pointer",
//       }}
//     >
//       {options.map((o) => (
//         <option key={o} value={o} style={{ background: "var(--bg-card)" }}>
//           {o}
//         </option>
//       ))}
//     </select>
//   );
// }

// import { useEffect, useState } from "react";
// import API from "../services/api";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Tasks() {

//     const user = JSON.parse(localStorage.getItem("user"));

//     const [tasks, setTasks] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const [search, setSearch] = useState("");
//     const [filterStatus, setFilterStatus] = useState("All");
//     const [filterPriority, setFilterPriority] = useState("All");

//     const navigate = useNavigate();

//     const fetchTasks = async () => {
//         try {
//             setLoading(true);
//             const res = await API.get("/tasks");
//             setTasks(res.data.tasks);
//         } catch (err) {
//             toast.error("Failed to load tasks");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const deleteTask = async (id) => {
//         try {
//             await API.delete(`/tasks/${id}`);
//             toast.success("Task deleted");
//             fetchTasks();
//         } catch (err) {
//             toast.error(err.response?.data?.message);
//         }
//     };

//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     // FILTER LOGIC
//     const filteredTasks = tasks
//         .filter(task =>
//             task.title.toLowerCase().includes(search.toLowerCase())
//         )
//         .filter(task =>
//             filterStatus === "All" ? true : task.status === filterStatus
//         )
//         .filter(task =>
//             filterPriority === "All" ? true : task.priority === filterPriority
//         );

//     return (
//         <div className="flex">

//             <Sidebar />

//             <div className="flex-1">

//                 <Navbar />

//                 <div className="p-6">

//                     <h1 className="text-3xl font-bold mb-6">
//                         📌 Tasks
//                     </h1>

//                     {/* SEARCH + FILTER BAR */}
//                     <div className="flex gap-3 mb-6">

//                         <input
//                             placeholder="Search tasks..."
//                             className="p-2 bg-gray-800 rounded w-1/3"
//                             onChange={(e) => setSearch(e.target.value)}
//                         />

//                         <select
//                             className="p-2 bg-gray-800 rounded"
//                             onChange={(e) => setFilterStatus(e.target.value)}
//                         >
//                             <option>All</option>
//                             <option>Pending</option>
//                             <option>In Progress</option>
//                             <option>Completed</option>
//                         </select>

//                         <select
//                             className="p-2 bg-gray-800 rounded"
//                             onChange={(e) => setFilterPriority(e.target.value)}
//                         >
//                             <option>All</option>
//                             <option>Low</option>
//                             <option>Medium</option>
//                             <option>High</option>
//                         </select>

//                     </div>

//                     {/* LOADING STATE */}
//                     {loading ? (
//                         <p className="text-gray-400">Loading tasks...</p>
//                     ) : (

//                         <div className="grid grid-cols-3 gap-4">

//                             {filteredTasks.map((task) => (
//                                 <div
//                                     key={task._id}
//                                     className="bg-card p-5 rounded-xl border border-gray-700 hover:scale-105 transition"
//                                 >

//                                     <h2 className="text-xl font-bold mb-2">
//                                         {task.title}
//                                     </h2>

//                                     <p className="text-gray-400 text-sm mb-3">
//                                         {task.description}
//                                     </p>

//                                     <div className="flex justify-between text-sm mb-3">
//                                         <span>{task.status}</span>
//                                         <span>{task.priority}</span>
//                                     </div>

//                                     <div className="flex gap-2">

//                                         <button
//                                             onClick={() => navigate(`/tasks/edit/${task._id}`)}
//                                             className="bg-blue-500 px-3 py-1 rounded"
//                                         >
//                                             Edit
//                                         </button>

//                                         {user?.role === "admin" && (
//                                             <button
//                                                 onClick={() => deleteTask(task._id)}
//                                                 className="bg-red-500 px-3 py-1 rounded"
//                                             >
//                                                 Delete
//                                             </button>
//                                         )}

//                                     </div>

//                                 </div>
//                             ))}

//                         </div>
//                     )}

//                 </div>

//             </div>

//         </div>
//     );
// }