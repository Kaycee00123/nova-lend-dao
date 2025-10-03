import { useEffect, useState } from 'react';
import { useAccount, useEstimateGas, useGasPrice } from 'wagmi';
import { formatUnits } from 'viem';

interface GasEstimation {
  gasEstimate: bigint | null;
  gasPrice: bigint | null;
  totalCostETH: string;
  totalCostUSD: string;
  isLoading: boolean;
}

export function useGasEstimation(
  contractAddress?: `0x${string}`,
  functionName?: string,
  args?: any[]
): GasEstimation {
  const { address } = useAccount();
  const [totalCostUSD, setTotalCostUSD] = useState('0.00');

  // Get current gas price
  const { data: gasPrice, isLoading: gasPriceLoading } = useGasPrice({
    chainId: address ? undefined : 11155111, // Sepolia by default
  });

  // Estimate gas for transaction (if contract details provided)
  const { data: gasEstimate, isLoading: gasEstimateLoading } = useEstimateGas({
    to: contractAddress,
    data: functionName && args ? undefined : '0x', // Would encode function call here
    account: address,
  });

  const isLoading = gasPriceLoading || gasEstimateLoading;

  // Calculate total cost
  const totalCostWei = gasEstimate && gasPrice ? gasEstimate * gasPrice : BigInt(0);
  const totalCostETH = formatUnits(totalCostWei, 18);

  // Mock ETH price for USD calculation (in production, fetch from oracle)
  useEffect(() => {
    const ethPriceUSD = 2000; // Mock price
    const costUSD = (parseFloat(totalCostETH) * ethPriceUSD).toFixed(2);
    setTotalCostUSD(costUSD);
  }, [totalCostETH]);

  return {
    gasEstimate,
    gasPrice,
    totalCostETH,
    totalCostUSD,
    isLoading,
  };
}

// Utility for gas optimization
export function optimizeGasLimit(estimatedGas: bigint, bufferPercent: number = 20): bigint {
  return (estimatedGas * BigInt(100 + bufferPercent)) / BigInt(100);
}
