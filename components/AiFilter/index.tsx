import React, { useState } from "react";
import Image from "next/image";

import CustomCheckbox from "@/components/Checkbox";
import iconObj from "@/public/icons/utils";

import "./style.scss";

interface AiFilterProps {
  categories: string[];
  onSelectCategory: (selectedCategories: string[]) => void;
  filterName: string;
}

const AiFilter: React.FC<AiFilterProps> = ({ categories, onSelectCategory, filterName }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isBottomSectionVisible, setIsBottomSectionVisible] = useState<boolean>(false);

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onSelectCategory(updatedCategories);
  };

  const toggleBottomSection = () => {
    setIsBottomSectionVisible(!isBottomSectionVisible);
  };

  return (
    <div className={`ai-filter-container ${isBottomSectionVisible ? "open" : ""}`}>
      <div className="top-section" onClick={toggleBottomSection}>
        <p className="title">{filterName}</p>
        <Image className="icon" src={iconObj.arrowDown} width={16} height={16} alt="Arrow" />
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

export default AiFilter;
