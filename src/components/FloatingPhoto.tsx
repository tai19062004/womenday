import React from "react";
import { Heart, Sparkles, Flower2, Star } from "lucide-react";
import { PhotoItem } from "../types";

interface FloatingPhotoProps {
  photo: PhotoItem;
  isMobile: boolean;
  domRef: (el: HTMLDivElement | null) => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: (photo: PhotoItem) => void;
}

export const FloatingPhoto: React.FC<FloatingPhotoProps> = ({
  photo,
  isMobile,
  domRef,
  onHoverStart,
  onHoverEnd,
  onClick,
}) => {
  // Render cute sticker on the photo frame
  const renderSticker = () => {
    switch (photo.sticker) {
      case "flower":
        return (
          <div className="absolute -top-3 -right-3 z-20 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-pink-100 text-dream-accent shadow-md border border-white">
            <Flower2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-pink-300" />
          </div>
        );
      case "bow":
        return (
          <div className="absolute -top-3 -left-2 z-20 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-rose-100 text-rose-500 shadow-md border border-white">
            <span className="text-xs sm:text-sm">🎀</span>
          </div>
        );
      case "sparkle":
        return (
          <div className="absolute -bottom-2 -right-2 z-20 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-yellow-100 text-yellow-500 shadow-md border border-white">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-300" />
          </div>
        );
      case "star":
        return (
          <div className="absolute -top-2.5 -left-2.5 z-20 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-amber-100 text-amber-500 shadow-md border border-white">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-300" />
          </div>
        );
      case "heart":
      default:
        return (
          <div className="absolute -top-3 -right-2 z-20 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-pink-100 text-dream-accent shadow-md border border-white">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-dream-accent text-dream-accent" />
          </div>
        );
    }
  };

  const cardWidth = isMobile ? 110 : 142;

  return (
    <div
      ref={domRef}
      onPointerEnter={onHoverStart}
      onPointerLeave={onHoverEnd}
      onClick={() => onClick(photo)}
      className="absolute top-0 left-0 cursor-pointer select-none will-change-transform group transition-shadow duration-300"
      style={{
        width: `${cardWidth}px`,
        touchAction: "manipulation",
      }}
    >
      {/* Outer Card with Polaroid styling */}
      <div
        className={`relative overflow-visible rounded-2xl bg-white/95 p-2 shadow-lg group-hover:shadow-2xl border-2 border-pink-100/90 group-hover:border-pink-400 group-hover:scale-110 transition-all duration-300 ${
          photo.style === "polaroid" ? "pb-6 sm:pb-7" : ""
        }`}
      >
        {/* Washi tape sticker at top */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-3 sm:h-3.5 bg-pink-200/80 rounded-sm shadow-sm backdrop-blur-sm -rotate-2 border-t border-b border-white/50" />

        {/* Decorative corner icon */}
        {renderSticker()}

        {/* The Image */}
        <div className="relative overflow-hidden rounded-xl bg-pink-50 aspect-square w-full shadow-inner">
          <img
            src={photo.url}
            alt={photo.caption}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.currentTarget;
              target.src =
                "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&auto=format&fit=crop&q=80";
            }}
          />
          {/* Subtle Pink Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pink-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Polaroid Cute Caption */}
        {/* {photo.style === 'polaroid' && (
          <div className="absolute bottom-1 sm:bottom-1.5 left-0 right-0 px-1 text-center">
            <p className="truncate text-[9px] sm:text-[11px] font-bold text-slate-700 font-cute">
              {photo.caption}
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};
