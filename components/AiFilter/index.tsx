// components/AiFilter/index.tsx

import React, { useState } from "react";
import Image from "next/image";

import iconObj from "@/public/icons/utils";

import "./style.scss";

interface AiFilterProps {
  categories: string[];
  onSelectCategory: (selectedCategories: string[]) => void;
  filterName: string; // Добавляем prop для передачи заголовка фильтра
}

const AiFilter: React.FC<AiFilterProps> = ({ categories, onSelectCategory, filterName }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onSelectCategory(updatedCategories); // Вызываем функцию onSelectCategory с обновленным списком категорий
  };

  return (
    <div className="ai-filter-container">
      <div className="top-section">
        <p className="title">{filterName}</p>
        <Image className="icon" src={iconObj.arrowDown} width={16} height={16} alt="Arrow" />
      </div>
      <div className="bottom-section">
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryToggle(category)}
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
};

export default AiFilter;
