// Type definitions of the data in this application.
// Describes the shape of the data, and what data type each property should accept.

export type Customer = {
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
  bucket_start_date: string;
  bucket_end_date: string;
  transactions: Transaction[];
};

export type Transaction = {
  date: string;
  amount: number;
  transaction_code: string;
  symbol: string;
  price: string;
  total: string;
};

export type TxnBatchQueryResponse = {
  transactionBatch: TransactionBatch;
};
