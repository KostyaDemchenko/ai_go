import React, { useState } from "react";
import Image from "next/image";

import ComingSoon from "@/components/BasicСomponents/ModalComingSoon";

import iconObj from "@/public/icons/utils";
import logo from "@/public/ai-go_logo.svg";

import "./style.scss";

const Footer = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  return (
    <footer>
      <div className="top-section">
        <div className="first-column col">
          <a href="/" className="logo-box">
            <Image src={logo} alt="ai-go-logo" />
          </a>
          <p className="description">
            AI.GO - корисний інструмент для кожного студента, який має велику бібліотеку ШІ-сервісів
            та промптів.
          </p>
          <a href="mailto:aigo.lib@gmail.com" className="mail-box">
            <Image src={iconObj.mail} alt="ai-go-logo" />
            aigo.lib@gmail.com
          </a>
        </div>
        <div className="site-navigation">
          <div className="second-column col">
            <a className="title" href="/ai_list">
              ШІ-сервіси
            </a>
            <a href="/ai_list" className="link">
              Chat GPT
            </a>
            <a href="/ai_list" className="link">
              Midjourney
            </a>
            <a href="/ai_list" className="link">
              DALL-E
            </a>
            <a href="/ai_list" className="link">
              PHCrhoma
            </a>
            <a href="/ai_list" className="link">
              Stable Diffusion
            </a>
          </div>
          <div className="third-column col">
            <a className="title" href="/prompts_page">
              Промпти
            </a>
            <a href="/prompts_page" className="link">
              Промпти Chat GPT
            </a>
            <a href="/prompts_page" className="link">
              Промпти Midjourney
            </a>
            <a href="/prompts_page" className="link">
              Промпти DALL-E
            </a>
            <a href="/prompts_page" className="link">
              Промпти PHCrhoma
            </a>
            <a href="/prompts_page" className="link">
              Промпти Stable Diffusion
            </a>
          </div>
          <div className="fourth-column col">
            <a className="title" href="/">
              Мапа сайту
            </a>
            <button onClick={openModal} className="link">
              Навчання
            </button>
            <a href="/news_page" className="link">
              Блог
            </a>
            <a href="/about_us_page" className="link">
              Про нас
            </a>
          </div>
        </div>
        <div className="fifth-column col">
          <div className="text-box">
            <p className="title">Новинна розсилка</p>
            <p className="description">
              Підпишіться на нашу новинну розсилку щоб отримувати актуальні новини про ШІ-сервіси
            </p>
          </div>
          <div className="input-box">
            <input type="text" placeholder="Ваш email" />
            <button onClick={openModal} className="btn btn-active">
              Підписатись
            </button>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="bottom-section">
        <p className="copyright">© 2024. AiGO. Усі права збережені.</p>
        <a
          href="https://zakon.rada.gov.ua/laws/show/2811-20#n461"
          target="_blank"
          className="copyright"
        >
          Закони та умови
        </a>
      </div>
      <ComingSoon visible={modalVisible} onClose={() => setModalVisible(false)} />
    </footer>
  );
};

export default Footer;
