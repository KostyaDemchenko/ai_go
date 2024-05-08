"use client";

import React from "react";
import Image from "next/image";

import Head from "next/head";
import Header from "@/components/BasicСomponents/Header";
import ScrollToTop from "@/components/BasicСomponents/ScrollToTop";
import Footer from "@/components/BasicСomponents/Footer";

import about_us from "@/public/img/about-us.png";

import "./style.scss";
import "@/src/app/globals.scss";

export default function ai_list() {
  return (
    <>
      {/* Metadata */}
      <Head>
        <title>AiGo - Нейромережі</title>
        <meta
          name="description"
          content="Ми - колектив експертів у сфері штучного інтелекту, які працюють над створенням передових нейромережових технологій. Наша команда зосереджена на досягненні високих стандартів якості та інноваційності у таких областях, як розпізнавання образів, природна мова та автономні системи. Наша мета - революціонізувати технології, зробивши їх доступними та ефективними для всіх.          "
        />
        <meta property="og:image" content="http://euro-travel-example.com/thumbnail.jpg" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      {/* Metadata */}
      <ScrollToTop />
      <Header />
      <main>
        <div className="container">
          <h2 className="page-title">Про нас</h2>
          <div className="about-us-container">
            <Image src={about_us} alt="ai-go-logo" />
            <div className="text-container">
              <p className="description">
                Ми - це колектив експертів, що поєднує унікальні знання та пристрасну зацікавленість
                у сфері штучного інтелекту.
              </p>
              <p className="description">
                На протязі багатьох років ми працюємо над створенням інноваційних рішень, що
                використовують сучасні методи машинного навчання та глибокого навчання. Наша команда
                має глибокі знання у сферах комп'ютерної науки, математики, психології та інших
                галузей, які лежать в основі розвитку штучного інтелекту.
              </p>
              <p className="description">
                У "AI-Go" ми прагнемо досягти високих стандартів якості та інноваційності у всіх
                наших продуктах та послугах. Ми розвиваємо нейромережові рішення, спрямовані на
                вирішення складних завдань у таких сферах, як розпізнавання образів, природної мови,
                автономні системи та інше.
              </p>
              <p className="description">
                Наша мета - революціонізувати спосіб, яким люди взаємодіють з технологіями, зробивши
                їх більш доступними, ефективними та зручними для кожного. Ми віримо в силу інновацій
                та продовжуємо працювати для того, щоб змінювати світ за допомогою штучного
                інтелекту.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
