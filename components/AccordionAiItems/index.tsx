import React, { useState } from "react";
import Image from "next/image";
import iconObj from "@/public/icons/utils";

import "./style.scss";

interface AccordionAiItemsProps {
  description: string;
}

const AccordionAiItems: React.FC<AccordionAiItemsProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <p>Опис</p>
        {/* Используем иконку arrowRight */}
        <Image className="icon" src={iconObj.arrowRight} alt="Arrow" />
      </div>
      {expanded && (
        <div className="accordion-content">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default AccordionAiItems;
