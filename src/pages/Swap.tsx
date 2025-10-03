import { useState } from "react";
import { ArrowDownUp, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const assets = [
  { symbol: "ETH", name: "Ethereum", balance: 2.5 },
  { symbol: "USDC", name: "USD Coin", balance: 5000 },
  { symbol: "DAI", name: "Dai Stablecoin", balance: 3200 },
  { symbol: "PROTO", name: "Protocol Token", balance: 1500 },
];

export default function Swap() {
  const [fromAsset, setFromAsset] = useState("ETH");
  const [toAsset, setToAsset] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [slippage, setSlippage] = useState([0.5]);
  const [showSettings, setShowSettings] = useState(false);

  // Mock exchange rate (1 ETH = 2000 USDC)
  const exchangeRate = fromAsset === "ETH" && toAsset === "USDC" ? 2000 : 1;
  const toAmount = fromAmount ? (parseFloat(fromAmount) * exchangeRate).toFixed(2) : "";

  const handleSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    toast.success(`Swapped ${fromAmount} ${fromAsset} for ${toAmount} ${toAsset}`);
  };

  const handleFlipAssets = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
  };

  const selectedFromAsset = assets.find(a => a.symbol === fromAsset);
  const selectedToAsset = assets.find(a => a.symbol === toAsset);

  return (
    <div className="min-h-screen bg-background md:pl-20 p-4 md:p-8 pb-24 md:pb-8 pt-20 md:pt-4">
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">Swap Assets</h1>
          <p className="text-muted-foreground">Exchange crypto assets at optimal rates</p>
        </div>

        <Card className="card-premium border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Token Swap</CardTitle>
                <CardDescription>Trade with 0.3% fee</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
                className="text-primary hover:text-primary/80"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {showSettings && (
              <Card className="bg-secondary/50 border-primary/10">
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Slippage Tolerance</label>
                      <span className="text-sm text-primary font-semibold">{slippage[0]}%</span>
                    </div>
                    <Slider
                      value={slippage}
                      onValueChange={setSlippage}
                      min={0.1}
                      max={5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Info className="w-4 h-4 mt-0.5 text-primary" />
                    <p>Your transaction will revert if price changes unfavorably by more than this percentage.</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* From */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">From</label>
              <div className="flex gap-2">
                <Select value={fromAsset} onValueChange={setFromAsset}>
                  <SelectTrigger className="w-[140px] bg-secondary border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem key={asset.symbol} value={asset.symbol}>
                        {asset.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="flex-1 bg-secondary border-primary/20 text-lg"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Balance: {selectedFromAsset?.balance}</span>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-primary"
                  onClick={() => setFromAmount(selectedFromAsset?.balance.toString() || "")}
                >
                  MAX
                </Button>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleFlipAssets}
                className="rounded-full bg-secondary border-primary/30 hover:bg-primary/10 hover:border-primary"
              >
                <ArrowDownUp className="w-4 h-4 text-primary" />
              </Button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">To</label>
              <div className="flex gap-2">
                <Select value={toAsset} onValueChange={setToAsset}>
                  <SelectTrigger className="w-[140px] bg-secondary border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem key={asset.symbol} value={asset.symbol}>
                        {asset.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="0.0"
                  value={toAmount}
                  readOnly
                  className="flex-1 bg-secondary/50 border-primary/20 text-lg"
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Balance: {selectedToAsset?.balance}
              </div>
            </div>

            {/* Exchange Rate */}
            {fromAmount && (
              <Card className="bg-secondary/30 border-primary/10">
                <CardContent className="pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-medium">1 {fromAsset} = {exchangeRate} {toAsset}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee (0.3%)</span>
                    <span className="font-medium">{(parseFloat(fromAmount) * 0.003).toFixed(4)} {fromAsset}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min. Received</span>
                    <span className="font-medium text-primary">{(parseFloat(toAmount) * (1 - slippage[0] / 100)).toFixed(2)} {toAsset}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              onClick={handleSwap}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary text-lg h-12 font-semibold"
            >
              Swap
            </Button>

            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/10">
              <Info className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <p>Swaps are executed via Uniswap V3. Gas costs may apply. Always review transaction details before confirming.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
