import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function TopNavBar() {
  const { user, logout, isAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="top-navbar">
      <div className="nav-left">
        <Link to="/">Logo {String("<->")}</Link>
        {isAuth && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/tasks">Tasks</Link>
          </>
        )}
      </div>

      <div className="nav-right">
        {isAuth ? (
          <>
            <div>{user?.firstName || user?.email}</div>
            <button onClick={handleLogout} aria-label="Logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
