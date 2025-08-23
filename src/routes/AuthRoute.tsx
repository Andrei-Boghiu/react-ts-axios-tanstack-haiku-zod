import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useEffect } from "react";

export default function AuthRoute() {
  const { isAuth, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuth) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoading, isAuth, navigate]);

  if (isLoading) return <div>Authenticating...</div>;

  if (isAuth) return null; // ! to replace with global spinner // nothing to render while redirecting
  return <Outlet />;
}
