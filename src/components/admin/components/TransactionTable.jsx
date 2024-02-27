import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function TransactionTable({ data }) {
  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: "50px", overflow: "auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Book</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>User Email</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Transaction Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((transaction, index) => (
            <TableRow key={transaction._id}>
              <TableCell>{transaction.book.name}</TableCell>
              <TableCell>{transaction.book.author}</TableCell>
              <TableCell>{transaction.user.name}</TableCell>
              <TableCell>{transaction.user.email}</TableCell>
              <TableCell>{transaction?.dueDate?.slice(0, 10)}</TableCell>
              <TableCell>{transaction?.transactionType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionTable;
