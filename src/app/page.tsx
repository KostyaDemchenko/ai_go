import "./globals.scss";

const fetchFromNotion = async () => {
  const res = await fetch("http://localhost:3000/api/notion");
  const data = await res.json();
  return data;
};

export default async function Home() {
  const data = await fetchFromNotion();
  console.log(data); // Вывод данных в консоль

  return (
    <main>
      <div>
        <a href="./api/hello.tsx">asdiasd</a>
      </div>
    </main>
  );
}
