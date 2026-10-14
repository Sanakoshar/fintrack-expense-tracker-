import React from 'react';
import { formatMoney } from '../utils/format';

const COLORS = [
  '#9c88ff', '#2ecc71', '#e74c3c', '#f39c12',
  '#3498db', '#1abc9c', '#e84393', '#7f8c8d'
];

export const CategoryChart = ({ transactions }) => {
  // Sirf expenses (negative amounts), category-wise total
  const totals = {};
  transactions
    .filter(t => t.amount < 0)
    .forEach(t => {
      const c = t.category || 'Other';
      totals[c] = (totals[c] || 0) + Math.abs(t.amount);
    });

  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const sum = entries.reduce((acc, [, v]) => acc + v, 0);

  if (sum === 0) return null;

  // Pie chart: CSS conic-gradient (koi extra library nahi chahiye)
  let start = 0;
  const stops = entries.map(([, value], i) => {
    const end = start + (value / sum) * 100;
    const part = `${COLORS[i % COLORS.length]} ${start}% ${end}%`;
    start = end;
    return part;
  });

  return (
    <>
      <h3>Spending by category</h3>
      <div className="chart-wrap">
        <div
          className="pie"
          style={{ background: `conic-gradient(${stops.join(', ')})` }}
        />
        <ul className="legend">
          {entries.map(([name, value], i) => (
            <li key={name}>
              <span
                className="dot"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              {name}: ₹{formatMoney(value)} ({Math.round((value / sum) * 100)}%)
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
