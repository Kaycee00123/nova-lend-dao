import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const handleConnect = () => {
    // Mock wallet connection
    const mockAddress = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
    setAddress(mockAddress);
    setIsConnected(true);
    toast.success("Wallet connected successfully!");
  };

  const handleDisconnect = () => {
    setAddress("");
    setIsConnected(false);
    toast.info("Wallet disconnected");
  };

  if (isConnected) {
    return (
      <Button
        variant="outline"
        onClick={handleDisconnect}
        className="bg-secondary text-foreground hover:bg-secondary/80 border-primary/20"
      >
        <Wallet className="w-4 h-4 mr-2" />
        {address}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold"
    >
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
}
