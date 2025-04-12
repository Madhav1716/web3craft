import React, { useState } from "react";
import { useNFTs, NFT } from "../hooks/useNFTs";
import { useAccount } from "wagmi";

interface NFTViewerProps {
  address?: string;
  limit?: number;
  className?: string;
  chain?: string;
  layout?: "grid" | "list";
  showDetails?: boolean;
}

/**
 * NFTViewer component displays NFTs owned by an address
 *
 * @param address - Wallet address to fetch NFTs for (defaults to connected wallet)
 * @param limit - Maximum number of NFTs to display
 * @param className - Additional CSS classes
 * @param chain - Blockchain to fetch NFTs from
 * @param layout - Display layout (grid or list)
 * @param showDetails - Whether to show detailed NFT information
 */
const NFTViewer: React.FC<NFTViewerProps> = ({
  address,
  limit = 12,
  className = "",
  chain = "ethereum",
  layout = "grid",
  showDetails = true,
}) => {
  const { address: connectedAddress } = useAccount();
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  // Use the provided address or fallback to connected wallet address
  const targetAddress = address || connectedAddress;

  const { nfts, isLoading, error } = useNFTs({
    address: targetAddress,
    chain,
    limit,
  });

  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-xl aspect-square mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`w-full p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-800 dark:text-red-200 ${className}`}>
        <p>Error loading NFTs: {error.message}</p>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div
        className={`w-full p-6 rounded-xl bg-gray-50 dark:bg-dark-800/50 border border-gray-200 dark:border-dark-700/50 ${className}`}>
        <div className="flex flex-col items-center justify-center text-center">
          <svg
            className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
            No NFTs Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {targetAddress
              ? `This address doesn't have any NFTs on ${chain}.`
              : "Connect your wallet to view your NFTs."}
          </p>
        </div>
      </div>
    );
  }

  const handleNFTClick = (nft: NFT) => {
    setSelectedNFT(nft === selectedNFT ? null : nft);
  };

  const renderNFTCard = (nft: NFT) => {
    return (
      <div
        key={`${nft.contractAddress}-${nft.tokenId}`}
        onClick={() => handleNFTClick(nft)}
        className={`
          overflow-hidden rounded-xl border border-gray-200 dark:border-dark-800/80 bg-white dark:bg-dark-900
          transition-all duration-300 hover:shadow-md dark:hover:shadow-dark-700/20
          ${
            selectedNFT === nft
              ? "ring-2 ring-primary-500 dark:ring-primary-400"
              : ""
          }
          ${layout === "list" ? "flex items-start" : ""}
          cursor-pointer
        `}>
        <div
          className={`${
            layout === "list"
              ? "w-24 h-24 flex-shrink-0"
              : "aspect-square w-full"
          } overflow-hidden relative`}>
          <img
            src={nft.image}
            alt={nft.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={(e) =>
              ((e.target as HTMLImageElement).src =
                "https://via.placeholder.com/400?text=No+Image")
            }
          />
        </div>

        <div className={`p-3 ${layout === "list" ? "flex-1" : ""}`}>
          <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
            {nft.name}
          </h3>
          {showDetails && (
            <>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {nft.description || "No description"}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {nft.attributes?.slice(0, 2).map((attr, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-gray-100 dark:bg-dark-800 rounded-full text-xs text-gray-700 dark:text-gray-300">
                    {attr.trait_type}: {attr.value}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {selectedNFT && (
        <div className="mb-6 p-4 rounded-xl bg-white dark:bg-dark-800 shadow-lg">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <img
                src={selectedNFT.image}
                alt={selectedNFT.name}
                className="w-full rounded-xl"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/400?text=No+Image")
                }
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedNFT.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {selectedNFT.description || "No description"}
              </p>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Details
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Contract Address
                    </span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {selectedNFT.contractAddress.substring(0, 6)}...
                      {selectedNFT.contractAddress.substring(38)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Token ID
                    </span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {selectedNFT.tokenId}
                    </span>
                  </div>
                </div>
              </div>

              {selectedNFT.attributes && selectedNFT.attributes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Attributes
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedNFT.attributes.map((attr, i) => (
                      <div
                        key={i}
                        className="p-2 bg-gray-50 dark:bg-dark-700 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {attr.trait_type}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {attr.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedNFT(null)}
                className="mt-4 px-4 py-2 bg-gray-100 dark:bg-dark-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={
          layout === "grid"
            ? `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`
            : `flex flex-col gap-3`
        }>
        {nfts.map(renderNFTCard)}
      </div>
    </div>
  );
};

export default NFTViewer;
