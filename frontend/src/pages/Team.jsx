import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function Team() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/team/users");
        console.log(res.data);
        setUsers(res.data.users || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: 30 }}>

          <h1 style={{ color: "white", marginBottom: 25 }}>
            👥 Team Members
          </h1>

          {loading ? (
            <h2 style={{ color: "white" }}>Loading...</h2>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: 20,
              }}
            >
              {users.map((user) => (
                <div
                  key={user._id}
                  style={{
                    background: "#1f2937",
                    borderRadius: 15,
                    padding: 20,
                    color: "white",
                  }}
                >
                  <h2>{user.name}</h2>

                  <p>{user.email}</p>

                  <p
                    style={{
                      color:
                        user.role === "admin"
                          ? "#8b5cf6"
                          : "#3b82f6",
                    }}
                  >
                    {user.role}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import API from "../services/api";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import toast from "react-hot-toast";

// export default function Team() {

//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchUsers = async () => {

//         try {

//             const res = await API.get("/team/users");

//             console.log(res.data);

//             setUsers(res.data.users);

//         } catch (err) {

//             console.log(err);
//             console.log(err.response);

//             toast.error(err.response?.data?.message || "Failed to load users");

//         } finally {

//             setLoading(false);

//         }

//     };

//     useEffect(() => {

//         fetchUsers();

//     }, []);

//     return (

//         <div className="flex">

//             <Sidebar />

//             <div className="flex-1">

//                 <Navbar />

//                 <div className="p-6">

//                     <h1 className="text-3xl font-bold mb-6">
//                         👥 Team Members
//                     </h1>

//                     {loading ? (

//                         <h2>Loading...</h2>

//                     ) : (

//                         <div>

//                             <h2>Total Users: {users.length}</h2>

//                             {users.map((user) => (

//                                 <div key={user._id}>

//                                     <h1>{user.name}</h1>
//                                     <p>{user.email}</p>
//                                     <p>{user.role}</p>

//                                     <hr />

//                                 </div>

//                             ))}

//                         </div>

//                     )}

//                 </div>

//             </div>

//         </div>

//     );

// }

// import { useEffect, useState } from "react";
// import API from "../services/api";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// export default function Team() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const res = await API.get("/team/users");
//       setUsers(res.data.users);
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <div className="flex">

//       <Sidebar />

//       <div className="flex-1">

//         <Navbar />

//         <div className="p-6">

//           <h1 className="text-3xl font-bold mb-6">👥 Team</h1>

//           <div className="grid grid-cols-3 gap-4">

//             {users.map((user) => (
//               <div
//                 key={user._id}
//                 className="bg-card p-5 rounded-xl border border-gray-700"
//               >

//                 <h2 className="text-xl font-bold">
//                   {user.name}
//                 </h2>

//                 <p className="text-gray-400 text-sm">
//                   {user.email}
//                 </p>

//                 <p className="text-primary mt-2">
//                   {user.role}
//                 </p>

//               </div>
//             ))}

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }