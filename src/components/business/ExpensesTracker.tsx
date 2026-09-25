import React, { useState } from 'react';
import { Receipt, Plus, Search, Filter, TrendingDown, ArrowUpRight, DollarSign, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExpenseCategory, PaymentMethod } from '../../types';

export const ExpensesTracker: React.FC = () => {
  const { expenses, addExpense, deleteExpense, sales } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [form, setForm] = useState({
    amount: 0,
    category: 'Rent' as ExpenseCategory,
    date: new Date().toISOString().split('T')[0],
    description: '',
    paymentMethod: 'UPI' as PaymentMethod,
    referenceNumber: '',
    receiptNote: ''
  });

  const categories: ExpenseCategory[] = [
    'Rent', 
    'Electricity', 
    'Salary', 
    'Transport', 
    'Marketing', 
    'Inventory Purchase', 
    'Maintenance', 
    'Software', 
    'Other'
  ];

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);
  const estimatedProfit = totalRevenue - totalExpense;

  const filteredExpenses = expenses.filter(e => {
    const matchesSearch = e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'all' || e.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleSave = () => {
    if (form.amount <= 0 || !form.description.trim()) {
      alert('Please provide a valid amount and description.');
      return;
    }
    addExpense(form);
    setIsAddOpen(false);
    setForm({
      amount: 0,
      category: 'Rent',
      date: new Date().toISOString().split('T')[0],
      description: '',
      paymentMethod: 'UPI',
      referenceNumber: '',
      receiptNote: ''
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Expense Ledger & Profit Estimation</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Log operational cash outflows, store rent, staff salaries, transport, and utilities.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Record Expense</span>
        </button>
      </div>

      {/* Revenue - Expenses = Estimated Profit Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-medium text-slate-500">Gross Sales Revenue</span>
          <p className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">{sales.length} customer sales recorded</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-medium text-slate-500">Total Logged Expenses</span>
          <p className="text-2xl font-bold text-rose-700 mt-1 font-mono tabular-nums">
            ₹{totalExpense.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">{expenses.length} operating vouchers</p>
        </div>

        <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900">Estimated Net Operating Profit</span>
            <span className="text-[10px] bg-indigo-200/60 text-indigo-900 font-semibold px-1.5 py-0.2 rounded">
              ESTIMATE
            </span>
          </div>
          <p className={`text-2xl font-bold mt-1 font-mono tabular-nums ${estimatedProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
            ₹{estimatedProfit.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Formula: Revenue (₹{totalRevenue.toLocaleString('en-IN')}) - Expenses (₹{totalExpense.toLocaleString('en-IN')})
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search expense description, category..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs"
          />
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Expense Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Amount (INR)</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Authorized By</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.map(exp => (
                <tr key={exp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{exp.date}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800">{exp.category}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {exp.description}
                    {exp.referenceNumber && (
                      <span className="text-[10px] text-slate-400 font-mono block">Ref: {exp.referenceNumber}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    ₹{exp.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{exp.paymentMethod}</td>
                  <td className="py-3 px-4 text-slate-500">{exp.createdByName}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this expense voucher?')) {
                          deleteExpense(exp.id);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">Record Store Expense</h3>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Expense Amount (₹) *</label>
                <input
                  type="number"
                  placeholder="e.g. 4500"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value as ExpenseCategory })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white text-slate-900 font-medium"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Expense Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Description / Narration *</label>
                <input
                  type="text"
                  placeholder="e.g. Electricity bill for deep chillers (September)"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={form.paymentMethod}
                    onChange={e => setForm({ ...form, paymentMethod: e.target.value as PaymentMethod })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Bank Transfer">Bank Transfer / NEFT</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Voucher / Ref Number</label>
                  <input
                    type="text"
                    placeholder="e.g. UPI-98421"
                    value={form.referenceNumber}
                    onChange={e => setForm({ ...form, referenceNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button onClick={() => setIsAddOpen(false)} className="px-3 py-1.5 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-1.5 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700">
                Save Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
