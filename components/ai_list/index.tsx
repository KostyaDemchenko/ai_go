// components/ai_list/index.tsx

import React, { useState, useEffect } from "react";

const fetchFromNotion = async (): Promise<aiListStructured[]> => {
  try {
    const res = await fetch("/api/notion_ai_list");
    const data = await res.json();
    return data.aiListStructured as aiListStructured[];
  } catch (error) {
    throw new Error(`Error fetching AI list: ${error}`);
  }
};

const AiList = () => {
  const [aiList, setAiList] = useState<aiListStructured[]>([]); // Initialize state as an empty array

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
