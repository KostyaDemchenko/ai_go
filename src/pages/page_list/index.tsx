"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AiList from "@/components/AiList";

import "./style.scss";
import "@/src/app/globals.scss";

export default function page_list() {
  return (
    <>
      <Header />
      <main>
        <AiList />
      </main>
      <Footer />
    </>
  );
}
