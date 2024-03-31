// components/SearchBox/index.tsx

import React, { useState } from "react";
import Image from "next/image";

import iconObj from "@/public/icons/utils";

import "./style.scss";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Викликаємо функцію пошуку при зміні введеного запиту
  };

  return (
    <form className="search-box">
      <button type="button" disabled>
        <Image src={iconObj.search} alt="Arrow" />
      </button>
      <input type="text" value={searchQuery} onChange={handleChange} placeholder="Я шукаю..." />
    </form>
  );
};

export default SearchBox;
