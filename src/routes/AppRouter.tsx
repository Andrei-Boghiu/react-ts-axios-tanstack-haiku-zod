import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import NotFound from "../pages/NotFound";
import Landing from "../pages/Landing";
import Welcome from "../pages/Welcome";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/welcome" element={<Welcome />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
