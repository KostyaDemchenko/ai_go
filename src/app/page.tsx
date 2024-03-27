"use client";

import React from "react";

import MainPreloader from "@/components/MainPreloader";
import Header from "@/components/Header";

import "./globals.scss";

export default function Home() {
  return (
    <MainPreloader>
      <>
        <Header />
        <main></main>
      </>
    </MainPreloader>
  );
}
