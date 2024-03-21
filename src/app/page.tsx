"use client";

import React from "react";
import Link from "next/link";
import "./globals.scss";

export default function Home() {
  return (
    <main>
      <div>
        <Link href="/AiList">link</Link>
      </div>
    </main>
  );
}
