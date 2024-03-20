import React from "react";

import "./style.scss";

const fetchFromNotion = async () => {
  const res = await fetch("http://localhost:3000/api/notion_ai_list");
  const data = await res.json();
  return data;
};

export default async function AiList() {
  const rows: aiListStructured = await fetchFromNotion();
  return <div></div>;
}
