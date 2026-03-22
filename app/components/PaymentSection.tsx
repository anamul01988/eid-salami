"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentSectionProps {
  lang: "en" | "bn";
  onSuccess: (amount: number, name: string) => void;
}

const PRESET_AMOUNTS = [10, 50, 100, 200, 500];
const BKASH_NUMBER = "01827969106";

const CONTENT = {
  en: {
    title: "Choose Your Salami Amount",
    subtitle: "Every amount is a blessing 🤲",
    custom: "Custom Amount",
    customPlaceholder: "Enter amount (BDT)",
    yourName: "Your Name",
    namePlaceholder: "e.g. Rahim",
    payBtn: "Pay via bKash",
    payNote: "You will be redirected to bKash payment",
    bkashStep1: "Open bKash app",
    bkashStep2: 'Go to "Send Money"',
    bkashStep3: `Send to: ${BKASH_NUMBER}`,
    bkashStep4: "Reference: Eid Salami for Anamul",
    trxIdLabel: "Transaction ID (TrxID)",
    trxIdPlaceholder: "Enter 10-digit bKash TrxID",
    bkashConfirm: "✔ I have completed the payment",
    cancel: "Cancel",
    amountLabel: "BDT",
    trxRequired: "Please enter your Transaction ID to proceed",
  },
  bn: {
    title: "সালামির পরিমাণ বেছে নিন",
    subtitle: "প্রতিটি সালামি একটি আশীর্বাদ 🤲",
    custom: "অন্য পরিমাণ",
    customPlaceholder: "পরিমাণ লিখুন (টাকা)",
    yourName: "আপনার নাম",
    namePlaceholder: "যেমন: রহিম",
    payBtn: "bKash-এ পেমেন্ট করুন",
    payNote: "আপনাকে bKash পেমেন্টে নিয়ে যাওয়া হবে",
    bkashStep1: "bKash অ্যাপ খুলুন",
    bkashStep2: '"Send Money" তে যান',
    bkashStep3: `পাঠান: ${BKASH_NUMBER}`,
    bkashStep4: "রেফারেন্স: আনামুলের ঈদ সালামি",
    trxIdLabel: "ট্রানজেকশন আইডি (TrxID)",
    trxIdPlaceholder: "১০ ডিজিটের TrxID লিখুন",
    bkashConfirm: "✔ আমি পেমেন্ট সম্পন্ন করেছি",
    cancel: "বাতিল",
    amountLabel: "টাকা",
    trxRequired: "এগিয়ে যেতে আপনার ট্রানজেকশন আইডি লিখুন",
  },
};

export default function PaymentSection({
  lang,
  onSuccess,
}: PaymentSectionProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [trxId, setTrxId] = useState("");
  const [step, setStep] = useState<"select" | "instructions">("select");
  const c = CONTENT[lang];
  const isBn = lang === "bn";

  const finalAmount =
    selectedAmount ?? (customAmount ? parseInt(customAmount) : null);

  const handleProceed = () => {
    if (!finalAmount || finalAmount < 10) return;
    setStep("instructions");
  };

  const handleConfirm = () => {
    if (!finalAmount || trxId.length < 8) return;
    onSuccess(finalAmount, name.trim() || "Anonymous");
  };

  const cardStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 10,
    width: "100%",
    borderRadius: 24,
    overflow: "hidden",
    background:
      "linear-gradient(160deg, rgba(45,14,24,0.98) 0%, rgba(30,9,16,0.98) 100%)",
    border: "1px solid rgba(201,168,76,0.2)",
    boxShadow: "0 8px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.1)",
  };

  return (
    <motion.div
      id="payment-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={cardStyle}
    >
      <div
        style={{
          height: 4,
          width: "100%",
          background:
            "linear-gradient(90deg, transparent, #c9a84c, #f0d580, #c9a84c, transparent)",
        }}
      />

      <div style={{ padding: "28px 28px 32px" }}>
        <AnimatePresence mode="wait">
          {step === "select" ? (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -30 }}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              {/* Header */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>💸</div>
                <h2
                  className={isBn ? "bengali-text" : ""}
                  style={{
                    color: "#e8c97a",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginBottom: 6,
                    margin: 0,
                  }}
                >
                  {c.title}
                </h2>
                <p
                  className={isBn ? "bengali-text" : ""}
                  style={{
                    color: "#9c7a30",
                    fontSize: "0.85rem",
                    marginTop: 6,
                  }}
                >
                  {c.subtitle}
                </p>
              </div>

              {/* Preset amounts grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 10,
                }}
              >
                {PRESET_AMOUNTS.map((amt) => {
                  const isActive = selectedAmount === amt;
                  return (
                    <button
                      key={amt}
                      id={`amount-${amt}`}
                      onClick={() => {
                        setSelectedAmount(isActive ? null : amt);
                        setCustomAmount("");
                      }}
                      className={`btn-amount${isActive ? " btn-amount-active" : ""}`}
                      style={
                        isActive
                          ? {}
                          : {
                              background: "rgba(201,168,76,0.08)",
                              border: "1px solid rgba(201,168,76,0.2)",
                              color: "#c9a84c",
                            }
                      }
                    >
                      <span style={{ fontSize: "1rem", fontWeight: 700 }}>
                        {amt}
                      </span>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 400,
                          opacity: 0.85,
                          marginTop: 2,
                        }}
                      >
                        {c.amountLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom amount */}
              <div>
                <label
                  className={isBn ? "bengali-text" : ""}
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    color: "#9c7a30",
                    marginBottom: 8,
                  }}
                >
                  {c.custom}
                </label>
                <input
                  id="custom-amount-input"
                  type="number"
                  min={10}
                  placeholder={c.customPlaceholder}
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className={`field-input${isBn ? " bengali-text" : ""}`}
                />
              </div>

              {/* Name input */}
              <div>
                <label
                  className={isBn ? "bengali-text" : ""}
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    color: "#9c7a30",
                    marginBottom: 8,
                  }}
                >
                  {c.yourName}
                </label>
                <input
                  id="name-input"
                  type="text"
                  placeholder={c.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`field-input${isBn ? " bengali-text" : ""}`}
                />
              </div>

              {/* Pay button */}
              <button
                id="pay-btn"
                onClick={handleProceed}
                disabled={!finalAmount || finalAmount < 10}
                className={`btn btn-bkash${isBn ? " bengali-text" : ""}`}
              >
                <span style={{ marginRight: 8, fontSize: "1.1rem" }}>🟣</span>
                {c.payBtn}
                {finalAmount ? ` — ${finalAmount} BDT` : ""}
              </button>

              <p
                className={isBn ? "bengali-text" : ""}
                style={{
                  textAlign: "center",
                  fontSize: "0.75rem",
                  color: "#6b5030",
                  margin: 0,
                }}
              >
                {c.payNote}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              {/* bKash header */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 24px",
                    borderRadius: 9999,
                    background: "linear-gradient(135deg, #e2136e, #c0105a)",
                    boxShadow: "0 4px 20px rgba(226,19,110,0.4)",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontWeight: 900,
                      fontSize: "1.1rem",
                    }}
                  >
                    bKash
                  </span>
                  <span style={{ color: "white", fontSize: "1.3rem" }}>🟣</span>
                </div>
                <h2
                  style={{
                    color: "#e8c97a",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    margin: "0 0 6px",
                  }}
                >
                  {finalAmount} BDT
                </h2>
                <p style={{ color: "#9c7a30", fontSize: "0.85rem", margin: 0 }}>
                  Send money manually via bKash
                </p>
              </div>

              {/* Steps */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {[c.bkashStep1, c.bkashStep2, c.bkashStep3, c.bkashStep4].map(
                  (stepText, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "12px 16px",
                        borderRadius: 12,
                        background: "rgba(226,19,110,0.06)",
                        border: "1px solid rgba(226,19,110,0.15)",
                      }}
                    >
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #e2136e, #c0105a)",
                          color: "white",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={isBn ? "bengali-text" : ""}
                        style={{
                          color: "#d4c4a0",
                          fontSize: "0.9rem",
                          lineHeight: 1.5,
                        }}
                      >
                        {stepText}
                      </span>
                    </div>
                  ),
                )}
              </div>

              {/* TrxID Input */}
              <div style={{ marginTop: 8 }}>
                <label
                  className={isBn ? "bengali-text" : ""}
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    color: "#c9a84c",
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  {c.trxIdLabel} *
                </label>
                <input
                  id="trx-id-input"
                  type="text"
                  placeholder={c.trxIdPlaceholder}
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className={`field-input${isBn ? " bengali-text" : ""}`}
                  style={{ borderColor: trxId.length >= 8 ? "rgba(52,211,153,0.5)" : "rgba(226,19,110,0.3)" }}
                />
                {!trxId && (
                  <p style={{ color: "#e2136e", fontSize: "0.7rem", marginTop: 6, fontStyle: "italic" }}>
                    {c.trxRequired}
                  </p>
                )}
              </div>

              {/* Confirm button */}
              <button
                id="confirm-payment-btn"
                onClick={handleConfirm}
                disabled={trxId.length < 8}
                className={`btn btn-gold${isBn ? " bengali-text" : ""}`}
                style={{ opacity: trxId.length < 8 ? 0.6 : 1 }}
              >
                {c.bkashConfirm}
              </button>

              {/* Back */}
              <button
                id="back-btn"
                onClick={() => setStep("select")}
                className={`btn-text${isBn ? " bengali-text" : ""}`}
                style={{ margin: "0 auto", display: "block" }}
              >
                ← {c.cancel}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
        }}
      />
    </motion.div>
  );
}
