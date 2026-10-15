import React from 'react';
import { formatMoney } from '../utils/format';

export const IncomeExpenses = ({ transactions }) => {
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0) * -1;

  return (
    <div className="ft-inc-exp-grid">
      <div className="ft-flow-box ft-income-box">
        <div className="ft-stat-top">
          <span className="ft-stat-label">TOTAL INCOME</span>
          <span className="ft-badge-icon inc">↓</span>
        </div>
        <p className="ft-flow-amount money plus">+₹{formatMoney(income)}</p>
        <span className="ft-flow-subtext">Received this period</span>
      </div>

      <div className="ft-flow-box ft-expense-box">
        <div className="ft-stat-top">
          <span className="ft-stat-label">TOTAL EXPENSES</span>
          <span className="ft-badge-icon exp">↑</span>
        </div>
        <p className="ft-flow-amount money minus">-₹{formatMoney(expense)}</p>
        <span className="ft-flow-subtext">Total spent this period</span>
      </div>
    </div>
  );
};
