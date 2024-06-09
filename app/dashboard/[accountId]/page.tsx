"use server";

import TxnHistoryTable from "@/app/ui/dashboard/txn-history-table";
import { fetchTransactionBatch } from "@/app/lib/data";
import TxhHistorySummary from "@/app/ui/dashboard/txn-history-summary";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";

export default async function AccountHistoryPage({
  params,
}: {
  params: { accountId: string };
}) {
  console.log(`Received accountId = ${params.accountId}`);
  const accountId = parseInt(params.accountId);
  const txnBatch = await fetchTransactionBatch(accountId); // Must be invoked from a server component.

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: `Account ${accountId} Transactions`,
            href: `/dashboard/${accountId}`,
            active: true,
          },
        ]}
      />
      <TxhHistorySummary tranctionCount={txnBatch.transaction_count} />
      <TxnHistoryTable transactions={txnBatch.transactions} />
    </>
  );
}
