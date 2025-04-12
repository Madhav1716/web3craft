# Web3Craft React Application

This project was bootstrapped with [Web3Craft CLI](https://github.com/Madhav1716/web3craft).

## Getting Started

### Installation

```bash
npm install --legacy-peer-deps
```

If you encounter dependency conflicts, run:

```bash
node fix-dependencies.js
```

### Development

```bash
npm start
```

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Troubleshooting

### Chain Import Errors

If you see errors about missing chains like `base`, `zksync`, or `linea`, edit your `src/config/wagmi.ts` file to only use the chains that are imported:

```typescript
// Only use these imported chains
export const chains = [polygon, mainnet, optimism, arbitrum];
```

### RainbowKit Errors

If you see errors with RainbowKitProvider props, make sure you're using a consistent version of RainbowKit with wagmi. The fix-dependencies.js script can help resolve these issues.

## Features

This application includes:

- React + TypeScript
- Web3 wallet connection via RainbowKit
- Blockchain interaction via wagmi/viem
- Tailwind CSS for styling
- Support for multiple networks

## Configuration

### WalletConnect Project ID

This project requires a WalletConnect v2 Project ID. Replace the placeholder in `src/config/wagmi.ts` with your actual Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).

## Learn More

- [React Documentation](https://reactjs.org/)
- [wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
