import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, VolumeX, Sparkles, Disc } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface MusicPlayerProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  usingSynth: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onToggleMute: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  currentTime,
  duration,
  isMuted,
  usingSynth,
  onTogglePlay,
  onSeek,
  onToggleMute,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Format time mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onSeek(val);
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm select-none pointer-events-auto">
      <div className="relative rounded-2xl glass-panel p-2.5 sm:p-3 border border-pink-200/80 shadow-lg">
        {/* Top Mini Player Row */}
        <div className="flex items-center justify-between gap-2.5">
          {/* Vinyl Disc Icon rotating when playing */}
          <div className="relative flex-shrink-0 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 shadow-md shadow-pink-500/25 border-2 border-white"
            >
              <Disc className="w-6 h-6 text-white" />
            </motion.div>
            {usingSynth && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-yellow-400 text-[8px] text-white">
                ★
              </span>
            )}
          </div>

          {/* Song Info */}
          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex items-center gap-1.5">
              <h4 className="truncate text-xs sm:text-sm font-bold text-slate-800 font-cute">
                {usingSynth ? 'Melody Box ♡' : siteConfig.music.title}
              </h4>
            </div>
            <p className="truncate text-[10px] sm:text-xs text-pink-500 font-medium">
              {usingSynth ? 'Giai điệu dịu êm' : siteConfig.music.artist}
            </p>
          </div>

          {/* Equalizer Waveform Bars */}
          <div className="flex items-end gap-0.5 h-5 px-1">
            {[40, 90, 60, 100, 75].map((height, i) => (
              <motion.span
                key={i}
                className="w-1 rounded-full bg-dream-accent"
                animate={
                  isPlaying
                    ? {
                        height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`],
                      }
                    : { height: '20%' }
                }
                transition={{
                  repeat: Infinity,
                  duration: 0.8 + i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Play / Pause Heart Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onTogglePlay}
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 text-white shadow-md shadow-pink-400/30 border border-white"
            aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}
          >
            <Heart className={`w-5 h-5 ${isPlaying ? 'fill-white text-white animate-pulse' : 'text-white'}`} />
          </motion.button>
        </div>

        {/* Progress Bar & Expandable Controls */}
        <div className="mt-2.5">
          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSliderChange}
              className="w-full h-1.5 bg-pink-200/80 rounded-lg appearance-none cursor-pointer accent-dream-accent"
            />
          </div>

          <div className="mt-1 flex items-center justify-between text-[10px] font-semibold text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <div className="flex items-center gap-1 text-pink-400">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Expandable options (Mute/Unmute) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 pt-2 border-t border-pink-200/60 flex items-center justify-between text-xs text-slate-600"
            >
              <button
                onClick={onToggleMute}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-pink-100/60 text-slate-600 font-medium transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-pink-500" />}
                <span>{isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}</span>
              </button>
              <span className="text-[10px] text-pink-400 italic">20/10 Pink Dream ♡</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

