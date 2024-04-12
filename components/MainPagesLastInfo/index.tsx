// components/MainPagesLastInfo/index.tsx

import React from "react";
import Image from "next/image";

import iconObj from "@/public/icons/utils";
import AiLastInfo from "./AiLastInfo";

import "./style.scss";

import "./style.scss";

const MainPagesLastInfo: React.FC = () => {
  return (
    <>
      <div className="container-last-info-pages">
        {/* news last info */}
        <AiLastInfo />
        {/* promts last info */}
      </div>
    </>
  );
};

export default MainPagesLastInfo;
