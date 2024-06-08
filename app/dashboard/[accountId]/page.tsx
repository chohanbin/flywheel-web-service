import { getClient } from "@/app/lib/client";
import TxnHistoryTable from "@/app/ui/dashboard/txn-history-table";
import { TxnBatchQueryResponse } from "@/app/types/Transaction";
import { transactionBatchQuery } from "@/app/lib/queries";

export default async function AccountHistoryPage({
  params,
}: {
  params: { accountId: string };
}) {
  const { data } = await getClient().query({
    query: transactionBatchQuery,
    variables: {
      accountId: parseInt(params.accountId),
    },
  });

  const transactions =
    (data as TxnBatchQueryResponse)?.transactionBatch?.transactions ?? [];

  return (
    <>
      <div className="text-2xl mb-8">{`Transaction History`}</div>
      <div className="text-lg">
        <TxnHistoryTable transactions={transactions} />
      </div>
    </>
  );
}
