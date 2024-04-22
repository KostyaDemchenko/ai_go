"use client";

import React from "react";

import Head from "next/head";
import Header from "@/components/BasicСomponents/Header";
import ScrollToTop from "@/components/BasicСomponents/ScrollToTop";
import MainPreloader from "@/components/MainPageComponents/MainPreloader";
import MainPagesLastInfo from "@/components/MainPageComponents/MainPagesLastInfo";
import Footer from "@/components/BasicСomponents/Footer";
import MainSearch from "@/components/MainPageComponents/MainSearch";

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
        <ScrollToTop />
        <MainSearch />
        <MainPagesLastInfo />
        <Footer />
      </MainPreloader>
    </>
  );
}
