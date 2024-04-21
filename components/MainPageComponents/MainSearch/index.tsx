// components/MainSearch/index.tsx

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import iconObj from "@/public/icons/utils";

import "./style.scss";

const MainSearch: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>(localStorage.getItem("searchQuery") || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    localStorage.setItem("searchQuery", query); // Сохраняем значение в localStorage
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/ai_list");
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
              placeholder="Я шукаю..."
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainSearch;
