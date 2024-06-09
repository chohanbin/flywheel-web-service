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
import { Transaction } from "@/app/lib/definitions";

const columns = [
  { key: "date", label: "DATE" },
  { key: "symbol", label: "SYMBOL" },
  { key: "transaction_code", label: "ACTION" },
  { key: "amount", label: "SHARES" },
  { key: "price", label: "$ / SHARE" },
  { key: "total", label: "TOTAL ($)" },
];

// TODO maybe: Instead of shortening decimal places in the frontend,
//             it may be better to shorten in the backend,
//             to reduce the total size of response.
//             If however, summation of "total" needs to be done in the frontend,
//             then it may be better to keep the full precision in the frontend.
export function stockSummaryLink(stockSymbol: string) {}

export const nasdaqStockSummaryBasepath =
  "https://www.nasdaq.com/market-activity/stocks/";
export function StockSymbol({ symbol }: { symbol: string }) {
  const link = `${nasdaqStockSummaryBasepath}${symbol}`;
  return <a href={`${link}`}>{symbol}</a>;
}

export function formatDisplayValue(key: string, value: string | number) {
  switch (key) {
    case "date":
      const date = new Date(parseInt(value as string));
      return formatDisplayDate(date);
    case "symbol":
      const symbol = (value as string).toUpperCase();
      return <StockSymbol symbol={symbol} />;
    case "price":
      return parseFloat(value as string).toFixed(2);
    case "total":
      return parseFloat(value as string).toFixed(2);
    default:
      return value;
  }
}

export function formatDisplayDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// TODO idea: Enable sorting for all columns!
//            Start here: https://nextui.org/docs/components/table#sorting-rows
export default async function TxnHistoryTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <Table
      isStriped
      className="text-lg"
      aria-label="Table of the transaction history for the selected account"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={transactions}>
        {(item) => (
          <TableRow key={item.date}>
            {(columnKey) => (
              <TableCell>
                {/* TODO: Prefix total with '-' if buy. Maybe even color code as red */}
                {formatDisplayValue(
                  columnKey as string,
                  getKeyValue(item, columnKey),
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
