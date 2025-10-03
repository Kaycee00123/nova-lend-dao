import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, TrendingUp, Clock } from "lucide-react";
import { toast } from "sonner";

const pools = [
  {
    name: "ETH-USDC",
    tvl: "$45.2M",
    apy: 24.5,
    protoRewards: 120,
    yourStake: 0,
    category: "Stable",
  },
  {
    name: "ETH-DAI",
    tvl: "$32.8M",
    apy: 31.2,
    protoRewards: 150,
    yourStake: 1250,
    category: "Stable",
  },
  {
    name: "PROTO-ETH",
    tvl: "$18.5M",
    apy: 68.4,
    protoRewards: 300,
    yourStake: 0,
    category: "High Risk",
  },
  {
    name: "USDC-DAI",
    tvl: "$55.1M",
    apy: 18.7,
    protoRewards: 80,
    yourStake: 2500,
    category: "Low Risk",
  },
];

export default function Farm() {
  const handleStake = (poolName: string) => {
    toast.success(`Opening stake modal for ${poolName}`);
  };

  const handleHarvest = (poolName: string) => {
    toast.success(`Harvested rewards from ${poolName}!`);
  };

  return (
    <div className="min-h-screen md:pl-20 pb-20 md:pb-8 pt-4">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Yield Farming</h1>
            <p className="text-muted-foreground">Stake LP tokens and earn PROTO rewards</p>
          </div>
          <Card className="p-4 bg-primary/10 border-primary/20">
            <div className="flex items-center gap-3">
              <Sprout className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Rewards Earned</p>
                <p className="text-2xl font-bold text-primary">142.8 PROTO</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Farms */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Your Active Farms</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pools
              .filter((pool) => pool.yourStake > 0)
              .map((pool) => (
                <Card
                  key={pool.name}
                  className="p-6 bg-card border-primary/20 card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{pool.name}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary mt-1 inline-block">
                        {pool.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{pool.apy}%</p>
                      <p className="text-xs text-muted-foreground">APY</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Your Stake</span>
                      <span className="text-foreground font-semibold">
                        ${pool.yourStake.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Daily Rewards</span>
                      <span className="text-primary font-semibold">
                        {(pool.protoRewards / 30).toFixed(2)} PROTO
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleHarvest(pool.name)}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Harvest
                    </Button>
                    <Button
                      onClick={() => handleStake(pool.name)}
                      variant="outline"
                      className="flex-1 border-primary/20"
                    >
                      Add More
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* All Pools */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Available Pools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pools.map((pool) => (
              <Card
                key={pool.name}
                className="p-6 bg-card border-primary/10 hover:border-primary/30 transition-all card-hover"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{pool.name}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground mt-1 inline-block">
                        {pool.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-primary/10">
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-3xl font-bold text-primary">{pool.apy}%</span>
                    </div>
                    <p className="text-center text-xs text-muted-foreground mt-1">APY</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">TVL</span>
                      <span className="text-foreground font-semibold">{pool.tvl}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">PROTO/day</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary" />
                        <span className="text-primary font-semibold">{pool.protoRewards}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleStake(pool.name)}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
                  >
                    {pool.yourStake > 0 ? "Stake More" : "Start Farming"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <Card className="p-6 bg-card border-primary/10">
          <h3 className="text-xl font-bold text-foreground mb-4">How Yield Farming Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold text-foreground">Provide Liquidity</h4>
              <p className="text-sm text-muted-foreground">
                Add equal value of two tokens to a liquidity pool to receive LP tokens
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h4 className="font-semibold text-foreground">Stake LP Tokens</h4>
              <p className="text-sm text-muted-foreground">
                Stake your LP tokens in the farm to start earning PROTO rewards
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h4 className="font-semibold text-foreground">Earn & Compound</h4>
              <p className="text-sm text-muted-foreground">
                Harvest rewards regularly or auto-compound for maximum yields
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
