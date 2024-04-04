"use client";

import React from "react";

import MainPreloader from "@/components/MainPreloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainSearch from "@/components/MainSearch";

import "@/src/app/globals.scss";

export default function Home() {
  return (
    <MainPreloader>
      <>
        <Header />
        <MainSearch />
        <Footer />
      </>
    </MainPreloader>
  );
}
