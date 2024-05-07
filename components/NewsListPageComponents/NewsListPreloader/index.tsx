import React from "react";

import CartPreloader from "@/components/PreloaderComponents/CartPreloader";
import PaginationPreloader from "@/components/PreloaderComponents/PaginationPreloader";

import "./style.scss";

const NewsListPreloader = () => {
  return (
    <div className="preloader-container">
      <CartPreloader cardCount={12} />
      <PaginationPreloader />
    </div>
  );
};

export default NewsListPreloader;
