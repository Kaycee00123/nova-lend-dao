import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "./providers/Web3Provider";
import { Navigation } from "./components/Navigation";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Lend from "./pages/Lend";
import Borrow from "./pages/Borrow";
import Farm from "./pages/Farm";
import Govern from "./pages/Govern";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const App = () => (
  <Web3Provider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Navigation />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/lend"
            element={
              <>
                <Navigation />
                <Lend />
              </>
            }
          />
          <Route
            path="/borrow"
            element={
              <>
                <Navigation />
                <Borrow />
              </>
            }
          />
          <Route
            path="/farm"
            element={
              <>
                <Navigation />
                <Farm />
              </>
            }
          />
          <Route
            path="/govern"
            element={
              <>
                <Navigation />
                <Govern />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <Navigation />
                <Settings />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </Web3Provider>
);

export default App;
