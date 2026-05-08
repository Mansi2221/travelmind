import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TravelMind - AI Travel Intelligence Agent",
  description:
    "AI-powered travel planning with real-time flight, hotel, weather, visa, and activity intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
