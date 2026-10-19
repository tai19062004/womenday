import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Music2 } from "lucide-react";
import { LyricLine } from "../types";

interface RunningLyricsProps {
  currentTime: number;
  lyrics: LyricLine[];
  isPlaying: boolean;
}

export const RunningLyrics: React.FC<RunningLyricsProps> = ({
  currentTime,
  lyrics,
  isPlaying,
}) => {
  // Find current line based on currentTime
  const activeIndex = useMemo(() => {
    if (!lyrics || lyrics.length === 0) return -1;
    let idx = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) {
        idx = i;
      } else {
        break;
      }
    }
    return idx === -1 ? 0 : idx;
  }, [currentTime, lyrics]);

  const currentLine = lyrics[activeIndex] || lyrics[0];
  const nextLine =
    activeIndex + 1 < lyrics.length ? lyrics[activeIndex + 1] : null;

  if (!lyrics || lyrics.length === 0) return null;

  return (
    <div className="w-full max-w-xs sm:max-w-sm pointer-events-none select-none"></div>
  );
};
