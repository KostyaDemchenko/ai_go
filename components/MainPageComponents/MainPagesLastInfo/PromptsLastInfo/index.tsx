import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import Rodal from "rodal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "rodal/lib/rodal.css";

// Preloder
import MainPagePreloader from "@/components/MainPageComponents/MainPageLastInfoPreloader";

// Components
import CartRate from "@/components/PromptsListComponents/CartRating";
import DownloadBtn from "@/components/BasicСomponents/DownloadBtn";
import AccordionPromptsItems from "@/components/PromptsListComponents/AccordionPromtsItems";

import iconObj from "@/public/icons/utils";

import "./style.scss";

const PromtsLastInfo: React.FC = () => {
  const [promptsList, setPromptsList] = useState<promtsListStructured[] | null>(null);
  const [itemsPerPage] = useState<number>(4);
  const [sortType, setSortType] = useState<string>("newest");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVideoUrl, setModalVideoUrl] = useState<string>("");

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
      setPromptsList(sortedList);
    }
  }, [promptsList, sortType]);

  const handleOpenModal = (videoUrl: string) => {
    setModalVideoUrl(videoUrl);
    setModalVisible(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    document.body.style.overflow = "auto"; // Enable scrolling when modal is closed
  };

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
            promptsList
              .slice(0, itemsPerPage)
              .map((prompt: promtsListStructured, index: number) => (
                <div key={index} className="prompt-item">
                  <div className="top-box">
                    <CartRate rate={prompt.prompt_rate} />
                    {prompt.promt_result_type.find((type) => type.name === "video") ? (
                      // If type is video, show modal trigger
                      <div
                        className="prev-box"
                        onClick={() => handleOpenModal(prompt.prompt_result_video_url)}
                      >
                        <img
                          className="prev-img"
                          src={
                            "https://i.ytimg.com/vi/" +
                            prompt.prompt_result_video_url +
                            "/maxresdefault.jpg"
                          }
                          alt="Watch Video"
                        />
                        <Image src={iconObj.playBtn} alt="Open modal" className="icon" />
                      </div>
                    ) : (
                      // If type is image, show image
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
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          pagination={{
            clickable: true
          }}
          className="promptsSwiper"
        >
          {promptsList.slice(0, itemsPerPage).map((prompt: promtsListStructured, index: number) => (
            <SwiperSlide key={index} className="prompt-item">
              <div className="top-box">
                <CartRate rate={prompt.prompt_rate} />
                {prompt.promt_result_type.find((type) => type.name === "video") ? (
                  <div
                    className="prev-box"
                    onClick={() => handleOpenModal(prompt.prompt_result_video_url)}
                  >
                    <img
                      className="prev-img"
                      src={
                        "https://i.ytimg.com/vi/" +
                        prompt.prompt_result_video_url +
                        "/maxresdefault.jpg"
                      }
                      alt="Watch Video"
                    />
                    <Image src={iconObj.playBtn} alt="Open modal" className="icon" />
                  </div>
                ) : (
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Rodal
        visible={modalVisible}
        onClose={handleCloseModal}
        width={0}
        height={0}
        customStyles={{ height: "100%", width: "100%" }}
        className="youtube-modal"
      >
        <iframe
          width="100%"
          height="100%"
          src={"https://www.youtube.com/embed/" + modalVideoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </Rodal>
      <ToastContainer />
    </>
  );
};

export default PromtsLastInfo;
