
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PendingCases from "./pages/PendingCases";
import ClosedCases from "./pages/ClosedCases";
import ArchivedCases from "./pages/ArchivedCases";
import Appointments from "./pages/Appointments";
import Clients from "./pages/Clients";
import Financial from "./pages/Financial";
import Documents from "./pages/Documents";
import CaseDetails from "./pages/CaseDetails";
import ClientDetails from "./pages/ClientDetails";
import DocumentDetails from "./pages/DocumentDetails";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pending-cases" element={<PendingCases />} />
          <Route path="/closed-cases" element={<ClosedCases />} />
          <Route path="/archived-cases" element={<ArchivedCases />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/case/:id" element={<CaseDetails />} />
          <Route path="/client/:id" element={<ClientDetails />} />
          <Route path="/document/:id" element={<DocumentDetails />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
