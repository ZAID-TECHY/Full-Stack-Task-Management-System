import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import Team from "./pages/Team";

function Protected({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/team"
        element={
          <Protected>
            <Team />
          </Protected>
        }
      />

      <Route
        path="/create-task"
        element={
          <Protected>
            <CreateTask />
          </Protected>
        }
      />
      <Route
        path="/tasks/edit/:id"
        element={
          <Protected>
            <EditTask />
          </Protected>
        }
      />

      <Route
        path="/tasks"
        element={
          <Protected>
            <Tasks />
          </Protected>
        }
      />
    </Routes>
  );
}