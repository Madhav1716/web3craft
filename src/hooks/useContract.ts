import { useMemo } from "react";
import { ethers } from "ethers";
import { useWallet } from "../contexts/WalletContext";
import { ContractService } from "../services/ContractService";
import { ContractCall, TokenInfo, NFTInfo } from "../types/blockchain";

export const useContract = () => {
  const { walletState } = useWallet();

  // Create contract service instance when wallet is connected
  const contractService = useMemo(() => {
    if (
      walletState.isConnected &&
      walletState.provider &&
      walletState.signer &&
      walletState.chainId
    ) {
      return new ContractService(
        walletState.provider,
        walletState.signer,
        walletState.chainId
      );
    }
    return null;
  }, [
    walletState.isConnected,
    walletState.provider,
    walletState.signer,
    walletState.chainId,
  ]);

  /**
   * Call a contract method
   */
  const callContract = async (contractCall: ContractCall): Promise<any> => {
    if (!contractService) {
      throw new Error("Wallet not connected");
    }
    return contractService.callContract(contractCall);
  };

  /**
   * Get token contract
   */
  const getTokenContract = (useSigner = true): ethers.Contract | null => {
    if (!contractService) {
      return null;
    }
    return contractService.getTokenContract(useSigner);
  };

  /**
   * Get NFT contract
   */
  const getNFTContract = (useSigner = true): ethers.Contract | null => {
    if (!contractService) {
      return null;
    }
    return contractService.getNFTContract(useSigner);
  };

  /**
   * Get token information
   */
  const getTokenInfo = async (
    tokenAddress: string,
    accountAddress?: string
  ): Promise<TokenInfo> => {
    if (!contractService) {
      throw new Error("Wallet not connected");
    }

    const address = accountAddress || walletState.address;
    if (!address) {
      throw new Error("No account address provided");
    }

    return contractService.getTokenInfo(tokenAddress, address);
  };

  /**
   * Transfer tokens
   */
  const transferTokens = async (
    tokenAddress: string,
    to: string,
    amount: string
  ): Promise<string> => {
    if (!contractService) {
      throw new Error("Wallet not connected");
    }

    return contractService.transferTokens(tokenAddress, to, amount);
  };

  /**
   * Get NFT information
   */
  const getNFTInfo = async (
    nftAddress: string,
    tokenId: string
  ): Promise<NFTInfo | null> => {
    if (!contractService) {
      throw new Error("Wallet not connected");
    }

    return contractService.getNFTInfo(nftAddress, tokenId);
  };

  /**
   * Transfer NFT
   */
  const transferNFT = async (
    nftAddress: string,
    to: string,
    tokenId: string
  ): Promise<string> => {
    if (!contractService || !walletState.address) {
      throw new Error("Wallet not connected");
    }

    return contractService.transferNFT(
      nftAddress,
      walletState.address,
      to,
      tokenId
    );
  };

  return {
    isConnected: !!contractService,
    callContract,
    getTokenContract,
    getNFTContract,
    getTokenInfo,
    transferTokens,
    getNFTInfo,
    transferNFT,
  };
};
