# Web3Craft

A powerful CLI tool to create Web3 applications with React, TypeScript, and popular Web3 libraries.

## Features

- 🚀 Quick project setup
- ⚛️ React + TypeScript
- 🔗 Multiple blockchain support
- 🎨 Modern UI with Tailwind CSS
- 🔌 Pre-configured Web3 connections
- 🛠️ Built-in components for common Web3 features

## Installation

```bash
npm install -g create-web3craft-app
```

Or use npx:

```bash
npx create-web3craft-app my-web3-app
```

## Usage

1. Create a new project:

```bash
npx create-web3craft-app my-web3-app
```

2. Follow the prompts to:

   - Select features
   - Choose primary blockchain
   - Add additional blockchains

3. Navigate to your project:

```bash
cd my-web3-app
```

4. Install dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm start
```

## Updating

### Updating the CLI Tool

If you installed the CLI tool globally:

```bash
npm update -g create-web3craft-app
```

### Updating Generated Projects

For projects created with Web3Craft:

1. Update dependencies in package.json:

```bash
npm update
```

2. Update specific Web3 packages:

```bash
npm update @rainbow-me/rainbowkit wagmi ethers
```

3. Check the [CHANGELOG.md](CHANGELOG.md) for breaking changes

## Available Features

- Dark Mode
- Token Balance Display
- Transaction History
- NFT Gallery
- Token Swap
- Staking
- Governance

## Supported Blockchains

- Ethereum Mainnet
- Polygon
- Optimism
- Arbitrum
- Base
- zkSync Era
- Linea

## Project Structure

```
my-web3-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── config/        # Blockchain configurations
│   ├── pages/         # Application pages
│   └── styles/        # CSS and styling
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Contributing

We welcome contributions to Web3Craft! Here's how you can help:

1. Fork the repository
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Create a Pull Request

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Madhav1716/web3craft.git
   cd web3craft
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Test your changes:
   ```bash
   npm start
   ```

## License

MIT

## Support

If you find this tool helpful, please consider giving it a ⭐️ on GitHub!

## Contact

For questions or suggestions, please open an issue on GitHub or contact us at [your-email@example.com](mailto:your-email@example.com)
