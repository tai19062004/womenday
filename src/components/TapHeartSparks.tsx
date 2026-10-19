import React, { useState, useEffect, useCallback } from 'react';

interface Spark {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  symbol: string;
  rotation: number;
}

const HEART_SYMBOLS = ['♡', '♥', '🌸', '✨', '💖', '🌷', '🎀'];
const PINK_PALETTE = ['#FF69B4', '#FFB6D5', '#E75480', '#F48FB1', '#FF80AB', '#FF4081'];

export const TapHeartSparks: React.FC = () => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    // Avoid interfering when typing in password input
    const target = e.target as HTMLElement | null;
    if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') {
      return;
    }

    const count = Math.floor(Math.random() * 2) + 1; // 1 to 2 cute symbols
    const newSparks: Spark[] = [];

    for (let i = 0; i < count; i++) {
      const offsetX = (Math.random() - 0.5) * 24;
      const offsetY = (Math.random() - 0.5) * 24;
      newSparks.push({
        id: Date.now() + Math.random(),
        x: e.clientX + offsetX,
        y: e.clientY + offsetY,
        color: PINK_PALETTE[Math.floor(Math.random() * PINK_PALETTE.length)],
        size: Math.floor(Math.random() * 10) + 16, // 16px to 26px
        symbol: HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)],
        rotation: (Math.random() - 0.5) * 40,
      });
    }

    setSparks((prev) => [...prev.slice(-20), ...newSparks]);
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [handlePointerDown]);

  // Clean up finished sparks
  useEffect(() => {
    if (sparks.length === 0) return;
    const timer = setTimeout(() => {
      setSparks((prev) => prev.slice(1));
    }, 1100);
    return () => clearTimeout(timer);
  }, [sparks]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none">
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="tap-heart inline-block drop-shadow-sm transition-all"
          style={{
            left: `${spark.x}px`,
            top: `${spark.y}px`,
            color: spark.color,
            fontSize: `${spark.size}px`,
            transform: `rotate(${spark.rotation}deg)`,
          }}
        >
          {spark.symbol}
        </span>
      ))}
    </div>
  );
};

