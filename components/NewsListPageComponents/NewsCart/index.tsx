import React, { Component } from "react";
import Rodal from "rodal";
import Image from "next/image";

import iconObj from "@/public/icons/utils";

import "rodal/lib/rodal.css";
import "./style.scss";

interface Props {
  news_img_url: string;
  news_name: string;
  news_text_full: string;
  news_video_url: string;
  news_source_url: string;
  news_time_to_read: number;
  news_date_post: number;
  news_type: MultiSelectOption[];
}

interface State {
  visible: boolean;
}

class NewsCart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { visible: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ visible: true });
    // Блокировать прокрутку при открытии модального окна
    document.body.style.overflow = "hidden";
  }

  handleCloseModal() {
    this.setState({ visible: false });
    // Разблокировать прокрутку при закрытии модального окна
    document.body.style.overflow = "auto";
  }

  render() {
    const {
      news_img_url,
      news_name,
      news_text_full,
      news_time_to_read,
      news_date_post,
      news_type,
      news_video_url,
      news_source_url
    } = this.props;
    return (
      <>
        <div className="news-item" onClick={this.handleOpenModal}>
          <div className="top-box">
            <img className="prev-img" src={news_img_url} alt={news_name} />
          </div>
          <div className="content-box">
            <div className="news-title-box">
              <p className="news-name">{news_name.slice(0, 25)}...</p>
              <div
                className="news-preview"
                dangerouslySetInnerHTML={{ __html: news_text_full.slice(0, 60) + "..." }}
              />
            </div>
            <div className="news-info">
              <div className="time-to-read-box">
                <Image src={iconObj.time} alt="Time to read" className="icon" />
                <p className="time-to-read">{news_time_to_read} хв.</p>
              </div>
              <p className="data-post">{news_date_post}</p>
            </div>
          </div>
        </div>

        <Rodal
          visible={this.state.visible}
          onClose={this.handleCloseModal}
          width={0}
          height={0}
          customStyles={{ height: "fit-content", width: "100%" }}
          className="news-modal"
        >
          {news_type.find((type) => type.name === "video") ? (
            // Если тип - видео, показываем триггер модального окна
            <iframe
              width="100%"
              height="100%"
              src={news_video_url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          ) : (
            <div className="full-img-box">
              <img className="full-img" src={news_img_url} alt={news_name} />
              <div className="time-to-read-box">
                <Image src={iconObj.time} alt="Time to read" className="icon" />
                <p className="time-to-read">{news_time_to_read} хв.</p>
              </div>
            </div>
          )}

          <div className="news-content-full">
            <h4 className="news-title-full">{news_name}</h4>
            <p className="news-text-full" dangerouslySetInnerHTML={{ __html: news_text_full }} />
            <div className="news-data">
              <a
                className="news-source"
                href={news_source_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Джерело новини
              </a>
              <p className="data-post">{news_date_post}</p>
            </div>
          </div>
        </Rodal>
      </>
    );
  }
}

export default NewsCart;
