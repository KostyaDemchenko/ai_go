// Preloader.tsx

import React, { useState, useEffect } from "react";

import "./style.scss";

interface MainPreloaderProps {
  children: React.ReactNode;
}

const MainPreloader: React.FC<MainPreloaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return timeoutId;
    };

    const timeoutId = loadData();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="preloader-container">
      {isLoading ? (
        <div className="main-preloader">
          <img src="/video/preloaderNew.gif" alt="Preloader" width={300} height={300} />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default MainPreloader;
