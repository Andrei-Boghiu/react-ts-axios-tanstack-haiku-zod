import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes/AppRouter";
import { queryClient } from "./lib/react-query";

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
