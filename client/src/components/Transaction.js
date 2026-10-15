import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { formatMoney, prettyDate } from '../utils/format';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const isExpense = transaction.amount < 0;
  const sign = isExpense ? '-' : '+';

  return (
    <li className={`ft-tx-item ${isExpense ? 'minus' : 'plus'}`}>
      <div className="tx-info">
        <span className="tx-title">{transaction.text}</span>
        <div className="tx-meta-row">
          <span className="tx-category-badge">{transaction.category || 'General'}</span>
          <span className="tx-date-dot">•</span>
          <span className="tx-date">{prettyDate(transaction.date)}</span>
        </div>
      </div>

      <div className="tx-right">
        <span className={`tx-amount ${isExpense ? 'minus' : 'plus'}`}>
          {sign}₹{formatMoney(Math.abs(transaction.amount))}
        </span>
        <button
          onClick={() => deleteTransaction(transaction._id)}
          className="delete-btn"
          title="Delete record"
        >
          ×
        </button>
      </div>
    </li>
  );
};
