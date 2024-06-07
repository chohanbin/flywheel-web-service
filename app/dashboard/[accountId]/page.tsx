export default function AccountHistoryPage({
  params,
}: {
  params: { accountId: string };
}) {
  return (
    <>
      <p className="text-3xl">
        This page will display the transaction history for Account:{" "}
        {params.accountId}
      </p>
    </>
  );
}
