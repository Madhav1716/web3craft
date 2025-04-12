import React, { useState } from "react";
import { useWallet } from "../contexts/WalletContext";

interface TransactionFormProps {
  className?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ className }) => {
  const { walletState, sendTransaction } = useWallet();

  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTransactionHash(null);
    setIsSubmitting(true);

    try {
      if (!walletState.isConnected) {
        throw new Error("Wallet not connected");
      }

      const hash = await sendTransaction(recipientAddress, amount);

      if (hash) {
        setTransactionHash(hash);
        setRecipientAddress("");
        setAmount("");
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error: any) {
      setError(error.message || "Transaction failed");
      console.error("Transaction error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`transaction-form ${className || ""}`}>
      <h3>Send ETH</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipient-address">Recipient Address:</label>
          <input
            id="recipient-address"
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="0x..."
            required
            disabled={!walletState.isConnected || isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (ETH):</label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            required
            disabled={!walletState.isConnected || isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={
            !walletState.isConnected ||
            isSubmitting ||
            !recipientAddress ||
            !amount
          }>
          {isSubmitting ? "Processing..." : "Send"}
        </button>
      </form>

      {error && <div className="transaction-error">Error: {error}</div>}

      {transactionHash && (
        <div className="transaction-success">
          Transaction sent! Hash:{" "}
          <a
            href={`https://etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer">
            {transactionHash.substring(0, 10)}...
          </a>
        </div>
      )}

      {walletState.balance && (
        <div className="wallet-balance">
          Your Balance: {walletState.balance} ETH
        </div>
      )}
    </div>
  );
};

export default TransactionForm;
