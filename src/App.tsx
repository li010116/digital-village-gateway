
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SmartAgriculture from "./pages/SmartAgriculture";
import SocialGovernance from "./pages/SocialGovernance";
import SocialServices from "./pages/SocialServices";
import AppCenter from "./pages/AppCenter";
import AppDetail from "./pages/AppDetail";
import SearchResults from "./pages/SearchResults";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
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
          <Route path="/smart-agriculture" element={<SmartAgriculture />} />
          <Route path="/social-governance" element={<SocialGovernance />} />
          <Route path="/social-services" element={<SocialServices />} />
          <Route path="/app-center" element={<AppCenter />} />
          <Route path="/app-detail/:id" element={<AppDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
