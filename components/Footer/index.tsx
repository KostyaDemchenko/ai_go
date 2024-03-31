import React from "react";
import Image from "next/image";

import iconObj from "@/public/icons/utils";
import logo from "@/public/ai-go_logo.svg";

import "./style.scss";

const Footer = () => {
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
        <div className="second-column col">
          <p className="title">ШІ-сервіси</p>
          <a href="" className="link">
            Chat GPT
          </a>
          <a href="" className="link">
            Midjourney
          </a>
          <a href="" className="link">
            DALL-E
          </a>
          <a href="" className="link">
            PHCrhoma
          </a>
          <a href="" className="link">
            Stable Diffusion
          </a>
        </div>
        <div className="third-column col">
          <p className="title">Промпти</p>
          <a href="" className="link">
            Промпти Chat GPT{" "}
          </a>
          <a href="" className="link">
            Промпти Midjourney
          </a>
          <a href="" className="link">
            Промпти DALL-E
          </a>
          <a href="" className="link">
            Промпти PHCrhoma
          </a>
          <a href="" className="link">
            Промпти Stable Diffusion
          </a>
        </div>
        <div className="fourth-column col">
          <p className="title">Мапа сайту</p>
          <a href="" className="link">
            Навчання
          </a>
          <a href="" className="link">
            Блог
          </a>
          <a href="" className="link">
            Про нас
          </a>
          <a href="" className="link">
            Зв’язатись з нами
          </a>
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
            <button className="btn btn-active">Підписатись</button>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="bottom-section">
        <p className="copyright">© 2024. AiGO. Усі права збережені.</p>
        <p className="copyright">Закони та умови</p>
      </div>
    </footer>
  );
};

export default Footer;
