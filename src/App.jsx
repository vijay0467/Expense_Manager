import React, { useEffect, useState } from "react";
import ExpenseInput from "./components/ExpenseInput";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import useExpensesManager from "./hooks/useExpenses";
import useDebounce from "./hooks/useDebounce";

const App = () => {
  const {
    budget,
    setBudget,
    addExpense,
    expenses,
    totalExpenses,
    filter,
    setFilter,
    setSearchQuery,
    editExpense,
  } = useExpensesManager();

  const [searchTerm, setSearchTerm] = useState("");
  const searchDebounce = useDebounce(searchTerm, 300);

  useEffect(() => {
    setSearchQuery(searchDebounce);
  }, [searchDebounce, setSearchQuery]);

  useEffect(() => {
    if (totalExpenses > budget) {
      alert("Warning: Total expenses exceed the remaining budget!");
    }
  }, [totalExpenses, budget]);

  return (
    <div className="container mt-4 p-3">
      <h1 className="text-center text-white mt-1">Expense Manager</h1>
      <div className="form-floating my-2 ">
        <input
          type="number"
          className="form-control bg-secondary-subtle bg-gradient"
          id="budget"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
        />
        <label htmlFor="budget">Budget</label>
      </div>

      <ExpenseInput addExpense={addExpense} totalExpenses={totalExpenses} budget={budget} />

      <div className="card p-2 my-2">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="form-floating my-3">
              <input
                type="text"
                className="form-control bg-primary-subtle"
                id="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label htmlFor="search">Search</label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-auto">
            <div className="form-floating">
              <select
                className="form-select bg-warning-subtle"
                id="filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Travel">Travel</option>
                <option value="Hospital">Hospital</option>
                <option value="Other">Other</option>
              </select>
              <label htmlFor="filter">Filter by Category</label>
            </div>
          </div>
        </div>
      </div>

      <ExpenseList expenses={expenses} editExpense={editExpense} />

      <ExpenseSummary totalExpenses={totalExpenses} budget={budget} />
    </div>
  );
};

export default App;
