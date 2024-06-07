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

const rows = [
  {
    date: "2022-01-01",
    symbol: "ABC",
    action: "Buy",
    shares: 100,
    pps: 10.0,
    total: 1000.0,
  },
  {
    date: "2022-01-02",
    symbol: "ABC",
    action: "Sell",
    shares: 50,
    pps: 11.0,
    total: 550.0,
  },
  {
    date: "2022-01-03",
    symbol: "XYZ",
    action: "Buy",
    shares: 200,
    pps: 5.0,
    total: 1000.0,
  },
  {
    date: "2022-01-04",
    symbol: "XYZ",
    action: "Sell",
    shares: 100,
    pps: 6.0,
    total: 600.0,
  },
  {
    date: "2022-01-05",
    symbol: "XYZ",
    action: "Buy",
    shares: 300,
    pps: 7.0,
    total: 2100.0,
  },
  {
    date: "2022-01-06",
    symbol: "XYZ",
    action: "Sell",
    shares: 200,
    pps: 8.0,
    total: 1600.0,
  },
];

const columns = [
  { key: "date", label: "DATE" },
  { key: "symbol", label: "SYMBOL" },
  { key: "action", label: "ACTION" },
  { key: "shares", label: "SHARES" },
  { key: "pps", label: "PRICE/SHARE" },
  { key: "total", label: "TOTAL" },
];

export default function TxnHistoryTable() {
  return (
    <Table aria-label="Table of the transaction history for the selected account">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
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
