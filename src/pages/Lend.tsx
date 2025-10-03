import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Info } from "lucide-react";
import { toast } from "sonner";

const assets = [
  { symbol: "ETH", name: "Ethereum", apy: 5.2, balance: 2.45 },
  { symbol: "USDC", name: "USD Coin", apy: 8.1, balance: 3120 },
  { symbol: "DAI", name: "Dai Stablecoin", apy: 7.5, balance: 1097.84 },
];

export default function Lend() {
  const [selectedAsset, setSelectedAsset] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState([0]);

  const currentAsset = assets.find((a) => a.symbol === selectedAsset);

  const handleSupply = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    toast.success(`Successfully supplied ${amount} ${selectedAsset}!`);
    setAmount("");
    setPercentage([0]);
  };

  const handlePercentageChange = (value: number[]) => {
    setPercentage(value);
    if (currentAsset) {
      const calculatedAmount = ((currentAsset.balance * value[0]) / 100).toFixed(6);
      setAmount(calculatedAmount);
    }
  };

  return (
    <div className="min-h-screen md:pl-20 pb-20 md:pb-8 pt-4">
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Lend Assets</h1>
          <p className="text-muted-foreground">Supply crypto and earn competitive APY</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Supply Card */}
          <Card className="lg:col-span-2 p-6 bg-card border-primary/10">
            <div className="space-y-6">
              {/* Asset Selection */}
              <div className="space-y-2">
                <Label htmlFor="asset">Select Asset</Label>
                <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                  <SelectTrigger id="asset" className="bg-secondary border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-primary/20">
                    {assets.map((asset) => (
                      <SelectItem key={asset.symbol} value={asset.symbol}>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{asset.symbol}</span>
                          <span className="text-muted-foreground text-sm">- {asset.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="amount">Amount</Label>
                  <span className="text-sm text-muted-foreground">
                    Balance: {currentAsset?.balance} {selectedAsset}
                  </span>
                </div>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-secondary border-primary/20 text-lg pr-20"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
                    onClick={() => currentAsset && setAmount(currentAsset.balance.toString())}
                  >
                    MAX
                  </Button>
                </div>
              </div>

              {/* Percentage Slider */}
              <div className="space-y-4">
                <Label>Supply Percentage</Label>
                <Slider
                  value={percentage}
                  onValueChange={handlePercentageChange}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>{percentage[0]}%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Supply Button */}
              <Button
                onClick={handleSupply}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold text-lg h-12"
              >
                Supply {selectedAsset}
              </Button>

              {/* Gas Estimate */}
              <p className="text-sm text-muted-foreground text-center">
                Estimated gas: ~$2.50
              </p>
            </div>
          </Card>

          {/* Info Sidebar */}
          <Card className="p-6 bg-card border-primary/10 space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-semibold">Supply APY</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 glow-primary">
                <p className="text-4xl font-bold text-primary">
                  {currentAsset?.apy}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">Current rate</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/50">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Interest is calculated per block and compounded automatically
                  </p>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/50">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Your supplied assets can be used as collateral for borrowing
                  </p>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/50">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Earn additional PROTO tokens as rewards
                  </p>
                </div>
              </div>
            </div>

            {/* Projected Earnings */}
            {amount && parseFloat(amount) > 0 && (
              <div className="pt-4 border-t border-primary/10">
                <h4 className="font-semibold text-sm mb-3">Projected Earnings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily</span>
                    <span className="text-primary font-semibold">
                      {((parseFloat(amount) * (currentAsset?.apy || 0)) / 100 / 365).toFixed(6)} {selectedAsset}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly</span>
                    <span className="text-primary font-semibold">
                      {((parseFloat(amount) * (currentAsset?.apy || 0)) / 100 / 12).toFixed(4)} {selectedAsset}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Yearly</span>
                    <span className="text-primary font-semibold">
                      {((parseFloat(amount) * (currentAsset?.apy || 0)) / 100).toFixed(2)} {selectedAsset}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
