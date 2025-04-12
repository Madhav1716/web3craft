import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";

interface UseAccountBalanceReturn {
  balance: string;
  formattedBalance: string;
  symbol: string;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useAccountBalance = (): UseAccountBalanceReturn => {
  const { address, isConnected } = useAccount();
  const [formattedBalance, setFormattedBalance] = useState<string>("0.00");

  // Get native currency balance
  const { data, isLoading, error, refetch } = useBalance({
    address,
    watch: true,
  });

  useEffect(() => {
    if (data) {
      const formatted = parseFloat(formatEther(data.value)).toFixed(4);
      setFormattedBalance(formatted);
    }
  }, [data]);

  return {
    balance: data ? data.value.toString() : "0",
    formattedBalance,
    symbol: data ? data.symbol : "ETH",
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
