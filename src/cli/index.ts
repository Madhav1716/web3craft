#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";

const TEMPLATE_DIR = path.join(__dirname, "../../templates/react-web3");

type Blockchain =
  | "ethereum"
  | "polygon"
  | "optimism"
  | "arbitrum"
  | "base"
  | "zksync"
  | "linea";
type Feature =
  | "darkMode"
  | "tokenBalance"
  | "txHistory"
  | "nftGallery"
  | "tokenSwap"
  | "staking"
  | "governance";

const CHAINS: Record<Blockchain, string> = {
  ethereum: "mainnet",
  polygon: "polygon",
  optimism: "optimism",
  arbitrum: "arbitrum",
  base: "base",
  zksync: "zksync",
  linea: "linea",
};

const CHAIN_NAMES: Record<Blockchain, string> = {
  ethereum: "Ethereum Mainnet",
  polygon: "Polygon",
  optimism: "Optimism",
  arbitrum: "Arbitrum",
  base: "Base",
  zksync: "zkSync Era",
  linea: "Linea",
};

async function main() {
  console.log(chalk.blue.bold("Web3Craft - Craft Your Web3 Masterpiece"));
  console.log(chalk.gray("Building beautiful Web3 applications with ease"));
  console.log();

  // Get app name from command line arguments
  const appName = process.argv[2];
  if (!appName) {
    console.log(chalk.red("Please provide an app name:"));
    console.log(chalk.yellow("npx create-web3craft-app my-app"));
    process.exit(1);
  }

  const targetDir = path.join(process.cwd(), appName);

  // Check if directory already exists
  if (fs.existsSync(targetDir)) {
    console.log(
      chalk.red(
        `Directory ${appName} already exists. Please choose a different name.`
      )
    );
    process.exit(1);
  }

  // Ask for features
  const { features } = await inquirer.prompt<{ features: Feature[] }>([
    {
      type: "checkbox",
      name: "features",
      message: "Select features to include:",
      choices: [
        { name: "Dark Mode", value: "darkMode", checked: true },
        { name: "Token Balance Display", value: "tokenBalance", checked: true },
        { name: "Transaction History", value: "txHistory", checked: false },
        { name: "NFT Gallery", value: "nftGallery", checked: false },
        { name: "Token Swap", value: "tokenSwap", checked: false },
        { name: "Staking", value: "staking", checked: false },
        { name: "Governance", value: "governance", checked: false },
      ],
    },
  ]);

  // Ask for primary blockchain
  const { blockchain } = await inquirer.prompt<{ blockchain: Blockchain }>([
    {
      type: "list",
      name: "blockchain",
      message: "Select primary blockchain:",
      choices: Object.entries(CHAIN_NAMES).map(([value, name]) => ({
        name,
        value,
      })),
    },
  ]);

  // Ask for additional blockchains
  const { additionalChains } = await inquirer.prompt<{
    additionalChains: Blockchain[];
  }>([
    {
      type: "checkbox",
      name: "additionalChains",
      message: "Select additional blockchains to support:",
      choices: Object.entries(CHAIN_NAMES)
        .filter(([value]) => value !== blockchain)
        .map(([value, name]) => ({
          name,
          value,
        })),
    },
  ]);

  const spinner = ora("Creating your Web3 application...").start();

  try {
    // Create project directory and ensure all necessary subdirectories exist
    fs.mkdirSync(targetDir, { recursive: true });
    fs.mkdirSync(path.join(targetDir, "src"), { recursive: true });
    fs.mkdirSync(path.join(targetDir, "src/components"), { recursive: true });
    fs.mkdirSync(path.join(targetDir, "src/config"), { recursive: true });
    fs.mkdirSync(path.join(targetDir, "src/pages"), { recursive: true });
    fs.mkdirSync(path.join(targetDir, "public"), { recursive: true });

    // Copy template files
    copyDir(TEMPLATE_DIR, targetDir);

    // Update package.json with app name
    const packageJsonPath = path.join(targetDir, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.name = appName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Configure features
    configureFeatures(targetDir, features, blockchain, additionalChains);

    spinner.succeed(chalk.green("Project created successfully!"));

    console.log("\nNext steps:");
    console.log(chalk.cyan(`  cd ${appName}`));
    console.log(chalk.cyan("  npm install"));
    console.log(chalk.cyan("  npm start"));
    console.log("\nHappy coding! 🚀");
  } catch (error) {
    spinner.fail(chalk.red("Failed to create project"));
    console.error(error);
    process.exit(1);
  }
}

function copyDir(src: string, dest: string) {
  // Ensure source directory exists
  if (!fs.existsSync(src)) {
    throw new Error(`Template directory not found: ${src}`);
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      // Ensure destination directory exists
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function configureFeatures(
  targetDir: string,
  features: Feature[],
  blockchain: Blockchain,
  additionalChains: Blockchain[]
) {
  // Update wagmi.ts configuration
  const wagmiConfigPath = path.join(targetDir, "src/config/wagmi.ts");
  let wagmiConfig = fs.readFileSync(wagmiConfigPath, "utf8");

  // Update chains based on selected blockchains
  const allChains = [
    CHAINS[blockchain],
    ...additionalChains.map((chain) => CHAINS[chain]),
  ];
  wagmiConfig = wagmiConfig.replace(
    /export const chains = \[.*?\];/,
    `export const chains = [${allChains.join(", ")}];`
  );

  fs.writeFileSync(wagmiConfigPath, wagmiConfig);

  // Add feature-specific code
  if (features.includes("tokenBalance")) {
    // Ensure components directory exists
    const componentsDir = path.join(targetDir, "src/components");
    fs.mkdirSync(componentsDir, { recursive: true });

    // Add token balance component
    const tokenBalancePath = path.join(componentsDir, "TokenBalance.tsx");
    fs.writeFileSync(
      tokenBalancePath,
      `
import React from 'react';
import { useBalance } from 'wagmi';

const TokenBalance: React.FC = () => {
  const { data } = useBalance();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Token Balance</h3>
      <p className="text-gray-600 dark:text-gray-300">
        {data?.formatted} {data?.symbol}
      </p>
    </div>
  );
};

export default TokenBalance;
    `
    );
  }

  if (features.includes("tokenSwap")) {
    // Add token swap component
    const tokenSwapPath = path.join(targetDir, "src/components/TokenSwap.tsx");
    fs.writeFileSync(
      tokenSwapPath,
      `
import React from 'react';
import { useAccount, useNetwork } from 'wagmi';

const TokenSwap: React.FC = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Token Swap</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Swap tokens on {chain?.name}
      </p>
    </div>
  );
};

export default TokenSwap;
    `
    );
  }

  if (features.includes("staking")) {
    // Add staking component
    const stakingPath = path.join(targetDir, "src/components/Staking.tsx");
    fs.writeFileSync(
      stakingPath,
      `
import React from 'react';
import { useAccount } from 'wagmi';

const Staking: React.FC = () => {
  const { address } = useAccount();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Staking</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Stake your tokens to earn rewards
      </p>
    </div>
  );
};

export default Staking;
    `
    );
  }

  if (features.includes("governance")) {
    // Add governance component
    const governancePath = path.join(
      targetDir,
      "src/components/Governance.tsx"
    );
    fs.writeFileSync(
      governancePath,
      `
import React from 'react';
import { useAccount } from 'wagmi';

const Governance: React.FC = () => {
  const { address } = useAccount();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Governance</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Participate in protocol governance
      </p>
    </div>
  );
};

export default Governance;
    `
    );
  }

  // Add more feature configurations as needed
}

main().catch(console.error);
