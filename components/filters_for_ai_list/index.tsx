import React from "react";

import "./style.scss";

interface FilterComponentProps {
  types: string[];
  selectedTypes: string[];
  handleTypeSelect: (type: string) => void;
}
const FilterComponent: React.FC<FilterComponentProps> = ({
  types,
  selectedTypes,
  handleTypeSelect
}) => {
  return (
    <div className="filter-container">
      <h3>Filter by Type:</h3>
      <div className="filter-options">
        {types.map((type: string) => (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeSelect(type)}
            />
            {type}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
