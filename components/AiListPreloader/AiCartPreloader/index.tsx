import React from "react";

import "./style.scss";

interface AiCartPreloaderProps {
  cardCount: number;
}

const AiCartPreloader: React.FC<AiCartPreloaderProps> = ({ cardCount }) => {
  const repeatArray = new Array(cardCount).fill(null);

  return (
    <div className="ai-list-container-preloader">
      {repeatArray.map((_, index) => (
        <div key={index} className="ai-item">
          <div className="img-box"></div>
          <div className="content-box">
            <div className="ai-title"></div>
            <div className="accordion"></div>
            <div className="property-box">
              <div className="preloader-property"></div>
              <div className="preloader-property"></div>
              <div className="preloader-property"></div>
              <div className="preloader-property"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AiCartPreloader;
