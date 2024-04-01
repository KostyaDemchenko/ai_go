// components/SortOptions/index.tsx

import React, { useState } from "react";
import Image from "next/image";

import "./style.scss";

import iconObj from "@/public/icons/utils";

interface SortOptionsProps {
  handleSort: (type: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ handleSort }) => {
  const [isSortVisible, setIsSortVisible] = useState<boolean>(false);

  const toggleSort = () => {
    setIsSortVisible(!isSortVisible);
  };

  return (
    <div className={`sort-options-container ${isSortVisible ? "open" : ""}`}>
      <div className="sort-options-title" onClick={toggleSort}>
        <p>Сортування</p>
        <Image className="icon" src={iconObj.arrowDown} width={16} height={16} alt="Arrow" />
      </div>
      <div className={`sort-options-list ${isSortVisible ? "open" : ""}`}>
        <button onClick={() => handleSort("newest")}>
          <Image className="icon" src={iconObj.arrowDown} width={20} height={20} alt="Arrow" />
          Newest to Oldest
        </button>
        <button onClick={() => handleSort("oldest")}>
          <Image className="icon" src={iconObj.arrowDown} width={20} height={20} alt="Arrow" />
          Oldest to Newest
        </button>
        <button onClick={() => handleSort("highest-rated")}>
          <Image className="icon" src={iconObj.arrowDown} width={20} height={20} alt="Arrow" />
          Highest Rated
        </button>
        <button onClick={() => handleSort("lowest-rated")}>
          <Image className="icon" src={iconObj.arrowDown} width={20} height={20} alt="Arrow" />
          Lowest Rated
        </button>
      </div>
    </div>
  );
};

export default SortOptions;
