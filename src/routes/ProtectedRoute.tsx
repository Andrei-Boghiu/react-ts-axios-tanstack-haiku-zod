import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function ProtectedRoute() {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}
