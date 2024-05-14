/// components/SortOptions/index.tsx

import React, { useState } from "react";
import Image from "next/image";
import Rodal from "rodal";

import "rodal/lib/rodal.css";
import "./style.scss";

import iconObj from "@/public/icons/utils";

interface SortOptionsProps {
  handleSort: (type: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ handleSort }) => {
  const [isSortVisible, setIsSortVisible] = useState(false);

  const toggleSort = () => {
    setIsSortVisible(!isSortVisible);
  };

  return (
    <>
      <div className={`sort-options-container ${isSortVisible ? "open" : ""}`}>
        <div className="sort-options-title" onClick={toggleSort}>
          <p>Сортування</p>
          <Image className="icon" src={iconObj.sort} width={16} height={16} alt="Arrow" />
        </div>
        <div className={`sort-options-list ${isSortVisible ? "open" : ""}`}>
          <button onClick={() => handleSort("newest")}>
            <Image className="icon" src={iconObj.dateUp} width={20} height={20} alt="Arrow" />
            За датою
          </button>
          <button onClick={() => handleSort("oldest")}>
            <Image className="icon" src={iconObj.dateDown} width={20} height={20} alt="Arrow" />
            За датою
          </button>
          <button onClick={() => handleSort("highest-rated")}>
            <Image className="icon" src={iconObj.ratingUp} width={20} height={20} alt="Arrow" />
            За рейтином
          </button>
          <button onClick={() => handleSort("lowest-rated")}>
            <Image className="icon" src={iconObj.ratingDown} width={20} height={20} alt="Arrow" />
            За рейтином
          </button>
        </div>
      </div>
      <div className="sorting-modal-triger" onClick={toggleSort}>
        <Image className="icon" src={iconObj.sort} width={16} height={16} alt="Arrow" />
        <p>Сортування</p>
      </div>
      <Rodal
        visible={isSortVisible}
        onClose={toggleSort}
        width={0}
        height={0}
        customStyles={{ height: "fit-content", width: "100%" }}
        className="sort-modal"
        animation="slideUp"
      >
        <div className="sort-options-title" onClick={toggleSort}>
          <p>Сортування</p>
        </div>
        <div className="content">
          <div className={`sort-options-list ${isSortVisible ? "open" : ""}`}>
            <button onClick={() => handleSort("newest")}>
              <Image className="icon" src={iconObj.dateUp} width={20} height={20} alt="Arrow" />
              За датою
            </button>
            <button onClick={() => handleSort("oldest")}>
              <Image className="icon" src={iconObj.dateDown} width={20} height={20} alt="Arrow" />
              За датою
            </button>
            <button onClick={() => handleSort("highest-rated")}>
              <Image className="icon" src={iconObj.ratingUp} width={20} height={20} alt="Arrow" />
              За рейтином
            </button>
            <button onClick={() => handleSort("lowest-rated")}>
              <Image className="icon" src={iconObj.ratingDown} width={20} height={20} alt="Arrow" />
              За рейтином
            </button>
          </div>
          <button className="btn btn-active" onClick={toggleSort}>
            Сортувати
          </button>
        </div>
      </Rodal>
    </>
  );
};

export default SortOptions;
