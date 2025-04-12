import React, { useEffect } from "react";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";

// Define all supported chains
const supportedChains = [mainnet, polygon, optimism, arbitrum, base];

// Map chain names to their indices in the array for lookup
const chainNameToIndex = {
  ethereum: 0, // mainnet
  polygon: 1,
  optimism: 2,
  arbitrum: 3,
  base: 4,
};

interface BlockUIProviderProps {
  children: React.ReactNode;
  chains?: string[];
  apiKeys?: {
    infura?: string;
    alchemy?: string;
  };
  theme?: {
    accentColor?: string;
    borderRadius?: "small" | "medium" | "large";
    fontStack?: "system" | "rounded";
  };
  darkMode?: boolean;
}

// Wrapper component to handle setting the theme
const ThemeWrapper: React.FC<{
  children: React.ReactNode;
  darkMode?: boolean;
}> = ({ children, darkMode }) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (darkMode !== undefined) {
      setTheme(darkMode ? "dark" : "light");
    }
  }, [darkMode, setTheme]);

  return <>{children}</>;
};

/**
 * BlockUIProvider component provides blockchain connection functionality and theme to the application
 *
 * @param children - Child components
 * @param chains - Blockchain networks to support (defaults to Ethereum Mainnet)
 * @param apiKeys - API keys for blockchain providers
 * @param theme - UI theme customization options
 * @param darkMode - Whether to use dark mode by default
 */
export const BlockUIProvider: React.FC<BlockUIProviderProps> = ({
  children,
  chains = ["ethereum"],
  apiKeys = {},
  theme = {},
  darkMode,
}) => {
  // Configure providers
  const providerConfig = [];

  if (apiKeys.infura) {
    providerConfig.push(infuraProvider({ apiKey: apiKeys.infura }));
  }

  if (apiKeys.alchemy) {
    providerConfig.push(alchemyProvider({ apiKey: apiKeys.alchemy }));
  }

  // Always add public provider as fallback
  providerConfig.push(publicProvider());

  // Select chains based on input names
  const selectedChainIndices = chains.map((chainName) =>
    chainName in chainNameToIndex
      ? chainNameToIndex[chainName as keyof typeof chainNameToIndex]
      : 0
  );

  // Get the actual chain objects
  const selectedChains = selectedChainIndices.map(
    (index) => supportedChains[index]
  );

  // Configure chains with the providers
  const { chains: configuredChains, publicClient } = configureChains(
    selectedChains,
    providerConfig
  );

  // Create Wagmi config
  const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={configuredChains}
        theme={
          darkMode
            ? darkTheme({
                accentColor: theme.accentColor || "#7C3AED",
                borderRadius: theme.borderRadius || "medium",
                fontStack: theme.fontStack || "system",
              })
            : lightTheme({
                accentColor: theme.accentColor || "#7C3AED",
                borderRadius: theme.borderRadius || "medium",
                fontStack: theme.fontStack || "system",
              })
        }>
        <ThemeProvider>
          <ThemeWrapper darkMode={darkMode}>{children}</ThemeWrapper>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
