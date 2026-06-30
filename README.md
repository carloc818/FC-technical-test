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

You will need:

1. **Node.js** (version 18 or later) — [https://nodejs.org](https://nodejs.org)
2. **Git** — to clone the repository — [https://git-scm.com](https://git-scm.com)
3. **npm** — included automatically when you install Node.js

Detailed install and setup instructions are in [Running the Application](#running-the-application) below.

## Installation

If you already have the project folder on your computer (for example, you downloaded it as a ZIP), skip to [Running the Application](#running-the-application).

Otherwise, follow the clone steps in the Running section below first, then return here to install dependencies.

### 1. Install backend dependencies

Open a terminal in the project folder (see **Step 2** under Running the Application if you are not sure how), then run:

```bash
cd backend
npm install
```

Wait until it finishes. You should see a `node_modules` folder appear inside `backend`.

### 2. Install frontend dependencies

In the same terminal (or a new one), run:

```bash
cd frontend
npm install
```

> **Tip:** If your terminal is still inside the `backend` folder, run `cd ../frontend` first, then `npm install`.

Wait until it finishes. You should see a `node_modules` folder appear inside `frontend`.

## Running the Application

This section walks you through everything from downloading the code to opening the app in your browser. Follow each step in order.

### Step 1 — Install Node.js (one-time setup)

Before anything else, you need **Node.js** installed on your computer. Node.js lets you run the backend and frontend.

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the one marked "Recommended for most users")
3. Run the installer and accept the default options
4. When finished, **close and reopen** any terminal windows so the install is recognized

To confirm Node.js is installed, open a terminal and run:

```bash
node --version
```

You should see a version number (for example, `v20.11.0`). If you get an error, Node.js is not installed correctly — try reinstalling and restarting your computer.

### Step 2 — Open a terminal

A **terminal** (also called a command line) is a text window where you type commands.

- **Windows:** Press the Windows key, type `PowerShell`, and open **Windows PowerShell**
- **Mac:** Press `Cmd + Space`, type `Terminal`, and open **Terminal**

You will use this to download the project and run the app.

### Step 3 — Clone the repository

**Cloning** means copying the project from GitHub onto your computer.

1. In your terminal, go to the folder where you want the project to live. For example, to use your Documents folder:

   **Windows (PowerShell):**
   ```powershell
   cd $HOME\Documents
   ```

   **Mac:**
   ```bash
   cd ~/Documents
   ```

2. Copy the project from GitHub by running this command:

   ```bash
   git clone https://github.com/carloc818/FC-technical-test.git
   ```

   > **Don't have Git?** Download and install it from [https://git-scm.com](https://git-scm.com), then close and reopen your terminal before running the command above.

3. When cloning finishes, you will have a new folder called `FC-technical-test`. Move into it:

   ```bash
   cd FC-technical-test
   ```

   All remaining commands assume you are inside this folder (the **project root**). You should see folders named `backend`, `frontend`, and a file named `data.csv` if you list the contents.

### Step 4 — Install project dependencies

The project needs extra packages before it can run. You only need to do this once (or again after pulling major updates).

From the project root folder:

```bash
cd backend
npm install
```

Then install the frontend packages:

```bash
cd ../frontend
npm install
```

Go back to the project root when done:

```bash
cd ..
```

### Step 5 — Start the application (two terminals)

The app has two parts that must run at the same time: the **API** (backend) and the **website** (frontend). Each needs its own terminal window.

#### Terminal 1 — Start the API (backend)

1. Open a **new** terminal window
2. Go to the project folder and into `backend`:

   ```bash
   cd path/to/FC-technical-test
   cd backend
   ```

   Replace `path/to/FC-technical-test` with the actual location on your computer (for example, `C:\Users\YourName\Documents\FC-technical-test` on Windows).

3. Start the API:

   ```bash
   npm run dev
   ```

4. Leave this terminal **open and running**. You should see a message like:

   ```
   API running at http://localhost:3002
   ```

   If you see an error about the port already being in use, another copy of the server may still be running. Close other terminals running the backend, or see the [Configuration](#configuration) section to use a different port.

#### Terminal 2 — Start the website (frontend)

1. Open a **second** terminal window (keep Terminal 1 running)
2. Go to the project folder and into `frontend`:

   ```bash
   cd path/to/FC-technical-test
   cd frontend
   ```

3. Start the website:

   ```bash
   npm run dev
   ```

4. Leave this terminal **open and running**. You should see a message with a local URL, usually:

   ```
   Local:   http://localhost:5173/
   ```

### Step 6 — Open the app in your browser

1. Open a web browser (Chrome, Edge, Firefox, or Safari)
2. In the address bar, type: **http://localhost:5173**
3. Press Enter

You should see the Transaction Management System with a table of sample transactions and an **Add Transaction** button.

> **Important:** Both terminals must stay open while you use the app. If you close either one, the app will stop working until you start it again with `npm run dev`.

### Stopping the application

When you are done:

1. Click each terminal window
2. Press `Ctrl + C` (Windows/Mac) to stop the running server
3. Repeat for both terminals

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
