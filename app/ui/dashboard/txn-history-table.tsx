"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { Transaction } from "@/app/types/Transaction";

const columns = [
  { key: "date", label: "DATE" },
  { key: "symbol", label: "SYMBOL" },
  { key: "transaction_code", label: "ACTION" },
  { key: "amount", label: "SHARES" },
  { key: "price", label: "PRICE/SHARE" },
  { key: "total", label: "TOTAL" },
];

export default function TxnHistoryTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  console.log(`transactions: ${JSON.stringify(transactions)}`);
  return (
    <Table aria-label="Table of the transaction history for the selected account">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={transactions}>
        {(item) => (
          <TableRow key={item.date}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
