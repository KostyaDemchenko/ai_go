import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import iconObj from "@/public/icons/utils";

import "./style.scss";

const ScrollToTop: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Обработчик события для скролла
    const handleScroll = () => {
      // Показываем кнопку, если прокрутка больше, чем 100 пикселей вниз
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Подписываемся на событие скролла при монтировании компонента
    window.addEventListener("scroll", handleScroll);

    // Отписываемся от события скролла при размонтировании компонента
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    // Поднимаем пользователя вверх страницы
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* Показываем кнопку только если isVisible равно true */}
      {isVisible && (
        <button className="scrollToTopButton" onClick={scrollToTop}>
          <Image
            className="icon"
            src={iconObj.arrowScrollToTop}
            width={24}
            height={24}
            alt="Arrow"
          />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
