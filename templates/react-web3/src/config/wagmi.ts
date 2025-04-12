import { createConfig, http } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const chains = [mainnet, polygon, optimism, arbitrum];

export const wagmiClient = createConfig(
  getDefaultConfig({
    appName: "Web3 Application",
    projectId: "YOUR_PROJECT_ID", // Replace with your WalletConnect Project ID
    chains,
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [arbitrum.id]: http(),
    },
  })
);
