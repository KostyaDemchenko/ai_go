import React, { useState } from "react";
import icons from "@/public/icons/utils";

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
        <img src={icons.arrowRight} alt="Arrow" />
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
