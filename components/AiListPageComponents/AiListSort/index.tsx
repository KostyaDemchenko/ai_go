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
        <Image className="icon" src={iconObj.sort} width={16} height={16} alt="Arrow" />
      </div>
      <div className={`sort-options-list ${isSortVisible ? "open" : ""}`}>
        <button onClick={() => handleSort("newest")}>
          <Image className="icon" src={iconObj.dateUp} width={20} height={20} alt="Arrow" />
          За датою
        </button>
        <button onClick={() => handleSort("oldest")}>
          <Image className="icon" src={iconObj.dateDown} width={20} height={20} alt="Arrow" />
          За датою
        </button>
        <button onClick={() => handleSort("highest-rated")}>
          <Image className="icon" src={iconObj.ratingUp} width={20} height={20} alt="Arrow" />
          За рейтином
        </button>
        <button onClick={() => handleSort("lowest-rated")}>
          <Image className="icon" src={iconObj.ratingDown} width={20} height={20} alt="Arrow" />
          За рейтином
        </button>
      </div>
    </div>
  );
};

export default SortOptions;
