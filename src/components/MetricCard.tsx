import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export function MetricCard({ title, value, change, icon: Icon, trend = "neutral" }: MetricCardProps) {
  const trendColors = {
    up: "text-primary",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className="p-6 bg-card border-primary/10 hover:border-primary/30 transition-all card-hover">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold gradient-text">{value}</p>
          {change && (
            <p className={`text-sm font-medium ${trendColors[trend]}`}>
              {trend === "up" && "↑"} {trend === "down" && "↓"} {change}
            </p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-primary/10 glow-primary">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
