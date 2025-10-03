import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "./providers/Web3Provider";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Lend from "./pages/Lend";
import Borrow from "./pages/Borrow";
import Swap from "./pages/Swap";
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
        <div className="flex flex-col min-h-screen pt-16 md:pt-16">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <Navigation />
                  <Dashboard />
                  <Footer />
                </>
              }
            />
            <Route
              path="/lend"
              element={
                <>
                  <Navigation />
                  <Lend />
                  <Footer />
                </>
              }
            />
            <Route
              path="/borrow"
              element={
                <>
                  <Navigation />
                  <Borrow />
                  <Footer />
                </>
              }
            />
            <Route
              path="/swap"
              element={
                <>
                  <Navigation />
                  <Swap />
                  <Footer />
                </>
              }
            />
            <Route
              path="/farm"
              element={
                <>
                  <Navigation />
                  <Farm />
                  <Footer />
                </>
              }
            />
            <Route
              path="/govern"
              element={
                <>
                  <Navigation />
                  <Govern />
                  <Footer />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <Navigation />
                  <Settings />
                  <Footer />
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </Web3Provider>
);

export default App;
