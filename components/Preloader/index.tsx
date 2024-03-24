import React from "react";
import Image from "next/image";

import "./style.scss";

import logo from "@/public/ai-go_logo.svg";

const Preloader = () => {
  return (
    <div className="preloader">
      <Image src={logo} alt="Arrow" />
    </div>
  );
};

export default Preloader;
