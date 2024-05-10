"use client";

import React from "react";

import Head from "next/head";
import Header from "@/components/BasicСomponents/Header";
import NewsList from "@/components/NewsListPageComponents/NewsList";
import ScrollToTop from "@/components/BasicСomponents/ScrollToTop";
import Footer from "@/components/BasicСomponents/Footer";

import "./style.scss";
import "@/src/app/globals.scss";

export default function promts_page() {
  return (
    <>
      {/* Metadata */}
      <Head>
        <title>AiGo - Блог</title>
        <meta
          name="description"
          content=" AiGo - ваш вірний провідник у світ нейромереж. Від введення у виртуальну реальність до глибокого навчання, ми розкриваємо найсвіжіші та найцікавіші аспекти цього захоплюючого світу. Вивчаємо та розбираємо найновіші технологічні відкриття, ділимося експертними порадами та інсайтами з реального досвіду в застосуванні нейромереж. Наш блог - ваша ключова точка входу до універсуму штучного інтелекту та нейронаук. Відкрийте для себе нові можливості з AiGo!"
        />
        <meta
          property="og:image"
          content="https://t4.ftcdn.net/jpg/04/79/39/21/360_F_479392118_SyGDm9Rewoxp5kpSiQBMVd96nl2M4GZs.jpg"
        />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      {/* Metadata */}
      <Header />
      <ScrollToTop />
      <main>
        <div className="container">
          <h2 className="page-title">Блог</h2>
          <NewsList />
        </div>
      </main>
      <Footer />
    </>
  );
}
