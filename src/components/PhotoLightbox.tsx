import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles } from "lucide-react";
import { PhotoItem } from "../types";

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  onClose,
}) => {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md select-none"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-sm sm:max-w-md w-full rounded-3xl bg-white p-4 pb-6 shadow-2xl border-4 border-pink-100"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-lg border border-pink-200 hover:bg-pink-50 transition-colors"
            aria-label="Đóng ảnh"
          >
            <X className="w-5 h-5 text-pink-500" />
          </button>

          {/* Photo container with polaroid aesthetic */}
          <div className="relative overflow-hidden rounded-2xl bg-pink-50 aspect-[4/5] w-full shadow-inner">
            <img
              src={photo.url}
              alt={photo.caption}
              className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
              loading="lazy"
              onError={(e) => {
                // Graceful fallback to pretty floral placeholder if image link is broken
                const target = e.currentTarget;
                target.src =
                  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&auto=format&fit=crop&q=80";
              }}
            />

            {/* Subtle gloss overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />
          </div>

          {/* Caption & Date */}
          <div className="mt-4 text-center px-2">
            {/* <h3 className="text-lg sm:text-xl font-bold text-slate-800 font-cute">
              {photo.caption}
            </h3> */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-dream-accent font-semibold">
              <Heart className="w-3.5 h-3.5 fill-dream-accent" />
              <span>Khoảnh khắc tuyệt vời ♡</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
