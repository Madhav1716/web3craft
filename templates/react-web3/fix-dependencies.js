#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("📦 Fixing dependency conflicts...");

// Read package.json
const packageJsonPath = path.join(process.cwd(), "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Fix all common dependency issues
packageJson.dependencies = {
  ...packageJson.dependencies,
  // Fix React version
  react: "^18.2.0",
  "react-dom": "^18.2.0",
  "@types/react": "^18.2.15",
  "@types/react-dom": "^18.2.7",

  // Fix TypeScript for react-scripts
  typescript: "^4.9.5",

  // Pin Web3 libraries to compatible versions
  "@rainbow-me/rainbowkit": "^1.0.8",
  wagmi: "^1.3.10",
  viem: "^1.10.7",

  // Add missing dependencies that might be required
  ajv: "^8.12.0",
};

// Write package.json back
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log("✅ Updated package.json with compatible versions");

// Fix App.tsx to remove projectId prop
const appTsxPath = path.join(process.cwd(), "src/App.tsx");
if (fs.existsSync(appTsxPath)) {
  let appTsxContent = fs.readFileSync(appTsxPath, "utf8");

  // Remove projectId import and prop
  appTsxContent = appTsxContent
    .replace(
      /import\s*{\s*chains,\s*wagmiClient,\s*projectId\s*}\s*from/,
      "import { chains, wagmiClient } from"
    )
    .replace(/projectId=\{projectId\}/, "");

  fs.writeFileSync(appTsxPath, appTsxContent);
  console.log("✅ Fixed App.tsx configuration");
}

// Fix wagmi.ts configuration
const wagmiTsPath = path.join(process.cwd(), "src/config/wagmi.ts");
if (fs.existsSync(wagmiTsPath)) {
  let wagmiTsContent = fs.readFileSync(wagmiTsPath, "utf8");

  // Ensure only imported chains are used
  wagmiTsContent = wagmiTsContent
    .replace(
      /export const chains = \[(.*?)\];/,
      "export const chains = [polygon, mainnet, optimism, arbitrum];"
    )
    .replace(/export { projectId };/, "");

  fs.writeFileSync(wagmiTsPath, wagmiTsContent);
  console.log("✅ Fixed wagmi.ts configuration");
}

// Create .npmrc file to always use legacy-peer-deps
fs.writeFileSync(path.join(process.cwd(), ".npmrc"), "legacy-peer-deps=true\n");
console.log("✅ Created .npmrc file with legacy-peer-deps=true");

console.log("🔄 Reinstalling dependencies...");

try {
  // Clean install
  execSync("npm ci --legacy-peer-deps", { stdio: "inherit" });
  console.log("✅ Dependencies installed successfully!");
} catch (error) {
  console.log("⚠️ Clean install failed, trying regular install...");
  try {
    execSync("npm install --legacy-peer-deps", { stdio: "inherit" });
    console.log("✅ Dependencies installed successfully!");
  } catch (secondError) {
    console.error("❌ Failed to install dependencies. Try running manually:");
    console.error("npm install --force");
  }
}
