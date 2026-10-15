import React from 'react';
import { formatMoney } from '../utils/format';

// Unified Theme Palette: Strictly Green & Rose/Red
const CATEGORY_COLORS = {
  Bills: '#f43f5e',     // Rose Red (Expense)
  Food: '#34d399',      // Emerald Green
  Shopping: '#fb7185',  // Light Rose / Coral
  Travel: '#10b981',    // Vibrant Emerald
  Health: '#e11d48',    // Crimson Red
  Education: '#059669', // Deep Emerald
  Salary: '#34d399',    // Emerald Green
  Other: '#f43f5e'      // Rose Red
};

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

  if (sum === 0) {
    return (
      <div className="chart-empty-state">
        <p className="empty-chart-text">No expenses recorded yet.</p>
        <small className="empty-chart-sub">Add a negative amount (e.g. -500) to see category breakdown.</small>
      </div>
    );
  }

  // Conic-gradient stops calculation using consistent Category Colors
  let start = 0;
  const stops = entries.map(([name, value]) => {
    const color = CATEGORY_COLORS[name] || '#f43f5e';
    const end = start + (value / sum) * 100;
    const part = `${color} ${start}% ${end}%`;
    start = end;
    return part;
  });

  const singleColor = CATEGORY_COLORS[entries[0][0]] || '#f43f5e';
  const backgroundStyle = entries.length === 1
    ? `conic-gradient(from 180deg, ${singleColor} 0%, ${singleColor} 100%)`
    : `conic-gradient(${stops.join(', ')})`;

  return (
    <div className="ft-chart-container">
      <div className="chart-wrap">
        {/* Modern Donut Chart with matching Green & Red theme */}
        <div
          className="donut-ring"
          style={{
            background: backgroundStyle,
            boxShadow: `0 0 25px ${singleColor}40`
          }}
        >
          <div className="donut-center">
            <span className="donut-center-label">Spent</span>
            <span className="donut-center-amount">₹{formatMoney(sum)}</span>
          </div>
        </div>

        {/* Legend list */}
        <ul className="legend">
          {entries.map(([name, value]) => {
            const pct = Math.round((value / sum) * 100);
            const color = CATEGORY_COLORS[name] || '#f43f5e';
            return (
              <li key={name}>
                <span
                  className="dot"
                  style={{ background: color, boxShadow: `0 0 8px ${color}80` }}
                />
                <span className="legend-name">{name}</span>
                <span className="legend-amount">₹{formatMoney(value)}</span>
                <span className="legend-pct">({pct}%)</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
