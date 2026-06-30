import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import { addTransaction, readTransactions } from "./csvStore.js";
import type { CreateTransactionInput } from "./types.js";

const app = express();
const PORT = process.env.PORT ?? 3002;

app.use(cors());
app.use(express.json());

app.get("/transactions", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await readTransactions();
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

app.post("/transactions", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { transactionDate, accountNumber, accountHolderName, amount } =
      req.body as Partial<CreateTransactionInput>;

    if (!transactionDate || !accountNumber || !accountHolderName || amount == null) {
      res.status(400).json({
        error: "Missing required fields: transactionDate, accountNumber, accountHolderName, amount",
      });
      return;
    }

    if (typeof amount !== "number" || amount <= 0) {
      res.status(400).json({ error: "Amount must be a positive number" });
      return;
    }

    const transaction = await addTransaction({
      transactionDate,
      accountNumber,
      accountHolderName,
      amount,
    });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const server = app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Stop the other process or set PORT to a different value.`
    );
    console.error(`  Windows: netstat -ano | findstr :${PORT}`);
    process.exit(1);
  }
  throw err;
});
