import React from "react";
import { useTheme } from "../contexts/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-xl backdrop-blur-sm bg-white/20 dark:bg-dark-700/30 border border-gray-200/30 dark:border-dark-600/30 text-primary-600 dark:text-white hover:bg-white/30 dark:hover:bg-dark-600/40 shadow-sm hover:shadow transition-all ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
      {theme === "dark" ? (
        <div className="relative animate-pulse-slow">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-300 rounded-full opacity-30 blur"></div>
          <SunIcon className="relative z-10 w-5 h-5" />
        </div>
      ) : (
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-30 blur"></div>
          <MoonIcon className="relative z-10 w-5 h-5" />
        </div>
      )}
    </button>
  );
};

// Simple SVG icons
const SunIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

export default ThemeToggle;
