"use client";

import { useCallback, useRef } from "react";

function playClickTone() {
  if (typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);
    osc.type = "sine";
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // no-op
  }
}

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playClick = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.25;
        audioRef.current.play().catch(playClickTone);
        return;
      }
      const audio = new Audio("/sounds/click.mp3");
      audioRef.current = audio;
      audio.volume = 0.25;
      audio.play().catch(playClickTone);
    } catch {
      playClickTone();
    }
  }, []);

  return { playClick };
}
