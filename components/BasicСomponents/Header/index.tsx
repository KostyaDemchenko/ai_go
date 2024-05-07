import React, { useState } from "react";
import Image from "next/image";

import ComingSoon from "@/components/BasicСomponents/ModalComingSoon";

import logo from "@/public/ai-go_logo.svg";

import "./style.scss";

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <header>
      <div className="left-side">
        <a href="/" className="logo-box">
          <Image src={logo} alt="ai-go-logo" />
        </a>
        <div className="link-box">
          <a href="/ai_list">ШІ-сервіси</a>
          <a href="/prompts_page">Промпти</a>
          <a href="/news_page">Блог</a>
          <button onClick={openModal}>Навчання</button>
          <a href="/about_us_page">Про нас</a>
        </div>
      </div>
      <div className="right-side">
        <div className="btn-box">
          <button onClick={openModal} className="btn btn-inactive">
            Увійти
          </button>
          <button onClick={openModal} className="btn btn-active">
            Реєстрація
          </button>
        </div>
      </div>
      <ComingSoon visible={modalVisible} onClose={() => setModalVisible(false)} />
    </header>
  );
};

export default Header;
