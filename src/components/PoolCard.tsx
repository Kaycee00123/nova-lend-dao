import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock } from "lucide-react";

interface PoolCardProps {
  name: string;
  tvl: string;
  apy: number;
  protoRewards: number;
  yourStake?: number;
  category: string;
  onStake: () => void;
  onHarvest?: () => void;
}

export function PoolCard({
  name,
  tvl,
  apy,
  protoRewards,
  yourStake = 0,
  category,
  onStake,
  onHarvest,
}: PoolCardProps) {
  const isActive = yourStake > 0;

  return (
    <Card className={`p-6 bg-card border-primary/10 hover:border-primary/30 transition-all card-hover ${isActive ? 'border-primary/20' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary mt-1 inline-block">
            {category}
          </span>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{apy}%</p>
          <p className="text-xs text-muted-foreground">APY</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">TVL</span>
          <span className="text-foreground font-semibold">{tvl}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">PROTO/day</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-primary" />
            <span className="text-primary font-semibold">{protoRewards}</span>
          </div>
        </div>
        {isActive && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Your Stake</span>
            <span className="text-foreground font-semibold">
              ${yourStake.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {isActive ? (
        <div className="flex gap-2">
          <Button
            onClick={onHarvest}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Harvest
          </Button>
          <Button
            onClick={onStake}
            variant="outline"
            className="flex-1 border-primary/20"
          >
            Add More
          </Button>
        </div>
      ) : (
        <Button
          onClick={onStake}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          Start Farming
        </Button>
      )}
    </Card>
  );
}
