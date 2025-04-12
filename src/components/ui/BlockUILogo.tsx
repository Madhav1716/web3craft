import React from "react";

interface BlockUILogoProps {
  className?: string;
  variant?: "default" | "small" | "large";
  showText?: boolean;
}

/**
 * BlockUILogo component
 *
 * @param className - Additional CSS classes
 * @param variant - Size variant of the logo
 * @param showText - Whether to show the text alongside the icon
 */
const BlockUILogo: React.FC<BlockUILogoProps> = ({
  className = "",
  variant = "default",
  showText = true,
}) => {
  // Size mapping based on variant
  const sizeMap = {
    small: "w-6 h-6",
    default: "w-8 h-8",
    large: "w-12 h-12",
  };

  const size = sizeMap[variant];
  const textSize =
    variant === "large"
      ? "text-2xl"
      : variant === "small"
      ? "text-sm"
      : "text-xl";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${size} text-primary-500 relative`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full">
          {/* Base cube */}
          <path
            d="M20 4L4 12V28L20 36L36 28V12L20 4Z"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Inner connections */}
          <path
            d="M20 4V20M20 20V36M20 20L4 12M20 20L36 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Highlight block */}
          <path
            d="M28 8L12 16V24L28 32L36 28V12L28 8Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          {/* Small gem in center */}
          <circle cx="20" cy="20" r="3" fill="currentColor" />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center">
          <span
            className={`font-bold ${textSize} text-gray-900 dark:text-white`}>
            Block
          </span>
          <span className={`font-bold ${textSize} text-primary-500`}>UI</span>
        </div>
      )}
    </div>
  );
};

export default BlockUILogo;
