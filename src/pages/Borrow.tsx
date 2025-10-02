import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, TrendingDown } from "lucide-react";
import { toast } from "sonner";

const borrowAssets = [
  { symbol: "USDC", name: "USD Coin", apy: 3.2, available: 50000 },
  { symbol: "DAI", name: "Dai Stablecoin", apy: 2.8, available: 45000 },
  { symbol: "ETH", name: "Ethereum", apy: 4.5, available: 100 },
];

export default function Borrow() {
  const [selectedAsset, setSelectedAsset] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [collateralValue] = useState(8452); // Mock collateral value in USD
  const [healthFactor, setHealthFactor] = useState(2.85);

  const currentAsset = borrowAssets.find((a) => a.symbol === selectedAsset);
  const maxBorrowAmount = collateralValue / 1.5; // 66% of collateral

  const calculateHealthFactor = (borrowAmount: number) => {
    const totalBorrow = borrowAmount;
    return totalBorrow > 0 ? collateralValue / (totalBorrow * 1.5) : 2.85;
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value) {
      const newHealth = calculateHealthFactor(parseFloat(value));
      setHealthFactor(newHealth);
    } else {
      setHealthFactor(2.85);
    }
  };

  const handleBorrow = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (parseFloat(amount) > maxBorrowAmount) {
      toast.error("Amount exceeds maximum borrow limit");
      return;
    }
    if (healthFactor < 1.2) {
      toast.error("Health factor too low. Increase collateral or decrease borrow amount.");
      return;
    }
    toast.success(`Successfully borrowed ${amount} ${selectedAsset}!`);
    setAmount("");
    setHealthFactor(2.85);
  };

  const getHealthColor = () => {
    if (healthFactor >= 2) return "text-primary";
    if (healthFactor >= 1.5) return "text-yellow-500";
    if (healthFactor >= 1.2) return "text-orange-500";
    return "text-destructive";
  };

  const getHealthLabel = () => {
    if (healthFactor >= 2) return "Safe";
    if (healthFactor >= 1.5) return "Good";
    if (healthFactor >= 1.2) return "Warning";
    return "Critical";
  };

  return (
    <div className="min-h-screen md:pl-20 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Borrow Assets</h1>
          <p className="text-muted-foreground">Access liquidity with overcollateralized loans</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Borrow Card */}
          <Card className="lg:col-span-2 p-6 bg-card border-primary/10">
            <div className="space-y-6">
              {/* Collateral Overview */}
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Collateral</p>
                    <p className="text-2xl font-bold text-foreground">${collateralValue.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Max Borrow (66%)</p>
                    <p className="text-2xl font-bold text-primary">${maxBorrowAmount.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              {/* Asset Selection */}
              <div className="space-y-2">
                <Label htmlFor="borrow-asset">Select Asset to Borrow</Label>
                <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                  <SelectTrigger id="borrow-asset" className="bg-secondary border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-primary/20">
                    {borrowAssets.map((asset) => (
                      <SelectItem key={asset.symbol} value={asset.symbol}>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{asset.symbol}</span>
                          <span className="text-muted-foreground text-sm">- {asset.apy}% APY</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="borrow-amount">Borrow Amount</Label>
                  <span className="text-sm text-muted-foreground">
                    Available: {currentAsset?.available.toLocaleString()} {selectedAsset}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    id="borrow-amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="bg-secondary border-primary/20 text-lg pr-20"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
                    onClick={() => handleAmountChange(maxBorrowAmount.toString())}
                  >
                    MAX
                  </Button>
                </div>
              </div>

              {/* Health Factor Simulator */}
              <div className="space-y-3 p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">New Health Factor</span>
                  <span className={`text-2xl font-bold ${getHealthColor()}`}>
                    {healthFactor.toFixed(2)}
                  </span>
                </div>
                <Progress 
                  value={Math.min((healthFactor / 3) * 100, 100)} 
                  className="h-2"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Liquidation Risk</span>
                  <span className={getHealthColor()}>{getHealthLabel()}</span>
                </div>
              </div>

              {/* Warning Alert */}
              {healthFactor < 1.5 && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-destructive">Low Health Factor Warning</p>
                    <p className="text-xs text-muted-foreground">
                      Your position may be liquidated if health factor drops below 1.2. Consider reducing borrow amount or adding more collateral.
                    </p>
                  </div>
                </div>
              )}

              {/* Borrow Button */}
              <Button
                onClick={handleBorrow}
                disabled={healthFactor < 1.2}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold text-lg h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Borrow {selectedAsset}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Estimated gas: ~$3.20
              </p>
            </div>
          </Card>

          {/* Info Sidebar */}
          <Card className="p-6 bg-card border-primary/10 space-y-6">
            <div className="flex items-center gap-2 text-destructive">
              <TrendingDown className="w-5 h-5" />
              <h3 className="font-semibold">Borrow APY</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-destructive/10">
                <p className="text-4xl font-bold text-destructive">
                  {currentAsset?.apy}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">Interest rate</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Key Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Collateral Ratio</span>
                    <span className="text-foreground font-medium">150%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Liquidation Threshold</span>
                    <span className="text-destructive font-medium">1.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Liquidation Penalty</span>
                    <span className="text-foreground font-medium">7%</span>
                  </div>
                </div>
              </div>

              {/* Interest Projection */}
              {amount && parseFloat(amount) > 0 && (
                <div className="pt-4 border-t border-primary/10">
                  <h4 className="font-semibold text-sm mb-3">Interest to Pay</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily</span>
                      <span className="text-destructive font-semibold">
                        ${((parseFloat(amount) * (currentAsset?.apy || 0)) / 100 / 365).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly</span>
                      <span className="text-destructive font-semibold">
                        ${((parseFloat(amount) * (currentAsset?.apy || 0)) / 100 / 12).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Yearly</span>
                      <span className="text-destructive font-semibold">
                        ${((parseFloat(amount) * (currentAsset?.apy || 0)) / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
