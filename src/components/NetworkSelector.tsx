import React from "react";
import { NETWORKS } from "../config/blockchain";
import { useWallet } from "../contexts/WalletContext";

interface NetworkSelectorProps {
  className?: string;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ className }) => {
  const { walletState, switchNetwork } = useWallet();

  const handleNetworkChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const chainId = parseInt(e.target.value, 10);
    if (chainId !== walletState.chainId) {
      await switchNetwork(chainId);
    }
  };

  const getNetworkName = (chainId: number | null): string => {
    if (!chainId) return "Unknown Network";

    const network = Object.values(NETWORKS).find(
      (net) => net.chainId === chainId
    );
    return network ? network.chainName : `Chain ID: ${chainId}`;
  };

  return (
    <div className={`network-selector ${className || ""}`}>
      <label htmlFor="network-select">Network:</label>
      <select
        id="network-select"
        value={walletState.chainId || ""}
        onChange={handleNetworkChange}
        disabled={!walletState.isConnected}>
        <option value="" disabled>
          {!walletState.isConnected ? "Connect Wallet First" : "Select Network"}
        </option>
        {Object.values(NETWORKS).map((network) => (
          <option key={network.chainId} value={network.chainId}>
            {network.chainName}
          </option>
        ))}
      </select>

      {walletState.isConnected && walletState.chainId && (
        <div className="current-network">
          Connected to: {getNetworkName(walletState.chainId)}
        </div>
      )}
    </div>
  );
};

export default NetworkSelector;
