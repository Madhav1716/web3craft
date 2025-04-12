import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";

// Custom UUID generator
const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function Sparkles({
  children,
  className,
  id,
  background,
  minSize = 10,
  maxSize = 20,
  speed = 1,
  count = 20,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  count?: number;
  [key: string]: any;
}): React.ReactNode {
  const [sparkles, setSparkles] = useState<Array<SparkleType>>([]);

  useEffect(() => {
    const sparklesArray = Array.from({ length: count }).map(() =>
      generateSparkle(minSize, maxSize)
    );
    setSparkles(sparklesArray);

    const interval = setInterval(() => {
      setSparkles((prev) => {
        const newSparkles = [...prev];
        const index = Math.floor(Math.random() * newSparkles.length);
        newSparkles[index] = generateSparkle(minSize, maxSize);
        return newSparkles;
      });
    }, 1000 / speed);

    return () => {
      clearInterval(interval);
    };
  }, [count, speed, minSize, maxSize]);

  return (
    <div className={cn("relative inline-block", className)} id={id} {...props}>
      {sparkles.map((sparkle) => (
        <SparkleInstance
          key={sparkle.id}
          size={sparkle.size}
          color={sparkle.color}
          style={sparkle.style}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

interface SparkleType {
  id: string;
  color: string;
  size: number;
  style: React.CSSProperties;
}

const generateSparkle = (minSize: number, maxSize: number): SparkleType => {
  const colors = [
    "text-pink-500",
    "text-purple-500",
    "text-indigo-500",
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
    "text-orange-500",
    "text-red-500",
  ];

  return {
    id: generateUUID(),
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.floor(Math.random() * (maxSize - minSize)) + minSize,
    style: {
      position: "absolute",
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      zIndex: 1,
    },
  };
};

interface SparkleInstanceProps {
  color: string;
  size: number;
  style: React.CSSProperties;
}

const SparkleInstance: React.FC<SparkleInstanceProps> = ({
  color,
  size,
  style,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={style}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 45 }}
          exit={{ scale: 0, rotate: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className={`pointer-events-none absolute ${color}`}>
          <path
            d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
            fill="currentColor"
          />
        </motion.svg>
      )}
    </AnimatePresence>
  );
};
