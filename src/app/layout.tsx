import React from "react";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.scss";

export const metadata: Metadata = {
  title: "Ai Go",
  description: "News site about ai"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </head>
      <body>{children}</body>
      <SpeedInsights />
    </html>
  );
}
