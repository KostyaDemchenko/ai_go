import React, { useState, useEffect } from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Preloder
import MainPagePreloader from "@/components/MainPageComponents/MainPageLastInfoPreloader";

// Components
import AiCart from "@/components/AiListPageComponents/AiCart";

// Icons
import iconObj from "@/public/icons/utils";

// Styles
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
        <div className="ai-list-container">
          {filteredAiList && filteredAiList.length > 0 ? (
            filteredAiList.map((ai, index) => <AiCart key={index} ai={ai} />)
          ) : (
            <p>No items to display.</p>
          )}
        </div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          pagination={{
            clickable: true
          }}
          className="aiSwiper"
        >
          {filteredAiList && filteredAiList.length > 0 ? (
            filteredAiList.map((ai, index) => (
              <SwiperSlide key={index}>
                <AiCart ai={ai} />
              </SwiperSlide>
            ))
          ) : (
            <p>No items to display.</p>
          )}
        </Swiper>
      </div>
    </>
  );
};

export default AiLastInfo;
