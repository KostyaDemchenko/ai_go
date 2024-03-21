import React, { useState, useEffect } from "react";

const fetchFromNotion = async (): Promise<aiListStructured[]> => {
  try {
    const deployedApiUrl = "https://ai-go-green.vercel.app/api/notion_ai_list"; // Replace with your actual deployed URL (which you've provided)
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

  return (
    <div>
      {aiList.map((ai, index) => (
        <div key={index}>
          <p>{ai.ai_name}</p>
          {/* Render other properties as needed */}
        </div>
      ))}
    </div>
  );
};

export default AiList;
