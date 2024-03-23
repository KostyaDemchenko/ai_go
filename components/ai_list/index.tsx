import React, { useState, useEffect } from "react";

// import component css
import "./style.scss";

const fetchFromNotion = async (): Promise<aiListStructured[]> => {
  try {
    const deployedApiUrl = "/api/notion_ai_list"; // Replace with your actual deployed URL (which you've provided)
    const res = await fetch(deployedApiUrl);
    const data = await res.json();
    return data.aiListStructured as aiListStructured[];
  } catch (error) {
    throw new Error(`Error fetching AI list: ${error}`);
  }
};

const AiList = () => {
  const [aiList, setAiList] = useState<aiListStructured[] | null>(null); // Initialize state as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aiListData = await fetchFromNotion();
        setAiList(aiListData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); // Empty dependency array to execute the effect only once when the component mounts

  if (aiList === null) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  // Function to render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? "gold" : "gray" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="ai-list-container">
      {aiList.map((ai, index) => (
        <div key={index} className="ai-item">
          <img src={ai.ai_img_url} alt={ai.ai_name} />
          <div className="content-box">
            {ai.ai_from_ukr.some((type: MultiSelectOption) => type.name === "UA") && (
              <div>
                <span role="img" aria-label="Ukraine flag">
                  🇺🇦
                </span>
              </div>
            )}
            {ai.ai_from_ukr.map((type: MultiSelectOption, innerIndex: number) => (
              <div>
                <p key={innerIndex}>{type.name}</p>
              </div>
            ))}
            <p>{ai.ai_name}</p>
            <div>
              {renderStars(ai.ai_rate)}
              <span>{ai.ai_rate}</span>
            </div>
            <div>
              {ai.ai_types.map((type: MultiSelectOption, innerIndex: number) => (
                <p key={innerIndex}>{type.name}</p>
              ))}
            </div>
            <div className="description-box">
              <p>Опис</p>
            </div>
            <div className="link-box">
              <a href={ai.ai_url}>Посилання на AI</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AiList;
