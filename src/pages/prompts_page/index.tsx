"use client";

import React from "react";

import Head from "next/head";
import Header from "@/components/BasicСomponents/Header";
import PromptsList from "@/components/PromptsListComponents/PromptsList";
import ScrollToTop from "@/components/BasicСomponents/ScrollToTop";
import Footer from "@/components/BasicСomponents/Footer";

import "./style.scss";
import "@/src/app/globals.scss";

export default function promts_page() {
  return (
    <>
      {/* Metadata */}
      <Head>
        <title>AiGo - Промпти</title>
        <meta
          name="description"
          content="Инновационные промпты для нейросетей: повышайте эффективность обучения и креативность AI с помощью Ai-Go."
        />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      {/* Metadata */}
      <Header />
      <ScrollToTop />
      <main>
        <div className="container">
          <h2 className="page-title">Промпти</h2>
          <PromptsList />
        </div>
      </main>
      <Footer />
    </>
  );
}
