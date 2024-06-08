import { gql } from "@apollo/client";

export const transactionBatchQuery = gql`
  query GetTransactionBatch($accountId: Int!) {
    transactionBatch(accountId: $accountId) {
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
