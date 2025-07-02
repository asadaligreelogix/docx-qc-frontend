# DOCX Quality Control Checker Frontend

A modern Next.js 14 (App Router, TypeScript, Tailwind CSS) frontend for the DOCX QC Checker API.

## Features
- Upload .docx files and get instant QC analysis
- Beautiful, responsive UI (Google Fonts, Tailwind, Framer Motion)
- API integration with Flask backend
- Health check page
- Dark mode support
- Toast notifications, loading states, error handling

## Environment Variables

To connect the frontend to the backend API, set the environment variable `NEXT_PUBLIC_API_URL`.

- For local development, create a `.env.local` file in the project root:
  
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:8000
  ```

- For production (e.g., Vercel), set `NEXT_PUBLIC_API_URL` to your Render backend URL in the Vercel dashboard or in `.env.production`:
  
  ```env
  NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
  ```

## Running Locally

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. The app will use the backend URL from `NEXT_PUBLIC_API_URL`.

## Deployment

- Ensure `NEXT_PUBLIC_API_URL` is set in your Vercel project settings to point to your production backend.
- The frontend will automatically use this value for all API requests.

## Folder Structure
- `src/app/` — App Router pages
- `src/components/` — UI components
- `src/lib/` — API utilities
- `src/types/` — TypeScript types

## Requirements
- Node.js 18+
- Backend Flask API running at `http://localhost:8000`

---

Made with ❤️ using Next.js, Tailwind, and TypeScript.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
