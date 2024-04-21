import React, { useState, useEffect } from "react";
import Image from "next/image";
import Alert from "@/components/BasicСomponents/Alert";

import iconObj from "@/public/icons/utils";

import "./style.scss";

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setAlertVisible(true); // Открываем алерт при копировании
    });
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (alertVisible) {
      timeoutId = setTimeout(() => {
        closeAlert();
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [alertVisible]);

  return (
    <div className="copy-btn-container">
      <button onClick={handleCopy}>
        <Image className="icon" src={iconObj.copy} width={16} height={16} alt="Copy" />
      </button>
      {alertVisible && <Alert message="Текст скопирован!" onClose={closeAlert} />}
    </div>
  );
};

export default CopyButton;
