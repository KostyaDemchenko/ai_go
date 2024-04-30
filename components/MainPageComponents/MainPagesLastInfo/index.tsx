// components/MainPagesLastInfo/index.tsx

import React from "react";

import AiLastInfo from "./AiLastInfo";
import NewsLastInfo from "./NewsLastInfo";
import PromtsLastInfo from "./PromptsLastInfo";

import "./style.scss";

import "./style.scss";

const MainPagesLastInfo: React.FC = () => {
  return (
    <>
      <div className="container-last-info-pages">
        <NewsLastInfo />
        <AiLastInfo />
        <PromtsLastInfo />
      </div>
    </>
  );
};

export default MainPagesLastInfo;
