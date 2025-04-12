import React from "react";

interface Web3CraftLogoProps {
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Web3Craft Logo Component
 * A premium, responsive logo for the Web3Craft brand
 */
const Web3CraftLogo: React.FC<Web3CraftLogoProps> = ({
  variant = "default",
  size = "md",
  className = "",
}) => {
  // Size mapping
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
    xl: "h-16",
  };

  // Color mapping based on variant
  const colors = {
    default: {
      primary: "#3B82F6", // Blue
      secondary: "#10B981", // Green
      text: "#1F2937", // Dark Gray
    },
    light: {
      primary: "#3B82F6",
      secondary: "#10B981",
      text: "#FFFFFF",
    },
    dark: {
      primary: "#60A5FA",
      secondary: "#34D399",
      text: "#F3F4F6",
    },
  };

  const { primary, secondary, text } = colors[variant];

  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} aspect-square relative`}>
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full">
          <path d="M32 4L4 18L32 32L60 18L32 4Z" fill={primary} />
          <path d="M4 18V46L32 60V32L4 18Z" fill={secondary} />
          <path
            d="M60 18V46L32 60V32L60 18Z"
            fill={primary}
            fillOpacity="0.8"
          />
        </svg>
      </div>

      {/* Logo Text */}
      <div
        className="ml-2 font-bold text-xl md:text-2xl"
        style={{ color: text }}>
        <span>Web3</span>
        <span style={{ color: primary }}>Craft</span>
      </div>
    </div>
  );
};

export default Web3CraftLogo;
