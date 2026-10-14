import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { formatMoney, prettyDate } from '../utils/format';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      <div className="tx-info">
        {transaction.text}
        <small className="tx-meta">
          {transaction.category || 'Other'} · {prettyDate(transaction.date)}
        </small>
      </div>
      <span>
        {sign}₹{formatMoney(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => deleteTransaction(transaction._id)}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};
