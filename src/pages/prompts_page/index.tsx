"use client";

import React from "react";

import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <main>
        <div className="container">
          <h2 className="page-title">Промпти</h2>
          {/* <PromtList /> */}
        </div>
      </main>
      <Footer />
    </>
  );
}
