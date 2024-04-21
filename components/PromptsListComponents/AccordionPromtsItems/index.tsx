import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import CopyButton from "@/components/BasicСomponents/CopyTextBtn";

import iconObj from "@/public/icons/utils";

import "./style.scss";

interface AccordionPromptsItemsProps {
  promptsContent: string;
}

const AccordionPromptsItems: React.FC<AccordionPromptsItemsProps> = ({ promptsContent }) => {
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

  const getContentPadding = () => {
    if (contentRef.current) {
      const computedStyle = window.getComputedStyle(contentRef.current);
      return parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
    }
    return 0;
  };

  return (
    <div className={`accordion ${expanded ? "expanded" : ""}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <p className="title">Промпт</p>
        <Image
          className={`icon ${expanded ? "rotate" : ""}`}
          src={iconObj.arrowRight}
          alt="Arrow"
          width={16}
          height={16}
        />
      </div>
      <div
        className="accordion-content"
        style={{
          maxHeight: expanded ? contentHeight : 0,
          padding: expanded ? "5px" : "0 5px 0 5px"
        }}
        ref={contentRef}
      >
        <p className="description">{promptsContent}</p>
        <CopyButton text={promptsContent} />
      </div>
    </div>
  );
};

export default AccordionPromptsItems;
