import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, LockKeyhole } from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "../config/siteConfig";

interface GiftIntroProps {
  onOpenGift: () => void;
}

export const GiftIntro: React.FC<GiftIntroProps> = ({ onOpenGift }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Cute pink & gold confetti burst
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF69B4", "#FFB6D5", "#F48FB1", "#FFD700", "#FFF0F5"],
      shapes: ["circle"],
      scalar: 1.2,
    });

    setTimeout(() => {
      onOpenGift();
    }, 650);
  };

  return (
    <div className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-between px-4 py-8 sm:px-6 safe-top safe-bottom select-none">
      {/* Top Cute Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 shadow-sm border border-pink-200/60"
      >
        <Sparkles
          className="w-4 h-4 text-dream-accent animate-spin"
          style={{ animationDuration: "6s" }}
        />
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-dream-darkRose">
          {siteConfig.greeting.badge}
        </span>
        <Heart className="w-3.5 h-3.5 text-dream-accent fill-dream-accent" />
      </motion.div>

      {/* Center Gift Box & Headlines */}
      <div className="flex flex-col items-center justify-center my-auto w-full max-w-md text-center">
        {/* Interactive Floating Gift Box */}
        <motion.div
          animate={
            isOpening
              ? { scale: [1, 1.15, 0.95], y: -30 }
              : { y: [0, -14, 0], rotate: [0, 1.5, -1.5, 0] }
          }
          transition={
            isOpening
              ? { duration: 0.6, ease: "easeInOut" }
              : { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
          }
          className="relative cursor-pointer group mb-6"
          onClick={handleOpenClick}
        >
          {/* Soft Glow Behind Gift */}
          <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-tr from-pink-300/40 via-rose-300/30 to-purple-200/40 blur-2xl group-hover:scale-125 transition-transform duration-700" />

          {/* SVG Handcrafted 3D Gift Box */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 filter drop-shadow-[0_15px_25px_rgba(231,84,128,0.25)]">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient
                  id="boxGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFA6C9" />
                  <stop offset="50%" stopColor="#FF85B2" />
                  <stop offset="100%" stopColor="#F06292" />
                </linearGradient>
                <linearGradient
                  id="ribbonGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFF275" />
                  <stop offset="100%" stopColor="#FFD166" />
                </linearGradient>
                <linearGradient
                  id="lidGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFB3D1" />
                  <stop offset="100%" stopColor="#FF77A9" />
                </linearGradient>
              </defs>

              {/* Box Base */}
              <rect
                x="42"
                y="86"
                width="116"
                height="88"
                rx="14"
                fill="url(#boxGrad)"
              />

              {/* Vertical Ribbon */}
              <rect
                x="91"
                y="86"
                width="18"
                height="88"
                fill="url(#ribbonGrad)"
              />

              {/* Horizontal Ribbon */}
              <rect
                x="42"
                y="120"
                width="116"
                height="18"
                fill="url(#ribbonGrad)"
              />

              {/* Animated Gift Box Lid */}
              <motion.g
                animate={
                  isOpening
                    ? { y: -50, rotate: -18, opacity: 0.85 }
                    : { y: 0, rotate: 0 }
                }
                transition={{ duration: 0.5, ease: "backOut" }}
              >
                {/* Lid Rim */}
                <rect
                  x="34"
                  y="66"
                  width="132"
                  height="26"
                  rx="8"
                  fill="url(#lidGrad)"
                />
                <rect
                  x="91"
                  y="66"
                  width="18"
                  height="26"
                  fill="url(#ribbonGrad)"
                />

                {/* Bow Ribbons on Top */}
                {/* Left loop */}
                <path
                  d="M100 66 C75 32 45 42 68 64 C82 72 96 66 100 66 Z"
                  fill="url(#ribbonGrad)"
                  filter="drop-shadow(0 2px 3px rgba(0,0,0,0.1))"
                />
                {/* Right loop */}
                <path
                  d="M100 66 C125 32 155 42 132 64 C118 72 104 66 100 66 Z"
                  fill="url(#ribbonGrad)"
                  filter="drop-shadow(0 2px 3px rgba(0,0,0,0.1))"
                />
                {/* Center Knot */}
                <circle cx="100" cy="66" r="10" fill="#FFE082" />
                <circle cx="100" cy="66" r="6" fill="#FFCA28" />
              </motion.g>

              {/* Small floating sparkles around box */}
              <circle
                cx="28"
                cy="80"
                r="3"
                fill="#FFD6E7"
                className="animate-ping"
                style={{ animationDuration: "3s" }}
              />
              <circle
                cx="170"
                cy="110"
                r="2.5"
                fill="#FFE082"
                className="animate-ping"
                style={{ animationDuration: "2.4s" }}
              />
            </svg>

            {/* Hint lock badge */}
            <div className="absolute -bottom-2 right-4 bg-white/90 text-dream-accent px-2.5 py-1 rounded-full text-xs font-semibold shadow-md border border-pink-200 flex items-center gap-1">
              <LockKeyhole className="w-3.5 h-3.5" />
              <span>Bí mật</span>
            </div>
          </div>
        </motion.div>

        {/* Headlines */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-800 drop-shadow-sm font-cute"
        >
          {siteConfig.greeting.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-2 text-sm sm:text-base text-slate-600 font-medium px-4 leading-relaxed"
        >
          {siteConfig.greeting.subtitle}
        </motion.p>

        {/* Open Gift CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 w-full max-w-xs"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenClick}
            className="group relative flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-4 text-base sm:text-lg font-bold text-white btn-pink-gradient overflow-hidden min-h-[48px]"
          >
            {/* Shimmer light effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
            <span>{siteConfig.greeting.buttonText}</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Footer subtle text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-xs text-pink-500/80 font-medium pb-2"
      ></motion.div>
    </div>
  );
};
