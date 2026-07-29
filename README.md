
# WanderGenie AI ✈️

**AI-powered travel planner that turns a short trip brief into a complete, streaming, budget-aware itinerary — in seconds, not hours.**

🔗 **Live demo (frontend):** https://wandargenei-ai-project-1.onrender.com
🔗 **API (backend):** https://wandargenei-ai-project.onrender.com

---

## Overview

Planning a trip usually means bouncing between a dozen tabs — budget spreadsheets, blog posts, weather sites, packing-list templates. WanderGenie AI collapses all of that into one form. You enter your destination, trip length, budget, number of travelers, starting city, travel style, interests, and transport/hotel preference, and the app streams back a complete, personalized itinerary in real time: budget breakdown, day-by-day plan, recommended attractions, food picks, a packing checklist, weather advice, and safety tips.

## Features

- 🧭 AI-generated, personalized travel itinerary from a structured trip form
- ⚡ Real-time streaming response (Server-Sent Events) — the plan writes itself in the browser instead of appearing all at once
- 💰 Budget breakdown across transport, hotel, food, activities, and an emergency fund
- 📅 Day-wise plan with morning / afternoon / evening activities, estimated costs, and tips
- 📍 Recommended attractions and hidden gems
- 🍽️ Destination-specific food recommendations
- 🎒 Packing checklist, weather advice, and safety / money-saving tips
- 📱 Fully responsive, travel-themed UI
- 🔒 Hardened API (Helmet, CORS, rate limiting) to protect against abuse
- 🐳 Dockerized frontend and backend for consistent local and cloud deployment

## Tech stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Vite, Tailwind CSS, React Router, react-markdown + remark-gfm, lucide-react, Axios / native `fetch` (SSE) |
| **Backend** | Node.js + Express, Helmet, CORS, express-rate-limit, morgan |
| **AI** | OpenAI API — Chat Completions endpoint (`gpt-3.5-turbo` by default, configurable), streamed via SSE |
| **Deployment** | Docker + Docker Compose; hosted on Render |

## Architecture

```
[ React + Vite frontend ]
   | fetch() -> SSE (text/event-stream)
   v
[ Express backend :5000 ]
   /api/health          -> health check
   /api/generate-trip   -> validates input, streams itinerary
   |
   v  OpenAI Node SDK (server-side only)
[ OpenAI Chat Completions API - gpt-3.5-turbo ]
```

The API key lives only in backend environment variables and is never bundled into the frontend build. Each request is stateless — no database is used.

## Getting started

### Prerequisites
- Node.js ≥ 18
- An OpenAI API key

### 1. Clone the repo
```bash
git clone <this-repo-url>
cd WandarGenei-AI-Project
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# then edit .env and add your OPENAI_API_KEY
npm run dev
```
Backend runs at `http://localhost:5000`.

### 3. Frontend setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Frontend runs at `http://localhost:5173`.

### Environment variables

**backend/.env**
```
PORT=5000
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-3.5-turbo
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Run with Docker Compose (optional)
```bash
docker-compose up --build
```
This builds and runs both services — frontend on `:3000`, backend on `:5000`.

> **Note:** `docker-compose.yml` currently passes a `GEMINI_API_KEY` env var to the backend container, but the backend code only reads `OPENAI_API_KEY`. If you use Compose, set `OPENAI_API_KEY` in your `.env` (or update the compose file) so the key is actually picked up.

## API

### `POST /api/generate-trip`
Streams a generated itinerary via Server-Sent Events.

**Body:**
```json
{
  "destination": "Manali",
  "days": 5,
  "budget": 20000,
  "travelers": 2,
  "startingCity": "Delhi",
  "travelStyle": "adventure",
  "interests": ["trekking", "local food"],
  "transportation": "bus",
  "hotelPreference": "mid-range",
  "notes": "optional"
}
```
Rate-limited to 20 requests / 15 min per IP (general API limit: 100 requests / 15 min per IP).

### `GET /api/health`
Basic health check for uptime monitoring / container orchestration.

## Project structure

```
WandarGenei-AI-Project/
├── backend/
│   ├── server.js
│   └── src/
│       ├── routes/generateTrip.js
│       ├── controllers/tripController.js
│       ├── services/openaiService.js
│       └── middleware/ (rateLimiter, errorHandler)
├── frontend/
│   └── src/
│       ├── pages/ (Home, Planner, Itinerary, NotFound)
│       ├── components/ (TripPlannerForm, StreamingResponse, budget/day/place/weather/safety cards, Navbar, Footer)
│       └── api/axios.js
└── docker-compose.yml
```

## License

Add a license of your choice (MIT is a common default for portfolio projects).
