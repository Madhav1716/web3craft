import { createConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import { configureChains } from "wagmi";

export const chains = [polygon, mainnet, optimism, arbitrum];

const projectId = "YOUR_WALLETCONNECT_PROJECT_ID"; // Replace with your WalletConnect Project ID

// Configure chains for the connectors to support
const { chains: configuredChains, publicClient } = configureChains(chains, [
  publicProvider(),
]);

// Set up connectors
const { connectors } = getDefaultWallets({
  appName: "Web3Craft Application",
  projectId,
  chains: configuredChains,
});

// Create the wagmi config
export const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { projectId };
