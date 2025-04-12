import React from "react";
import { useAccount, useNetwork } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface HeroProps {
  projectName: string;
}

const Hero: React.FC<HeroProps> = ({ projectName }) => {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 z-0" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-96 -left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-24 right-24 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                Web3 Development Simplified
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900 dark:text-white">
                  Welcome to{" "}
                </span>
                <span className="block text-blue-600 dark:text-blue-400">
                  {projectName}
                </span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Your journey into Web3 development starts here. Build
              decentralized applications with the power of blockchain
              technology, all using modern React components and hooks.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              {!isConnected ? (
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:justify-center lg:justify-start">
                  <ConnectButton />
                  <a
                    href="#docs"
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-3 md:text-lg md:px-8">
                    View Docs
                  </a>
                </div>
              ) : (
                <div className="mt-3 rounded-md shadow sm:mt-0">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-lg shadow-lg max-w-md">
                    <p className="font-medium">
                      Connected to {chain?.name || "Unknown Network"}
                    </p>
                    <p className="text-sm mt-1 text-blue-100">
                      {address?.substring(0, 6)}...
                      {address?.substring(address.length - 4)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-blue-500 rounded-full mb-4">
                      <svg
                        className="h-8 w-8 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Ready to Use Components
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      All the essential Web3 components you need to build your
                      dApp are pre-configured and ready to use
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="space-y-4">
                      {[
                        "Wallet Connection",
                        "Chain Selection",
                        "Token Balance",
                        "Smart Contracts",
                      ].map((feature) => (
                        <div key={feature} className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-green-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
