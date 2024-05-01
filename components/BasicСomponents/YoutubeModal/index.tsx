import React from "react";
import Rodal from "rodal";
import Image from "next/image";
import "rodal/lib/rodal.css";

import iconObj from "@/public/icons/utils";

import "./style.scss";

interface Props {
  videoTitle: string;
  videoUrl: string;
  imageUrl: string;
}

interface State {
  visible: boolean;
}

class YoutubeModal extends React.Component<Props, State> {
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
    const { videoUrl, imageUrl, videoTitle } = this.props;
    return (
      <>
        <div className="prev-box" onClick={this.handleOpenModal}>
          <img
            className="prev-img"
            src={"https://i.ytimg.com/vi/" + imageUrl + "/maxresdefault.jpg"}
            alt="Watch Video"
          />
          <Image src={iconObj.playBtn} alt="Open modal" className="icon" />
        </div>

        <Rodal
          visible={this.state.visible}
          onClose={this.handleCloseModal}
          width={0}
          height={0}
          customStyles={{ height: "100%", width: "100%" }}
          className="youtube-modal"
        >
          <iframe
            width="100%"
            height="100%"
            src={"https://www.youtube.com/embed/" + videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </Rodal>
      </>
    );
  }
}

export default YoutubeModal;
