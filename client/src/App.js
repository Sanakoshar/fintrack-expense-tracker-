/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { Filters } from './components/Filters';
import { CategoryChart } from './components/CategoryChart';
import { CashFlowChart } from './components/CashFlowChart';
import { Budget } from './components/Budget';
import { AuthForm } from './components/AuthForm';
import { GlobalProvider, GlobalContext } from './context/GlobalState';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { monthKey } from './utils/format';

import './App.css';
import './Extra.css';
import './Auth.css';

function Dashboard() {
  const { transactions, getTransactions, error } = useContext(GlobalContext);
  const [month, setMonth] = useState('all');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getTransactions();
  }, []);

  const filtered = transactions.filter(t => {
    const okMonth = month === 'all' || monthKey(t.date) === month;
    const okCat = category === 'all' || (t.category || 'Other') === category;
    const okSearch = t.text.toLowerCase().includes(search.toLowerCase());
    return okMonth && okCat && okSearch;
  });

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
    <div className="ft-dashboard-app">
      {/* Top Navigation Bar */}
      <header className="ft-top-navbar">
        <Header />
      </header>

      {/* Main Full-Width Dashboard Container */}
      <main className="ft-dashboard-layout">
        {error && <p className="alert over">{String(error)}</p>}

        {/* Top Overview Cards Row */}
        <section className="ft-stats-row">
          <div className="ft-stat-card ft-balance-card">
            <Balance transactions={filtered} />
          </div>

          <div className="ft-stat-card ft-cashflow-card">
            <IncomeExpenses transactions={filtered} />
          </div>

          <div className="ft-stat-card ft-budget-card">
            <Budget transactions={transactions} />
          </div>
        </section>

        {/* 2-Column Main Workspace */}
        <div className="ft-workspace-grid">
          {/* Left Column: Transaction Feed & Analytics Graph */}
          <div className="ft-main-column">
            <section className="ft-card ft-history-section">
              <div className="ft-card-header">
                <div>
                  <h3 className="ft-card-title">Transaction History</h3>
                  <p className="ft-card-subtitle">
                    Showing {filtered.length} of {transactions.length} records
                  </p>
                </div>
                <button className="export-btn" onClick={exportCSV} title="Download CSV report">
                  📥 Export CSV
                </button>
              </div>

              <Filters
                transactions={transactions}
                month={month}
                setMonth={setMonth}
                category={category}
                setCategory={setCategory}
                search={search}
                setSearch={setSearch}
              />

              <TransactionList transactions={filtered} />
            </section>

            {/* Visual Analytics Chart (Fills the empty space!) */}
            <section className="ft-card ft-analytics-card">
              <CashFlowChart transactions={filtered} />
            </section>
          </div>

          {/* Right Column: Add Transaction & Category Analytics */}
          <aside className="ft-sidebar-stack">
            <section className="ft-card ft-add-section">
              <AddTransaction />
            </section>

            <section className="ft-card ft-chart-section">
              <CategoryChart transactions={filtered} />
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

// Login check: Logged in -> Full Dashboard, Not logged in -> FinTrack Auth
function AppContent() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="ft-loading-screen">
        <div className="ft-spinner" />
        <p>Loading your financial dashboard...</p>
      </div>
    );
  }

  if (!user) return <AuthForm />;

  return (
    <GlobalProvider>
      <Dashboard />
    </GlobalProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
