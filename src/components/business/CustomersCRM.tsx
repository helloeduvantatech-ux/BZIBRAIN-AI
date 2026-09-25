import React, { useState } from 'react';
import { Users, Search, Plus, Phone, Mail, MapPin, Eye, X, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Customer } from '../../types';

export const CustomersCRM: React.FC = () => {
  const { customers, addCustomer, sales } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [inspectingCustomer, setInspectingCustomer] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Pune',
    notes: '',
    status: 'active' as const
  });

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.phone.includes(searchTerm) ||
                          (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAdd = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      alert('Customer Name and Phone are required.');
      return;
    }
    addCustomer(form);
    setIsAddModalOpen(false);
    setForm({ name: '', phone: '', email: '', address: '', city: 'Pune', notes: '', status: 'active' });
  };

  // Find customer purchase history
  const customerSales = inspectingCustomer 
    ? sales.filter(s => s.customerId === inspectingCustomer.id || s.customerPhone === inspectingCustomer.phone)
    : [];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Customers CRM</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Maintain customer relationship profiles, purchase history, order volume, and loyalty tiers.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Customer</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Customers ({customers.length})
          </button>
          <button
            onClick={() => setStatusFilter('vip')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'vip' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            VIP
          </button>
          <button
            onClick={() => setStatusFilter('frequent')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'frequent' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Frequent
          </button>
          <button
            onClick={() => setStatusFilter('inactive')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'inactive' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Loyalty Tier</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map(cust => (
                <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">{cust.name}</td>
                  <td className="py-3 px-4 font-mono text-slate-700">{cust.phone}</td>
                  <td className="py-3 px-4 text-slate-500">{cust.email || '—'}</td>
                  <td className="py-3 px-4 text-slate-600">{cust.city || 'Pune'}</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-800">{cust.totalOrders}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    ₹{cust.totalSpent.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 font-semibold uppercase text-[10px] px-2 py-0.5 rounded ${
                      cust.status === 'vip' ? 'bg-amber-100 text-amber-800' :
                      cust.status === 'frequent' ? 'bg-indigo-100 text-indigo-800' :
                      cust.status === 'inactive' ? 'bg-slate-100 text-slate-600' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {cust.status === 'vip' ? '★ VIP' : cust.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setInspectingCustomer(cust)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-[11px] transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile & Purchase History Modal */}
      {inspectingCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden text-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{inspectingCustomer.name}</h3>
                <p className="text-[11px] text-slate-500">{inspectingCustomer.phone} · {inspectingCustomer.email || 'No email'}</p>
              </div>
              <button 
                onClick={() => setInspectingCustomer(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Snapshot metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Orders</p>
                  <p className="text-base font-bold text-slate-900 font-mono">{inspectingCustomer.totalOrders}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Spent</p>
                  <p className="text-base font-bold text-slate-900 font-mono">₹{inspectingCustomer.totalSpent.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Status Tier</p>
                  <p className="font-bold text-indigo-700 uppercase">{inspectingCustomer.status}</p>
                </div>
              </div>

              {/* AI Insight */}
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg space-y-1">
                <span className="font-bold text-indigo-900 text-[11px] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>BizBrain Customer Insight</span>
                </span>
                <p className="text-slate-800 leading-relaxed">
                  {inspectingCustomer.status === 'vip' 
                    ? `${inspectingCustomer.name} is in your top 10% highest-value shoppers. Average order basket is ₹${Math.round(inspectingCustomer.totalSpent / Math.max(1, inspectingCustomer.totalOrders))}. Consider offering priority festive WhatsApp offers.`
                    : inspectingCustomer.status === 'inactive'
                      ? `Last purchase was over 45 days ago. Sending a gentle check-in discount message may rekindle store visits.`
                      : `Consistent repeat patron with regular shopping intervals.`}
                </p>
              </div>

              {/* Purchase History Ledger */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Purchase History Records</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                  {customerSales.map(s => (
                    <div key={s.id} className="p-2.5 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{s.id}</p>
                        <p className="text-[10px] text-slate-400">{new Date(s.createdAt).toLocaleDateString()} · {s.paymentMethod}</p>
                      </div>
                      <span className="font-mono font-bold text-slate-900">₹{s.totalAmount}</span>
                    </div>
                  ))}
                  {customerSales.length === 0 && (
                    <div className="p-4 text-center text-slate-400 text-xs">
                      No linked transactions found in active ledger.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setInspectingCustomer(null)}
                className="px-4 py-1.5 bg-slate-800 text-white rounded-md font-semibold hover:bg-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">Add New Customer</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kulkarni"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  placeholder="+91 98220 12345"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="customer@email.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">City / Locality</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                />
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-3 py-1.5 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700"
              >
                Save Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
