import React, { useState, useEffect } from "react";

import CartRate from "@/components/CartRating";
import ListPreloader from "@/components/ListPreloader";
import AccordionAiItems from "@/components/AccordionAiItems";
import AiLinkBox from "@/components/AiLinkBox";

import "./style.scss";

const AiList = () => {
  const [aiList, setAiList] = useState<aiListStructured[] | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const aiListData = await fetchFromNotion();
        setAiList(aiListData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Fetch data
  const fetchFromNotion = async (): Promise<aiListStructured[]> => {
    try {
      const deployedApiUrl = "/api/notion_ai_list";
      const res = await fetch(deployedApiUrl);
      const data = await res.json();
      return data.aiListStructured as aiListStructured[];
    } catch (error) {
      throw new Error(`Error fetching AI list: ${error}`);
    }
  };

  // Preloader
  if (aiList === null) {
    return <ListPreloader />; // Render loading indicator while data is being fetched
  }

  return (
    <div className="container">
      <div className="ai-list-container">
        {aiList.map((ai, index) => (
          <div key={index} className="ai-item">
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
        ))}
      </div>
    </div>
  );
};

export default AiList;
