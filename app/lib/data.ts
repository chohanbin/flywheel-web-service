import { getClient } from "@/app/lib/client";
import { gql } from "@apollo/client";
import { Customer, TransactionBatch } from "@/app/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

export const customerQuery = gql`
  query GetCustomer($username: String!) {
    customer(username: $username) {
      id
      username
      email
      name
      accounts
    }
  }
`;

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

export function makeMutableCopy(immutableObj: Object) {
  return JSON.parse(JSON.stringify(immutableObj));
}

export async function getCustomer(
  username: string,
): Promise<Customer | undefined> {
  // Prevent the browser-side caching, in case the failure was due to temporary backend failure.
  noStore();

  try {
    // Known issue: As of 2024-06-08, the backend DB currently stores more than one
    //   customer with the same username. The data-service handles returning one of them,
    //   so that for the frontend, it will appear as if there is only one customer for a given username.
    //   For more info on this issue, see the comments in:
    //   https://github.com/chohanbin/flywheel-data-service/blob/main/src/datasources/analytics.ts
    // Caveat: query result is immutable. See comments at: @/app/lib/client.ts
    const { data } = await getClient().query({
      query: customerQuery,
      variables: { username },
    });

    return data.customer;
  } catch (error) {
    console.error("Failed to fetch customer:", error);
    throw new Error(`Failed to fetch customer ${username}`);
  }
}

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
