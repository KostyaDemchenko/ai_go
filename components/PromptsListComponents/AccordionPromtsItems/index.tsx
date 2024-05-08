import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { toast, Slide } from "react-toastify";

import iconObj from "@/public/icons/utils";

import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

interface AccordionPromptsItemsProps {
  promptsContent: string;
}

const AccordionPromptsItems: React.FC<AccordionPromptsItemsProps> = ({ promptsContent }) => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | undefined>(0);
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(expanded ? contentRef.current.scrollHeight : 0);
    }
  }, [expanded]);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promptsContent).then(() => {
      const copiedTextPreview =
        promptsContent.substring(0, 10) + (promptsContent.length > 10 ? "..." : "");
      toast(`Скопійовано: ${copiedTextPreview}`, {
        transition: Slide,
        position: "top-right",
        autoClose: 3000,
        theme: "dark"
      });
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
        <p
          className="description"
          onClick={handleCopy}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {promptsContent}
          {isHovered && (
            <div className="copy-btn-container">
              <Image className="icon" src={iconObj.copy} width={16} height={16} alt="Copy" />
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default AccordionPromptsItems;
