import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from './components/ParticleBackground';
import { TapHeartSparks } from './components/TapHeartSparks';
import { GiftIntro } from './components/GiftIntro';
import { PasswordModal } from './components/PasswordModal';
import { FloatingPhotoWorld } from './components/FloatingPhotoWorld';
import { LoveLetter } from './components/LoveLetter';
import { MusicPlayer } from './components/MusicPlayer';
import { RunningLyrics } from './components/RunningLyrics';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { siteConfig } from './config/siteConfig';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<'intro' | 'unlocked'>('intro');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(false);

  // Audio Player hook
  const {
    isPlaying,
    currentTime,
    duration,
    isMuted,
    usingSynth,
    play,
    togglePlay,
    seek,
    toggleMute,
  } = useAudioPlayer({
    audioSrc: siteConfig.music.audioSrc,
    fallbackToSynth: siteConfig.music.fallbackToSynth,
  });

  // Handle successful password entry
  const handleUnlockSuccess = useCallback(() => {
    setIsPasswordModalOpen(false);
    setScreen('unlocked');

    // Auto-play music if configured
    if (siteConfig.music.autoPlayOnUnlock) {
      play();
    }
  }, [play]);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-[#FFF8FC] text-slate-800">
      {/* Dynamic Ambient Background with Floating Hearts, Petals, and Glow */}
      <ParticleBackground />

      {/* Global Interactive Tap Sparks (Hearts float up wherever clicked/tapped) */}
      <TapHeartSparks />

      {/* Main Screen Content Flow */}
      <AnimatePresence mode="wait">
        {screen === 'intro' ? (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="relative h-full w-full"
          >
            <GiftIntro onOpenGift={() => setIsPasswordModalOpen(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="unlocked-screen"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative h-full w-full"
          >
            {/* 3D Floating Photo Gallery World */}
            <FloatingPhotoWorld onOpenLetter={() => setIsLetterOpen(true)} />

            {/* Bottom-Left Mini Music Player & Synchronized Running Lyrics */}
            <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-2 max-w-[calc(100vw-32px)] sm:max-w-sm safe-bottom pointer-events-none">
              <RunningLyrics
                currentTime={currentTime}
                lyrics={siteConfig.lyrics}
                isPlaying={isPlaying}
              />
              <MusicPlayer
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                isMuted={isMuted}
                usingSynth={usingSynth}
                onTogglePlay={togglePlay}
                onSeek={seek}
                onToggleMute={toggleMute}
              />
            </div>

            {/* Typewriter Love Letter Modal */}
            <LoveLetter
              isOpen={isLetterOpen}
              onClose={() => setIsLetterOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6-Digit Password Input Modal */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handleUnlockSuccess}
      />
    </main>
  );
};

export default App;

