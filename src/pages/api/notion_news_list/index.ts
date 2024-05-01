import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

const notionSecret = process.env.NOTION_TOKEN;
const notionDatabaseId = process.env.NOTION_DATABASE_ID_NEWS_LIST;

const notion = new Client({ auth: notionSecret });

type Row = {
  news_name: { id: string; title: [{ type: string; text: { content: string } }] };
  news_type: { id: string; multi_select: { id: string; name: string; color: string }[] };
  news_img_url: { id: string; url: string };
  news_video_url: { id: string; url: string };
  news_source_url: { id: string; url: string };
  news_text_full: { id: string; rich_text: { text: { content: string } }[] };
  news_time_to_read: { id: string; name: string; type: string; number: { format: string } };
  news_date_post: { id: string; name: string; type: string; date: { start: string } };
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

  const newsListStructured = rows.map((row) => ({
    news_name: row.news_name.title?.[0]?.text?.content ?? "Default Name",
    news_type: sortMultiSelectOptions(row.news_type),
    news_img_url: row.news_img_url.url,
    news_video_url: row.news_video_url.url,
    news_source_url: row.news_source_url.url,
    news_text_full:
      row.news_text_full.rich_text
        .map((richText) => richText.text.content)
        .filter((content) => content.trim() !== "")
        .join(" ") || "Default Description",
    news_time_to_read: row.news_time_to_read.number || "Default Time to Read",
    news_date_post: row.news_date_post.date.start || "Default Start Date"
  }));

  res.status(200).json({ newsListStructured });
}
