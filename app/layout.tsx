import './globals.css'
import type { Metadata } from 'next'
import { Chivo_Mono } from "next/font/google";

const chivo_mono = Chivo_Mono({ weight: "800", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Timer",
  description: "Generate a custom timer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={chivo_mono.className}>{children}</body>
    </html>
  );
}
