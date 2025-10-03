import { NavLink } from "react-router-dom";
import { Home, TrendingUp, DollarSign, ArrowLeftRight, Sprout, Vote, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { WalletConnect } from "./WalletConnect";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Dashboard" },
  { to: "/lend", icon: TrendingUp, label: "Lend" },
  { to: "/borrow", icon: DollarSign, label: "Borrow" },
  { to: "/swap", icon: ArrowLeftRight, label: "Swap" },
  { to: "/farm", icon: Sprout, label: "Farm" },
  { to: "/govern", icon: Vote, label: "Govern" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Navigation() {
  return (
    <>
      {/* Top Header with Wallet */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-card border-b border-border items-center justify-between px-6 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center font-bold text-xl">
            N
          </div>
          <span className="text-xl font-bold gradient-text">NovaLend</span>
        </div>
        <WalletConnect />
      </header>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-4rem)] w-20 flex-col items-center gap-6 border-r border-border bg-card py-8 z-40">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl transition-all group relative",
                isActive
                  ? "text-primary glow-primary"
                  : "text-muted-foreground hover:text-primary hover:glow-primary"
              )
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center font-bold text-sm">
            N
          </div>
          <span className="font-bold gradient-text">NovaLend</span>
        </div>
        <WalletConnect />
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex items-center justify-around px-2 z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[9px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
