"use client";

import React from "react";

import Head from "next/head";
import Header from "@/components/Header";
import MainPreloader from "@/components/MainPreloader";
import MainPagesLastInfo from "@/components/MainPagesLastInfo";
import Footer from "@/components/Footer";
import MainSearch from "@/components/MainSearch";

import "@/src/app/globals.scss";

export default function Home() {
  return (
    <>
      {/* Metadata */}
      <Head>
        <title>AiGo</title>
        <meta name="description" content="Головна сторінка" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      {/* Metadata */}
      <MainPreloader>
        <Header />
        <MainSearch />
        <MainPagesLastInfo />
        <Footer />
      </MainPreloader>
    </>
  );
}
