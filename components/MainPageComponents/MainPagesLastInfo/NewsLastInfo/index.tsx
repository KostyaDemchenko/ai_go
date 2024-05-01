import React, { useState, useEffect } from "react";
import Image from "next/image";

// Preloder
import MainPagePreloader from "@/components/MainPageComponents/MainPagePreloader";
import NewsCart from "@/components/NewsListPageComponents/NewsCart";

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
      </div>
    </>
  );
};

export default NewsLastInfo;
