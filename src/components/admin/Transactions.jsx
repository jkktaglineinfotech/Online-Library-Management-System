import React, { useEffect, useState } from "react";

import { getTransactionDetails } from "../../apis/transactions";
import TransactionTable from "./components/TransactionTable";
import { useNavigate } from "react-router-dom";
import { useAdmin, useAuthToken } from "../../hooks";


const Transactions = () => {

  const [transactions, setTransactions] = useState([]);
  const token = useAuthToken();
  const admin = useAdmin();

  const fetchTransactionDetails = async () => {
    const { data, message } = await getTransactionDetails(token);
    console.log(data);
    setTransactions(data)
  };

  const navigate = useNavigate()

  useEffect(() => {
    if(!admin) return navigate("/")
    fetchTransactionDetails();
  }, []);

  return (
    <div>
     <TransactionTable data={transactions}/>
    </div>
  );
};

export default Transactions;
