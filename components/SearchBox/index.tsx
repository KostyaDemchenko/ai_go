import React, { useState } from "react";
import Image from "next/image";

import iconObj from "@/public/icons/utils";

import "./style.scss";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Добавьте вашу логику обработки запроса здесь
    console.log("Выполняется поиск для запроса:", searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <button type="submit">
        <Image src={iconObj.search} alt="Arrow" />
      </button>
      <input type="text" value={searchQuery} onChange={handleChange} placeholder="Я шукаю..." />
    </form>
  );
};

export default SearchBox;
