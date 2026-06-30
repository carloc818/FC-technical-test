import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import type { Transaction } from "@/types";
import { formatAmount } from "@/lib/format";

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="hidden md:block border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Date</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Account Holder</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow key={`${tx.accountNumber}-${tx.transactionDate}-${index}`}>
              <TableCell className="font-medium tabular-nums">
                {tx.transactionDate}
              </TableCell>
              <TableCell className="font-mono text-sm">{tx.accountNumber}</TableCell>
              <TableCell>{tx.accountHolderName}</TableCell>
              <TableCell className="text-right font-semibold tabular-nums">
                {formatAmount(tx.amount)}
              </TableCell>
              <TableCell>
                <StatusBadge status={tx.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
