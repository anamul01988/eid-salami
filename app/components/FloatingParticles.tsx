"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
  emoji: string;
  opacity: number;
}

const EMOJIS = ["✨", "⭐", "🌙", "💫", "🌟", "❇️", "🌙"];

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 10,
      swayDuration: Math.random() * 4 + 3,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      opacity: Math.random() * 0.4 + 0.15,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle select-none"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s, ${p.swayDuration}s`,
            animationDelay: `${p.delay}s, ${p.delay * 0.5}s`,
            opacity: p.opacity,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Background glow orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(92,26,40,0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
