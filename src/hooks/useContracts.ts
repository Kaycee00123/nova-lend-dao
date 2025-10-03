import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { toast } from 'sonner';

// Contract addresses (to be deployed)
export const CONTRACTS = {
  LENDING_POOL: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  PROTO_TOKEN: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  GOVERNANCE: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  FLASH_LOAN: '0x0000000000000000000000000000000000000000' as `0x${string}`,
  STAKING: '0x0000000000000000000000000000000000000000' as `0x${string}`,
};

// Simplified ABIs for demo (full ABIs will be generated after contract deployment)
const LENDING_POOL_ABI = [
  {
    name: 'deposit',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'asset', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'borrow',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'asset', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'withdraw',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'asset', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'repay',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'asset', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'getUserAccountData',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [
      { name: 'totalCollateral', type: 'uint256' },
      { name: 'totalDebt', type: 'uint256' },
      { name: 'availableBorrow', type: 'uint256' },
      { name: 'healthFactor', type: 'uint256' },
    ],
  },
] as const;

const GOVERNANCE_ABI = [
  {
    name: 'propose',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'targets', type: 'address[]' },
      { name: 'values', type: 'uint256[]' },
      { name: 'calldatas', type: 'bytes[]' },
      { name: 'description', type: 'string' },
    ],
    outputs: [{ name: 'proposalId', type: 'uint256' }],
  },
  {
    name: 'castVote',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'proposalId', type: 'uint256' }, { name: 'support', type: 'uint8' }],
    outputs: [],
  },
  {
    name: 'getVotes',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

export function useLending() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync } = useWriteContract();

  const { data: accountData } = useReadContract({
    address: CONTRACTS.LENDING_POOL,
    abi: LENDING_POOL_ABI,
    functionName: 'getUserAccountData',
    args: address ? [address] : undefined,
  });

  const deposit = async (asset: `0x${string}`, amount: string, decimals: number = 18) => {
    if (!address) throw new Error('Wallet not connected');
    try {
      const amountWei = parseUnits(amount, decimals);
      const hash = await writeContractAsync({
        address: CONTRACTS.LENDING_POOL,
        abi: LENDING_POOL_ABI,
        functionName: 'deposit',
        args: [asset, amountWei],
        account: address,
        chainId,
      } as any);
      toast.success(`Deposit transaction submitted: ${hash}`);
      return hash;
    } catch (error) {
      toast.error(`Deposit failed: ${error}`);
      throw error;
    }
  };

  const borrow = async (asset: `0x${string}`, amount: string, decimals: number = 18) => {
    if (!address) throw new Error('Wallet not connected');
    try {
      const amountWei = parseUnits(amount, decimals);
      const hash = await writeContractAsync({
        address: CONTRACTS.LENDING_POOL,
        abi: LENDING_POOL_ABI,
        functionName: 'borrow',
        args: [asset, amountWei],
        account: address,
        chainId,
      } as any);
      toast.success(`Borrow transaction submitted: ${hash}`);
      return hash;
    } catch (error) {
      toast.error(`Borrow failed: ${error}`);
      throw error;
    }
  };

  const withdraw = async (asset: `0x${string}`, amount: string, decimals: number = 18) => {
    if (!address) throw new Error('Wallet not connected');
    try {
      const amountWei = parseUnits(amount, decimals);
      const hash = await writeContractAsync({
        address: CONTRACTS.LENDING_POOL,
        abi: LENDING_POOL_ABI,
        functionName: 'withdraw',
        args: [asset, amountWei],
        account: address,
        chainId,
      } as any);
      toast.success(`Withdrawal transaction submitted: ${hash}`);
      return hash;
    } catch (error) {
      toast.error(`Withdrawal failed: ${error}`);
      throw error;
    }
  };

  const repay = async (asset: `0x${string}`, amount: string, decimals: number = 18) => {
    if (!address) throw new Error('Wallet not connected');
    try {
      const amountWei = parseUnits(amount, decimals);
      const hash = await writeContractAsync({
        address: CONTRACTS.LENDING_POOL,
        abi: LENDING_POOL_ABI,
        functionName: 'repay',
        args: [asset, amountWei],
        account: address,
        chainId,
      } as any);
      toast.success(`Repayment transaction submitted: ${hash}`);
      return hash;
    } catch (error) {
      toast.error(`Repayment failed: ${error}`);
      throw error;
    }
  };

  return {
    deposit,
    borrow,
    withdraw,
    repay,
    accountData,
  };
}

export function useGovernance() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync } = useWriteContract();

  const { data: votingPower } = useReadContract({
    address: CONTRACTS.GOVERNANCE,
    abi: GOVERNANCE_ABI,
    functionName: 'getVotes',
    args: address ? [address] : undefined,
  });

  const vote = async (proposalId: number, support: boolean) => {
    if (!address) throw new Error('Wallet not connected');
    try {
      const hash = await writeContractAsync({
        address: CONTRACTS.GOVERNANCE,
        abi: GOVERNANCE_ABI,
        functionName: 'castVote',
        args: [BigInt(proposalId), support ? 1 : 0],
        account: address,
        chainId,
      } as any);
      toast.success(`Vote transaction submitted: ${hash}`);
      return hash;
    } catch (error) {
      toast.error(`Vote failed: ${error}`);
      throw error;
    }
  };

  const propose = async (
    targets: `0x${string}`[],
    values: bigint[],
    calldatas: `0x${string}`[],
    description: string
  ) => {
    if (!address) throw new Error('Wallet not connected');
    try {
      const hash = await writeContractAsync({
        address: CONTRACTS.GOVERNANCE,
        abi: GOVERNANCE_ABI,
        functionName: 'propose',
        args: [targets, values, calldatas, description],
        account: address,
        chainId,
      } as any);
      toast.success(`Proposal transaction submitted: ${hash}`);
      return hash;
    } catch (error) {
      toast.error(`Proposal creation failed: ${error}`);
      throw error;
    }
  };

  return {
    vote,
    propose,
    votingPower: votingPower ? formatUnits(votingPower, 18) : '0',
  };
}

export function useTransactionStatus(hash?: `0x${string}`) {
  const { data, isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  });

  return {
    receipt: data,
    isLoading,
    isSuccess,
    isError,
  };
}
