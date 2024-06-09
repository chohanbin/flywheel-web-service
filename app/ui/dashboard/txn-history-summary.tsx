import { lusitana } from "../fonts";

export default async function TxhHistorySummary({
  tranctionCount,
}: {
  tranctionCount: number;
}) {
  return (
    <div className="flex p-4">
      <div
        className={lusitana.className}
      >{`Total transactions: ${tranctionCount}`}</div>
    </div>
  );
}
