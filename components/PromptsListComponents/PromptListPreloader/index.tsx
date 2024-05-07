import React from "react";

import FiltersPreloader from "@/components/PreloaderComponents/FiltersPreloader";
import CartPreloader from "@/components/PreloaderComponents/CartPreloader";
import PaginationPreloader from "@/components/PreloaderComponents/PaginationPreloader";

import "./style.scss";

const PromptListPreloader = () => {
  return (
    <div className="preloader-container">
      <div className="preloader-settings">
        <FiltersPreloader />
      </div>
      <CartPreloader cardCount={12} />
      <PaginationPreloader />
    </div>
  );
};

export default PromptListPreloader;
