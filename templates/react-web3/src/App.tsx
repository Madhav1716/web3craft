import React, { useState, useEffect } from "react";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "./config/wagmi";
import Home from "./pages/Home";

import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for user preference
  useEffect(() => {
    // Check if user prefers dark mode
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Listen for changes in color scheme preference
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        setIsDarkMode(event.matches);
        if (event.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      });
  }, []);

  // App initialization loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for a better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-blue-600 rounded-lg mb-4 flex items-center justify-center text-white text-3xl font-bold">
              W3C
            </div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Web3Craft
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Loading your Web3 experience...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={isDarkMode ? darkTheme() : lightTheme()}
        coolMode>
        <div className={isDarkMode ? "dark" : ""}>
          <Home />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
