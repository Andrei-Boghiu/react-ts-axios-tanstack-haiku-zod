import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logoutUser, userProfile } from "../services/auth.service";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import type { User } from "../types/user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: userProfile,
    retry: false,
    staleTime: Infinity,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries(); // invalidate all queries
      localStorage.clear();
      setUser(null);
    },
    onError: () => {
      console.warn("Logout request failed unexpectedly!");
    },
  });

  const logout = () => logoutMutation.mutate();

  useEffect(() => {
    if (profile) {
      if (!user || user?.id !== profile.id) {
        setUser(profile);
      }
    }

    if (isError) {
      setUser(null);
    }
  }, [profile, isLoading, isError, user]);

  const isAuth = Boolean(user && user.id);

  if (isLoading) return;

  return <AuthContext.Provider value={{ user, setUser, logout, isLoading, isAuth }}>{children}</AuthContext.Provider>;
};
