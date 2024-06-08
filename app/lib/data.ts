import { getClient } from "@/app/lib/client";
import { gql } from "@apollo/client";
import { Transaction, TransactionBatch } from "@/app/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

export const transactionBatchQuery = gql`
  query GetTransactionBatch($accountId: Int!) {
    transactionBatch(accountId: $accountId) {
      account_id
      transaction_count
      bucket_start_date
      bucket_end_date
      transactions {
        date
        amount
        transaction_code
        symbol
        price
        total
      }
    }
  }
`;

export async function fetchTransactionBatch(
  accountId: number,
): Promise<TransactionBatch> {
  // Prevent browser-side caching, so that the latest transactions are always fetched.
  noStore();

  try {
    const { data } = await getClient().query({
      query: transactionBatchQuery,
      variables: { accountId: accountId },
    });

    return data.transactionBatch;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(
      `Failed to fetch transaction batch for account ${accountId}`,
    );
  }
}
