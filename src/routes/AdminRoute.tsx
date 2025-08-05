import { Outlet } from "react-router-dom";

// ! TO DO LATER
export default function AdminRoute() {
  //    const { isAuthenticated, role } = useAuth();

  //   if (!isAuthenticated) return <Navigate to="/landing" replace />;
  //   if (role !== "admin") return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
