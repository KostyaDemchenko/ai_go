import React from "react";

import Image from "next/image";
import iconObj from "@/public/icons/utils";

import "./style.scss";

interface AiLinkProps {
  url: string;
}

const AiLink: React.FC<AiLinkProps> = ({ url }) => {
  return (
    <div className="ai-link-box">
      <a href={url}>
        <Image className="icon" src={iconObj.open_in_new_link} alt="open in new" />
      </a>
    </div>
  );
};

export default AiLink;
