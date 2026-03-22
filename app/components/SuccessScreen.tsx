"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface SuccessScreenProps {
  lang: "en" | "bn";
  amount: number;
  name: string;
  onGenerateCard: () => void;
}

const CONTENT = {
  en: {
    thanks: "Thank You",
    heart: "❤️",
    message: (name: string, amount: number) =>
      `${name}'s Salami of ${amount} BDT has reached Anamul.`,
    dua: "May Allah grant you more barakah.",
    eid_again: "Eid Mubarak 🌙",
    gen_card: "🎴 Generate Eid Card",
  },
  bn: {
    thanks: "ধন্যবাদ",
    heart: "❤️",
    message: (name: string, amount: number) =>
      `আপনার ${amount} টাকার সালামি এনামুল পেয়ে গেছে।`,
    dua: "আল্লাহ আপনাকে আরো বারাকাহ দিন।",
    eid_again: "ঈদ মোবারক 🌙",
    gen_card: "🎴 ঈদ কার্ড তৈরি করুন",
  },
};

function launchConfetti() {
  const end = Date.now() + 4000;
  const colors = [
    "#c9a84c",
    "#f0d580",
    "#e8c97a",
    "#ffffff",
    "#e2136e",
    "#ffd700",
  ];

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
      shapes: ["circle", "square"],
      gravity: 0.8,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
      shapes: ["circle", "square"],
      gravity: 0.8,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();

  // Central burst
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors,
      shapes: ["circle"],
      scalar: 1.2,
    });
  }, 300);
}

export default function SuccessScreen({
  lang,
  amount,
  name,
  onGenerateCard,
}: SuccessScreenProps) {
  const c = CONTENT[lang];
  const isBn = lang === "bn";

  useEffect(() => {
    launchConfetti();
  }, []);

  return (
    <motion.div
      id="success-screen"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.2] }}
      className="relative z-10 w-full max-w-md mx-auto rounded-3xl overflow-hidden text-center"
      style={{
        background:
          "linear-gradient(160deg, rgba(45,14,24,0.98) 0%, rgba(20,5,10,0.99) 100%)",
        border: "1px solid rgba(201,168,76,0.3)",
        boxShadow:
          "0 0 80px rgba(201,168,76,0.15), 0 8px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,168,76,0.2)",
      }}
    >
      <div
        style={{
          height: 4,
          background:
            "linear-gradient(90deg, transparent, #e2136e, #c9a84c, #f0d580, #c9a84c, #e2136e, transparent)",
        }}
      />

      <div
        style={{
          padding: "48px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Heart animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ duration: 0.5, times: [0, 0.6, 1] }}
          style={{
            fontSize: "5rem",
            filter: "drop-shadow(0 0 20px rgba(226,19,110,0.6))",
            margin: "0 0 8px",
          }}
        >
          ❤️
        </motion.div>

        {/* Thank you */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2
            className="shimmer-text"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.4rem",
              fontWeight: 700,
              margin: "0 0 12px",
            }}
          >
            {c.thanks} {c.heart}
          </h2>
          <p
            className={isBn ? "bengali-text" : ""}
            style={{
              color: "#d4c4a0",
              fontSize: "1rem",
              lineHeight: 1.6,
              margin: "0 0 8px",
            }}
          >
            {c.message(name, amount)}
          </p>
          <p
            className={isBn ? "bengali-text" : ""}
            style={{
              color: "#9c7a30",
              fontSize: "0.875rem",
              margin: "0 0 4px",
            }}
          >
            {c.dua}
          </p>
          <p
            className={isBn ? "bengali-text" : ""}
            style={{
              color: "#e8c97a",
              fontSize: "1.2rem",
              fontWeight: 600,
              marginTop: 16,
              margin: "16px 0 0",
            }}
          >
            {c.eid_again}
          </p>
        </motion.div>

        {/* Amount badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 24px",
            borderRadius: 9999,
            background:
              "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.08))",
            border: "1px solid rgba(201,168,76,0.3)",
          }}
        >
          <span style={{ color: "#c9a84c", fontSize: 24 }}>💰</span>
          <span
            className="shimmer-text"
            style={{
              color: "#e8c97a",
              fontSize: "1.5rem",
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {amount} BDT
          </span>
        </motion.div>

        {/* Generate card button */}
        <motion.button
          id="gen-card-btn"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          onClick={onGenerateCard}
          className={`btn btn-gold${isBn ? " bengali-text" : ""}`}
        >
          {c.gen_card}
        </motion.button>
      </div>
    </motion.div>
  );
}
