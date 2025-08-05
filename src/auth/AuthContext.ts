import { createContext } from "react";

export type AuthUser = {
  id: string;
  email: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  organization?: string | null;
  role: "USER" | "ADMIN" | "DEV";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuthContextType = {
  user: AuthUser | null;
  token: string | ((value: string) => void);
  setUser: (user: AuthUser | null, token?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
