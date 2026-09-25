import React, { useState } from 'react';
import { Truck, Plus, Phone, Mail, MapPin, DollarSign, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SuppliersManager: React.FC = () => {
  const { suppliers, addSupplier } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    productsSupplied: '',
    paymentTerms: 'Net 15 Days',
    outstandingBalance: 0,
    notes: ''
  });

  const handleSave = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      alert('Supplier name and phone are required.');
      return;
    }
    addSupplier({
      ...form,
      productsSupplied: form.productsSupplied ? form.productsSupplied.split(',').map(s => s.trim()) : []
    });
    setIsAddOpen(false);
    setForm({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      productsSupplied: '',
      paymentTerms: 'Net 15 Days',
      outstandingBalance: 0,
      notes: ''
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Suppliers Directory</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage authorized FMCG distributors, payment terms, and outstanding credit balances.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Supplier</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suppliers.map(sup => (
          <div key={sup.id} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{sup.name}</h3>
                <p className="text-[11px] text-slate-500">Contact: {sup.contactPerson}</p>
              </div>
              <span className="font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                {sup.paymentTerms}
              </span>
            </div>

            <div className="space-y-1 text-slate-600">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono">{sup.phone}</span>
              </p>
              {sup.email && (
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{sup.email}</span>
                </p>
              )}
              {sup.address && (
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{sup.address}</span>
                </p>
              )}
            </div>

            {sup.productsSupplied && sup.productsSupplied.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Supplies</span>
                <p className="text-slate-700 mt-0.5">{sup.productsSupplied.join(', ')}</p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Outstanding Balance</span>
                <p className="font-mono font-bold text-slate-900 text-sm">
                  ₹{sup.outstandingBalance.toLocaleString('en-IN')}
                </p>
              </div>
              <button
                onClick={() => alert(`Initiate payment to ${sup.name}`)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-xs transition-colors"
              >
                Pay Supplier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">Add New Supplier</h3>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Company / Supplier Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Metro FMCG Distributors"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={form.contactPerson}
                    onChange={e => setForm({ ...form, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Products Supplied (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="Flour, Edible Oil, Butter, Salt"
                  value={form.productsSupplied}
                  onChange={e => setForm({ ...form, productsSupplied: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Payment Terms</label>
                  <select
                    value={form.paymentTerms}
                    onChange={e => setForm({ ...form, paymentTerms: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white"
                  >
                    <option value="Immediate">Immediate / Cash</option>
                    <option value="Net 15 Days">Net 15 Days</option>
                    <option value="Net 30 Days">Net 30 Days</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Outstanding Balance (₹)</label>
                  <input
                    type="number"
                    value={form.outstandingBalance}
                    onChange={e => setForm({ ...form, outstandingBalance: Number(e.target.value) })}
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
                Save Supplier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
