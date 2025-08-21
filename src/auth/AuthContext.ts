import { createContext } from "react";
import type { AuthUser } from "../types/auth";

export type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isLoading: boolean;
  logout: () => void;
  isAuth: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
