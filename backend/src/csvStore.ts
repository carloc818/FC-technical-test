import fs from "fs/promises";
import path from "path";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import type { CreateTransactionInput, Transaction, TransactionStatus } from "./types.js";

const CSV_HEADERS = [
  "Transaction Date",
  "Account Number",
  "Account Holder Name",
  "Amount",
  "Status",
] as const;

const STATUSES: TransactionStatus[] = ["Pending", "Settled", "Failed"];

function getCsvPath(): string {
  return path.resolve(process.cwd(), "..", "data.csv");
}

function rowToTransaction(row: Record<string, string>): Transaction {
  return {
    transactionDate: row["Transaction Date"],
    accountNumber: row["Account Number"],
    accountHolderName: row["Account Holder Name"],
    amount: parseFloat(row["Amount"]),
    status: row["Status"] as TransactionStatus,
  };
}

function transactionToRow(transaction: Transaction): Record<string, string> {
  return {
    "Transaction Date": transaction.transactionDate,
    "Account Number": transaction.accountNumber,
    "Account Holder Name": transaction.accountHolderName,
    Amount: transaction.amount.toFixed(2),
    Status: transaction.status,
  };
}

export function randomStatus(): TransactionStatus {
  return STATUSES[Math.floor(Math.random() * STATUSES.length)];
}

export async function readTransactions(): Promise<Transaction[]> {
  const csvPath = getCsvPath();
  const content = await fs.readFile(csvPath, "utf-8");
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];

  return records.map(rowToTransaction);
}

export async function addTransaction(
  input: CreateTransactionInput
): Promise<Transaction> {
  const transactions = await readTransactions();
  const newTransaction: Transaction = {
    ...input,
    status: "Pending",
  };

  transactions.push(newTransaction);

  const rows = transactions.map(transactionToRow);
  const csv = stringify(rows, { header: true, columns: [...CSV_HEADERS] });
  await fs.writeFile(getCsvPath(), csv, "utf-8");

  return newTransaction;
}
