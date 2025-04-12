import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Home: React.FC = () => {
  const { address, isConnected } = useAccount();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Web3 Application
        </h1>
        <ConnectButton />
      </header>

      <main>
        {isConnected ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Connected Wallet
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Address: {address}
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              Connect your wallet to get started
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
