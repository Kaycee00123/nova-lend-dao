import { MetricCard } from "@/components/MetricCard";
import { WalletConnect } from "@/components/WalletConnect";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Wallet, Award } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen md:pl-20 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to NovaLend</p>
          </div>
          <WalletConnect />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Value Locked"
            value="$2.4B"
            change="+12.5%"
            icon={DollarSign}
            trend="up"
          />
          <MetricCard
            title="Your Balance"
            value="$8,452.34"
            change="+5.2%"
            icon={Wallet}
            trend="up"
          />
          <MetricCard
            title="Current APY"
            value="8.45%"
            change="+0.3%"
            icon={TrendingUp}
            trend="up"
          />
          <MetricCard
            title="PROTO Earned"
            value="142.8"
            change="+24"
            icon={Award}
            trend="up"
          />
        </div>

        {/* Health Factor */}
        <Card className="p-6 bg-card border-primary/10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">Health Factor</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your collateralization ratio
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">2.85</p>
                <p className="text-sm text-muted-foreground">Safe</p>
              </div>
            </div>
            <Progress value={85} className="h-3 bg-secondary" />
            <p className="text-xs text-muted-foreground">
              Health factor above 1.5 is safe. Below 1.2 risks liquidation.
            </p>
          </div>
        </Card>

        {/* Asset Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-primary/10">
            <h3 className="text-xl font-bold text-foreground mb-6">Your Deposits</h3>
            <div className="space-y-4">
              {[
                { asset: "ETH", amount: "2.45", value: "$4,234.50", apy: "5.2%" },
                { asset: "USDC", amount: "3,120.00", value: "$3,120.00", apy: "8.1%" },
                { asset: "DAI", amount: "1,097.84", value: "$1,097.84", apy: "7.5%" },
              ].map((item) => (
                <div
                  key={item.asset}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-bold text-primary">{item.asset[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.asset}</p>
                      <p className="text-sm text-muted-foreground">{item.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{item.value}</p>
                    <p className="text-sm text-primary">{item.apy} APY</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-card border-primary/10">
            <h3 className="text-xl font-bold text-foreground mb-6">Your Borrows</h3>
            <div className="space-y-4">
              {[
                { asset: "USDC", amount: "1,500.00", value: "$1,500.00", apy: "3.2%" },
                { asset: "DAI", amount: "500.00", value: "$500.00", apy: "2.8%" },
              ].map((item) => (
                <div
                  key={item.asset}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                      <span className="font-bold text-destructive">{item.asset[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.asset}</p>
                      <p className="text-sm text-muted-foreground">{item.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{item.value}</p>
                    <p className="text-sm text-destructive">{item.apy} APY</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
