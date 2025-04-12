import React, { ReactNode } from "react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, polygon, goerli, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
  darkTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useTheme } from "./ThemeContext";

// You can replace these with your own API keys
const INFURA_API_KEY = "YOUR_INFURA_KEY";
const ALCHEMY_API_KEY = "YOUR_ALCHEMY_KEY";

// Configure the chains and providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, goerli, polygonMumbai],
  [
    infuraProvider({ apiKey: INFURA_API_KEY }),
    alchemyProvider({ apiKey: ALCHEMY_API_KEY }),
    publicProvider(),
  ]
);

// Custom RainbowKit themes
const customLightTheme = lightTheme({
  accentColor: "#0ea5e9", // primary-500
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
});

const customDarkTheme = darkTheme({
  accentColor: "#8b5cf6", // secondary-500
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
});

// Set up wagmi config with connectors
const { connectors } = getDefaultWallets({
  appName: "BlockUI",
  projectId: "YOUR_PROJECT_ID", // Get one at https://cloud.walletconnect.com
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

interface Web3ProviderProps {
  children: ReactNode;
}

const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const { theme } = useTheme();

  // Dynamically choose theme based on current app theme
  const rainbowKitTheme = theme === "dark" ? customDarkTheme : customLightTheme;

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider
        chains={chains}
        theme={rainbowKitTheme}
        modalSize="compact"
        appInfo={{
          appName: "BlockUI",
          learnMoreUrl: "https://docs.blockui.com",
        }}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
