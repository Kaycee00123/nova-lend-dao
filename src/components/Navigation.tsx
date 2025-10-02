import { NavLink } from "react-router-dom";
import { Home, TrendingUp, DollarSign, Sprout, Vote, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Dashboard" },
  { to: "/lend", icon: TrendingUp, label: "Lend" },
  { to: "/borrow", icon: DollarSign, label: "Borrow" },
  { to: "/farm", icon: Sprout, label: "Farm" },
  { to: "/govern", icon: Vote, label: "Govern" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Navigation() {
  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-20 flex-col items-center gap-6 border-r border-border bg-card py-8 z-50">
        <div className="mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center font-bold text-xl">
            N
          </div>
        </div>
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
