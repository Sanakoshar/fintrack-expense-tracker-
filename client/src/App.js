/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { Filters } from './components/Filters';
import { CategoryChart } from './components/CategoryChart';
import { Budget } from './components/Budget';
import { GlobalProvider, GlobalContext } from './context/GlobalState';
import { monthKey } from './utils/format';

import './App.css';
import './Extra.css';

function Dashboard() {
  const { transactions, getTransactions, error } = useContext(GlobalContext);
  const [month, setMonth] = useState('all');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getTransactions();
  }, []);

  // Filters lagao
  const filtered = transactions.filter(t => {
    const okMonth = month === 'all' || monthKey(t.date) === month;
    const okCat = category === 'all' || (t.category || 'Other') === category;
    const okSearch = t.text.toLowerCase().includes(search.toLowerCase());
    return okMonth && okCat && okSearch;
  });

  // CSV export (filtered data)
  const exportCSV = () => {
    const rows = [['Text', 'Amount', 'Category', 'Date']].concat(
      filtered.map(t => [
        `"${t.text.replace(/"/g, '""')}"`,
        t.amount,
        t.category || 'Other',
        String(t.date).slice(0, 10)
      ])
    );
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <Header />
      {error && <p className="alert over">{String(error)}</p>}
      <Balance transactions={filtered} />
      <IncomeExpenses transactions={filtered} />
      <Budget transactions={transactions} />
      <CategoryChart transactions={filtered} />
      <Filters
        transactions={transactions}
        month={month}
        setMonth={setMonth}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />
      <button className="export-btn" onClick={exportCSV}>
        Export CSV
      </button>
      <TransactionList transactions={filtered} />
      <AddTransaction />
    </div>
  );
}

function App() {
  return (
    <GlobalProvider>
      <Dashboard />
    </GlobalProvider>
  );
}

export default App;
