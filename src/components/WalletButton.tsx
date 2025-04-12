import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useAccountBalance } from "../hooks/useAccountBalance";
import { formatAddress } from "../utils/format";

interface WalletButtonProps {
  className?: string;
  showBalance?: boolean;
  variant?: "default" | "minimal" | "expanded";
  label?: string;
}

/**
 * WalletButton component for connecting to Web3 wallets
 *
 * @param className - Additional CSS classes
 * @param showBalance - Whether to show the wallet balance
 * @param variant - Button display style
 * @param label - Custom connect button label
 */
const WalletButton: React.FC<WalletButtonProps> = ({
  className = "",
  showBalance = false,
  variant = "default",
  label = "Connect Wallet",
}) => {
  const { isConnected, address } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { formattedBalance, symbol } = useAccountBalance();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    // Connect using the first available connector (usually injected - MetaMask)
    const connector = connectors[0];
    if (connector) {
      setIsConnecting(true);
      try {
        await connect({ connector });
      } catch (err) {
        console.error("Connection error:", err);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  if (!isConnected) {
    if (variant === "minimal") {
      return (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`px-3 py-1.5 text-sm rounded-lg font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors ${className} ${
            isConnecting ? "opacity-70 cursor-not-allowed" : ""
          }`}>
          {isConnecting ? "Connecting..." : label}
        </button>
      );
    }

    return (
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className={`relative overflow-hidden px-5 py-2.5 rounded-xl font-medium 
          bg-gradient-to-r from-primary-500 to-secondary-500 text-white 
          shadow-md shadow-primary-500/20 dark:shadow-primary-500/10 
          hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 
          transition-all duration-300 group ${className} 
          ${isConnecting ? "opacity-70 cursor-not-allowed" : ""}`}>
        <span className="relative z-10">
          {isConnecting ? "Connecting..." : label}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
      </button>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showBalance && (
          <span className="text-sm font-medium">
            {formattedBalance} {symbol}
          </span>
        )}
        <button
          onClick={() => disconnect()}
          className="px-3 py-1.5 text-xs rounded-lg font-medium bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors">
          {formatAddress(address)}
        </button>
      </div>
    );
  }

  if (variant === "expanded") {
    return (
      <div
        className={`flex flex-col p-3 bg-white dark:bg-dark-800 rounded-xl shadow-md border border-gray-200 dark:border-dark-700 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-primary-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Connected
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatAddress(address)}
              </p>
            </div>
          </div>
          <button
            onClick={() => disconnect()}
            className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
            Disconnect
          </button>
        </div>
        {showBalance && (
          <div className="bg-gray-50 dark:bg-dark-700 p-2 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Balance
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {formattedBalance}{" "}
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {symbol}
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }

  // Default connected state
  return (
    <div
      className={`flex items-center gap-2 bg-white/10 dark:bg-dark-800/20 backdrop-blur-sm p-1 rounded-xl border border-gray-200/20 dark:border-dark-700/50 shadow-md ${className}`}>
      {showBalance && (
        <div className="px-3 py-1.5 text-sm rounded-lg bg-white/80 dark:bg-dark-700/80 text-primary-900 dark:text-white font-medium flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 mr-1 text-primary-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
          </svg>
          {formattedBalance} {symbol}
        </div>
      )}
      <button
        onClick={() => disconnect()}
        className="px-4 py-1.5 text-sm rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium flex items-center gap-1 hover:shadow-md transition-all">
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        {formatAddress(address)}
      </button>
    </div>
  );
};

export default WalletButton;
