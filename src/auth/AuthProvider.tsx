import { useCookie } from "react-haiku";
import { AuthContext, type AuthUser } from "./AuthContext";
import { useState } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [token, setToken, deleteToken] = useCookie("token", "");

  const setUser = (user: AuthUser | null, tokenValue?: string) => {
    setUserState(user);
    if (user && tokenValue) {
      setToken(tokenValue);
    } else {
      deleteToken();
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
