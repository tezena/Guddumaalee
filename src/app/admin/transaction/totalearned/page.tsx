'use client'
import { useState } from 'react';

interface Transaction {
  id: number;
  lawyer_id: number;
  client_id: number;
  payment_id: string;
  amount: number;
  lawyer: {
    name: string;
  };
  client: {
    name: string;
  };
}

const TotalEarningsPage = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      lawyer_id: 1,
      client_id: 1,
      payment_id: 'PAY123',
      amount: 500.0,
      lawyer: { name: 'John Doe' },
      client: { name: 'Jane Smith' },
    },
    {
      id: 2,
      lawyer_id: 2,
      client_id: 2,
      payment_id: 'PAY456',
      amount: 750.0,
      lawyer: { name: 'Alice Johnson' },
      client: { name: 'Bob Brown' },
    },
    {
      id: 3,
      lawyer_id: 3,
      client_id: 3,
      payment_id: 'PAY789',
      amount: 300.0,
      lawyer: { name: 'Michael White' },
      client: { name: 'Sara Black' },
    },
  ]);

  const totalEarnings = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="w-full font-sans min-h-screen pt-28 pl-10 lg:pl-72 bg-[#f2f6fa] text-black overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Total Earnings</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Total Earnings Balance</h2>
        <p className="text-3xl font-bold">${totalEarnings.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TotalEarningsPage;
