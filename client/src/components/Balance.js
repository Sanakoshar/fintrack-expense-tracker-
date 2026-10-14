import React from 'react';
import { formatMoney } from '../utils/format';

export const Balance = ({ transactions }) => {
  const total = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>
        {total < 0 ? '-' : ''}₹{formatMoney(Math.abs(total))}
      </h1>
    </>
  );
};
