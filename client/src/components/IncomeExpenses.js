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
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">+₹{formatMoney(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-₹{formatMoney(expense)}</p>
      </div>
    </div>
  );
};
