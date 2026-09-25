import React, { useState } from 'react';
import { CreditCard, Search, CheckCircle2, Clock, XCircle, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PaymentsTracker: React.FC = () => {
  const { sales } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');

  const filteredSales = sales.filter(s => {
    const matchesSearch = s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = methodFilter === 'all' || s.paymentMethod === methodFilter;
    return matchesSearch && matchesMethod;
  });

  const totalCollected = sales.reduce((sum, s) => sum + s.totalAmount, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Payments & Settlement Ledger</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit payment modes (UPI, Cash, Cards, Bank Transfers), transaction confirmations, and balances.
          </p>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-right">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Payments Collected</span>
          <p className="text-lg font-bold text-slate-900 font-mono tabular-nums">
            ₹{totalCollected.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search invoice ID, customer name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs"
          />
        </div>

        <div>
          <select
            value={methodFilter}
            onChange={e => setMethodFilter(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
          >
            <option value="all">All Payment Channels</option>
            <option value="UPI">UPI (PhonePe, GPay, QR)</option>
            <option value="Cash">Cash Currency</option>
            <option value="Card">Debit / Credit Card</option>
            <option value="Bank Transfer">Bank Transfer / NEFT</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Invoice Ref</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Amount Paid</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Authorized Cashier</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSales.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-700">{s.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{s.customerName}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 text-sm">
                    ₹{s.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                      {s.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 capitalize">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {s.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{s.createdByName}</td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                    {new Date(s.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
