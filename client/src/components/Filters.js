import React from 'react';
import { CATEGORIES } from '../constants';
import { monthKey } from '../utils/format';

export const Filters = ({
  transactions,
  month,
  setMonth,
  category,
  setCategory,
  search,
  setSearch
}) => {
  // Sirf wahi months dikhao jinme transactions hain
  const months = Array.from(new Set(transactions.map(t => monthKey(t.date)))).sort().reverse();

  return (
    <div className="filters">
      <select value={month} onChange={e => setMonth(e.target.value)}>
        <option value="all">All months</option>
        {months.map(m => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="all">All categories</option>
        {CATEGORIES.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
};
