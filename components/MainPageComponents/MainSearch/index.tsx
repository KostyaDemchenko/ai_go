// components/MainSearch/index.tsx

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { TuringType } from "@/utils/TuringType"; // Импортируем TuringType

import iconObj from "@/public/icons/utils";
import "./style.scss";

const networkNames = [
  "ChatGPT",
  "Dalle2",
  "Sora",
  "Stable Diffusion",
  "OpenAI",
  "Nightcafe",
  "Vicuna"
]; // Массив названий нейросетей

const MainSearch: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>(localStorage.getItem("searchQuery") || "");
  const placeholderRef = useRef<HTMLInputElement>(null); // Референс для поля ввода
  const turingRef = useRef<TuringType>(); // Референс для экземпляра класса TuringType

  useEffect(() => {
    // Функция для обновления placeholder
    const updatePlaceholder = () => {
      let i = 0;
      const changePlaceholder = () => {
        if (placeholderRef.current) {
          turingRef.current = new TuringType(placeholderRef.current, networkNames[i], {
            callback: () => {
              setTimeout(() => {
                turingRef.current?.clear();
                i = (i + 1) % networkNames.length; // Переход к следующему названию
                setTimeout(changePlaceholder, 1000); // Задержка перед началом ввода следующего названия
              }, 2000); // Время отображения введенного названия перед очисткой
            }
          });
        }
      };
      changePlaceholder();
    };
    updatePlaceholder(); // Запуск обновления placeholder при монтировании компонента
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query); // Обновление состояния searchQuery
    localStorage.setItem("searchQuery", query); // Сохранение значения в localStorage
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/ai_list"); // Переход на страницу списка AI при отправке формы
  };

  return (
    <div className="cover">
      <div className="container">
        <div className="box">
          <h1 className="site-title">Перша українська бібліотека ШІ та промптів для студентів</h1>
          <form className="search-box" onSubmit={handleSubmit}>
            <button type="submit">
              <Image src={iconObj.search} alt="Search" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder=""
              ref={placeholderRef}
              onFocus={() => {
                if (turingRef.current) {
                  // Активация фокуса на элементе только если это необходимо
                  turingRef.current.pause();
                }
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainSearch;
