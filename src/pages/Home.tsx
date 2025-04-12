import React from "react";
import { useAccount } from "wagmi";
import WalletConnectButton from "../components/WalletConnectButton";
import ThemeToggle from "../components/ThemeToggle";
import { useAccountBalance } from "../hooks/useAccountBalance";
import { WavyBackground } from "../components/ui/wavy-background";
import { Sparkles } from "../components/ui/sparkles";
import { MagneticCard } from "../components/ui/magnetic-card";

const Home: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { formattedBalance, symbol } = useAccountBalance();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-800 dark:to-dark-900 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Hero section background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-400/10 dark:bg-primary-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-secondary-400/10 dark:bg-secondary-900/20 rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute bottom-0 left-1/3 w-64 h-64 bg-primary-400/10 dark:bg-primary-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 blur-sm opacity-70 rounded-lg"></div>
              <Sparkles className="relative z-10" speed={0.5} count={10}>
                <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-600">
                  BlockUI
                </h1>
              </Sparkles>
            </div>
            <span className="ml-3 text-xs font-medium bg-secondary-100 dark:bg-dark-600 text-secondary-800 dark:text-secondary-300 px-3 py-1 rounded-full tracking-wider">
              BOILERPLATE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <WalletConnectButton />
          </div>
        </header>

        {/* Hero Section */}
        <main className="py-12">
          <WavyBackground
            className="py-20 px-8"
            containerClassName="relative mt-8 md:mt-20 mb-32 max-w-4xl mx-auto"
            colors={["#6366f1", "#8b5cf6", "#d946ef", "#f472b6"]}
            waveOpacity={0.6}>
            <section className="text-center">
              <Sparkles className="w-full">
                <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-none">
                  The Future of{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                    Web3
                  </span>{" "}
                  Development
                </h2>
              </Sparkles>
              <p className="text-xl mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A powerful, enterprise-grade boilerplate for building
                decentralized applications with unprecedented speed and style.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl shadow-lg shadow-primary-500/20 dark:shadow-primary-500/10 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all">
                  Get Started
                </button>
                <button className="px-8 py-3 font-medium bg-white dark:bg-dark-700 text-gray-800 dark:text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-gray-200 dark:border-dark-600">
                  View Documentation
                </button>
              </div>
            </section>
          </WavyBackground>

          {/* 3D Mockup (simulated with shadow effects) */}
          <div className="relative mt-20 mx-auto w-full max-w-4xl">
            <MagneticCard className="overflow-hidden rounded-xl shadow-2xl transform perspective-1000 bg-white dark:bg-dark-700 p-5 border border-gray-200 dark:border-dark-600">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  App.tsx
                </div>
              </div>
              <div className="font-mono text-sm text-left overflow-hidden bg-gray-50 dark:bg-dark-800 p-4 rounded-lg">
                <pre className="text-gray-800 dark:text-gray-300">
                  <code>{`import { ThemeProvider, Web3Provider } from 'blockui';

function App() {
  return (
    <ThemeProvider>
      <Web3Provider>
        <YourAwesomeApp />
      </Web3Provider>
    </ThemeProvider>
  );
}`}</code>
                </pre>
              </div>
            </MagneticCard>
          </div>

          {/* Features Section */}
          <section className="py-16 bg-white dark:bg-dark-800 rounded-3xl shadow-xl mb-20">
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center mb-16">
                <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">
                  FEATURES
                </h3>
                <h2 className="text-4xl font-bold mb-8">Everything You Need</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Built with modern technologies and best practices to
                  accelerate your Web3 development workflow.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <MagneticCard className="p-8 h-full">
                  <FeatureCard
                    title="Wallet Integration"
                    description="Connect to MetaMask, WalletConnect, and other Ethereum wallets with just a few lines of code."
                    icon={<WalletIcon />}
                    gradient="from-blue-500 to-cyan-500"
                  />
                </MagneticCard>
                <MagneticCard className="p-8 h-full">
                  <FeatureCard
                    title="Multi-Chain Support"
                    description="Seamlessly interact with Ethereum, Polygon, and other EVM-compatible networks."
                    icon={<ChainIcon />}
                    gradient="from-purple-500 to-indigo-500"
                  />
                </MagneticCard>
                <MagneticCard className="p-8 h-full">
                  <FeatureCard
                    title="Beautiful UI"
                    description="Responsive, dark-themed UI powered by TailwindCSS for a modern look and feel."
                    icon={<UIIcon />}
                    gradient="from-amber-500 to-orange-500"
                  />
                </MagneticCard>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <MagneticCard className="p-8 h-full">
                  <FeatureCard
                    title="Type-Safe Development"
                    description="Leverages TypeScript and Viem for safer blockchain interactions and fewer runtime errors."
                    icon={<TypeSafeIcon />}
                    gradient="from-green-500 to-emerald-500"
                  />
                </MagneticCard>
                <MagneticCard className="p-8 h-full">
                  <FeatureCard
                    title="Performance Optimized"
                    description="Built with React best practices for optimal performance and user experience."
                    icon={<SpeedIcon />}
                    gradient="from-rose-500 to-red-500"
                  />
                </MagneticCard>
              </div>
            </div>
          </section>

          {/* User Wallet Section (if connected) */}
          {isConnected && (
            <section className="my-24 max-w-3xl mx-auto">
              <MagneticCard className="p-8 backdrop-blur-lg bg-white/60 dark:bg-dark-700/60 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-dark-600">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full inline-block mr-3"></span>
                  Your Wallet
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50/80 dark:bg-dark-600/80 p-5 rounded-xl border border-gray-100 dark:border-dark-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Address
                    </div>
                    <div className="font-mono text-sm break-all bg-white/50 dark:bg-dark-800/50 p-3 rounded-lg">
                      {address}
                    </div>
                  </div>
                  <div className="bg-gray-50/80 dark:bg-dark-600/80 p-5 rounded-xl border border-gray-100 dark:border-dark-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Balance
                    </div>
                    <div className="bg-white/50 dark:bg-dark-800/50 p-3 rounded-lg">
                      <span className="text-3xl font-semibold">
                        {formattedBalance}
                      </span>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">
                        {symbol}
                      </span>
                    </div>
                  </div>
                </div>
              </MagneticCard>
            </section>
          )}

          {/* Testimonials Section */}
          <section className="py-16 mb-20">
            <WavyBackground
              className="py-16 px-8"
              containerClassName="w-full"
              colors={["#10b981", "#3b82f6", "#6366f1", "#8b5cf6"]}
              blur={30}
              waveOpacity={0.4}>
              <div className="text-center mb-16">
                <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">
                  TESTIMONIALS
                </h3>
                <h2 className="text-4xl font-bold mb-2">Loved by Developers</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <MagneticCard className="h-full">
                  <TestimonialCard
                    quote="BlockUI saved us months of development time. The wallet integration and multi-chain support were exactly what we needed."
                    author="Alex Morgan"
                    role="CTO, ChainTech"
                  />
                </MagneticCard>
                <MagneticCard className="h-full">
                  <TestimonialCard
                    quote="The best React boilerplate for Web3 I've ever used. Clean code, amazing UI, and fantastic developer experience."
                    author="Sophia Chen"
                    role="Lead Developer, DeFi Labs"
                  />
                </MagneticCard>
                <MagneticCard className="h-full">
                  <TestimonialCard
                    quote="We rebuilt our entire dApp using BlockUI and cut our development time in half. Absolutely recommend it."
                    author="Marcus Johnson"
                    role="Founder, NFT Marketplace"
                  />
                </MagneticCard>
              </div>
            </WavyBackground>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-gray-200 dark:border-dark-600 text-center pb-12">
          <div className="flex justify-center gap-8 mb-8">
            <a
              href="#"
              className="text-gray-500 hover:text-primary-500 transition-colors">
              <span className="sr-only">GitHub</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-primary-500 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-primary-500 transition-colors">
              <span className="sr-only">Discord</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            </a>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            BlockUI — Blockchain Development Made Easy
            <br />
            <span className="text-xs opacity-70">
              © {new Date().getFullYear()} BlockUI. All rights reserved.
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  gradient,
}) => (
  <div className="bg-white dark:bg-dark-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1">
    <div
      className={`w-14 h-14 mb-5 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
}) => (
  <div className="bg-white dark:bg-dark-700 rounded-xl shadow-lg p-6 relative">
    <div className="absolute -top-3 left-6 text-primary-500 text-5xl">"</div>
    <p className="text-gray-700 dark:text-gray-300 mt-4 mb-6 relative z-10">
      {quote}
    </p>
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
        {author.charAt(0)}
      </div>
      <div className="ml-3">
        <div className="font-semibold">{author}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{role}</div>
      </div>
    </div>
  </div>
);

// SVG icons
const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const ChainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

const UIIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    />
  </svg>
);

const TypeSafeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const SpeedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

export default Home;
