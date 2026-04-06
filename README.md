# Backdoor Brackets

A full-stack multi-user bracket competition platform for NCAA March Madness — compete against the spread (ATS) with friends in private leagues.

🌐 **Live App:** [backdoorbrackets.com](https://backdoorbrackets.com)

---

## What It Does

Backdoor Brackets lets users create private leagues, invite friends, and compete against the spread in the NCAA tournament — with a twist: teams are randomly assigned to each user rather than picked, so the competition is purely about the spread, not bracket-building strategy.

**Key features:**
- Create and join private leagues with a shareable invite system
- Teams randomly assigned to users each round — no manual picking
- Compete against the spread (ATS) rather than straight up outcomes
- Live standings updated as games complete
- Historical team stats surfaced for context
- Run logs and app metadata persisted across sessions
- Multi-user with per-league leaderboards

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Deployment | Vercel (frontend), Render (backend) |

---

## Architecture

- **Frontend:** React SPA built with Vite, communicates with the backend via REST API
- **Backend:** Express.js REST API handling league management, user standings, pick submissions, and stats retrieval
- **Database:** MongoDB Atlas — stores all league data, user standings, team stats, run logs, and app metadata in a NoSQL document model
- **Deployment:** Frontend on Vercel, backend on Render with environment-based config

---

## Running Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB instance)

### Backend
```bash
cd march-madness-ats-backend
npm install
cp .env.example .env   # add your MongoDB connection string
npm start
```

### Frontend
```bash
cd march-madness-ats-frontend
npm install
cp .env.example .env   # set VITE_API_URL to your backend
npm run dev
```

App runs at `http://localhost:5173` by default.

---

## Project Structure

```
march-madness-ats-backend/
├── routes/         # Express route definitions
├── controllers/    # Request handling logic
├── models/         # Mongoose schemas
└── server.js       # Entry point

march-madness-ats-frontend/
├── src/
│   ├── components/ # React components
│   ├── pages/      # Route-level views
│   └── main.jsx    # App entry point
```

---

## Author

Samuel Brown — [github.com/samuelwbrown4](https://github.com/samuelwbrown4)