import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Landing() {
  const { isAuth, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Landing</h1>

      {isAuth ? (
        <div>
          <h3>Hello there, {user?.firstName || "traveler"}</h3>
          <p>It seems you are already authenticated, so you can go to the welcome screen instead :)</p>
          <button onClick={() => navigate("/dashboard")}>Take me there!</button>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate("/register")}>Register</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      )}
    </div>
  );
}
