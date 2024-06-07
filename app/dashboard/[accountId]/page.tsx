export default function AccountHistoryPage({
  params,
}: {
  params: { accountId: string };
}) {
  return (
    <>
      <h1>This page will display the transaction history for</h1>
      <h1>Account: {params.accountId}</h1>
    </>
  );
}
