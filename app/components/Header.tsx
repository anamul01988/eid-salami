"use client";

interface HeaderProps {
  lang: "en" | "bn";
  onLangToggle: () => void;
}

export default function Header({ lang, onLangToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-3">
      {/* Background blur */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,10,15,0.95) 0%, transparent 100%)",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Salami badge */}
      <div
        id="salami-badge"
        className="relative flex items-center gap-2 px-4 py-2 rounded-full"
        style={{
          background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
          border: "1px solid rgba(201,168,76,0.3)",
        }}
      >
        <span className="text-lg">🔥</span>
        <span
          className="text-sm font-semibold tracking-widest uppercase"
          style={{ color: "#c9a84c", fontFamily: "'Playfair Display', serif" }}
        >
          Salami
        </span>
      </div>

      {/* Language toggle */}
      <button
        id="lang-toggle-btn"
        onClick={onLangToggle}
        className="relative flex items-center rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          border: "1px solid rgba(201,168,76,0.35)",
          background: "rgba(42,16,24,0.6)",
          backdropFilter: "blur(8px)",
          padding: "2px", // Safe inner padding
          display: "flex",
          width: "auto",
        }}
        aria-label={`Switch to ${lang === "en" ? "Bengali" : "English"}`}
      >
        {["EN", "BN"].map((l) => (
          <span
            key={l}
            className="text-xs font-bold tracking-wider transition-all duration-300"
            style={{
              padding: "8px 14px", // Explicit padding
              background:
                lang === l.toLowerCase()
                  ? "linear-gradient(135deg, #c9a84c, #e8c97a)"
                  : "transparent",
              color: lang === l.toLowerCase() ? "#1a0a0f" : "#c9a84c",
              borderRadius: "9999px",
              display: "inline-block",
            }}
          >
            {l}
          </span>
        ))}
      </button>
    </header>
  );
}
