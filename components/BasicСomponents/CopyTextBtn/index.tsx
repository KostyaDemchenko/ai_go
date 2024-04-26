import React from "react";
import Image from "next/image";
import { ToastContainer, toast, Slide } from "react-toastify";

import iconObj from "@/public/icons/utils";

import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      const copiedTextPreview = text.substring(0, 10) + (text.length > 10 ? "..." : "");
      toast(`Скопійовано: ${copiedTextPreview}`, {
        transition: Slide,
        position: "top-right",
        autoClose: 3000,
        theme: "dark"
      });
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <div className="copy-btn-container">
        <button onClick={handleCopy}>
          <Image className="icon" src={iconObj.copy} width={16} height={16} alt="Copy" />
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default CopyButton;
