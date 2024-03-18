import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notionSecret = process.env.NOTION_TOKEN;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionSecret });

type Row = {
  ai_name: { id: string; title: [{ type: string; text: { content: string } }] };
  ai_url: { id: string; url: string };
  ai_types: { id: string; multi_select: { id: string; name: string; color: string }[] };
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
    ai_url: row.ai_url.url,
    ai_types: row.ai_types.multi_select
      .map((option) => option.name) // Массив только имен
      .sort((a, b) => a.localeCompare(b)) // Сортировка по алфавиту
  }));

  res.status(200).json({ rowsStructured });
}
