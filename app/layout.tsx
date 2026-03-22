import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Eid Salami for Anamul | Eid Mubarak 🌙",
  description:
    "Ei Eid-e Anamul-ke ektu salami diye din. Send your Eid Salami via bKash and be part of this beautiful tradition.",
  keywords: ["Eid Salami", "Eid Mubarak", "bKash", "Anamul", "Eid ul Fitr"],
  openGraph: {
    title: "Eid Salami for Anamul 🌙",
    description: "Ei Eid-e, Anamul-ke ki ektu salami deben?",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${inter.variable} h-full`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
