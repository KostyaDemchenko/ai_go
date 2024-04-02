"use client";

import React from "react";
import Header from "@/components/Header";
import AiList from "@/components/AiList";
import Footer from "@/components/Footer";

import "./style.scss";
import "@/src/app/globals.scss";

export default function page_list() {
  return (
    <>
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
