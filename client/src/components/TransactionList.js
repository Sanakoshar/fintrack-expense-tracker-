import React from 'react';
import { Transaction } from './Transaction';

export const TransactionList = ({ transactions }) => {
  return (
    <>
      <h3>History</h3>
      {transactions.length === 0 ? (
        <p className="empty">No transactions found.</p>
      ) : (
        <ul className="list">
          {transactions.map(t => (
            <Transaction key={t._id} transaction={t} />
          ))}
        </ul>
      )}
    </>
  );
};
