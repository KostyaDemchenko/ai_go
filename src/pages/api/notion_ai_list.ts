import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notionSecret = process.env.NOTION_TOKEN;
const notionDatabaseId = process.env.NOTION_DATABASE_ID_AI_LIST;

const notion = new Client({ auth: notionSecret });

type Row = {
  ai_name: { id: string; title: [{ type: string; text: { content: string } }] };
  ai_description: { id: string; rich_text: { text: { content: string } }[] };
  ai_url: { id: string; url: string };
  ai_img_url: { id: string; url: string };
  ai_rate: { id: string; name: string; type: string; number: { format: string } };
  ai_date_post: { id: string; name: string; type: string; date: { start: string } };
  ai_input: { id: string; multi_select: { id: string; name: string; color: string }[] };
  ai_output: { id: string; multi_select: { id: string; name: string; color: string }[] };
  ai_uses: { id: string; multi_select: { id: string; name: string; color: string }[] };
  ai_sector: { id: string; multi_select: { id: string; name: string; color: string }[] };
  ai_api: { id: string; multi_select: { id: string; name: string; color: string }[] };
  ai_cost: { id: string; multi_select: { id: string; name: string; color: string }[] };
  ai_from_ukr: { id: string; multi_select: { id: string; name: string; color: string }[] };
};

function sortMultiSelectOptions(options: {
  multi_select: MultiSelectOption[];
}): MultiSelectOption[] {
  return options.multi_select.sort((a, b) => a.name.localeCompare(b.name));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (!notionSecret || !notionDatabaseId) {
    throw new Error("Missing notion secret or DB-ID.");
  }

  if (req.method === "OPTIONS") {
    // Preflight request
    res.status(200).end();
    return;
  }

  const query = await notion.databases.query({
    database_id: notionDatabaseId
  });

  // @ts-ignore
  const rows = query.results.map((res) => res.properties) as Row[];

  const aiListStructured = rows.map((row) => ({
    ai_name: row.ai_name.title?.[0]?.text?.content ?? "Default Name",
    ai_description:
      row.ai_description.rich_text
        .map((richText) => richText.text.content)
        .filter((content) => content.trim() !== "") // Убираем пустые строки
        .join(" ") || "Default Description", // Если все строки пустые, используем "Default Description"
    ai_url: row.ai_url.url,
    ai_img_url: row.ai_img_url.url,
    ai_rate: row.ai_rate.number || 0,
    ai_date_post: row.ai_date_post.date.start || "Default Start Date",
    ai_input: sortMultiSelectOptions(row.ai_input),
    ai_output: sortMultiSelectOptions(row.ai_output),
    ai_uses: sortMultiSelectOptions(row.ai_uses),
    ai_sector: sortMultiSelectOptions(row.ai_sector),
    ai_api: sortMultiSelectOptions(row.ai_api),
    ai_cost: sortMultiSelectOptions(row.ai_cost),
    ai_from_ukr: sortMultiSelectOptions(row.ai_from_ukr)
  }));

  res.status(200).json({ aiListStructured });
}
