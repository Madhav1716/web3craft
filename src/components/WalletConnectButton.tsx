import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useAccountBalance } from "../hooks/useAccountBalance";
import { formatAddress } from "../utils/format";

interface WalletConnectButtonProps {
  className?: string;
  showBalance?: boolean;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  className = "",
  showBalance = true,
}) => {
  const { isConnected, address } = useAccount();
  const { formattedBalance, symbol } = useAccountBalance();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            className={`flex items-center gap-2 ${className}`}
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}>
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="relative overflow-hidden px-5 py-2.5 rounded-xl font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md shadow-primary-500/20 dark:shadow-primary-500/10 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300 group">
                    <span className="relative z-10">Connect Wallet</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="px-5 py-2.5 rounded-xl font-medium bg-red-500 text-white shadow-md hover:shadow-lg hover:bg-red-600 hover:-translate-y-0.5 transition-all duration-300">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                      Wrong Network
                    </span>
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2 bg-white/10 dark:bg-dark-800/20 backdrop-blur-sm p-1 rounded-xl border border-gray-200/20 dark:border-dark-700/50 shadow-md hover:shadow-lg transition-all duration-300">
                  {showBalance && (
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="px-3 py-1.5 text-sm rounded-lg bg-white/80 dark:bg-dark-700/80 text-primary-900 dark:text-white font-medium flex items-center gap-1 hover:bg-white dark:hover:bg-dark-600 transition-colors">
                      <svg
                        className="w-3.5 h-3.5 mr-1 text-primary-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                      </svg>
                      {formattedBalance} {symbol}
                    </button>
                  )}
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="px-3 py-1.5 text-sm rounded-lg bg-white/80 dark:bg-dark-700/80 text-primary-900 dark:text-white font-medium flex items-center gap-1 hover:bg-white dark:hover:bg-dark-600 transition-colors">
                    {chain.hasIcon && chain.iconUrl ? (
                      <img
                        alt={chain.name ?? "Chain icon"}
                        src={chain.iconUrl}
                        className="w-4 h-4 mr-1"
                      />
                    ) : (
                      <svg
                        className="w-4 h-4 mr-1 text-primary-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                      </svg>
                    )}
                    {chain.name}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
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
                    {formatAddress(account.address)}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnectButton;
