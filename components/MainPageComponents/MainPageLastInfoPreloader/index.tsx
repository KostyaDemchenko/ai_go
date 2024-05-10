import React, { useState, useEffect } from "react";
import AiCartPreloader from "@/components/PreloaderComponents/CartPreloader";
import PagesTitle from "./PagesTitlePreloader";
import "./style.scss";

const MainPagePreloader = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="page-last-info-box-preloader">
      <PagesTitle />
      {isMobile ? <AiCartPreloader cardCount={1} /> : <AiCartPreloader cardCount={4} />}
    </div>
  );
};

export default MainPagePreloader;
