import { QueryClient } from "@tanstack/react-query";
import axiosClient from "./axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const { data } = await axiosClient.get(String(queryKey[0]));
        return data;
      },
      retry: 1, // Retry failed GETs twice before erroring
      staleTime: 60_000, // cache data for 1m
    },
    mutations: {
      retry: 0,
    },
  },
});
