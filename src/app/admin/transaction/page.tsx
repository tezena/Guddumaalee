'use client'
'use client'
import { useEffect, useState } from 'react';

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

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
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

  return (
    <div className="w-full font-sans min-h-screen pt-28 pl-10 lg:pl-72 bg-[#f2f6fa] text-black overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Lawyer</th>
              <th className="py-2 px-4 border-b text-left">Client</th>
              <th className="py-2 px-4 border-b text-left">Payment ID</th>
              <th className="py-2 px-4 border-b text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`border-t ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
              >
                <td className="py-2 px-4 border-b">{transaction.id}</td>
                <td className="py-2 px-4 border-b">{transaction.lawyer.name}</td>
                <td className="py-2 px-4 border-b">{transaction.client.name}</td>
                <td className="py-2 px-4 border-b">{transaction.payment_id}</td>
                <td className="py-2 px-4 border-b">${transaction.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
