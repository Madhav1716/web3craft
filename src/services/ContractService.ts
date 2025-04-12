import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from "../config/blockchain";
import ERC20TokenABI from "../contracts/ERC20Token.json";
import ERC721TokenABI from "../contracts/ERC721Token.json";
import { TokenInfo, NFTInfo, ContractCall } from "../types/blockchain";

export class ContractService {
  private provider: ethers.providers.Web3Provider;
  private signer: ethers.Signer;
  private chainId: number;

  constructor(
    provider: ethers.providers.Web3Provider,
    signer: ethers.Signer,
    chainId: number
  ) {
    this.provider = provider;
    this.signer = signer;
    this.chainId = chainId;
  }

  /**
   * Get a contract instance
   */
  getContract(
    contractAddress: string,
    abi: ethers.ContractInterface,
    useSigner = true
  ): ethers.Contract {
    return new ethers.Contract(
      contractAddress,
      abi,
      useSigner ? this.signer : this.provider
    );
  }

  /**
   * Get token contract
   */
  getTokenContract(useSigner = true): ethers.Contract | null {
    const chainContracts = CONTRACT_ADDRESSES[this.chainId];
    if (!chainContracts || !chainContracts.tokenContract) {
      return null;
    }

    return this.getContract(
      chainContracts.tokenContract,
      ERC20TokenABI.abi,
      useSigner
    );
  }

  /**
   * Get NFT contract
   */
  getNFTContract(useSigner = true): ethers.Contract | null {
    const chainContracts = CONTRACT_ADDRESSES[this.chainId];
    if (!chainContracts || !chainContracts.nftContract) {
      return null;
    }

    return this.getContract(
      chainContracts.nftContract,
      ERC721TokenABI.abi,
      useSigner
    );
  }

  /**
   * Generic contract call function
   */
  async callContract(contractCall: ContractCall): Promise<any> {
    try {
      const contract = this.getContract(
        contractCall.contractAddress,
        contractCall.abi
      );

      return await contract[contractCall.method](...contractCall.params);
    } catch (error) {
      console.error("Error calling contract:", error);
      throw error;
    }
  }

  /**
   * Get token information and balance
   */
  async getTokenInfo(
    tokenAddress: string,
    accountAddress: string
  ): Promise<TokenInfo> {
    try {
      const tokenContract = this.getContract(
        tokenAddress,
        ERC20TokenABI.abi,
        false
      );

      const [name, symbol, decimals, balanceWei] = await Promise.all([
        tokenContract.name(),
        tokenContract.symbol(),
        tokenContract.decimals(),
        tokenContract.balanceOf(accountAddress),
      ]);

      const balance = ethers.utils.formatUnits(balanceWei, decimals);

      return {
        address: tokenAddress,
        name,
        symbol,
        decimals,
        balance,
      };
    } catch (error) {
      console.error("Error getting token info:", error);
      throw error;
    }
  }

  /**
   * Transfer tokens
   */
  async transferTokens(
    tokenAddress: string,
    to: string,
    amount: string
  ): Promise<string> {
    try {
      const tokenContract = this.getContract(tokenAddress, ERC20TokenABI.abi);
      const decimals = await tokenContract.decimals();
      const amountWei = ethers.utils.parseUnits(amount, decimals);

      const tx = await tokenContract.transfer(to, amountWei);
      await tx.wait();

      return tx.hash;
    } catch (error) {
      console.error("Error transferring tokens:", error);
      throw error;
    }
  }

  /**
   * Get NFT information
   */
  async getNFTInfo(
    nftAddress: string,
    tokenId: string
  ): Promise<NFTInfo | null> {
    try {
      const nftContract = this.getContract(
        nftAddress,
        ERC721TokenABI.abi,
        false
      );

      // Get token URI
      const tokenURI = await nftContract.tokenURI(tokenId);

      // Fetch metadata (if IPFS, you may need to use IPFS gateway)
      let metadata;
      try {
        const response = await fetch(tokenURI);
        metadata = await response.json();
      } catch (error) {
        console.error("Error fetching NFT metadata:", error);
        metadata = {
          name: "Unknown NFT",
          description: "Metadata could not be loaded",
          image: "",
          attributes: [],
        };
      }

      return {
        tokenId,
        contractAddress: nftAddress,
        name: metadata.name || "Unknown NFT",
        description: metadata.description || "",
        image: metadata.image || "",
        attributes: metadata.attributes || [],
      };
    } catch (error) {
      console.error("Error getting NFT info:", error);
      return null;
    }
  }

  /**
   * Transfer NFT
   */
  async transferNFT(
    nftAddress: string,
    from: string,
    to: string,
    tokenId: string
  ): Promise<string> {
    try {
      const nftContract = this.getContract(nftAddress, ERC721TokenABI.abi);

      const tx = await nftContract.transferFrom(from, to, tokenId);
      await tx.wait();

      return tx.hash;
    } catch (error) {
      console.error("Error transferring NFT:", error);
      throw error;
    }
  }
}
