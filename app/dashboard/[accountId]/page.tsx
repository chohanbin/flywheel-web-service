import TxnHistoryTable from "@/app/ui/dashboard/txn-history-table";
export default function AccountHistoryPage({
  params,
}: {
  params: { accountId: string };
}) {
  return (
    <>
      <div className="text-2xl mb-8">{`Transaction History`}</div>
      <div className="text-lg">
        <TxnHistoryTable />
      </div>
    </>
  );
}
