import React, { useState, useEffect } from "react";
import Image from "next/image";

// Preloder
import MainPagePreloader from "@/components/MainPageComponents/MainPagePreloader";

import iconObj from "@/public/icons/utils";

import "./style.scss";

const NewsLastInfo: React.FC = () => {
  const [newsList, setNewsList] = useState<newsListStructured[] | null>(null);
  const [itemsPerPage] = useState<number>(4);
  const [sortType, setSortType] = useState<string>("newest");

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
    }
  }, [newsList, sortType, itemsPerPage]);

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
            newsList.map((news: newsListStructured, index: number) => (
              <div className="news-item" key={index}>
                <div className="top-box">
                  <img className="prev-img" src={news.news_img_url} alt={news.news_name} />
                </div>
                <div className="content-box">
                  <div className="news-title-box">
                    <p className="news-name">{news.news_name.slice(0, 25)}...</p>
                    <div
                      className="news-preview"
                      dangerouslySetInnerHTML={{ __html: news.news_text_full.slice(0, 60) + "..." }}
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NewsLastInfo;
