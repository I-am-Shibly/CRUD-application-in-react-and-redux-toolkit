import React from "react";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../utils/thousandSeparator";

function Balance() {
  const { transactions } = useSelector((state) => state.transaction);

  const totalBalance = (transactions) => {
    let income = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        income += transaction.amount;
      } else income -= transaction.amount;
    });
    return income;
  };

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>{" "}
        {transactions.length > 0 ? <span>{numberWithCommas(totalBalance(transactions))}</span> : 0}
      </h3>
    </div>
  );
}

export default Balance;
