import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Transaction from "./Transaction";
import { fetchTransactions } from "../../features/transaction/TransactionSlice";

function Transactions() {
  const { transactions, isLoading, isError } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  let content = null;

  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError)
    content = <p className="error">An error occured</p>;
  if (!isLoading && !isError && transactions?.length === 0)
    content = <p>No transaction found!</p>;
  if (!isLoading && !isError && transactions?.length > 0)
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));

  return (
    <>
      <p className="second_heading">Your Transactions:</p>
      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
}

export default Transactions;
