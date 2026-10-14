import React, { useState } from 'react';
import { formatMoney, monthKey } from '../utils/format';

export const Budget = ({ transactions }) => {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('monthlyBudget')) || 0
  );
  const [input, setInput] = useState('');

  // Is mahine ka (current month) total kharcha
  const thisMonth = new Date().toISOString().slice(0, 7);
  const spent = transactions
    .filter(t => t.amount < 0 && monthKey(t.date) === thisMonth)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const saveBudget = e => {
    e.preventDefault();
    const value = Number(input);
    if (value > 0) {
      localStorage.setItem('monthlyBudget', value);
      setBudget(value);
      setInput('');
    }
  };

  const percent = budget ? Math.min((spent / budget) * 100, 100) : 0;
  const status = !budget ? '' : spent > budget ? 'over' : spent >= budget * 0.8 ? 'warn' : 'ok';

  return (
    <>
      <h3>Monthly budget ({thisMonth})</h3>
      <form onSubmit={saveBudget} className="budget-form">
        <input
          type="number"
          placeholder={budget ? `Current: ₹${budget}` : 'Set monthly budget (₹)'}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="btn small">Set</button>
      </form>

      {budget > 0 && (
        <>
          <div className="bar">
            <div className={`fill ${status}`} style={{ width: `${percent}%` }} />
          </div>
          <p className="budget-text">
            Spent ₹{formatMoney(spent)} of ₹{formatMoney(budget)}
          </p>
          {status === 'warn' && (
            <p className="alert warn">Warning: budget ka 80% se zyada kharch ho gaya!</p>
          )}
          {status === 'over' && (
            <p className="alert over">Budget cross ho gaya! Kharcha kam karo.</p>
          )}
        </>
      )}
    </>
  );
};
