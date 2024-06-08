"use server";

import TxnHistoryTable from "@/app/ui/dashboard/txn-history-table";
import { fetchTransactionBatch } from "@/app/lib/data";
import TxhHistorySummary from "@/app/ui/dashboard/txn-history-summary";

export default async function AccountHistoryPage({
  params,
}: {
  params: { accountId: string };
}) {
  console.log(`Received accountId = ${params.accountId}`);
  const accountId = parseInt(params.accountId);
  const txnBatch = await fetchTransactionBatch(accountId); // Must be invoked from a server component.
  const batchStartDate = new Date(parseInt(txnBatch.bucket_start_date));
  const batchEndDate = new Date(parseInt(txnBatch.bucket_end_date));

  return (
    <>
      {/* TODO: Replace with Breadcrumbs showing accountId? */}
      <div className="text-2xl mb-8">{`Transaction History`}</div>
      <TxhHistorySummary
        accountId={txnBatch.account_id}
        tranctionCount={txnBatch.transaction_count}
        batchStartDate={batchStartDate}
        batchEndDate={batchEndDate}
      />
      <TxnHistoryTable transactions={txnBatch.transactions} />
    </>
  );
}
