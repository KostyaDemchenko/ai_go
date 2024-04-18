// AiLastInfo/index.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Preloder
import MainPagePreloader from "@/components/MainPagePreloader";

// Components
import CartRate from "@/components/AiListCartRating";
import AccordionAiItems from "@/components/AiListCardAccordion";
import AiLinkBox from "@/components/AiListLinkBox";
import CopyButton from "@/components/CopyTextBtn";

import iconObj from "@/public/icons/utils";

import "./style.scss";

const AiLastInfo: React.FC = () => {
  const [aiList, setAiList] = useState<aiListStructured[] | null>(null);
  const [filteredAiList, setFilteredAiList] = useState<aiListStructured[] | null>(null);
  const [itemsPerPage] = useState<number>(4);
  const [sortType, setSortType] = useState<string>("newest");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const aiListData = await fetchFromNotion();
      setAiList(aiListData);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    if (aiList) {
      const sortedList = [...aiList];
      switch (sortType) {
        case "newest":
          sortedList.sort(
            (a, b) => (new Date(b.ai_date_post) as any) - (new Date(a.ai_date_post) as any)
          );
          break;
        case "oldest":
          sortedList.sort(
            (a, b) => (new Date(a.ai_date_post) as any) - (new Date(b.ai_date_post) as any)
          );
          break;
        default:
          break;
      }
      setFilteredAiList(sortedList.slice(0, itemsPerPage));
    }
  }, [aiList, sortType, itemsPerPage]);

  if (aiList === null) {
    return <MainPagePreloader />;
  }

  return (
    <>
      <div className="page-last-info-box">
        <a href="./ai_list" className="page-link">
          Нейромережі
          <Image className="icon" src={iconObj.openLink} alt="Open link" />
        </a>
        {/* <CopyButton text="Нейромережі" /> */}
        <div className="ai-list-container">
          {filteredAiList && filteredAiList.length > 0 ? (
            filteredAiList.map((ai, index) => (
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
            ))
          ) : (
            <p>No items to display.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AiLastInfo;
