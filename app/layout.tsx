import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TravelMind — Agentic AI Travel Intelligence",
  description:
    "Watch an autonomous AI agent search five live data sources — flights, hotels, weather, visa requirements, and activities — then synthesize a complete travel briefing in under sixty seconds.",
  openGraph: {
    title: "TravelMind — Agentic AI Travel Intelligence",
    description:
      "Five autonomous tool calls. Real-time web intelligence. A complete travel briefing in under sixty seconds.",
    type: "website",
    url: "https://travelmind.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelMind — Agentic AI Travel Intelligence",
    description:
      "Five autonomous tool calls. Real-time web intelligence. A complete travel briefing in under sixty seconds.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "TravelMind",
              description: "AI Travel Intelligence Agent powered by LangGraph",
              applicationCategory: "TravelApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
