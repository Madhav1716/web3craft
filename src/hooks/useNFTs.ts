import { useState, useEffect } from "react";

export interface NFT {
  id: string;
  name: string;
  description?: string;
  image: string;
  contractAddress: string;
  tokenId: string;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
}

interface UseNFTsOptions {
  address?: string;
  chain?: string;
  limit?: number;
}

interface UseNFTsReturn {
  nfts: NFT[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch NFTs owned by an address
 *
 * @param options - Configuration options
 * @returns NFT data and loading state
 */
export const useNFTs = (options: UseNFTsOptions = {}): UseNFTsReturn => {
  const { address, chain = "ethereum", limit = 20 } = options;
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Mock API endpoint - replace with your actual NFT API call
  const fetchNFTs = async () => {
    if (!address) {
      setNfts([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, you would replace this with an actual API call
      // to a service like Moralis, Alchemy, or OpenSea
      // Example:
      // const response = await fetch(`https://api.example.com/nfts?address=${address}&chain=${chain}&limit=${limit}`);
      // const data = await response.json();

      // Mock data for demonstration
      const mockData: NFT[] = [
        {
          id: "1",
          name: "Example NFT #1",
          description: "This is an example NFT",
          image: "https://via.placeholder.com/500",
          contractAddress: "0x1234567890123456789012345678901234567890",
          tokenId: "1",
          attributes: [
            { trait_type: "Rarity", value: "Common" },
            { trait_type: "Type", value: "Avatar" },
          ],
        },
        {
          id: "2",
          name: "Example NFT #2",
          description: "Another example NFT",
          image: "https://via.placeholder.com/500",
          contractAddress: "0x1234567890123456789012345678901234567890",
          tokenId: "2",
          attributes: [
            { trait_type: "Rarity", value: "Rare" },
            { trait_type: "Type", value: "Collectible" },
          ],
        },
      ];

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setNfts(mockData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch NFTs"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [address, chain, limit]);

  return {
    nfts,
    isLoading,
    error,
    refetch: fetchNFTs,
  };
};
