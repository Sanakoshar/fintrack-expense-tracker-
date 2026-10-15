import React from 'react';
import { formatMoney } from '../utils/format';

export const Balance = ({ transactions }) => {
  const total = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="ft-balance-inner">
      <div className="ft-stat-top">
        <span className="ft-stat-label">TOTAL BALANCE</span>
        <span className={`ft-stat-pill ${total >= 0 ? 'positive' : 'negative'}`}>
          {total >= 0 ? '● Active' : '▲ Deficit'}
        </span>
      </div>
      <h1 className="ft-balance-amount">
        {total < 0 ? '-' : ''}₹{formatMoney(Math.abs(total))}
      </h1>
      <p className="ft-balance-hint">
        {total >= 0
          ? 'Available funds across all tracked categories'
          : 'Expenses exceed income for the selected period'}
      </p>
    </div>
  );
};
