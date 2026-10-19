import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles, HelpCircle, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../config/siteConfig';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the first input whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setDigits(['', '', '', '', '', '']);
      setErrorMessage(null);
      setIsShaking(false);
      setIsSuccess(false);
      setShowHint(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 300);
    }
  }, [isOpen]);

  const verifyPasscode = useCallback((enteredCode: string) => {
    if (enteredCode === siteConfig.secretPasscode) {
      setIsSuccess(true);
      setErrorMessage(null);

      // Heart confetti explosion
      confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FF1493', '#FF69B4', '#FFB6D5', '#FFD700', '#E75480'],
      });

      setTimeout(() => {
        onSuccess();
      }, 1000);
    } else {
      setIsShaking(true);
      setErrorMessage('Hình như cậu nhập nhầm rồi nè 🥺 Thử lại nha!');
      setTimeout(() => {
        setIsShaking(false);
        setDigits(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }, 1100);
    }
  }, [onSuccess]);

  const handleChange = (index: number, val: string) => {
    const char = val.slice(-1);
    if (char && !/^\d$/.test(char)) return; // Only allow digits

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setErrorMessage(null);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If filled 6 digits, auto verify
    if (char && index === 5) {
      const fullCode = newDigits.join('');
      if (fullCode.length === 6) {
        verifyPasscode(fullCode);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      const fullCode = digits.join('');
      if (fullCode.length === 6) {
        verifyPasscode(fullCode);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = ['', '', '', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);

    if (pasted.length === 6) {
      verifyPasscode(pasted);
    } else {
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  // On-screen cute keypad support for extra mobile touch friendliness
  const handleKeypadPress = (digit: string) => {
    const emptyIdx = digits.findIndex((d) => d === '');
    if (emptyIdx !== -1) {
      handleChange(emptyIdx, digit);
    }
  };

  const handleKeypadBackspace = () => {
    const filledIndices = digits
      .map((d, i) => (d !== '' ? i : -1))
      .filter((i) => i !== -1);
    if (filledIndices.length > 0) {
      const lastIdx = filledIndices[filledIndices.length - 1];
      const newDigits = [...digits];
      newDigits[lastIdx] = '';
      setDigits(newDigits);
      inputRefs.current[lastIdx]?.focus();
    }
  };

  const handleUnlockClick = () => {
    const fullCode = digits.join('');
    if (fullCode.length < 6) {
      setErrorMessage('Cậu nhập đủ 6 chữ số nha! 🌸');
      return;
    }
    verifyPasscode(fullCode);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-md overflow-y-auto"
        >
          {/* Glass Modal Card */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 25 }}
            animate={
              isSuccess
                ? { scale: [1, 1.05, 0.9], opacity: 0, transition: { duration: 0.8 } }
                : { scale: 1, opacity: 1, y: 0 }
            }
            exit={{ scale: 0.88, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`relative w-full max-w-sm rounded-3xl glass-modal p-6 text-center shadow-2xl transition-transform ${
              isShaking ? 'animate-shake' : ''
            }`}
          >
            {/* Close / Back button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-pink-100/60 transition-colors"
              aria-label="Quay lại"
            >
              <ArrowLeft className="w-5 h-5 text-pink-400" />
            </button>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-pink-100/60 transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5 text-pink-400" />
            </button>

            {/* Top 3D Cute Bow / Heart Icon */}
            <div className="relative mx-auto -mt-12 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#FFB6D5] to-[#E75480] shadow-lg shadow-pink-500/30 border-2 border-white">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              >
                <Heart className="w-10 h-10 fill-white text-white drop-shadow-sm" />
              </motion.div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300 animate-bounce" />
              </div>
            </div>

            {/* Modal Title & Subtitle */}
            <h2 className="mt-4 text-xl sm:text-2xl font-bold text-slate-800 font-cute">
              Bí mật nhỏ xíu 💗
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              Nhập mật mã 6 số để mở món quà nha!
            </p>

            {/* 6 Input Slots */}
            <div className="mt-6 flex justify-center gap-2 sm:gap-2.5" onPaste={handlePaste}>
              {digits.map((digit, idx) => (
                <div key={idx} className="relative">
                  <input
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className={`h-11 w-10 sm:h-12 sm:w-11 rounded-xl text-center text-lg font-bold transition-all duration-200 outline-none select-none ${
                      digit
                        ? 'border-2 border-dream-accent bg-pink-50/90 text-transparent shadow-md shadow-pink-200/60 scale-105'
                        : 'border border-pink-200/80 bg-white/70 text-transparent focus:border-dream-rose focus:ring-2 focus:ring-pink-300/40'
                    }`}
                  />
                  {/* Cute Pink Heart / Dot Overlay */}
                  {digit && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    >
                      <Heart className="w-4 h-4 fill-dream-accent text-dream-accent animate-pulse" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Error or Success notification */}
            <div className="h-7 mt-3 flex items-center justify-center">
              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-semibold text-rose-500 bg-rose-50 px-3 py-0.5 rounded-full border border-rose-200"
                >
                  {errorMessage}
                </motion.p>
              )}
              {isSuccess && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-xs font-bold text-dream-darkRose bg-pink-100 px-3 py-0.5 rounded-full"
                >
                  <Sparkles className="w-3.5 h-3.5 text-dream-accent" />
                  <span>Chính xác rồi! Đang mở quà... ♡</span>
                </motion.div>
              )}
            </div>

            {/* Quick Virtual Keypad for Mobile Comfort */}
            <div className="mt-2 grid grid-cols-3 gap-1.5 px-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeypadPress(String(num))}
                  className="h-10 rounded-xl bg-white/70 hover:bg-pink-100/70 text-slate-700 font-bold text-sm shadow-sm border border-pink-100 active:scale-95 transition-all flex items-center justify-center"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="h-10 rounded-xl bg-pink-50/80 hover:bg-pink-100/80 text-pink-500 font-medium text-xs border border-pink-200 flex items-center justify-center gap-1"
                title="Gợi ý"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Gợi ý</span>
              </button>
              <button
                type="button"
                onClick={() => handleKeypadPress('0')}
                className="h-10 rounded-xl bg-white/70 hover:bg-pink-100/70 text-slate-700 font-bold text-sm shadow-sm border border-pink-100 active:scale-95 transition-all flex items-center justify-center"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleKeypadBackspace}
                className="h-10 rounded-xl bg-pink-50/80 hover:bg-pink-100/80 text-pink-500 font-bold text-xs border border-pink-200 active:scale-95 transition-all flex items-center justify-center"
              >
                ⌫
              </button>
            </div>

            {/* Hint Box */}
            <AnimatePresence>
              {showHint && siteConfig.passcodeHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-xs text-slate-600 bg-pink-50/90 p-2 rounded-xl border border-pink-200/60"
                >
                  {siteConfig.passcodeHint}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Unlock Action Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleUnlockClick}
                className="w-full rounded-full py-3 px-6 text-sm sm:text-base font-bold text-white btn-pink-gradient flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
              >
                <span>Mở khóa 💌</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
