export interface NetworkConfig {
  chainId: number;
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrls: string[];
}

export interface ContractAddresses {
  [chainId: number]: {
    [contractName: string]: string;
  };
}

export const NETWORKS: { [key: string]: NetworkConfig } = {
  ethereum: {
    chainId: 1,
    chainName: "Ethereum Mainnet",
    rpcUrls: ["https://mainnet.infura.io/v3/YOUR_INFURA_KEY"],
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://etherscan.io"],
  },
  polygon: {
    chainId: 137,
    chainName: "Polygon Mainnet",
    rpcUrls: ["https://polygon-rpc.com"],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  goerli: {
    chainId: 5,
    chainName: "Goerli Testnet",
    rpcUrls: ["https://goerli.infura.io/v3/YOUR_INFURA_KEY"],
    nativeCurrency: {
      name: "Goerli ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },
  mumbai: {
    chainId: 80001,
    chainName: "Mumbai Testnet",
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
};

export const DEFAULT_NETWORK = NETWORKS.goerli;

export const CONTRACT_ADDRESSES: ContractAddresses = {
  1: {
    // Ethereum Mainnet contracts
    tokenContract: "0x0000000000000000000000000000000000000000",
    nftContract: "0x0000000000000000000000000000000000000000",
  },
  5: {
    // Goerli Testnet contracts
    tokenContract: "0x0000000000000000000000000000000000000000",
    nftContract: "0x0000000000000000000000000000000000000000",
  },
  137: {
    // Polygon Mainnet contracts
    tokenContract: "0x0000000000000000000000000000000000000000",
    nftContract: "0x0000000000000000000000000000000000000000",
  },
  80001: {
    // Mumbai Testnet contracts
    tokenContract: "0x0000000000000000000000000000000000000000",
    nftContract: "0x0000000000000000000000000000000000000000",
  },
};
