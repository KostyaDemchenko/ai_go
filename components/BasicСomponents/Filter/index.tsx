import React, { useState } from "react";
import Image from "next/image";

import CustomCheckbox from "@/components/BasicСomponents/Checkbox";
import iconObj from "@/public/icons/utils";

import "./style.scss";

interface AiFilterProps {
  categories: string[];
  onSelectCategory: (selectedCategories: string[]) => void;
  filterName: string;
  inActive: boolean;
  selectedCategories: string[]; // Добавляем свойство selectedCategories
}

const Filter: React.FC<AiFilterProps> = ({
  categories,
  onSelectCategory,
  filterName,
  inActive,
  selectedCategories
}) => {
  const [isBottomSectionVisible, setIsBottomSectionVisible] = useState<boolean>(false);

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat: string) => cat !== category)
      : [...selectedCategories, category];
    onSelectCategory(updatedCategories);
  };

  const toggleBottomSection = () => {
    setIsBottomSectionVisible(!isBottomSectionVisible);
  };

  return (
    <div className={`ai-filter-container ${isBottomSectionVisible ? "open" : ""}`}>
      <div className={`top-section ${inActive ? "in-active" : ""}`} onClick={toggleBottomSection}>
        <p className="title">{filterName}</p>
        <Image
          className={`icon ${isBottomSectionVisible ? "rotate" : ""}`}
          src={iconObj.arrowRight}
          alt="Arrow"
        />
      </div>
      <div className={`bottom-section ${isBottomSectionVisible ? "open" : ""}`}>
        {categories.map((category) => (
          <label key={category}>
            <CustomCheckbox
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

export default Filter;
