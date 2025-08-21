import { useQuery, useQueryClient } from "@tanstack/react-query";
import { logoutUser, userProfile } from "../services/auth.service";
import { AuthContext } from "./AuthContext";
import { useEffect } from "react";
import { useLocalStorage } from "react-haiku";
import type { AuthUser } from "../types/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage<AuthUser | null>("last_auth_user", null);
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: userProfile,
    retry: false,
    staleTime: Infinity,
  });

  const logout = async () => {
    try {
      queryClient.invalidateQueries();
      await logoutUser();
    } catch {
      console.warn("Logout request failed unexpectedly!");
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    if (profile) {
      if (!user || user?.id !== profile.id) {
        setUser(profile);
      }
    } else if (!isLoading) {
      setUser(null);
    }
  }, [profile, isLoading, user, setUser]);

  const isAuth = !!user;

  return <AuthContext.Provider value={{ user, setUser, logout, isLoading, isAuth }}>{children}</AuthContext.Provider>;
};
