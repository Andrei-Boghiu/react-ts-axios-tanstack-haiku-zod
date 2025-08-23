import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const { isAuth, isLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuth) navigate("/login", { replace: true });
  }, [isLoading, isAuth, navigate]);

  if (isLoading) return <div>Authenticating...</div>;

  if (!isAuth) return null; // nothing to render while redirecting
  return <Outlet />;
}
