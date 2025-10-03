import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

interface AssetCardProps {
  symbol: string;
  name: string;
  balance: number;
  apy: number;
  icon?: string;
  onAction: () => void;
  actionLabel?: string;
}

export function AssetCard({
  symbol,
  name,
  balance,
  apy,
  onAction,
  actionLabel = "Supply",
}: AssetCardProps) {
  return (
    <Card className="p-4 bg-card border-primary/10 hover:border-primary/30 transition-all card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{symbol[0]}</span>
          </div>
          <div>
            <h3 className="font-bold text-foreground">{symbol}</h3>
            <p className="text-xs text-muted-foreground">{name}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-primary">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-semibold">{apy}%</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Balance</span>
          <span className="text-foreground font-semibold">
            {balance.toLocaleString()} {symbol}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">APY</span>
          <span className="text-primary font-semibold">{apy}%</span>
        </div>
      </div>

      <Button
        onClick={onAction}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
      >
        {actionLabel}
      </Button>
    </Card>
  );
}
