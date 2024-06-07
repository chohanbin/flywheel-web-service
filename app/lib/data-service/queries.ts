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

// For some reason, auth's authorize errors if the
// returned customer object carries an array of accounts.
// Therefore, for the purpose of login, keep the query minimal.
export const checkCustomerExistsQuery = gql`
  query GetCustomer($username: String!) {
    customer(username: $username) {
      username
    }
  }
`;

export const customerQuery = gql`
  query GetCustomer($username: String!) {
    customer(username: $username) {
      name
      username
      email
    }
  }
`;
