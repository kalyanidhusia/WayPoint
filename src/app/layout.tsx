import type { Metadata } from "next";
import "./globals.css";
import "./companion.css";

export const metadata: Metadata = {
  title: "WayPoint | Redeploy your skills. Not your life.",
  description: "Translate military experience into civilian career pathways, learning opportunities, mentorship, and a focused 30-day plan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
