"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import FloatingParticles from "./components/FloatingParticles";
import MainCard from "./components/MainCard";
import PaymentSection from "./components/PaymentSection";
import Leaderboard from "./components/Leaderboard";

const SuccessScreen = dynamic(() => import("./components/SuccessScreen"), {
  ssr: false,
});
const EidCardGenerator = dynamic(() => import("./components/EidCardGenerator"), {
  ssr: false,
});

type AppState = "main" | "payment" | "success" | "card";

interface Supporter {
  name: string;
  amount: number;
  isNew?: boolean;
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "bn">("bn");
  const [appState, setAppState] = useState<AppState>("main");
  const [declined, setDeclined] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  const [paidName, setPaidName] = useState("");
  const [newSupporters, setNewSupporters] = useState<Supporter[]>([]);
  const leaderboardRef = useRef<HTMLDivElement>(null);

  const handleLangToggle = () => setLang((l) => (l === "en" ? "bn" : "en"));

  const handleYes = () => {
    setDeclined(false);
    setAppState("payment");
    // Small delay before scrolling for visual smoothness
    setTimeout(() => {
      window.scrollTo({ top: 200, behavior: "smooth" });
    }, 100);
  };

  const handleNo = () => {
    setDeclined(true);
  };

  const handlePaymentSuccess = (amount: number, name: string) => {
    setPaidAmount(amount);
    setPaidName(name);
    setNewSupporters((prev) => [{ name, amount, isNew: true }, ...prev]);
    setAppState("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGenerateCard = () => {
    setAppState("card");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div
      className="relative min-h-screen flex justify-center"
      style={{
        background:
          "radial-gradient(ellipse at top, #2d0e18 0%, #1a0a0f 40%, #0f0508 100%)",
      }}
    >
      {/* Animated background */}
      <FloatingParticles />

      {/* Desktop glow - centered on screen */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      {/* Main content wrapper - max 500px centered for app-like feel */}
      <div className="relative z-10 w-full max-w-[500px] min-h-screen flex flex-col">
        <Header lang={lang} onLangToggle={handleLangToggle} />

        <main className="flex-1 flex flex-col gap-6 px-4 pb-10 pt-4">
          <AnimatePresence mode="wait">
            {/* SUCCESS SCREEN */}
            {appState === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                <SuccessScreen
                  lang={lang}
                  amount={paidAmount}
                  name={paidName}
                  onGenerateCard={handleGenerateCard}
                />
              </motion.div>
            )}

            {/* CARD GENERATOR */}
            {appState === "card" && (
              <motion.div
                key="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                <EidCardGenerator lang={lang} name={paidName} amount={paidAmount} />

                {/* Back to top */}
                <button
                  id="back-to-home"
                  onClick={() => setAppState("main")}
                  className="mx-auto text-sm py-2 px-5 rounded-full transition-all hover:opacity-70"
                  style={{
                    border: "1px solid rgba(201,168,76,0.25)",
                    color: "#9c7a30",
                  }}
                >
                  ← {lang === "bn" ? "হোমে ফিরুন" : "Back to Home"}
                </button>
              </motion.div>
            )}

            {/* MAIN FLOW */}
            {(appState === "main" || appState === "payment") && (
              <motion.div
                key="main-flow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                {/* Main Eid card */}
                <MainCard
                  lang={lang}
                  onYes={handleYes}
                  onNo={handleNo}
                  declined={declined}
                />

                {/* Payment section — shown when user clicks yes */}
                <AnimatePresence>
                  {appState === "payment" && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <PaymentSection lang={lang} onSuccess={handlePaymentSuccess} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Leaderboard */}
                <div ref={leaderboardRef}>
                  <Leaderboard lang={lang} supporters={newSupporters} />
                </div>

                {/* Footer */}
                <footer className="text-center py-4 space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="h-px w-16"
                      style={{ background: "rgba(201,168,76,0.2)" }}
                    />
                    <span style={{ color: "rgba(201,168,76,0.5)", fontSize: 14 }}>
                      🌙
                    </span>
                    <div
                      className="h-px w-16"
                      style={{ background: "rgba(201,168,76,0.2)" }}
                    />
                  </div>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(201,168,76,0.35)" }}
                  >
                    Made with ❤️ for Anamul
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(201,168,76,0.2)" }}
                  >
                    eid-salami-psi.vercel.app
                  </p>
                </footer>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
