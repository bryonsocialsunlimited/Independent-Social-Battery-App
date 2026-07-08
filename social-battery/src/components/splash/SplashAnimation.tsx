"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Battery } from "lucide-react";

const SplashScene = dynamic(() => import("./SplashScene"), { ssr: false });

interface SplashAnimationProps {
  onComplete: () => void;
}

export function SplashAnimation({ onComplete }: SplashAnimationProps) {
  const [skipped, setSkipped] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finish = useCallback(() => {
    setSkipped(true);
    setTimeout(onComplete, 300);
  }, [onComplete]);

  useEffect(() => {
    if (prefersReducedMotion) {
      const t = setTimeout(finish, 800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(finish, 4000);
    return () => clearTimeout(t);
  }, [finish, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {!skipped && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#06060f] cursor-pointer"
          onClick={finish}
          role="button"
          aria-label="Skip intro animation"
        >
          <div className="relative h-64 w-full max-w-sm">
            {prefersReducedMotion ? (
              <div className="flex h-full items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <Battery className="h-20 w-20 text-purple-400" />
                </motion.div>
              </div>
            ) : (
              <SplashScene />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <h1 className="text-3xl font-bold text-gradient">Social Battery</h1>
            <p className="mt-2 text-sm text-muted">Charge up your social life</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 text-xs text-muted"
          >
            Tap to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
