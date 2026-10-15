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

export const CashFlowChart = ({ transactions }) => {
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const netSavings = income - expense;
  const savingsRate = income > 0 ? Math.max(0, Math.round((netSavings / income) * 100)) : 0;
  const totalFlow = income + expense;
  const incomePercent = totalFlow > 0 ? (income / totalFlow) * 100 : 50;
  const expensePercent = totalFlow > 0 ? (expense / totalFlow) * 100 : 50;

  // Category-wise expense breakdown
  const categoryTotals = {};
  transactions
    .filter(t => t.amount < 0)
    .forEach(t => {
      const c = t.category || 'Other';
      categoryTotals[c] = (categoryTotals[c] || 0) + Math.abs(t.amount);
    });

  const categoryEntries = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  return (
    <div className="ft-cashflow-analytics">
      <div className="ft-card-header">
        <div>
          <h3 className="ft-card-title">Cash Flow & Spending Analytics</h3>
          <p className="ft-card-subtitle">Real-time breakdown of your income vs expenditure</p>
        </div>
        {income > 0 && (
          <span className="ft-savings-badge">
            {savingsRate}% Net Saved
          </span>
        )}
      </div>

      {/* Visual Income vs Expense Split Ratio Bar */}
      <div className="ft-flow-ratio-wrap">
        <div className="ft-ratio-labels">
          <span className="ratio-label income">
            Income: +₹{formatMoney(income)} ({Math.round(incomePercent)}%)
          </span>
          <span className="ratio-label expense">
            Expense: -₹{formatMoney(expense)} ({Math.round(expensePercent)}%)
          </span>
        </div>

        <div className="ft-ratio-bar">
          <div
            className="ft-ratio-fill income"
            style={{ width: `${incomePercent}%` }}
            title={`Income: ₹${formatMoney(income)}`}
          />
          <div
            className="ft-ratio-fill expense"
            style={{ width: `${expensePercent}%` }}
            title={`Expense: ₹${formatMoney(expense)}`}
          />
        </div>
      </div>

      {/* Category Progress Bars */}
      {categoryEntries.length > 0 && (
        <div className="ft-category-bars-list">
          <h4 className="ft-subheading">Expense Allocation by Category</h4>
          <div className="ft-cat-grid">
            {categoryEntries.map(([category, amount]) => {
              const pct = expense > 0 ? Math.round((amount / expense) * 100) : 0;
              const color = CATEGORY_COLORS[category] || '#f43f5e';

              return (
                <div key={category} className="ft-cat-progress-item">
                  <div className="ft-cat-row-top">
                    <span className="ft-cat-name">
                      <span className="ft-cat-dot" style={{ background: color, boxShadow: `0 0 8px ${color}80` }} />
                      {category}
                    </span>
                    <span className="ft-cat-val">
                      ₹{formatMoney(amount)} <small>({pct}%)</small>
                    </span>
                  </div>
                  <div className="ft-cat-bar-track">
                    <div
                      className="ft-cat-bar-fill"
                      style={{
                        width: `${pct}%`,
                        background: color,
                        boxShadow: `0 0 10px ${color}80`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
