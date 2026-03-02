import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getUsuarioLogado } from "@/data/store";
import Index from "./pages/Index";
import Calibration from "./pages/Calibration";
import Dashboard from "./pages/Dashboard";
import Competencies from "./pages/Competencies";
import PDI from "./pages/PDI";
import UsersPage from "./pages/Users";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const usuario = getUsuarioLogado();
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/calibrar/:id" element={<ProtectedRoute><Calibration /></ProtectedRoute>} />
          <Route path="/pdi" element={<ProtectedRoute><PDI /></ProtectedRoute>} />
          <Route path="/pdi/:id" element={<ProtectedRoute><PDI /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/competencias" element={<ProtectedRoute><Competencies /></ProtectedRoute>} />
          <Route path="/usuarios" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
