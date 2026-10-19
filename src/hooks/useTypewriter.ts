import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypewriterOptions {
  text: string;
  baseSpeed?: number; // ms per character
  enabled?: boolean;
  onComplete?: () => void;
}

export function useTypewriter({
  text,
  baseSpeed = 30,
  enabled = true,
  onComplete,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const indexRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const hasFinishedOnce = useRef<boolean>(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const skip = useCallback(() => {
    clearTimer();
    setDisplayedText(text);
    indexRef.current = text.length;
    setIsCompleted(true);
    setIsTyping(false);
    hasFinishedOnce.current = true;
    if (onComplete) onComplete();
  }, [clearTimer, text, onComplete]);

  useEffect(() => {
    // If it has already completed once, keep the full text intact (Requirement 6: không reset khi đóng rồi mở lại)
    if (hasFinishedOnce.current) {
      setDisplayedText(text);
      setIsCompleted(true);
      return;
    }

    if (!enabled) return;

    setIsTyping(true);
    indexRef.current = 0;
    setDisplayedText('');

    const typeNextChar = () => {
      if (indexRef.current >= text.length) {
        setIsCompleted(true);
        setIsTyping(false);
        hasFinishedOnce.current = true;
        if (onComplete) onComplete();
        return;
      }

      const char = text[indexRef.current];
      indexRef.current += 1;
      setDisplayedText(text.slice(0, indexRef.current));

      // Natural pause depending on punctuation
      let delay = baseSpeed + Math.random() * 15;
      if (char === '.' || char === '!' || char === '?') {
        delay = 320;
      } else if (char === ',' || char === ';' || char === ':') {
        delay = 180;
      } else if (char === '\n') {
        delay = 240;
      }

      timerRef.current = window.setTimeout(typeNextChar, delay);
    };

    timerRef.current = window.setTimeout(typeNextChar, 150);

    return () => {
      clearTimer();
    };
  }, [enabled, text, baseSpeed, onComplete, clearTimer]);

  return {
    displayedText,
    isCompleted,
    isTyping,
    skip,
  };
}

