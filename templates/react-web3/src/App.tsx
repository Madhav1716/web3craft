import React from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "./config/wagmi";
import Home from "./pages/Home";

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Home />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
