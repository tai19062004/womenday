import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mail, Image as ImageIcon } from "lucide-react";
import { FloatingPhoto } from "./FloatingPhoto";
import { PhotoLightbox } from "./PhotoLightbox";
import { PhotoItem } from "../types";
import { siteConfig } from "../config/siteConfig";

interface FloatingPhotoWorldProps {
  onOpenLetter: () => void;
}

interface PhotoPhysics {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  waveOffset: number;
  isHovered: boolean;
}

export const FloatingPhotoWorld: React.FC<FloatingPhotoWorldProps> = ({
  onOpenLetter,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : 400,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const domRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const physicsRef = useRef<PhotoPhysics[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const isMobile = windowSize.width < 768;
  const cardWidth = isMobile ? 110 : 142;
  const cardHeight = isMobile ? 140 : 180;

  // Track window resizing
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setWindowSize({ width: w, height: h });

      // Clamp existing positions inside new bounds
      physicsRef.current.forEach((p) => {
        p.x = Math.max(10, Math.min(w - cardWidth - 10, p.x));
        p.y = Math.max(60, Math.min(h - cardHeight - 15, p.y));
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardWidth, cardHeight]);

  // Initialize randomized physics state for all photos
  useEffect(() => {
    const photos = siteConfig.photos;
    const w = window.innerWidth;
    const h = window.innerHeight;

    physicsRef.current = photos.map((photo, i) => {
      // Scatter initial positions evenly across viewport
      const cols = isMobile ? 3 : 4;
      const col = i % cols;
      const row = Math.floor(i / cols);

      const segmentW = (w - cardWidth - 20) / cols;
      const segmentH = (h - cardHeight - 80) / Math.ceil(photos.length / cols);

      const initX =
        10 + col * segmentW + (Math.random() - 0.5) * (segmentW * 0.4);
      const initY =
        65 + row * segmentH + (Math.random() - 0.5) * (segmentH * 0.4);

      // Random gentle drift speed & direction
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 0.65; // ~0.5 to 1.15 px per frame

      return {
        id: photo.id,
        x: Math.max(10, Math.min(w - cardWidth - 10, initX)),
        y: Math.max(65, Math.min(h - cardHeight - 15, initY)),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: (Math.random() - 0.5) * 16,
        vrot: (Math.random() - 0.5) * 0.08,
        waveOffset: Math.random() * 100,
        isHovered: false,
      };
    });
  }, [isMobile, cardWidth, cardHeight]);

  // Main 60-120fps continuous physics loop: smooth floating across entire screen
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 16.66, 2.5); // normalized frame delta
      lastTime = currentTime;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const minX = 8;
      const maxX = w - cardWidth - 8;
      const minY = 55; // Leave space for top header
      const maxY = h - cardHeight - 12;

      const timeSec = currentTime * 0.001;

      physicsRef.current.forEach((p) => {
        if (p.isHovered) return; // Pause movement when hovered/touched

        // Organic curve steering (adds gentle wave acceleration so it floats like in zero-gravity)
        p.vx += Math.sin(timeSec * 0.5 + p.waveOffset) * 0.015 * dt;
        p.vy += Math.cos(timeSec * 0.4 + p.waveOffset) * 0.015 * dt;

        // Clamp speed to maintain smooth, dreamy floating
        const currentSpeed = Math.hypot(p.vx, p.vy);
        if (currentSpeed > 1.3) {
          p.vx = (p.vx / currentSpeed) * 1.3;
          p.vy = (p.vy / currentSpeed) * 1.3;
        } else if (currentSpeed < 0.35) {
          p.vx = (p.vx / currentSpeed) * 0.35;
          p.vy = (p.vy / currentSpeed) * 0.35;
        }

        // Update position
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Smooth boundary bounce with subtle random deflect angle
        if (p.x <= minX) {
          p.x = minX;
          p.vx = Math.abs(p.vx) + (Math.random() - 0.5) * 0.1;
        } else if (p.x >= maxX) {
          p.x = maxX;
          p.vx = -Math.abs(p.vx) + (Math.random() - 0.5) * 0.1;
        }

        if (p.y <= minY) {
          p.y = minY;
          p.vy = Math.abs(p.vy) + (Math.random() - 0.5) * 0.1;
        } else if (p.y >= maxY) {
          p.y = maxY;
          p.vy = -Math.abs(p.vy) + (Math.random() - 0.5) * 0.1;
        }

        // Gentle rotation tilt
        p.rot += p.vrot * dt;
        if (p.rot > 14) {
          p.rot = 14;
          p.vrot = -Math.abs(p.vrot);
        } else if (p.rot < -14) {
          p.rot = -14;
          p.vrot = Math.abs(p.vrot);
        }

        // Update DOM transform directly on GPU (no React rerenders, zero jitter!)
        const el = domRefs.current[p.id];
        if (el) {
          el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(
            2
          )}px, 0) rotate(${p.rot.toFixed(2)}deg)`;
        }
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [cardWidth, cardHeight]);

  const handleHoverStart = useCallback((id: string) => {
    const item = physicsRef.current.find((p) => p.id === id);
    if (item) item.isHovered = true;
    const el = domRefs.current[id];
    if (el) el.style.zIndex = "50";
  }, []);

  const handleHoverEnd = useCallback((id: string) => {
    const item = physicsRef.current.find((p) => p.id === id);
    if (item) item.isHovered = false;
    const el = domRefs.current[id];
    if (el) el.style.zIndex = "10";
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden select-none">
      {/* Top Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 sm:px-6 safe-top pointer-events-none"
      >
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-dream-accent shadow-sm border border-white">
            <Sparkles className="w-4 h-4 fill-pink-300" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-800 font-cute flex items-center gap-1.5">
              <span> Gửi {siteConfig.recipientName}</span>
              <span className="text-xs text-dream-accent">♡</span>
            </h2>
          </div>
        </div>

        {/* Quick hint badge */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 bg-white/85 backdrop-blur-md px-3.5 py-1 rounded-full border border-pink-200 shadow-sm pointer-events-auto">
          <ImageIcon className="w-3.5 h-3.5 text-dream-accent" />
          <span>Chạm vào ảnh để phóng to nha ♡</span>
        </div>
      </motion.div>

      {/* Freely Roaming Photos Container */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-auto">
        {siteConfig.photos.map((photo) => (
          <FloatingPhoto
            key={photo.id}
            photo={photo}
            isMobile={isMobile}
            domRef={(el) => {
              domRefs.current[photo.id] = el;
            }}
            onHoverStart={() => handleHoverStart(photo.id)}
            onHoverEnd={() => handleHoverEnd(photo.id)}
            onClick={(p) => setSelectedPhoto(p)}
          />
        ))}
      </div>

      {/* Center Emotional Love Letter CTA */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pointer-events-auto flex flex-col items-center"
        >
          {/* Glowing Aura Behind Button */}
          <div className="relative group">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-400/40 via-rose-300/40 to-purple-300/40 blur-xl opacity-80 group-hover:opacity-100 transition duration-700 animate-pulse" />

            {/* Read Letter Button */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenLetter}
              className="relative flex items-center gap-2.5 rounded-full px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white btn-pink-gradient shadow-2xl border border-white/80"
            >
              <div className="relative">
                <Mail
                  className="w-5 h-5 animate-bounce"
                  style={{ animationDuration: "2.2s" }}
                />
                <span className="absolute -top-1 -right-1 text-xs">♡</span>
              </div>
              <span>Đọc thư của tớ 💌</span>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-3 flex items-center gap-1.5 rounded-full glass-pill px-3.5 py-1 text-[11px] font-semibold text-slate-600 shadow-sm border border-pink-200/60"
          >
            <Sparkles className="w-3 h-3 text-dream-accent" />
            <span>Có một lời nhắn gửi đặc biệt bên trong ♡</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox for inspecting clicked photo */}
      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
};
