import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calibration from "./pages/Calibration";
import Dashboard from "./pages/Dashboard";
import Competencies from "./pages/Competencies";
import PDI from "./pages/PDI";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calibrar/:id" element={<Calibration />} />
          <Route path="/pdi" element={<PDI />} />
          <Route path="/pdi/:id" element={<PDI />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/competencias" element={<Competencies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
