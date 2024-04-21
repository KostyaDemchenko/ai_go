import React from "react";

import Image from "next/image";
import iconObj from "@/public/icons/utils";

import "./style.scss";

interface CartRateProps {
  downloadLink: string;
}

const DownloadBtn: React.FC<CartRateProps> = ({ downloadLink }) => {
  return (
    <a className="download-btn-container" href={downloadLink} download>
      <Image className="icon" src={iconObj.download} alt="download" />
    </a>
  );
};

export default DownloadBtn;
