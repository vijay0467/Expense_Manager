import React, { useState } from "react";

const ExpenseList = ({ expenses, editExpense }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedAmount, setEditedAmount] = useState("");

  const handleEditStart = (expense) => {
    setEditingId(expense.id);
    setEditedName(expense.name);
    setEditedCategory(expense.category);
    setEditedAmount(expense.amount);
  };

  const handleSaveEdit = (id) => {
    editExpense(id, editedName, editedCategory, parseFloat(editedAmount));
    setEditingId(null);
  };

  return (
    <div className="card p-3 shadow" style={{ backgroundColor: "#f8f9fa" }}>
      <h2 className="text-center" style={{ margin: "10px 0", color: "black", fontSize: "1.5rem" }}>
        Added Items
      </h2>
      <ul className="list-group">
        {expenses.map((expense) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center bg-info-subtle"
            key={expense.id}
          >
            {editingId === expense.id ? (
              <>
                <div className="d-flex flex-column flex-lg-row gap-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <select
                    className="form-select form-select-sm"
                    value={editedCategory}
                    onChange={(e) => setEditedCategory(e.target.value)}
                  >
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={editedAmount}
                    onChange={(e) => setEditedAmount(e.target.value)}
                  />
                  <button className="btn btn-success btn-sm" onClick={() => handleSaveEdit(expense.id)}>
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="text-success">{expense.name}</span>
                <div className="d-flex align-items-center">
                  <span className="badge bg-warning rounded-pill px-3">
                    <span className="badge bg-success rounded-pill px-2 mx-1">
                      {expense.category}
                    </span>
                    {expense.amount.toFixed(2)}
                  </span>
                  <button
                    className="btn btn-outline-success btn-sm"
                    style={{
                      borderRadius: "50%",
                      width: "2rem",
                      height: "2rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "0.3rem",
                    }}
                    onClick={() => handleEditStart(expense)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
