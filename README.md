# SupportHub

An internal IT support platform for managing employee support tickets.

## Tech Stack

- **Frontend:** Vue 3 + Bootstrap (planned)
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose

## Project Structure

```text
supporthub/
├── backend/
├── frontend/
├── .gitignore
└── README.md
```

The backend is currently under development. The frontend has not been implemented yet.

## Backend Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

Copy `backend/.env.example` to `backend/.env` and provide your own MongoDB connection string.

Required variables:

```dotenv
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

Never commit real credentials or the `.env` file.

### 3. Start the backend

```bash
node server.js
```

The server starts after a successful MongoDB connection.

## Available API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check that the API is running |

Example response:

```json
{
  "success": true
}
```

## Current Progress

**SH-002 — Backend Foundation**

- Express application initialized.
- MongoDB connection configured using environment variables.
- Basic router structure created.
- Health check endpoint implemented and tested locally.

## Upcoming Features

- Employee authentication and authorization.
- Support ticket management.
- Ticket comments and status updates.
- Vue frontend and API integration.
- Automated testing.