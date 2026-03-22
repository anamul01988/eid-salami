"use client";

import { motion } from "framer-motion";

interface Supporter {
  name: string;
  amount: number;
  isNew?: boolean;
}

interface LeaderboardProps {
  lang: "en" | "bn";
  supporters: Supporter[];
}

const CONTENT = {
  en: {
    title: "Top Supporters",
    subtitle: "The most loving souls 💛",
    bdt: "BDT",
    empty: "Be the first to give Salami! 🎉",
  },
  bn: {
    title: "শীর্ষ সমর্থক",
    subtitle: "সবচেয়ে ভালোবাসার মানুষগুলো 💛",
    bdt: "টাকা",
    empty: "প্রথম সালামি দেওয়ার সুযোগ নিন! 🎉",
  },
};

const MEDAL_STYLES = [
  {
    icon: "🥇",
    bg: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(201,168,76,0.08))",
    border: "rgba(255,215,0,0.4)",
    rank: "rgba(255,215,0,0.9)",
    glow: "rgba(255,215,0,0.2)",
  },
  {
    icon: "🥈",
    bg: "linear-gradient(135deg, rgba(192,192,192,0.12), rgba(150,150,150,0.06))",
    border: "rgba(192,192,192,0.35)",
    rank: "rgba(192,192,192,0.9)",
    glow: "rgba(192,192,192,0.15)",
  },
  {
    icon: "🥉",
    bg: "linear-gradient(135deg, rgba(205,127,50,0.12), rgba(160,82,45,0.06))",
    border: "rgba(205,127,50,0.35)",
    rank: "rgba(205,127,50,0.9)",
    glow: "rgba(205,127,50,0.15)",
  },
];

const DEFAULT_SUPPORTERS: Supporter[] = [
  { name: "Rahim", amount: 500 },
  { name: "Karim", amount: 200 },
  { name: "Tanvir", amount: 100 },
];

export default function Leaderboard({ lang, supporters }: LeaderboardProps) {
  const c = CONTENT[lang];
  const isBn = lang === "bn";
  const allSupporters = [...supporters, ...DEFAULT_SUPPORTERS]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10);

  return (
    <motion.div
      id="leaderboard"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative z-10 w-full max-w-md mx-auto rounded-3xl overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgba(45,14,24,0.95) 0%, rgba(30,9,16,0.95) 100%)",
        border: "1px solid rgba(201,168,76,0.18)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
      }}
    >
      <div
        style={{
          height: 2,
          width: "100%",
          background: "linear-gradient(90deg, transparent, #c9a84c, #f0d580, #c9a84c, transparent)",
        }}
      />

      <div style={{ padding: "32px 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🏆</div>
          <h3
             className={isBn ? "bengali-text" : ""}
            style={{
              color: "#e8c97a",
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.25rem",
              fontWeight: 700,
              marginBottom: 4,
              margin: 0,
            }}
          >
            {c.title}
          </h3>
          <p
            className={isBn ? "bengali-text" : ""}
            style={{ color: "#9c7a30", fontSize: "0.85rem", marginTop: 4, margin: "4px 0 0" }}
          >
            {c.subtitle}
          </p>
        </div>

        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {allSupporters.length === 0 ? (
            <p
              className={isBn ? "bengali-text" : ""}
              style={{ textAlign: "center", padding: "24px 0", fontSize: "0.875rem", color: "#9c7a30" }}
            >
              {c.empty}
            </p>
          ) : (
            allSupporters.map((s, i) => {
              const style = MEDAL_STYLES[i] ?? {
                icon: `${i + 1}`,
                bg: "rgba(255,255,255,0.03)",
                border: "rgba(255,255,255,0.08)",
                rank: "rgba(201,168,76,0.5)",
                glow: "transparent",
              };

              return (
                <motion.div
                  key={`${s.name}-${i}`}
                  id={`leaderboard-item-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="leaderboard-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 16px",
                    borderRadius: 16,
                    background: s.isNew
                      ? "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.06))"
                      : style.bg,
                    border: `1px solid ${s.isNew ? "rgba(201,168,76,0.4)" : style.border}`,
                    boxShadow: s.isNew ? `0 0 20px ${style.glow}` : "none",
                  }}
                >
                  {/* Medal/rank */}
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      flexShrink: 0,
                      background: i < 3 ? "transparent" : "rgba(201,168,76,0.08)",
                    }}
                  >
                    {i < 3 ? (
                      <span>{style.icon as string}</span>
                    ) : (
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: style.rank }}>
                        #{i + 1}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      className={isBn ? "bengali-text" : ""}
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: s.isNew ? "#e8c97a" : "#d4c4a0",
                      }}
                    >
                      {s.name}
                      {s.isNew && (
                        <span
                          style={{
                            marginLeft: 8,
                            fontSize: "0.7rem",
                            padding: "2px 8px",
                            borderRadius: 9999,
                            background: "rgba(201,168,76,0.2)",
                            color: "#c9a84c",
                          }}
                        >
                          New!
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Amount */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 14px",
                      borderRadius: 9999,
                      flexShrink: 0,
                      background: i < 3 ? style.bg : "rgba(201,168,76,0.06)",
                      border: `1px solid ${i < 3 ? style.border : "rgba(201,168,76,0.15)"}`,
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", color: "#c9a84c" }}>💰</span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: i < 3 ? style.rank : "#c9a84c",
                      }}
                    >
                      {s.amount}
                      <span style={{ fontSize: "0.7rem", fontWeight: 400, marginLeft: 4 }}>{c.bdt}</span>
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </motion.div>
  );
}
