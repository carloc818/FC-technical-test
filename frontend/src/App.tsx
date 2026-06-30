import { useEffect, useState } from "react";
import { fetchTransactions } from "@/api";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { TransactionCardList } from "@/components/TransactionCardList";
import { TransactionTable } from "@/components/TransactionTable";
import type { Transaction } from "@/types";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadTransactions() {
    try {
      setError(null);
      const data = await fetchTransactions();
      setTransactions(data);
    } catch {
      setError("Unable to load transactions. Is the API server running?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  const settledCount = transactions.filter((t) => t.status === "Settled").length;
  const pendingCount = transactions.filter((t) => t.status === "Pending").length;
  const failedCount = transactions.filter((t) => t.status === "Failed").length;

  return (
    <div className="min-h-screen">
      <div className="border-b-4 border-primary bg-card">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                First Circle
              </p>
              <h1 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                Transaction
                <br />
                Management
              </h1>
              <p className="max-w-md text-sm text-muted-foreground sm:text-base">
                View and record financial transactions. Data is stored locally
                and synced via the API.
              </p>
            </div>
            <AddTransactionDialog
              onCreated={(tx) => setTransactions((prev) => [...prev, tx])}
              onError={setError}
            />
          </div>

          <div className="grid grid-cols-3 gap-px border border-border bg-border sm:max-w-lg">
            <Stat label="Settled" value={settledCount} />
            <Stat label="Pending" value={pendingCount} />
            <Stat label="Failed" value={failedCount} />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {error && (
          <div
            role="alert"
            className="mb-6 border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            All Transactions
          </h2>
          <span className="text-sm tabular-nums text-muted-foreground">
            {transactions.length} total
          </span>
        </div>

        {loading ? (
          <p className="py-16 text-center text-sm uppercase tracking-widest text-muted-foreground">
            Loading transactions...
          </p>
        ) : transactions.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No transactions yet. Add your first one above.
          </p>
        ) : (
          <>
            <TransactionTable transactions={transactions} />
            <TransactionCardList transactions={transactions} />
          </>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-card px-4 py-3 sm:px-5 sm:py-4">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold tabular-nums sm:text-3xl">{value}</p>
    </div>
  );
}
