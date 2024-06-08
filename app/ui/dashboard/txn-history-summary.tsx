export default async function TxhHistorySummary({
  accountId,
  tranctionCount,
  batchStartDate,
  batchEndDate,
}: {
  accountId: number;
  tranctionCount: number;
  batchStartDate: Date;
  batchEndDate: Date;
}) {
  {
    /* TODO: Prettify these. Maybe as panels */
  }
  return (
    <div>
      <p>{`Account ID: ${accountId}`}</p>
      <p>{`Transaction Count: ${tranctionCount}`}</p>
      <p>{`Bucket Start Date: ${batchStartDate}`}</p>
      <p>{`Bucket End Date: ${batchEndDate}`}</p>
    </div>
  );
}
