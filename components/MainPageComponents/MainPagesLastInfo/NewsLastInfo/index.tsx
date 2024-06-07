import React, { useState, useEffect } from "react";
import Image from "next/image";
import Rodal from "rodal";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Rodal styles
import "rodal/lib/rodal.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Preloader
import MainPagePreloader from "@/components/MainPageComponents/MainPageLastInfoPreloader";
import NewsCart from "@/components/NewsListPageComponents/NewsCart";

// Icons
import iconObj from "@/public/icons/utils";

// Styles
import "./style.scss";

const NewsLastInfo: React.FC = () => {
  const [newsList, setNewsList] = useState<newsListStructured[] | null>(null);
  const [itemsPerPage] = useState<number>(4);
  const [sortType, setSortType] = useState<string>("newest");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<newsListStructured | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const newsListData = await fetchFromNotion();
      setNewsList(newsListData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFromNotion = async (): Promise<newsListStructured[]> => {
    try {
      const deployedApiUrl = "/api/notion_news_list";
      const res = await fetch(deployedApiUrl);
      const data = await res.json();
      return data.newsListStructured as newsListStructured[];
    } catch (error) {
      throw new Error(`Error fetching News list: ${error}`);
    }
  };

  useEffect(() => {
    if (newsList) {
      sortNewsList();
    }
  }, [sortType]);

  const sortNewsList = () => {
    if (!newsList) return;

    const sortedList = [...newsList];
    switch (sortType) {
      case "newest":
        sortedList.sort(
          (a, b) => (new Date(b.news_date_post) as any) - (new Date(a.news_date_post) as any)
        );
        break;
      case "oldest":
        sortedList.sort(
          (a, b) => (new Date(a.news_date_post) as any) - (new Date(b.news_date_post) as any)
        );
        break;
      default:
        break;
    }
    setNewsList(sortedList);
  };

  const handleOpenModal = (news: newsListStructured) => {
    setSelectedNews(news);
    setModalVisible(true);
    // Disable body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    // Enable body scrolling when modal is closed
    document.body.style.overflow = "auto";
  };

  if (newsList === null) {
    return <MainPagePreloader />;
  }

  return (
    <>
      <div className="page-last-info-box">
        <a href="./news_page" className="page-link">
          Новини
          <Image className="icon" src={iconObj.openLink} alt="Open link" />
        </a>
        <div className="news-list-container">
          {newsList.length === 0 ? (
            <p>No items to display.</p>
          ) : (
            newsList
              .slice(0, itemsPerPage)
              .map((news: newsListStructured, index: number) => (
                <NewsCart
                  key={index}
                  news_img_url={news.news_img_url}
                  news_name={news.news_name}
                  news_text_full={news.news_text_full}
                  news_time_to_read={news.news_time_to_read}
                  news_date_post={news.news_date_post}
                  news_type={news.news_type}
                  news_source_url={news.news_source_url}
                  news_video_url={news.news_video_url}
                />
              ))
          )}
        </div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          pagination={{
            clickable: true
          }}
          className="newsSwiper"
        >
          {newsList.length === 0 ? (
            <p>No items to display.</p>
          ) : (
            newsList.slice(0, itemsPerPage).map((news: newsListStructured, index: number) => (
              <SwiperSlide key={index} className="swiper-slide-news">
                <div className="news-item" onClick={() => handleOpenModal(news)}>
                  <div className="top-box">
                    <img className="prev-img" src={news.news_img_url} alt={news.news_name} />
                  </div>
                  <div className="content-box">
                    <div className="news-title-box">
                      <p className="news-name">{news.news_name.slice(0, 25)}...</p>
                      <div
                        className="news-preview"
                        dangerouslySetInnerHTML={{
                          __html: news.news_text_full.slice(0, 60) + "..."
                        }}
                      />
                    </div>
                    <div className="news-info">
                      <div className="time-to-read-box">
                        <Image src={iconObj.time} alt="Time to read" className="icon" />
                        <p className="time-to-read">{news.news_time_to_read} хв.</p>
                      </div>
                      <p className="data-post">{news.news_date_post}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
        <Rodal
          visible={modalVisible}
          onClose={handleCloseModal}
          width={0}
          height={0}
          customStyles={{ height: "fit-content", width: "100%" }}
          className="news-modal"
        >
          {selectedNews && (
            <>
              {selectedNews.news_type.find((type) => type.name === "video") ? (
                // If the type is video, show video content
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedNews.news_video_url}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              ) : (
                <div className="full-img-box">
                  <img
                    className="full-img"
                    src={selectedNews.news_img_url}
                    alt={selectedNews.news_name}
                  />
                  <div className="time-to-read-box">
                    <Image src={iconObj.time} alt="Time to read" className="icon" />
                    <p className="time-to-read">{selectedNews.news_time_to_read} хв.</p>
                  </div>
                </div>
              )}

              <div className="news-content-full">
                <h4 className="news-title-full">{selectedNews.news_name}</h4>
                <div
                  className="news-text-full"
                  dangerouslySetInnerHTML={{ __html: selectedNews.news_text_full }}
                />
                <div className="news-data">
                  <a
                    className="news-source"
                    href={selectedNews.news_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Джерело новини
                  </a>
                  <p className="data-post">{selectedNews.news_date_post}</p>
                </div>
              </div>
            </>
          )}
        </Rodal>
      </div>
    </>
  );
};

export default NewsLastInfo;
