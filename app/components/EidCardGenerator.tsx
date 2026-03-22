"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EidCardGeneratorProps {
  lang: "en" | "bn";
  name: string;
  amount: number;
}

const CONTENT = {
  en: {
    title: "Your Eid Card",
    cardMsg1: "You gave Eid Salami to Anamul",
    cardMsg2: (name: string, amount: number) =>
      `${name} gifted ${amount} BDT with love ❤️`,
    cardFooter: "Eid Mubarak • eid-salami-anamul.vercel.app",
    download: "⬇ Download Card",
    shareWA: "WhatsApp",
    shareFB: "Facebook",
    copyLink: "📋 Copy Link",
    copied: "Copied!",
    shareMsg: (amount: number) =>
      `I gave ${amount} BDT Eid Salami to Anamul! 🌙 Show your love too: https://eid-salami-anamul.vercel.app`,
  },
  bn: {
    title: "আপনার ঈদ কার্ড",
    cardMsg1: "আপনি এনামুল-কে ঈদ সালামি দিয়েছেন",
    cardMsg2: (name: string, amount: number) =>
      `${name} ভালোবেসে ${amount} টাকা পাঠিয়েছেন ❤️`,
    cardFooter: "ঈদ মোবারক • eid-salami-anamul.vercel.app",
    download: "⬇ কার্ড ডাউনলোড করুন",
    shareWA: "WhatsApp",
    shareFB: "Facebook",
    copyLink: "📋 লিংক কপি করুন",
    copied: "কপি হয়েছে!",
    shareMsg: (amount: number) =>
      `আমি এনামুল-কে ${amount} টাকার ঈদ সালামি দিয়েছি! 🌙 আপনিও ভালোবাসা দেখান: https://eid-salami-anamul.vercel.app`,
  },
};

export default function EidCardGenerator({
  lang,
  name,
  amount,
}: EidCardGeneratorProps) {
  const c = CONTENT[lang];
  const isBn = lang === "bn";
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cardGenerated, setCardGenerated] = useState(false);

  useEffect(() => {
    generateCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, amount]);

  const generateCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas size
    canvas.width = 800;
    canvas.height = 500;

    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, 500);
    bg.addColorStop(0, "#1a0a0f");
    bg.addColorStop(0.5, "#2d0e18");
    bg.addColorStop(1, "#1a0a0f");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 800, 500);

    // Gold border
    ctx.strokeStyle = "#c9a84c";
    ctx.lineWidth = 3;
    ctx.strokeRect(15, 15, 770, 470);

    // Inner border
    ctx.strokeStyle = "rgba(201,168,76,0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(25, 25, 750, 450);

    // Top gold bar
    const goldBar = ctx.createLinearGradient(0, 0, 800, 0);
    goldBar.addColorStop(0, "transparent");
    goldBar.addColorStop(0.3, "#c9a84c");
    goldBar.addColorStop(0.5, "#f0d580");
    goldBar.addColorStop(0.7, "#c9a84c");
    goldBar.addColorStop(1, "transparent");
    ctx.fillStyle = goldBar;
    ctx.fillRect(0, 0, 800, 4);
    ctx.fillRect(0, 496, 800, 4);

    // Moon emoji area
    ctx.font = "60px serif";
    ctx.textAlign = "center";
    ctx.fillText("🌙", 400, 100);

    // Eid Mubarak
    ctx.font = "bold 52px 'Georgia', serif";
    const eidGrad = ctx.createLinearGradient(200, 0, 600, 0);
    eidGrad.addColorStop(0, "#c9a84c");
    eidGrad.addColorStop(0.5, "#f0d580");
    eidGrad.addColorStop(1, "#c9a84c");
    ctx.fillStyle = eidGrad;
    ctx.fillText(lang === "bn" ? "ঈদ মোবারক" : "Eid Mubarak", 400, 155);

    // Divider line
    ctx.beginPath();
    ctx.moveTo(150, 175);
    ctx.lineTo(650, 175);
    ctx.strokeStyle = "rgba(201,168,76,0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Main message
    ctx.font = "bold 28px 'Georgia', serif";
    ctx.fillStyle = "#f5ead0";
    ctx.fillText(c.cardMsg1, 400, 225);

    // Sub message
    ctx.font = "22px 'Georgia', serif";
    ctx.fillStyle = "#b8a882";
    ctx.fillText(c.cardMsg2(name, amount), 400, 270);

    // Amount badge
    ctx.save();
    const badgePadding = 24;
    const badgeText = `${amount} BDT`;
    ctx.font = "bold 32px 'Georgia', serif";
    const tw = ctx.measureText(badgeText).width;
    const bx = 400 - tw / 2 - badgePadding;
    const by = 300;
    const bw = tw + badgePadding * 2;
    const bh = 48;
    const r = 24;

    ctx.beginPath();
    ctx.moveTo(bx + r, by);
    ctx.lineTo(bx + bw - r, by);
    ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + r);
    ctx.lineTo(bx + bw, by + bh - r);
    ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - r, by + bh);
    ctx.lineTo(bx + r, by + bh);
    ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - r);
    ctx.lineTo(bx, by + r);
    ctx.quadraticCurveTo(bx, by, bx + r, by);
    ctx.closePath();

    const badgeFill = ctx.createLinearGradient(bx, by, bx + bw, by);
    badgeFill.addColorStop(0, "#c9a84c");
    badgeFill.addColorStop(0.5, "#e8c97a");
    badgeFill.addColorStop(1, "#c9a84c");
    ctx.fillStyle = badgeFill;
    ctx.fill();

    ctx.font = "bold 28px 'Georgia', serif";
    ctx.fillStyle = "#1a0a0f";
    ctx.fillText(badgeText, 400, by + 33);
    ctx.restore();

    // Stars
    ["✨", "⭐", "✨"].forEach((star, i) => {
      ctx.font = "28px serif";
      ctx.fillText(star, 200 + i * 200, 390);
    });

    // Footer
    ctx.font = "15px 'Georgia', serif";
    ctx.fillStyle = "rgba(201,168,76,0.5)";
    ctx.fillText(c.cardFooter, 400, 455);

    setCardGenerated(true);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `eid-salami-anamul-${name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const shareUrl = "https://eid-salami-anamul.vercel.app";
  const shareText = c.shareMsg(amount);

  const handleShareWA = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      "_blank",
    );
  };

  const handleShareFB = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      "_blank",
    );
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      id="eid-card-generator"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 w-full max-w-md mx-auto rounded-3xl overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgba(45,14,24,0.98) 0%, rgba(30,9,16,0.98) 100%)",
        border: "1px solid rgba(201,168,76,0.2)",
        boxShadow: "0 8px 60px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          height: 4,
          width: "100%",
          background:
            "linear-gradient(90deg, transparent, #c9a84c, #f0d580, #c9a84c, transparent)",
        }}
      />

      <div
        style={{
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h3
          className={isBn ? "bengali-text" : ""}
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#e8c97a",
            fontFamily: "'Playfair Display', serif",
            margin: 0,
          }}
        >
          🎴 {c.title}
        </h3>

        {/* Canvas preview */}
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(201,168,76,0.25)",
            background: "#1a0a0f",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>

        {/* Download button */}
        <button
          id="download-card-btn"
          onClick={handleDownload}
          className={`btn btn-gold${isBn ? " bengali-text" : ""}`}
        >
          {c.download}
        </button>

        {/* Share buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
          }}
        >
          <button
            id="share-wa-btn"
            onClick={handleShareWA}
            className="btn btn-share btn-share-wa"
          >
            <span>📱</span> {c.shareWA}
          </button>
          <button
            id="share-fb-btn"
            onClick={handleShareFB}
            className="btn btn-share btn-share-fb"
          >
            <span>👍</span> {c.shareFB}
          </button>
          <AnimatePresence mode="wait">
            <motion.button
              key={copied ? "copied" : "copy"}
              id="copy-link-btn"
              onClick={handleCopyLink}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`btn btn-share btn-share-copy${copied ? " copied" : ""}${isBn ? " bengali-text" : ""}`}
            >
              {copied ? "✅" : "📋"} {copied ? c.copied : c.copyLink}
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
