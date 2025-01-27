import React, { useState } from "react";

const ExpenseInput = ({ addExpense, totalExpenses, budget }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    if (totalExpenses + parseFloat(amount) > budget) {
      alert("Adding this expense would exceed your budget!");
      return;
    }

    if (name && amount) {
      addExpense(name, category, parseFloat(amount));
      setName("");
      setAmount("");
    }
  };

  return (
    <div className="card p-3 bg-danger-subtle">
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Expense Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Expense Name</label>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="form-floating">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel">Travel</option>
              <option value="Hospital">Hospital</option>
              <option value="Other">Other</option>
            </select>
            <label>Category</label>
          </div>
        </div>
        <div className="col-12 col-md-2">
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label>Amount</label>
          </div>
        </div>
        <div className="col-12 col-md-2">
          <button className="btn btn-success btn-lg px-5 py-2" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseInput;
