// components/SearchBox/index.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";

import iconObj from "@/public/icons/utils";

import "./style.scss";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>(localStorage.getItem("searchQuery") || "");

  useEffect(() => {
    if (searchQuery) {
      onSearch(searchQuery);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="search-box">
      <button type="button" disabled>
        <Image src={iconObj.search} alt="Search" />
      </button>
      <input type="text" value={searchQuery} onChange={handleChange} placeholder="Я шукаю..." />
    </div>
  );
};

export default SearchBox;
