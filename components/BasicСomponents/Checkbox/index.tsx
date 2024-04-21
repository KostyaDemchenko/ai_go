import React from "react";
import Image from "next/image";

import iconObj from "@/public/icons/utils";

import "./style.scss";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange }) => {
  return (
    <div className="custom-checkbox" onClick={onChange}>
      <div className={`checkbox ${checked ? "checked" : ""}`}>
        {checked && (
          <Image className="icon" src={iconObj.check} width={14} height={14} alt="check" />
        )}
      </div>
    </div>
  );
};

export default CustomCheckbox;
