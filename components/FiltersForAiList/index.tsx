import React from "react";

import "./style.scss";

interface FilterComponentProps {
  types: string[];
  selectedTypes: string[];
  handleTypeSelect: (type: string) => void;
  filterName: string;
}
const FilterForAiList: React.FC<FilterComponentProps> = ({
  types,
  selectedTypes,
  handleTypeSelect,
  filterName
}) => {
  return (
    <div className="filter-container">
      <h3>Filter by {filterName}:</h3>
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

export default FilterForAiList;
