import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import type { Transaction } from "@/types";
import { formatAmount } from "@/lib/format";

interface TransactionCardListProps {
  transactions: Transaction[];
}

export function TransactionCardList({ transactions }: TransactionCardListProps) {
  return (
    <div className="grid gap-3 md:hidden">
      {transactions.map((tx, index) => (
        <Card key={`${tx.accountNumber}-${tx.transactionDate}-${index}`}>
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
            <div className="min-w-0 flex-1">
              <CardTitle className="truncate text-base">
                {tx.accountHolderName}
              </CardTitle>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {tx.accountNumber}
              </p>
            </div>
            <StatusBadge status={tx.status} />
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {tx.transactionDate}
            </p>
            <p className="text-lg font-semibold tabular-nums">
              {formatAmount(tx.amount)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
