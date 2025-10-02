import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppKit } from '@reown/appkit/react'
import { useAccount, useDisconnect } from 'wagmi'
import { toast } from "sonner";
import { useEffect } from "react";

export function WalletConnect() {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    if (isConnected && address) {
      toast.success("Wallet connected successfully!");
    }
  }, [isConnected, address]);

  const handleDisconnect = () => {
    disconnect();
    toast.info("Wallet disconnected");
  };

  if (isConnected && address) {
    return (
      <Button
        variant="outline"
        onClick={handleDisconnect}
        className="bg-secondary text-foreground hover:bg-secondary/80 border-primary/20"
      >
        <Wallet className="w-4 h-4 mr-2" />
        {`${address.slice(0, 6)}...${address.slice(-4)}`}
      </Button>
    );
  }

  return (
    <Button
      onClick={() => open()}
      className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold"
    >
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
}
