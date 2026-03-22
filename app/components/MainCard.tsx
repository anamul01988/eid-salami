"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MainCardProps {
  lang: "en" | "bn";
  onYes: () => void;
  onNo: () => void;
  declined: boolean;
}

const CONTENT = {
  en: {
    eid: "Eid Mubarak",
    arabic: "تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُمْ",
    arabicRoman: "Taqabbalallahu minna wa minkum",
    question: "This Eid, will you give Anamul a little Salami?",
    emotional: "There's no one who isn't willing to do something for Anamul...",
    yesBtn: "✔ Yes, I'll Give Salami",
    noBtn: "✖ No, I Won't",
    declined_msg: "😢 Oh no... Even so, Eid Mubarak to you!",
    reconsider: "Reconsider?",
  },
  bn: {
    eid: "ঈদ মোবারক",
    arabic: "تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُمْ",
    arabicRoman: "তাক্বাব্বালাল্লাহু মিন্না ওয়া মিনকুম",
    question: "এই ঈদে, এনামুল-কে কি একটু সালামি দেবেন?",
    emotional: "এমন মানুষ নাই যে এনামুল-এর জন্য কিছু করতে রাজি না...",
    yesBtn: "✔ হ্যাঁ, সালামি দিবো",
    noBtn: "✖ না, দিবো না",
    declined_msg: "😢 আহ... তবুও আপনাকে ঈদ মোবারক!",
    reconsider: "পুনর্বিবেচনা করুন?",
  },
};

export default function MainCard({
  lang,
  onYes,
  onNo,
  declined,
}: MainCardProps) {
  const c = CONTENT[lang];
  const isBn = lang === "bn";

  return (
    <motion.div
      id="main-card"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.1] }}
      className="relative z-10 w-full max-w-md mx-auto rounded-3xl overflow-hidden glow-pulse"
      style={{
        background:
          "linear-gradient(160deg, rgba(45,14,24,0.98) 0%, rgba(30,9,16,0.98) 100%)",
        border: "1px solid rgba(201,168,76,0.25)",
        boxShadow:
          "0 8px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,168,76,0.15)",
      }}
    >
      {/* Top decorative bar */}
      <div
        style={{
          height: 4,
          width: "100%",
          background:
            "linear-gradient(90deg, transparent, #c9a84c, #f0d580, #c9a84c, transparent)",
        }}
      />

      {/* Card content */}
      <div
        style={{
          padding: "36px 32px 32px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Moon & stars decoration */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontSize: 28,
              filter: "drop-shadow(0 0 12px rgba(201,168,76,0.8))",
            }}
          >
            🌙
          </span>
          <span
            style={{
              fontSize: 20,
              filter: "drop-shadow(0 0 8px rgba(201,168,76,0.6))",
            }}
          >
            ⭐
          </span>
          <span
            style={{
              fontSize: 20,
              filter: "drop-shadow(0 0 8px rgba(201,168,76,0.6))",
            }}
          >
            ⭐
          </span>
          <span
            style={{
              fontSize: 28,
              filter: "drop-shadow(0 0 12px rgba(201,168,76,0.8))",
            }}
          >
            🌙
          </span>
        </div>

        {/* Eid Mubarak title */}
        <motion.h1
          className="shimmer-text"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.4rem, 8vw, 3.2rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            margin: 0,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {c.eid}
        </motion.h1>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(201,168,76,0.4))",
            }}
          />
          <span style={{ color: "rgba(201,168,76,0.7)", fontSize: 16 }}>✦</span>
          <div
            style={{
              flex: 1,
              height: 1,
              background:
                "linear-gradient(90deg, rgba(201,168,76,0.4), transparent)",
            }}
          />
        </div>

        {/* Arabic text */}
        <motion.div
          style={{ width: "100%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p
            className="arabic-text"
            style={{
              color: "#e8c97a",
              fontSize: "1.6rem",
              lineHeight: 2,
              marginBottom: 6,
              fontFamily: "'Noto Serif Bengali', serif",
            }}
          >
            {c.arabic}
          </p>
          <p
            style={{
              color: "#9c7a30",
              fontSize: "0.78rem",
              fontStyle: "italic",
              letterSpacing: "0.06em",
              fontFamily: "'Playfair Display', serif",
              margin: 0,
            }}
          >
            {c.arabicRoman}
          </p>
        </motion.div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(201,168,76,0.25))",
            }}
          />
          <span style={{ color: "rgba(201,168,76,0.4)", fontSize: 12 }}>◆</span>
          <div
            style={{
              flex: 1,
              height: 1,
              background:
                "linear-gradient(90deg, rgba(201,168,76,0.25), transparent)",
            }}
          />
        </div>

        {/* Main question */}
        <motion.p
          className={isBn ? "bengali-text" : ""}
          style={{
            color: "#f5ead0",
            fontSize: "1.15rem",
            fontWeight: 500,
            lineHeight: 1.7,
            margin: 0,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {c.question}
        </motion.p>

        {/* Emotional text */}
        <motion.p
          className={isBn ? "bengali-text" : ""}
          style={{
            color: "#9c7a30",
            fontSize: "0.875rem",
            fontStyle: "italic",
            lineHeight: 1.7,
            padding: "0 8px",
            margin: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {c.emotional}
        </motion.p>

        {/* Action buttons */}
        <AnimatePresence mode="wait">
          {!declined ? (
            <motion.div
              key="buttons"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                width: "100%",
                marginTop: 8,
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              {/* Yes button */}
              <button
                id="yes-btn"
                onClick={onYes}
                className={`btn btn-gold${isBn ? " bengali-text" : ""}`}
              >
                {c.yesBtn}
              </button>

              {/* No button */}
              <button
                id="no-btn"
                onClick={onNo}
                className={`btn btn-ghost${isBn ? " bengali-text" : ""}`}
                style={{ fontSize: "0.9rem" }}
              >
                {c.noBtn}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="declined"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={isBn ? "bengali-text" : ""}
              style={{
                width: "100%",
                padding: "16px 24px",
                borderRadius: 16,
                textAlign: "center",
                fontSize: "0.875rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#9c7a30",
              }}
            >
              {c.declined_msg}
              <button
                id="reconsider-btn"
                onClick={onYes}
                style={{
                  marginLeft: 8,
                  textDecoration: "underline",
                  color: "#c9a84c",
                  fontSize: "inherit",
                  padding: 0,
                  background: "transparent",
                  display: "inline",
                  width: "auto",
                }}
                className={isBn ? "bengali-text" : ""}
              >
                {c.reconsider}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decorative bar */}
      <div
        style={{
          height: 1,
          width: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
        }}
      />
    </motion.div>
  );
}
