import "./globals.scss";

const fetchFromNotion = async () => {
  const res = await fetch("http://localhost:3000/api/notion");
  const data = await res.json();
  return data;
};

export default async function Home() {
  const rows: rowsStructured = await fetchFromNotion();

  return (
    <main>
      <div>
        <code>{rows.ai_name}</code>
      </div>
    </main>
  );
}
