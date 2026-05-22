# Joshua Market Place

A luxury marketplace landing page built with React and Tailwind CSS.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Features

- Responsive landing page with black background and gold accents
- Glowing "J" logo with hidden admin access (click 4 times within 2 seconds)
- Hero section with animated gold silk wave background and sparkles
- Navigation buttons to signup and login pages
- Sections highlighting marketplace features
- Footer with help link
- Routing setup with React Router

## Hidden Admin Access

Click the "J" logo 4 times within 2 seconds to navigate to the admin login page.

## Deployment

### Frontend (Vercel)

- Build command: `npm run vercel-build`
- Publish directory: `dist`
- Set environment variables in Vercel:
  - `VITE_API_URL=https://new-backend-nlxi.onrender.com`
  - `VITE_SUPABASE_URL=https://wmicteyitftiszwkqwkv.supabase.co`
  - `VITE_SUPABASE_ANON_KEY=sb_publishable_3NFNiep9OSzwqEf6kTbFzQ_VoVUHLqt`
- Vercel will use `vercel.json` for SPA fallback routing to `index.html`.

### Backend (Render / Railway)

- Start command: `npm start`
- Required environment variables:
  - `DATABASE_URL`
  - `DB_NAME` (optional, defaults to `joshua_marketplace`)
  - `JWT_SECRET`
  - `FRONTEND_URL` (Netlify app URL)

### Notes

- Backend endpoints are exposed at `/signup`, `/login`, `/users`, `/products`, and `/orders`.
- Frontend API calls should use the `VITE_API_URL` env variable for production.
- Do not commit `.env` to source control; use `.env.example` as a template.
