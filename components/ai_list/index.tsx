const fetchFromNotion = async () => {
  const res = await fetch("http://localhost:3000/api/notion_ai_list");
  const data = await res.json();
  return JSON.parse(data);
};

export default async function AiList() {
  const ai: aiListStructured = await fetchFromNotion();
  return <code>{ai.ai_name}</code>;
}

// export async function getServerSideProps() {
//   try {
//     const response = await fetch("http://localhost:3000/api/notion_ai_list");
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     const data = await response.json();
//     return {
//       props: {
//         aiList: data.aiListStructured
//       }
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         aiList: []
//       }
//     };
//   }
// }
