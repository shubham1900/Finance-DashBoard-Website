import React, { useState } from 'react';

export default function TransactionItem({ transaction }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="transaction-item">
      <div className="transaction-header" onClick={toggleAccordion}>
        <h3>Description: {transaction.description}</h3>
      </div>
      <div className={`transaction-details ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><strong>Type:</strong> {transaction.type}</li>
          <li><strong>Amount:</strong> {transaction.amount}</li>
          <li><strong>Date:</strong> {transaction.date}</li>
          <li><strong>Description:</strong> {transaction.category}</li>
        </ul>
      </div>
    </div>
  );
}