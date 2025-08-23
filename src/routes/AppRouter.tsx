import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import NotFound from "../pages/NotFound";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import CreateProject from "../pages/CreateProject";
import Project from "../pages/Project";
import Task from "../pages/Task";
import AuthRoute from "./AuthRoute";
import CreateMilestone from "../pages/CreateMilestone";
import Milestone from "../pages/Milestone";
import CreateTask from "../pages/CreateTask";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<AuthRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-project" element={<CreateProject />} />

        <Route path="/project/:projectId">
          <Route index element={<Project />} />
          <Route path="create-milestone" element={<CreateMilestone />} />
        </Route>

        <Route path="/milestone/:id">
          <Route index element={<Milestone />} />
          <Route path="create-task" element={<CreateTask />} />
        </Route>

        <Route path="/task/:id" element={<Task />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
