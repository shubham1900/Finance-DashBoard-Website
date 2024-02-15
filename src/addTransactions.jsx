import React, { useState } from 'react';
import './components/Dash.css'; // Import CSS file for styling

export default function AddTransactionTable({ addTransaction }) {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = () => {
    const newTransaction = { type: 'income', amount: 0, date: '', description: '' }; // Default type set to 'income'
    setTransactions([...transactions, newTransaction]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTransactions = [...transactions];
    updatedTransactions[index] = { ...updatedTransactions[index], [name]: value };
    setTransactions(updatedTransactions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    transactions.forEach((transaction) => {
      addTransaction(transaction);
    });
    setTransactions([]); // Clear the transactions after submitting
  };

  return (
    <div className="add-transaction-container">
      <h2>Add Transaction</h2>
      <button className="add-row-button" onClick={handleAddTransaction}>Add Row</button>
      <form onSubmit={handleSubmit}>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>
                  <input
                    className='input-field-number'
                    type="number"
                    name="amount"
                    value={transaction.amount}
                    onChange={(e) => handleInputChange(index, e)}
                    required 
                  />
                </td>
                <td>
                  <input
                    className='input-field'
                    type="text"
                    name="date"
                    value={transaction.date}
                    onChange={(e) => handleInputChange(index, e)}
                    required 
                  />
                </td>
                <td>
                  <select
                    name="type"
                    className='select-field' // Apply the select field style from Dash.css
                    value={transaction.type}
                    onChange={(e) => handleInputChange(index, e)}
                    required 
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </td>
                <td>
                  <input
                    className='input-field' // Apply the input field style from Dash.css
                    type="text"
                    name="description"
                    value={transaction.description}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}
