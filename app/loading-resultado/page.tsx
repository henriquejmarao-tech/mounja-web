"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PHRASES = [
  { text: "Analisando suas respostas...", style: "text-gray-500" },
  {
    text: "Você chegou até aqui. Isso já diz muito sobre você.",
    style: "text-pink-500 font-medium",
  },
  { text: "Seu resultado está quase pronto.", style: "gradient" },
];

const TOTAL_DURATION = 5000;
const PHRASE_INTERVAL = 1600;
const TICK = 50;

export default function LoadingResultado() {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  // Progress bar: 0→100 over TOTAL_DURATION
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / TOTAL_DURATION) * 100));
      setProgress(pct);
      if (pct >= 100) clearInterval(id);
    }, TICK);
    return () => clearInterval(id);
  }, []);

  // Phrase rotation with fade
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPhraseIndex((prev) => {
          const next = prev + 1;
          return next < PHRASES.length ? next : prev;
        });
        setVisible(true);
      }, 200);
    }, PHRASE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Redirect when done
  useEffect(() => {
    if (progress < 100) return;
    const timeout = setTimeout(() => router.push("/resultado"), 600);
    return () => clearTimeout(timeout);
  }, [progress, router]);

  const phrase = PHRASES[phraseIndex];

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6">
      {/* Logo with heartbeat */}
      <Image
        src="/logo.png"
        alt="Mounjá"
        width={120}
        height={120}
        className="mb-10 h-[120px] w-[120px] object-contain"
        style={{
          animation: "heartbeat 1.2s ease-in-out infinite",
        }}
      />

      {/* Progress bar */}
      <div className="mb-8 h-2 w-full max-w-[280px] overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            backgroundImage: "linear-gradient(to right, #ff4d8f, #b84dff)",
          }}
        />
      </div>

      {/* Phrase */}
      <p
        className={`min-h-[56px] max-w-[320px] text-center text-lg transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        } ${phrase.style === "gradient" ? "font-bold" : phrase.style}`}
        style={
          phrase.style === "gradient"
            ? {
                backgroundImage:
                  "linear-gradient(to right, #ff4d8f, #b84dff)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }
            : undefined
        }
      >
        {phrase.text}
      </p>
    </div>
  );
}
