import React, { useState } from "react";
import { useContract } from "../hooks/useContract";
import { TokenInfo } from "../types/blockchain";

interface TokenTransferProps {
  className?: string;
  tokenAddress: string;
}

const TokenTransfer: React.FC<TokenTransferProps> = ({
  className,
  tokenAddress,
}) => {
  const { isConnected, getTokenInfo, transferTokens } = useContract();

  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadTokenInfo = async () => {
    if (!isConnected || !tokenAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      const info = await getTokenInfo(tokenAddress);
      setTokenInfo(info);
    } catch (error: any) {
      setError(error.message || "Failed to load token information");
      console.error("Error loading token info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTransactionHash(null);
    setIsSubmitting(true);

    try {
      if (!isConnected) {
        throw new Error("Wallet not connected");
      }

      if (!tokenInfo) {
        await loadTokenInfo();
      }

      const hash = await transferTokens(tokenAddress, recipientAddress, amount);
      setTransactionHash(hash);
      setRecipientAddress("");
      setAmount("");

      // Refresh token info to show updated balance
      await loadTokenInfo();
    } catch (error: any) {
      setError(error.message || "Transaction failed");
      console.error("Token transfer error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load token info when component mounts or token address changes
  React.useEffect(() => {
    if (tokenAddress) {
      loadTokenInfo();
    }
  }, [tokenAddress, isConnected]);

  if (!tokenAddress) {
    return <div>Please provide a token address.</div>;
  }

  return (
    <div className={`token-transfer ${className || ""}`}>
      <h3>Transfer Tokens</h3>

      {isLoading ? (
        <div>Loading token information...</div>
      ) : tokenInfo ? (
        <div className="token-info">
          <div>
            <strong>Token:</strong> {tokenInfo.name} ({tokenInfo.symbol})
          </div>
          <div>
            <strong>Balance:</strong> {tokenInfo.balance}
          </div>

          <form onSubmit={handleSubmit} className="transfer-form">
            <div className="form-group">
              <label htmlFor="recipient-address">Recipient Address:</label>
              <input
                id="recipient-address"
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="0x..."
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="token-amount">Amount:</label>
              <input
                id="token-amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`0.0 ${tokenInfo.symbol}`}
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !recipientAddress || !amount}>
              {isSubmitting ? "Processing..." : `Send ${tokenInfo.symbol}`}
            </button>
          </form>

          {error && <div className="transfer-error">Error: {error}</div>}

          {transactionHash && (
            <div className="transfer-success">
              Transaction sent! Hash:{" "}
              <a
                href={`https://etherscan.io/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer">
                {transactionHash.substring(0, 10)}...
              </a>
            </div>
          )}

          <button
            className="refresh-button"
            onClick={loadTokenInfo}
            disabled={isLoading}>
            Refresh Balance
          </button>
        </div>
      ) : error ? (
        <div className="token-error">
          {error}
          <button onClick={loadTokenInfo}>Retry</button>
        </div>
      ) : (
        <div>No token information available.</div>
      )}
    </div>
  );
};

export default TokenTransfer;
