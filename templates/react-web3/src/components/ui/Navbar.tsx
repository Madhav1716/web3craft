import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Web3CraftLogo from "./Web3CraftLogo";
import { useAccount } from "wagmi";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected } = useAccount();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Web3CraftLogo variant="default" size="md" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="#features"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Features
              </a>
              <a
                href="#docs"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Docs
              </a>
              <a
                href="#explorer"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Explorer
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ConnectButton />
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden ml-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:hidden bg-white dark:bg-gray-900`}>
        <div className="pt-2 pb-3 space-y-1">
          <a
            href="#features"
            className="text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
            Features
          </a>
          <a
            href="#docs"
            className="text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
            Docs
          </a>
          <a
            href="#explorer"
            className="text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">
            Explorer
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
