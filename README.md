# Transaction Management System

A full-stack application for viewing and adding financial transactions. Data is stored in a CSV file at the project root.

## Tech Stack

| Layer    | Technology | Why |
|----------|------------|-----|
| Backend  | Node.js, Express, TypeScript | Lightweight REST API with strong typing; easy CSV file I/O |
| Frontend | React, Vite, TypeScript | Fast dev experience; aligns with modern React ecosystems |
| UI       | [shadcn/ui](https://ui.shadcn.com), Tailwind CSS, Radix UI | Accessible, composable components with a clean design system |
| Storage  | CSV file (`data.csv`) | Per assignment requirements |

### Frontend design

The UI follows **Swiss International Style** principles:

- **Typography** — Inter typeface with strong hierarchy and uppercase tracked labels
- **Layout** — Grid-based structure, generous whitespace, asymmetric header
- **Color** — Minimal black/white/gray palette with Swiss red (`#e3000f`) as the primary accent
- **Status colors** — Pending (yellow), Settled (green), Failed (red), per assignment requirements

### Responsive behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (`< md`) | Transaction cards with name, account, date, amount, and status |
| Desktop (`md+`) | Full data table with all columns |

## Prerequisites

Install the following before running the project:

1. **Node.js** (version 18 or later) — [https://nodejs.org](https://nodejs.org)
   - Verify: `node --version`
2. **npm** (comes with Node.js)
   - Verify: `npm --version`

## Installation

Open a terminal and run these commands from the project root folder.

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Running the Application

You need **two terminal windows** — one for the API and one for the UI.

### Terminal 1 — Start the API server

```bash
cd backend
npm run dev
```

The API will start at **http://localhost:3002**.

### Terminal 2 — Start the frontend

```bash
cd frontend
npm run dev
```

The web app will start at **http://localhost:5173**. Open that URL in your browser.

> The frontend proxies API requests from `/api/*` to the backend, so both servers must be running.

### Production build (optional)

To build the frontend for production:

```bash
cd frontend
npm run build
npm run preview
```

## Configuration

| Setting | Location | Default |
|---------|----------|---------|
| API port | `backend/src/index.ts` or `PORT` env var | `3002` |
| Frontend dev port | `frontend/vite.config.ts` | `5173` |
| API proxy target | `frontend/vite.config.ts` | `http://localhost:3002` |
| shadcn/ui config | `frontend/components.json` | New York style, neutral base |
| Design tokens | `frontend/src/index.css` | Swiss red primary, neutral palette |

## API Documentation

Base URL: `http://localhost:3002`

### GET /transactions

Returns all transactions from `data.csv`.

**Response** `200 OK`

```json
[
  {
    "transactionDate": "2025-03-01",
    "accountNumber": "7289-3445-1121",
    "accountHolderName": "Maria Johnson",
    "amount": 150.00,
    "status": "Settled"
  }
]
```

### POST /transactions

Adds a new transaction. Status is assigned randomly as `Pending`, `Settled`, or `Failed`.

**Request body**

```json
{
  "transactionDate": "2025-03-11",
  "accountNumber": "1111-2222-3333",
  "accountHolderName": "Jane Doe",
  "amount": 99.99
}
```

**Response** `201 Created`

```json
{
  "transactionDate": "2025-03-11",
  "accountNumber": "1111-2222-3333",
  "accountHolderName": "Jane Doe",
  "amount": 99.99,
  "status": "Pending"
}
```

**Error** `400 Bad Request` — missing or invalid fields

```json
{
  "error": "Missing required fields: transactionDate, accountNumber, accountHolderName, amount"
}
```

## Testing

### Manual UI testing

1. Start both servers (see above).
2. Open http://localhost:5173 — you should see the transaction list with sample data and a summary bar (Settled / Pending / Failed counts).
3. On a **wide screen**, transactions appear in a table. Resize to mobile width (or use browser dev tools) to see the **card layout**.
4. Click **Add Transaction**, fill in the modal form, and click **Save Transaction**.
5. Confirm the new entry appears with a randomly assigned status badge:
   - **Pending** — yellow
   - **Settled** — green
   - **Failed** — red
6. Check `data.csv` in the project root — the new row should be persisted.

### API testing with curl

```bash
# Get all transactions
curl http://localhost:3002/transactions

# Add a transaction
curl -X POST http://localhost:3002/transactions \
  -H "Content-Type: application/json" \
  -d "{\"transactionDate\":\"2025-03-11\",\"accountNumber\":\"1111-2222-3333\",\"accountHolderName\":\"Jane Doe\",\"amount\":99.99}"
```

On Windows PowerShell, use `Invoke-RestMethod` instead of `curl`:

```powershell
Invoke-RestMethod -Uri http://localhost:3002/transactions

Invoke-RestMethod -Uri http://localhost:3002/transactions -Method POST `
  -ContentType "application/json" `
  -Body '{"transactionDate":"2025-03-11","accountNumber":"1111-2222-3333","accountHolderName":"Jane Doe","amount":99.99}'
```

## Project Structure

```
├── data.csv                          # Transaction data store
├── backend/
│   └── src/
│       ├── index.ts                  # Express server & routes
│       ├── csvStore.ts               # CSV read/write logic
│       └── types.ts                  # Shared types
└── frontend/
    ├── components.json               # shadcn/ui configuration
    └── src/
        ├── App.tsx                   # Main layout & page shell
        ├── api.ts                    # API client
        ├── types.ts                  # Shared types
        ├── index.css                 # Tailwind + design tokens
        ├── components/
        │   ├── AddTransactionDialog.tsx
        │   ├── StatusBadge.tsx
        │   ├── TransactionTable.tsx    # Desktop table view
        │   ├── TransactionCardList.tsx # Mobile card view
        │   └── ui/                   # shadcn/ui primitives
        │       ├── button.tsx
        │       ├── dialog.tsx
        │       ├── table.tsx
        │       ├── badge.tsx
        │       ├── input.tsx
        │       ├── label.tsx
        │       └── card.tsx
        └── lib/
            ├── utils.ts              # Tailwind class merge helper
            └── format.ts             # Currency formatting
```

## AI Usage Summary

AI (Cursor) was used to scaffold the project structure, implement the API and frontend, apply shadcn/ui with a Swiss-style responsive design, and write this documentation. All code was reviewed for correctness against the assignment requirements.
