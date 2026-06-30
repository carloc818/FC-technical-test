import { Badge } from "@/components/ui/badge";
import type { TransactionStatus } from "@/types";

const STATUS_VARIANT: Record<
  TransactionStatus,
  "pending" | "settled" | "failed"
> = {
  Pending: "pending",
  Settled: "settled",
  Failed: "failed",
};

interface StatusBadgeProps {
  status: TransactionStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>;
}
