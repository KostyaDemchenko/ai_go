import React from "react";
import Image from "next/image";

import SearchBox from "@/components/SearchBox";

import logo from "@/public/ai-go_logo.svg";

import "./style.scss";

const Header = () => {
  return (
    <header>
      <a href="/" className="logo-box">
        <Image src={logo} alt="ai-go-logo" />
      </a>
      <div className="link-box">
        <a href="/page_list">ШІ-сервіси</a>
        <a href="">Промпти</a>
        <a href="">Навчання</a>
        <a href="">Блог</a>
        <a href="">Про нас</a>
      </div>
      <SearchBox />
      <div className="btn-box">
        <a href="" className="btn btn-inactive">
          Увійти
        </a>
        <a href="" className="btn btn-active">
          Реєстрація
        </a>
      </div>
    </header>
  );
};

export default Header;
