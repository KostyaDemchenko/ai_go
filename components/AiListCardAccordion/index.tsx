import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import iconObj from "@/public/icons/utils";

import "./style.scss";

const AccordionAiItems: React.FC<{
  description: string;
  // ... (other props if there are any)
}> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | undefined>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(expanded ? contentRef.current.scrollHeight : 0);
    }
  }, [expanded]);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`accordion ${expanded ? "expanded" : ""}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <p className="title">Опис</p>
        <Image
          className={`icon ${expanded ? "rotate" : ""}`}
          src={iconObj.arrowRight}
          alt="Arrow"
        />
      </div>
      <div
        className="accordion-content"
        style={{ maxHeight: expanded ? contentHeight : 0 }}
        ref={contentRef}
      >
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default AccordionAiItems;
