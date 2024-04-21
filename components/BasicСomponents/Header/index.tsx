import React from "react";
import Image from "next/image";

import logo from "@/public/ai-go_logo.svg";

import "./style.scss";

const Header = () => {
  return (
    <header>
      <div className="left-side">
        <a href="/" className="logo-box">
          <Image src={logo} alt="ai-go-logo" />
        </a>
        <div className="link-box">
          <a href="/ai_list">ШІ-сервіси</a>
          <a href="/prompts_page">Промпти</a>
          <a href="">Навчання</a>
          <a href="">Блог</a>
          <a href="">Про нас</a>
        </div>
      </div>
      <div className="right-side">
        <div className="btn-box">
          <a href="" className="btn btn-inactive">
            Увійти
          </a>
          <a href="" className="btn btn-active">
            Реєстрація
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
