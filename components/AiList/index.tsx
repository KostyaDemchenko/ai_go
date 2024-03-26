import React, { useState, useEffect } from "react";

import CartRate from "@/components/CartRating";
import Preloader from "@/components/Preloader";
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
    return <Preloader />; // Render loading indicator while data is being fetched
  }

  return (
    <div className="container">
      <div className="ai-list-container">
        {aiList.map((ai, index) => (
          <div key={index} className="ai-item">
            <img className="prev-img" src={ai.ai_img_url} alt={ai.ai_name} />
            <div className="content-box">
              <p>{ai.ai_name}</p>
              <CartRate rate={ai.ai_rate} />
              <AccordionAiItems description={ai.ai_description} />
              <AiLinkBox url={ai.ai_url} />
              <div className="property-box">
                {/* {ai.ai_from_ukr.some((type: MultiSelectOption) => type.name === "UA") && (
                <div>
                  <span role="img" aria-label="Ukraine flag">
                    🇺🇦
                  </span>
                </div>
              )}
              {ai.ai_from_ukr.map((type: MultiSelectOption, innerIndex: number) => (
                <div key={innerIndex}>
                  <p>{type.name}</p>
                </div>
              ))}
              <div>
                {ai.ai_input.map((type: MultiSelectOption, innerIndex: number) => (
                  <p key={innerIndex}>{type.name}</p>
                ))}
              </div>
              <div>
                {ai.ai_uses.map((type: MultiSelectOption, innerIndex: number) => (
                  <p key={innerIndex}>{type.name}</p>
                ))}
              </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiList;
