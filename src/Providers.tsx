import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

import AppRouter from "./routes/AppRouter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";

export default function Providers() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TopNavBar />
          <div className="container">
            <AppRouter />
          </div>
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
