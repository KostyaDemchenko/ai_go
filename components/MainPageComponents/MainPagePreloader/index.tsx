import React from "react";

import AiCartPreloader from "@/components/PreloaderComponents/CartPreloader";
import PagesTitle from "./PagesTitlePreloader";

import "./style.scss";

const MainPagePreloader = () => {
  return (
    <div className="page-last-info-box-preloader">
      <PagesTitle />
      <AiCartPreloader cardCount={4} />
    </div>
  );
};

export default MainPagePreloader;
