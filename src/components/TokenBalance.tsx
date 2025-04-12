import React from "react";
import { useAccountBalance } from "../hooks/useAccountBalance";

interface TokenBalanceProps {
  className?: string;
  showSymbol?: boolean;
  variant?: "default" | "compact" | "card";
}

/**
 * TokenBalance component displays the user's connected wallet balance
 *
 * @param className - Additional CSS classes
 * @param showSymbol - Whether to show the token symbol
 * @param variant - Display style variant
 */
const TokenBalance: React.FC<TokenBalanceProps> = ({
  className = "",
  showSymbol = true,
  variant = "default",
}) => {
  const { formattedBalance, symbol, isLoading } = useAccountBalance();

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <span className={`font-medium ${className}`}>
        {formattedBalance}
        {showSymbol && <span className="ml-1 text-gray-500">{symbol}</span>}
      </span>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={`p-4 rounded-xl bg-white dark:bg-dark-800 shadow-md ${className}`}>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Your Balance
        </p>
        <div className="flex items-center">
          <span className="text-xl font-bold">{formattedBalance}</span>
          {showSymbol && (
            <span className="ml-2 text-gray-600 dark:text-gray-300">
              {symbol}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="mr-2">
        <svg
          className="w-5 h-5 text-primary-500"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
        </svg>
      </div>
      <div>
        <p className="font-medium">{formattedBalance}</p>
        {showSymbol && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{symbol}</p>
        )}
      </div>
    </div>
  );
};

export default TokenBalance;
