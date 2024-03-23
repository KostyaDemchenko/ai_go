import React, { useState } from "react";

interface AccordionAiItemstProps {
  description: string;
}

const AccordionAiItems: React.FC<AccordionAiItemstProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <p>Опис</p>
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
