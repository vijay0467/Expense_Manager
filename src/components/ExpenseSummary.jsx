import React from "react";

const ExpenseSummary = ({ totalExpenses, budget }) => {
  const remainingAmount = budget - totalExpenses;

  return (
    <div className="card my-2 shadow bg-dark bg-gradient">
      <h3 className="text-success text-center">Summary</h3>
      <div className="card-body">
        <p>
          <span className="text-secondary">Total Expenses:</span>
          <span style={{ color: "#17a2b8" }}> {totalExpenses.toFixed(2)}</span>
        </p>
        <p className={remainingAmount < 0 ? "text-danger" : "text-success"}>
          <span className="text-secondary">Remaining Budget:</span> {remainingAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ExpenseSummary;
