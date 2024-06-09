// Type definitions of the data in this application.
// Describes the shape of the data, and what data type each property should accept.

// FAQ:
//   - Why are 'date' fields encoded as string?
//       Because MongoDB stores 'date' as Unix timestamp in 64-bit integer,
//         (See https://www.mongodb.com/docs/manual/reference/method/Date/#mongodb-method-Date)
//       But GraphQL 'Int' type is a signed 32-bit integer, so it can't represent the timestamp from MongoDB accurately.
//         (See https://graphql.org/learn/schema/#scalar-types)

export type Customer = {
  id: string;
  username: string;
  name: string;
  address: string;
  birthdate: string;
  email: string;
  accounts: AccountId[];
};

export type AccountId = number;

export type Account = {
  account_id: AccountId;
  limit: number;
  products: string[];
};

export type TransactionBatch = {
  account_id: AccountId;
  transaction_count: number;
  bucket_start_date: string; // Why string? See FAQ above.
  bucket_end_date: string; // Why string? See FAQ above.
  transactions: Transaction[];
};

export type Transaction = {
  date: string; // Why string? See FAQ above.
  amount: number;
  transaction_code: string;
  symbol: string;
  price: string;
  total: string;
};
