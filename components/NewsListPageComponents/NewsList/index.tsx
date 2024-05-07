import React, { useState, useEffect } from "react";

import ListPreloader from "@/components/AiListPageComponents/AiListPreloader";
import Pagination from "@/components/BasicСomponents/Pagination";
import NewsCart from "@/components/NewsListPageComponents/NewsCart";
import NewsListPreloader from "@/components/NewsListPageComponents/NewsListPreloader";

import "./style.scss";

const NewsList: React.FC = () => {
  const [newsList, setNewsList] = useState<newsListStructured[] | null>(null);
  const [sortedNewsList, setSortedNewsList] = useState<newsListStructured[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(12);

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
      throw new Error(`Error fetching AI list: ${error}`);
    }
  };

  useEffect(() => {
    if (newsList) {
      const sortedNews = newsList.slice().sort((a, b) => {
        return new Date(b.news_date_post).getTime() - new Date(a.news_date_post).getTime();
      });
      setSortedNewsList(sortedNews);
    }
  }, [newsList]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedNewsList?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (sortedNewsList === null) {
    return <NewsListPreloader />;
  }

  return (
    <>
      <div className="news-list-container">
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((news, index) => (
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
        ) : (
          <p>Тут ще нічого нема :(</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={sortedNewsList.length}
        paginate={paginate}
      />
    </>
  );
};

export default NewsList;
