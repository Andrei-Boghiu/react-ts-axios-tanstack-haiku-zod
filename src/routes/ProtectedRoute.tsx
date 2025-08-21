import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
// import { useEffect } from "react";

export default function ProtectedRoute() {
  const { isAuth } = useAuth();

  // useEffect(() => {

  // }, [isAuth])

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}
