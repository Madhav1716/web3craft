import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) {
  const waveColors = colors ?? [
    "#0ea5e9",
    "#22d3ee",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState("");
  const [svgWidth, setSvgWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.offsetWidth;
    const waveWidthValue = waveWidth || width / 20;

    setSvgWidth(width);
    const randomizeWave = () => {
      const waveHeight = 40;
      const points = [];
      for (let i = 0; i <= width; i += waveWidthValue) {
        const variance = Math.random() * waveHeight - waveHeight / 2;
        points.push({ x: i, y: variance });
      }

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const point = points[i];
        const prev = points[i - 1];
        const controlPointX = (point.x + prev.x) / 2;
        d += ` C ${controlPointX} ${prev.y}, ${controlPointX} ${point.y}, ${point.x} ${point.y}`;
      }
      setPath(d);
    };

    randomizeWave();

    let interval: NodeJS.Timeout;
    if (speed === "fast") {
      interval = setInterval(randomizeWave, 1500);
    } else {
      interval = setInterval(randomizeWave, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [waveWidth, speed]);

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      style={{
        position: "relative",
        isolation: "isolate",
        ...props.style,
      }}>
      <div
        className={className}
        style={{
          position: "relative",
          zIndex: 1,
        }}>
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: waveOpacity,
          filter: `blur(${blur}px)`,
        }}>
        {Array.from({ length: waveColors.length }).map((_, i) => (
          <motion.svg
            key={i}
            width={svgWidth}
            height="300"
            viewBox={`0 0 ${svgWidth} 300`}
            style={{
              position: "absolute",
              pointerEvents: "none",
              inset: 0,
              transform: `translateY(${i * 10}px)`,
            }}
            className="opacity-50">
            <motion.path
              d={path}
              fill="none"
              stroke={waveColors[i]}
              strokeWidth="3"
              transition={{
                duration: speed === "fast" ? 1.5 : 3,
              }}
            />
          </motion.svg>
        ))}
      </div>
      {backgroundFill && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            backgroundColor: backgroundFill,
          }}
        />
      )}
    </div>
  );
}
