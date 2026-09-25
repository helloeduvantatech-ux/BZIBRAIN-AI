import React, { useState } from 'react';
import { UserCheck, Plus, Shield, Check, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Employee, StaffPermission } from '../../types';

export const EmployeesManager: React.FC = () => {
  const { employees, addEmployee, updateEmployee } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'Sales Staff' as const,
    joiningDate: new Date().toISOString().split('T')[0],
    status: 'active' as const,
    monthlySalary: 15000,
    permissions: ['record_sales', 'view_products'] as StaffPermission[]
  });

  const allPermissions: { id: StaffPermission; label: string }[] = [
    { id: 'record_sales', label: 'Process Sales & Billing (POS)' },
    { id: 'view_products', label: 'Browse Products Catalog' },
    { id: 'manage_inventory', label: 'Adjust & Restock Inventory' },
    { id: 'view_orders', label: 'View Customer Orders' },
    { id: 'manage_customers', label: 'Access Customer CRM Profiles' },
    { id: 'view_reports', label: 'View Financial & Profit Reports' },
  ];

  const handleTogglePermission = (permId: StaffPermission) => {
    setForm(prev => {
      const exists = prev.permissions.includes(permId);
      return {
        ...prev,
        permissions: exists 
          ? prev.permissions.filter(p => p !== permId)
          : [...prev.permissions, permId]
      };
    });
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      alert('Name and phone are required.');
      return;
    }
    addEmployee(form);
    setIsAddOpen(false);
    setForm({
      name: '',
      phone: '',
      email: '',
      role: 'Sales Staff',
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'active',
      monthlySalary: 15000,
      permissions: ['record_sales', 'view_products']
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Staff & Role Permissions</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage store employees, assigned responsibilities, cashier authorizations, and monthly compensations.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Employee</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {employees.map(emp => (
          <div key={emp.id} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{emp.name}</h3>
                <p className="text-[11px] text-slate-500">{emp.email}</p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">{emp.phone}</p>
              </div>
              <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                {emp.role}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Granted Permissions</span>
              <div className="space-y-1">
                {allPermissions.map(p => {
                  const hasPerm = emp.permissions.includes(p.id);
                  return (
                    <div key={p.id} className="flex items-center gap-1.5 text-[11px]">
                      {hasPerm ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="w-3.5 h-3.5 inline-block text-slate-300 text-center">—</span>
                      )}
                      <span className={hasPerm ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                        {p.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
              <span>Joined: {emp.joiningDate}</span>
              {emp.monthlySalary && (
                <span className="font-mono font-semibold text-slate-900">₹{emp.monthlySalary.toLocaleString('en-IN')}/mo</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Employee Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">Add Team Member</h3>
              <button onClick={() => setIsAddOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Pooja Verma"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Role Title</label>
                  <select
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800 font-medium"
                  >
                    <option value="Manager">Manager</option>
                    <option value="Sales Staff">Sales Staff / Cashier</option>
                    <option value="Inventory Staff">Inventory Staff</option>
                    <option value="Custom">Custom Role</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Monthly Salary (₹)</label>
                  <input
                    type="number"
                    value={form.monthlySalary}
                    onChange={e => setForm({ ...form, monthlySalary: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1.5">Configure Granular Permissions</label>
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {allPermissions.map(p => {
                    const isChecked = form.permissions.includes(p.id);
                    return (
                      <label key={p.id} className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleTogglePermission(p.id)}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-slate-800">{p.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button onClick={() => setIsAddOpen(false)} className="px-3 py-1.5 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-1.5 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700">
                Save Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
