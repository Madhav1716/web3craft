import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletState } from "../types/blockchain";
import { DEFAULT_NETWORK, NETWORKS, NetworkConfig } from "../config/blockchain";

interface WalletContextType {
  walletState: WalletState;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
  sendTransaction: (to: string, value: string) => Promise<string | null>;
}

const initialWalletState: WalletState = {
  isConnected: false,
  address: null,
  provider: null,
  signer: null,
  chainId: null,
  balance: null,
  error: null,
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletState, setWalletState] =
    useState<WalletState>(initialWalletState);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            1: NETWORKS.ethereum.rpcUrls[0],
            5: NETWORKS.goerli.rpcUrls[0],
            137: NETWORKS.polygon.rpcUrls[0],
            80001: NETWORKS.mumbai.rpcUrls[0],
          },
        },
      },
    };

    const web3Modal = new Web3Modal({
      network: DEFAULT_NETWORK.chainName,
      cacheProvider: true,
      providerOptions,
    });

    setWeb3Modal(web3Modal);

    if (web3Modal.cachedProvider) {
      connectWallet();
    }

    window.ethereum?.on("accountsChanged", handleAccountsChanged);
    window.ethereum?.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      updateWalletState(accounts[0]);
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const updateWalletState = async (address: string) => {
    try {
      if (!walletState.provider) return;

      const chainId = (await walletState.provider.getNetwork()).chainId;
      const signer = walletState.provider.getSigner();
      const balanceWei = await walletState.provider.getBalance(address);
      const balance = ethers.utils.formatEther(balanceWei);

      setWalletState({
        ...walletState,
        isConnected: true,
        address,
        signer,
        chainId,
        balance,
        error: null,
      });
    } catch (error) {
      setWalletState({
        ...walletState,
        error: "Failed to update wallet state",
      });
      console.error("Error updating wallet state:", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!web3Modal) return;

      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const accounts = await provider.listAccounts();

      setWalletState({
        ...walletState,
        provider,
        isConnected: true,
      });

      if (accounts.length > 0) {
        await updateWalletState(accounts[0]);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setWalletState({
        ...initialWalletState,
        error: "Failed to connect wallet",
      });
    }
  };

  const disconnectWallet = () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }
    setWalletState(initialWalletState);
  };

  const switchNetwork = async (chainId: number) => {
    try {
      if (!window.ethereum || !walletState.provider) {
        throw new Error("No Ethereum provider detected");
      }

      const networkConfig = Object.values(NETWORKS).find(
        (network) => network.chainId === chainId
      );

      if (!networkConfig) {
        throw new Error(`Network with chainId ${chainId} not supported`);
      }

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          await addNetwork(networkConfig);
        } else {
          throw switchError;
        }
      }
    } catch (error) {
      console.error("Error switching network:", error);
      setWalletState({
        ...walletState,
        error: "Failed to switch network",
      });
    }
  };

  const addNetwork = async (networkConfig: NetworkConfig) => {
    if (!window.ethereum) {
      throw new Error("No Ethereum provider detected");
    }

    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${networkConfig.chainId.toString(16)}`,
          chainName: networkConfig.chainName,
          nativeCurrency: networkConfig.nativeCurrency,
          rpcUrls: networkConfig.rpcUrls,
          blockExplorerUrls: networkConfig.blockExplorerUrls,
        },
      ],
    });
  };

  const sendTransaction = async (
    to: string,
    value: string
  ): Promise<string | null> => {
    try {
      if (!walletState.signer) {
        throw new Error("Wallet not connected");
      }

      const tx = await walletState.signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(value),
      });

      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error("Error sending transaction:", error);
      setWalletState({
        ...walletState,
        error: "Failed to send transaction",
      });
      return null;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        walletState,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        sendTransaction,
      }}>
      {children}
    </WalletContext.Provider>
  );
};
