import { useState, useEffect, useRef, useCallback } from 'react';

interface AudioPlayerOptions {
  audioSrc: string;
  autoPlay?: boolean;
  fallbackToSynth?: boolean;
}

export function useAudioPlayer({ audioSrc, autoPlay = false, fallbackToSynth = true }: AudioPlayerOptions) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(60); // default 60s for fallback
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [usingSynth, setUsingSynth] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize HTML5 Audio
  useEffect(() => {
    const audio = new Audio();
    audio.src = audioSrc;
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const handleError = () => {
      console.warn('Local audio file not found or failed to load. Falling back to ambient melody synth.');
      setLoadError('Using soft ambient music');
      if (fallbackToSynth) {
        setUsingSynth(true);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioSrc, fallbackToSynth]);

  // Gentle music box synthesizer fallback
  const playSynthNote = useCallback((freq: number, startTime: number, duration: number) => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Envelope: gentle attack, bell-like decay
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.12 * volume, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Ignore audioContext state errors
    }
  }, [volume]);

  // Melodic notes sequence (pentatonic / dreamy music box: C4, E4, G4, A4, B4, C5, D5, E5)
  const notes = [
    261.63, 329.63, 392.0, 440.0, 493.88, 523.25, 587.33, 659.25,
    523.25, 440.0, 392.0, 329.63, 440.0, 523.25, 392.0, 329.63
  ];

  // Run synth loop
  useEffect(() => {
    if (!usingSynth || !isPlaying) {
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
      return;
    }

    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    let noteIdx = 0;
    const interval = 800; // ms per note

    synthTimerRef.current = window.setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + interval / 1000;
        return next > 60 ? 0 : next;
      });

      if (audioCtxRef.current && !isMuted) {
        const freq = notes[noteIdx % notes.length];
        playSynthNote(freq, audioCtxRef.current.currentTime, 1.2);
        // Harmony chord every 4 notes
        if (noteIdx % 4 === 0) {
          playSynthNote(freq * 0.75, audioCtxRef.current.currentTime + 0.1, 1.5);
        }
        noteIdx++;
      }
    }, interval);

    return () => {
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
    };
  }, [usingSynth, isPlaying, isMuted, playSynthNote]);

  const play = useCallback(async () => {
    if (audioRef.current && !usingSynth) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('HTML5 Audio playback interrupted or blocked, enabling soft synth:', err);
        setUsingSynth(true);
        setIsPlaying(true);
      }
    } else {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    }
  }, [usingSynth]);

  const pause = useCallback(() => {
    if (audioRef.current && !usingSynth) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, [usingSynth]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current && !usingSynth) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  }, [usingSynth]);

  const updateVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  }, []);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    loadError,
    usingSynth,
    play,
    pause,
    togglePlay,
    seek,
    updateVolume,
    toggleMute,
  };
}

