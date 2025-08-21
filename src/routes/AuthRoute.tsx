import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useEffect } from "react";

export default function AuthRoute() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuth, navigate]);

  if (isAuth) return null; // nothing to render while redirecting
  return <Outlet />;
}
