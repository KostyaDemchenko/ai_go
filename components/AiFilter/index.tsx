// components/AiFilter/index.tsx

import React, { useState } from "react";

interface AiFilterProps {
  categories: string[];
  onSelectCategory: (selectedCategories: string[]) => void;
}

const AiFilter: React.FC<AiFilterProps> = ({ categories, onSelectCategory }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onSelectCategory(updatedCategories); // Вызываем функцию onSelectCategory с обновленным списком категорий
  };

  return (
    <div>
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
  );
};

export default AiFilter;
