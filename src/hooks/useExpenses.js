import { useState, useEffect } from "react";

const useExpensesManager = () => {
  const [budget, setBudget] = useState(1000); // Default budget is 1000
  const [expenses, setExpenses] = useState(() => {
    // Retrieve expenses from sessionStorage if available, else default to an empty array
    const storedExpenses = JSON.parse(sessionStorage.getItem("expenses"));
    return storedExpenses || [];
  });
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Save expenses to sessionStorage whenever they change
    sessionStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (name, category, amount) => {
    const newExpense = {
      id: Date.now(),
      name,
      category,
      amount,
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const editExpense = (id, name, category, amount) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, name, category, amount } : expense
      )
    );
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesFilter = filter === "All" || expense.category === filter;
    const matchesSearch = expense.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return {
    budget,
    setBudget,
    addExpense,
    expenses: filteredExpenses,
    totalExpenses,
    filter,
    setFilter,
    setSearchQuery,
    editExpense,
  };
};

export default useExpensesManager;
