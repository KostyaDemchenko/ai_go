import React, { useState } from "react";
import Image from "next/image";
import ComingSoon from "@/components/BasicСomponents/ModalComingSoon"; // Путь к компоненту модалки

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
          <a href="">Навчання</a>
          <a href="">Про нас</a>
        </div>
      </div>
      <div className="right-side">
        <div className="btn-box">
          {/* Добавляем обработчик события для открытия модалки */}
          <button onClick={openModal} className="btn btn-inactive">
            Увійти
          </button>
          <a href="" className="btn btn-active">
            Реєстрація
          </a>
        </div>
      </div>
      {/* Показываем модалку, если modalVisible равно true */}
      <ComingSoon visible={modalVisible} onClose={() => setModalVisible(false)} />
    </header>
  );
};

export default Header;
