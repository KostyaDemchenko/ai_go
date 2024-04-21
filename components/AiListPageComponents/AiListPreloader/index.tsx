import React from "react";

import SearchPreloader from "./SearchPreloader";
import FiltersPreloader from "./FiltersPreloader";
import AiCartPreloader from "./AiCartPreloader";
import PaginationPreloader from "./PaginationPreloader";

import "./style.scss";

const ListPreloader = () => {
  return (
    <div className="preloader-container">
      <div className="preloader-settings">
        <SearchPreloader />
        <FiltersPreloader />
      </div>
      <AiCartPreloader cardCount={12} />
      <PaginationPreloader />
    </div>
  );
};

export default ListPreloader;
