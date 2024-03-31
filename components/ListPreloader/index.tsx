import React from "react";

import "./style.scss";

const ListPreloader = () => {
  // Создаем массив с 15 элементами (можно использовать любое значение)
  const repeatArray = new Array(12).fill(null);

  return (
    <div className="preloader-container">
      <div className="preloader-settings">
        <div className="preloader-search"></div>
        <div className="preloader-filters"></div>
      </div>
      <div className="ai-list-container">
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
      <div className="pleoader-pagination"></div>
    </div>
  );
};

export default ListPreloader;
