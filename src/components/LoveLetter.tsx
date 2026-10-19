import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, FastForward, Sparkles } from "lucide-react";
import { useTypewriter } from "../hooks/useTypewriter";
import { siteConfig } from "../config/siteConfig";

interface LoveLetterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ isOpen, onClose }) => {
  // Combine all paragraphs into a full letter text with natural line breaks
  const fullLetterText = useMemo(() => {
    const { salutation, paragraphs, closing, sender, date } = siteConfig.letter;
    return `${salutation}\n\n${paragraphs.join("\n\n")}\n\n${sender}\n`;
  }, []);

  const { displayedText, isCompleted, skip } = useTypewriter({
    text: fullLetterText,
    baseSpeed: 28,
    enabled: isOpen,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-md overflow-hidden select-text"
        >
          {/* Card Backdrop Wrapper */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="relative flex flex-col w-full max-w-lg max-h-[88dvh] rounded-3xl bg-[#FFF8FC] p-5 sm:p-7 shadow-2xl border-2 border-pink-200/90 overflow-hidden"
          >
            {/* Romantic Paper Texture & Corner Flower Embellishments */}
            <div className="pointer-events-none absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-200/40 to-transparent rounded-br-full" />
            <div className="pointer-events-none absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-pink-200/40 to-transparent rounded-tl-full" />

            {/* Corner ribbon bow decoration */}
            <div className="absolute top-3 left-4 text-pink-400 opacity-60 text-lg">
              🌸
            </div>
            <div className="absolute top-3 right-12 text-pink-400 opacity-60 text-lg">
              🌷
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-400 hover:text-slate-600 shadow-sm border border-pink-200 hover:bg-pink-50 transition-colors"
              aria-label="Đóng thư"
            >
              <X className="w-4 h-4 text-pink-500" />
            </button>

            {/* Wax Seal or Golden Heart Badge */}
            <div className="relative mx-auto -mt-2 mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB6D5] to-[#E75480] shadow-md shadow-pink-500/25 border-2 border-white">
              <Heart className="w-6 h-6 fill-white text-white drop-shadow-sm animate-pulse" />
            </div>

            {/* Letter Title Header */}
            <div className="text-center border-b border-pink-200/70 pb-3 mb-3">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 font-cute flex items-center justify-center gap-2">
                <span>{siteConfig.letter.title}</span>
                <span className="text-rose-500 text-sm">🌷</span>
              </h3>
            </div>

            {/* Scrollable Letter Body */}
            <div className="flex-1 overflow-y-auto pr-1 text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 font-cute">
              <div className="whitespace-pre-line font-medium text-slate-700">
                {displayedText}
                {!isCompleted && (
                  <span className="inline-block w-1.5 h-4 ml-1 bg-dream-accent align-middle animate-cursor" />
                )}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-4 pt-3 border-t border-pink-200/70 flex items-center justify-between gap-3">
              {!isCompleted ? (
                <button
                  type="button"
                  onClick={skip}
                  className="flex items-center gap-1.5 text-xs text-pink-600 hover:text-pink-700 font-semibold px-3 py-1.5 rounded-full bg-pink-100/70 hover:bg-pink-100 transition-colors active:scale-95"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Bỏ qua hiệu ứng</span>
                </button>
              ) : (
                <div className="flex items-center gap-1 text-xs text-pink-500 font-medium"></div>
              )}

              <button
                type="button"
                onClick={onClose}
                className="rounded-full py-2 px-5 text-xs sm:text-sm font-bold text-white btn-pink-gradient flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              >
                <span>Gấp thư lại 💌</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
