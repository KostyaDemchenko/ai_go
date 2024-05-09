// components/Menu.tsx
import React, { useState } from "react";
import Image from "next/image";

import iconObj from "@/public/icons/utils";

import ComingSoon from "@/components/BasicСomponents/ModalComingSoon";

import styles from "./style.module.scss";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuMobile: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
      <div className={styles.menuContainer}>
        <div className={styles.topSection}>
          <div className={styles.menuClose}>
            <p className={styles.title}>Меню</p>
            <button onClick={onClose} className={styles.closeButton}>
              <Image src={iconObj.close} alt="menu close" width={24} height={24} />
            </button>
          </div>
          <div className={styles.menuItems}>
            <a href="/">Головна</a>
            <a href="/ai_list">ШІ-сервіси</a>
            <a href="/prompts_page">Промпти</a>
            <a href="/news_page">Блог</a>
            <button onClick={openModal}>Навчання</button>
            <a href="/about_us_page">Про нас</a>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.btnBox}>
            <button onClick={openModal} className="btn btn-inactive">
              Увійти
            </button>
            <button onClick={openModal} className="btn btn-active">
              Реєстрація
            </button>
          </div>
        </div>
      </div>
      <ComingSoon visible={modalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default MenuMobile;
