import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notionSecret = process.env.NOTION_TOKEN;
const notionDatabaseId = process.env.NOTION_DATABASE_ID_PROMTS_LIST;

const notion = new Client({ auth: notionSecret });

type Row = {
  prompt_name: { id: string; title: [{ type: string; text: { content: string } }] };
  promt_result_type: { id: string; multi_select: { id: string; name: string; color: string }[] };
  prompt_ai_url: { id: string; url: string };
  prompt_result_img_url: { id: string; url: string };
  prompt_result_video_url: { id: string; url: string };
  prompt_pattern: { id: string; rich_text: { text: { content: string } }[] };
  prompt_type: { id: string; multi_select: { id: string; name: string; color: string }[] };
  prompt_speciality: { id: string; multi_select: { id: string; name: string; color: string }[] };
  prompt_ai_title: { id: string; multi_select: { id: string; name: string; color: string }[] };
  prompt_rate: { id: string; name: string; type: string; number: { format: string } };
  prompt_date_post: { id: string; name: string; type: string; date: { start: string } };
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

  const promtsListStructured = rows.map((row) => ({
    prompt_name: row.prompt_name.title?.[0]?.text?.content ?? "Default Name",
    promt_result_type: sortMultiSelectOptions(row.promt_result_type),
    prompt_ai_url: row.prompt_ai_url.url,
    prompt_result_img_url: row.prompt_result_img_url.url,
    prompt_result_video_url: row.prompt_result_video_url.url,
    prompt_pattern:
      row.prompt_pattern.rich_text
        .map((richText) => richText.text.content)
        .filter((content) => content.trim() !== "")
        .join(" ") || "Default Description",
    prompt_type: sortMultiSelectOptions(row.prompt_type),
    prompt_speciality: sortMultiSelectOptions(row.prompt_speciality),
    prompt_ai_title: sortMultiSelectOptions(row.prompt_ai_title),
    prompt_rate: row.prompt_rate.number || 0,
    prompt_date_post: row.prompt_date_post.date.start || "Default Start Date"
  }));

  res.status(200).json({ promtsListStructured });
}
