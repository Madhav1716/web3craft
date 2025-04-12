import React from "react";
import { useWallet } from "../contexts/WalletContext";

interface WalletConnectProps {
  className?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ className }) => {
  const { walletState, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (address: string | null): string => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  return (
    <div className={`wallet-connect ${className || ""}`}>
      {!walletState.isConnected ? (
        <button className="connect-button" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <span className="wallet-address">
            {formatAddress(walletState.address)}
          </span>
          <button className="disconnect-button" onClick={disconnectWallet}>
            Disconnect
          </button>
        </div>
      )}

      {walletState.error && (
        <div className="wallet-error">{walletState.error}</div>
      )}
    </div>
  );
};

export default WalletConnect;
