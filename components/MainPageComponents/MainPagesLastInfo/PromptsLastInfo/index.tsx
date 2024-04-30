import React, { useState, useEffect } from "react";
import Image from "next/image";

// Preloder
import MainPagePreloader from "@/components/MainPageComponents/MainPagePreloader";

// Components
import CartRate from "@/components/PromptsListComponents/CartRating";
import DownloadBtn from "@/components/BasicСomponents/DownloadBtn";
import AccordionPromptsItems from "@/components/PromptsListComponents/AccordionPromtsItems";
import YoutubeModal from "@/components/BasicСomponents/YoutubeModal";

import iconObj from "@/public/icons/utils";

import "./style.scss";

const PromtsLastInfo: React.FC = () => {
  const [promptsList, setPromptsList] = useState<promtsListStructured[] | null>(null);
  const [itemsPerPage] = useState<number>(4);
  const [sortType, setSortType] = useState<string>("newest");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const newsListData = await fetchFromNotion();
      setPromptsList(newsListData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFromNotion = async (): Promise<promtsListStructured[]> => {
    try {
      const deployedApiUrl = "/api/notion_prompts_list";
      const res = await fetch(deployedApiUrl);
      const data = await res.json();
      return data.promtsListStructured as promtsListStructured[];
    } catch (error) {
      throw new Error(`Error fetching Prompts list: ${error}`);
    }
  };

  useEffect(() => {
    if (promptsList) {
      const sortedList = [...promptsList];
      switch (sortType) {
        case "newest":
          sortedList.sort(
            (a, b) => (new Date(b.prompt_date_post) as any) - (new Date(a.prompt_date_post) as any)
          );
          break;
        case "oldest":
          sortedList.sort(
            (a, b) => (new Date(a.prompt_date_post) as any) - (new Date(b.prompt_date_post) as any)
          );
          break;
        default:
          break;
      }
    }
  }, [promptsList, sortType, itemsPerPage]);

  if (promptsList === null) {
    return <MainPagePreloader />;
  }

  return (
    <>
      <div className="page-last-info-box">
        <a href="./prompts_page" className="page-link">
          Промпти
          <Image className="icon" src={iconObj.openLink} alt="Open link" />
        </a>
        <div className="prompts-list-container">
          {promptsList.length === 0 ? (
            <p>No items to display.</p>
          ) : (
            promptsList.map((prompt: promtsListStructured, index: number) => (
              <div key={index} className="prompt-item">
                <div className="top-box">
                  <CartRate rate={prompt.prompt_rate} />
                  {prompt.promt_result_type.find((type) => type.name === "video") ? (
                    // Если тип - видео, показываем триггер модального окна
                    <YoutubeModal
                      videoTitle={prompt.prompt_name}
                      videoUrl={prompt.prompt_result_video_url}
                      imageUrl={prompt.prompt_result_img_url}
                    />
                  ) : (
                    // Если тип - изображение, показываем изображение
                    <img
                      className="prev-img"
                      src={prompt.prompt_result_img_url}
                      alt={prompt.prompt_name}
                    />
                  )}
                  <DownloadBtn downloadLink={prompt.prompt_result_img_url} />
                </div>
                <div className="content-box">
                  <div className="prompt-title-box">
                    <a className="prompt-ai-title" target="_blank" href={prompt.prompt_ai_url}>
                      {prompt.prompt_ai_title.map((type: MultiSelectOption) => type.name)}
                    </a>
                    <p className="prompt-name">{prompt.prompt_name}</p>
                  </div>
                  <AccordionPromptsItems promptsContent={prompt.prompt_pattern} />
                  <div className="property-box">
                    {[
                      ...prompt.prompt_type.map((type: MultiSelectOption) => type.name),
                      ...prompt.prompt_speciality.map((type: MultiSelectOption) => type.name),
                      ...prompt.prompt_ai_title.map((type: MultiSelectOption) => type.name)
                    ].map((name: string, index: number) => (
                      <p className="property" key={index}>
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PromtsLastInfo;
