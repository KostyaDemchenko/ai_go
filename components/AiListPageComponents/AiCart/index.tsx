import React from "react";

// Components
import CartRate from "@/components/AiListPageComponents/AiListCartRating";
import AiLinkBox from "@/components/AiListPageComponents/AiListLinkBox";
import AccordionAiItems from "@/components/AiListPageComponents/AiListCardAccordion";

//Styles
import "./style.scss";

// Types
interface AiCardProps {
  ai: aiListStructured;
}

const AiCard: React.FC<AiCardProps> = ({ ai }) => {
  return (
    <div className="ai-item">
      <img className="prev-img" src={ai.ai_img_url} alt={ai.ai_name} />
      <div className="content-box">
        <CartRate rate={ai.ai_rate} />
        <AiLinkBox url={ai.ai_url} />
        <div className="ai-title-box">
          <p className="ai-name">{ai.ai_name}</p>
          {ai.ai_from_ukr.some((type: MultiSelectOption) => type.name === "🇺🇦") && (
            <div>
              <span role="img" aria-label="Ukraine flag">
                🇺🇦
              </span>
            </div>
          )}
        </div>
        <AccordionAiItems description={ai.ai_description} />
        <div className="property-box">
          {[
            ...ai.ai_uses.map((type: MultiSelectOption) => type.name),
            ...ai.ai_sector.map((type: MultiSelectOption) => type.name),
            ...ai.ai_cost.map((type: MultiSelectOption) => type.name),
            ...ai.ai_api.map((type: MultiSelectOption) => type.name)
          ].map((name: string, index: number) => (
            <p className="property" key={index}>
              {name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiCard;
