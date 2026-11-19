# AiGo

A Ukrainian catalog of AI tools with a news feed and a prompt library. Built in 2024 as my bachelor's thesis project.

**Live:** [ai-go-ua.vercel.app](https://ai-go-ua.vercel.app/)

## What's inside

- Catalog of neural networks with search, category filters, sorting, ratings and pagination
- News section and a prompt library
- Content is edited in Notion and served through Next.js API routes on top of the Notion API, so adding a tool or a news item needs no code changes
- Skeleton loaders for every list, mobile menu, YouTube modal

## Stack

Next.js, TypeScript, SCSS, Notion API, Swiper

## Run locally

```bash
npm install
npm run dev
```

The API routes expect a Notion integration token and database IDs in `.env.local`.
