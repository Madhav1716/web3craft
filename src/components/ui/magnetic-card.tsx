import React, { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface MagneticCardProps {
  className?: string;
  children: React.ReactNode;
  backgroundImage?: string;
  rotate?: boolean;
  scale?: boolean;
  translateX?: number;
  translateY?: number;
  rotateX?: number;
  rotateY?: number;
}

export const MagneticCard: React.FC<MagneticCardProps> = ({
  className,
  children,
  backgroundImage,
  rotate = true,
  scale = true,
  translateX = 8,
  translateY = 8,
  rotateX = 20,
  rotateY = 20,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Calculate mouse position relative to the card
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;

    // Normalize position values
    const normalizedX = mouseX / (rect.width / 2);
    const normalizedY = mouseY / (rect.height / 2);

    // Update states for position and rotation
    setPosition({
      x: normalizedX * translateX,
      y: normalizedY * translateY,
    });

    setRotation({
      x: -normalizedY * rotateX,
      y: normalizedX * rotateY,
    });
  };

  const handleMouseLeave = () => {
    // Reset position and rotation on mouse leave
    setPosition({ x: 0, y: 0 });
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative overflow-hidden rounded-xl", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
        rotateX: rotate ? rotation.x : 0,
        rotateY: rotate ? rotation.y : 0,
        scale: scale
          ? Math.abs(position.x) > 0 || Math.abs(position.y) > 0
            ? 1.05
            : 1
          : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1,
      }}
      style={{
        transformStyle: "preserve-3d",
        ...(backgroundImage && {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }),
      }}>
      {children}

      {/* Light effect overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: `radial-gradient(circle at ${
            ((position.x + translateX) / (2 * translateX)) * 100
          }% ${
            ((position.y + translateY) / (2 * translateY)) * 100
          }%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />
    </motion.div>
  );
};
