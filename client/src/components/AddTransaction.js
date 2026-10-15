import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { CATEGORIES } from '../constants';

const today = () => new Date().toISOString().slice(0, 10);

const PRESET_AMOUNTS = [100, 500, 1000, 2000, 5000];

export const AddTransaction = () => {
  const [type, setType] = useState('expense'); // 'expense' or 'income'
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(today());

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();
    if (!text.trim() || amount === '' || Number(amount) <= 0) return;

    const numericAmount = Math.abs(Number(amount));
    const finalAmount = type === 'expense' ? -numericAmount : numericAmount;

    addTransaction({
      text: text.trim(),
      amount: finalAmount,
      category,
      date
    });

    setText('');
    setAmount('');
  };

  return (
    <div className="ft-add-transaction-wrap">
      <h3>Add New Transaction</h3>

      {/* Segmented Type Toggle (Expense vs Income) */}
      <div className="ft-type-toggle">
        <button
          type="button"
          className={`ft-toggle-btn expense ${type === 'expense' ? 'active' : ''}`}
          onClick={() => {
            setType('expense');
            if (category === 'Salary') setCategory('Food');
          }}
        >
          Expense
        </button>
        <button
          type="button"
          className={`ft-toggle-btn income ${type === 'income' ? 'active' : ''}`}
          onClick={() => {
            setType('income');
            setCategory('Salary');
          }}
        >
          Income
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Description</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={type === 'expense' ? 'e.g. Grocery, Electricity, Uber' : 'e.g. Monthly Salary, Freelance'}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            min="1"
            step="any"
            onChange={e => setAmount(e.target.value)}
            placeholder="0.00"
            required
          />

          {/* Quick Amount Chips */}
          <div className="ft-preset-chips">
            {PRESET_AMOUNTS.map(preset => (
              <button
                key={preset}
                type="button"
                className="ft-chip-btn"
                onClick={() => setAmount(preset)}
              >
                +₹{preset.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        <div className="form-row-dual">
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </div>

        <button className={`btn ${type === 'expense' ? 'btn-expense' : 'btn-income'}`}>
          {type === 'expense' ? 'Add Expense' : 'Add Income'}
        </button>
      </form>
    </div>
  );
};
