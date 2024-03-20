import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notionSecret = process.env.NOTION_TOKEN;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionSecret });

type Row = {
  ai_name: { id: string; title: [{ type: string; text: { content: string } }] };
  ai_description: { id: string; rich_text: { text: { content: string } }[] };
  ai_url: { id: string; url: string };
  ai_img_url: { id: string; url: string };
  ai_types: { id: string; multi_select: { id: string; name: string; color: string }[] };
  ai_uses: { id: string; multi_select: { id: string; name: string; color: string }[] };
  ai_sector: { id: string; multi_select: { id: string; name: string; color: string }[] };
  ai_api: { id: string; multi_select: { id: string; name: string; color: string }[] };
  ai_cost: { id: string; multi_select: { id: string; name: string; color: string }[] };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!notionSecret || !notionDatabaseId) {
    throw new Error("Missing notion secret or DB-ID.");
  }

  const query = await notion.databases.query({
    database_id: notionDatabaseId
  });

  // @ts-ignore
  const rows = query.results.map((res) => res.properties) as Row[];

  const rowsStructured = rows.map((row) => ({
    ai_name: row.ai_name.title?.[0]?.text?.content ?? "Default Name",
    ai_description:
      row.ai_description.rich_text
        .map((richText) => richText.text.content)
        .filter((content) => content.trim() !== "") // Убираем пустые строки
        .join(" ") || "Default Description", // Если все строки пустые, используем "Default Description"
    // ... другие поля
    ai_url: row.ai_url.url,
    ai_img_url: row.ai_img_url.url,
    ai_types: row.ai_types.multi_select
      .map((option) => option.name) // Массив только имен
      .sort((a, b) => a.localeCompare(b)), // Сортировка по алфавиту
    ai_uses: row.ai_uses.multi_select
      .map((option) => option.name) // Отображение только параметра "name" з массива "option"
      .sort((a, b) => a.localeCompare(b)), // Сортировка по алфавиту
    ai_sector: row.ai_sector.multi_select
      .map((option) => option.name) // Отображение только параметра "name" з массива "option"
      .sort((a, b) => a.localeCompare(b)), // Сортировка по алфавиту
    ai_api: row.ai_api.multi_select
      .map((option) => option.name) // Отображение только параметра "name" з массива "option"
      .sort((a, b) => a.localeCompare(b)), // Сортировка по алфавиту
    ai_cost: row.ai_cost.multi_select
      .map((option) => option.name) // Отображение только параметра "name" з массива "option"
      .sort((a, b) => a.localeCompare(b)) // Сортировка по алфавиту
  }));

  rowsStructured.forEach((row) => {
    console.log(row.ai_description); // Выводим содержимое ai_description в консоль
  });

  res.status(200).json({ rowsStructured });
}
