import { ethers } from "ethers";

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  chainId: number | null;
  balance: string | null;
  error: string | null;
}

export interface TransactionRequest {
  to: string;
  value?: string;
  data?: string;
  gasLimit?: string;
  gasPrice?: string;
}

export interface TransactionResponse {
  hash: string;
  wait: () => Promise<TransactionReceipt>;
}

export interface TransactionReceipt {
  blockHash: string;
  blockNumber: number;
  contractAddress: string | null;
  from: string;
  status: number;
  to: string;
  transactionHash: string;
  transactionIndex: number;
}

export interface ContractCall {
  contractAddress: string;
  abi: ethers.ContractInterface;
  method: string;
  params: any[];
}

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
}

export interface NFTInfo {
  tokenId: string;
  contractAddress: string;
  name: string;
  description: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
}

export interface BlockInfo {
  number: number;
  hash: string;
  timestamp: number;
  parentHash: string;
  nonce: string;
  difficulty: number;
  gasLimit: string;
  gasUsed: string;
}

export type NetworkName = "ethereum" | "polygon" | "goerli" | "mumbai";
