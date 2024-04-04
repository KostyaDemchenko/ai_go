"use client";

import React from "react";

import Head from "next/head";
import Header from "@/components/Header";
import AiList from "@/components/AiList";
import Footer from "@/components/Footer";

import "./style.scss";
import "@/src/app/globals.scss";

export default function page_list() {
  return (
    <>
      {/* Metadata */}
      <Head>
        <title>AiGo - Нейромережі</title>
        <meta
          name="description"
          content="Наш каталог нейромереж пропонує вам високоефективні алгоритми штучного інтелекту для різноманітних завдань, забезпечуючи точність та надійність у ваших проектах. Довіртеся нашим рішенням для досягнення нових висот у сфері інновацій та технологій."
        />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      {/* Metadata */}
      <Header />
      <main>
        <div className="container">
          <h2 className="page-title">Нейромережі</h2>
          <AiList />
        </div>
      </main>
      <Footer />
    </>
  );
}
