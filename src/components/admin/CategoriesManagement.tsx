import React, { useState } from 'react';
import { Tag, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BusinessCategory } from '../../types';

export const CategoriesManagement: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    defaultGstRate: 18,
    isActive: true
  });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    addCategory(form);
    setForm({ name: '', description: '', defaultGstRate: 18, isActive: true });
    setIsAdding(false);
  };

  const handleSaveEdit = (id: string) => {
    updateCategory(id, {
      name: form.name,
      description: form.description,
      defaultGstRate: form.defaultGstRate,
      isActive: form.isActive
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Business Categories & GST Slabs</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure Indian trade categories and their default Goods & Services Tax (GST) slabs.
          </p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setForm({ name: '', description: '', defaultGstRate: 18, isActive: true }); }}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Category</span>
        </button>
      </div>

      {/* Add New Category Box */}
      {isAdding && (
        <div className="bg-indigo-50/50 border border-indigo-200 rounded-xl p-4 text-xs space-y-3">
          <h3 className="font-bold text-slate-900">New Category Specification</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Category Name *</label>
              <input
                type="text"
                placeholder="e.g. Organic Dairy, Hardware Store"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Default GST Slab (%)</label>
              <select
                value={form.defaultGstRate}
                onChange={e => setForm({ ...form, defaultGstRate: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs"
              >
                <option value={0}>0% (Exempt)</option>
                <option value={5}>5% (Staples, Daily Foods)</option>
                <option value={12}>12% (Processed items, Apparel)</option>
                <option value={18}>18% (Standard Retail Goods)</option>
                <option value={28}>28% (Luxury & Automobiles)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Status</label>
              <select
                value={form.isActive ? 'true' : 'false'}
                onChange={e => setForm({ ...form, isActive: e.target.value === 'true' })}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs"
              >
                <option value="true">Active & Visible in Wizard</option>
                <option value="false">Hidden / Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Description</label>
            <input
              type="text"
              placeholder="Brief description of the trade domain"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs"
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAdd}
              className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700"
            >
              Save Category
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories Grid Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Default GST</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map(cat => {
                const isEditing = editingId === cat.id;
                return (
                  <tr key={cat.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="px-2 py-1 border border-slate-300 rounded text-xs w-full"
                        />
                      ) : (
                        <span className="font-semibold text-slate-900">{cat.name}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {isEditing ? (
                        <input
                          type="text"
                          value={form.description}
                          onChange={e => setForm({ ...form, description: e.target.value })}
                          className="px-2 py-1 border border-slate-300 rounded text-xs w-full"
                        />
                      ) : (
                        cat.description
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                      {isEditing ? (
                        <select
                          value={form.defaultGstRate}
                          onChange={e => setForm({ ...form, defaultGstRate: Number(e.target.value) })}
                          className="px-2 py-1 border border-slate-300 rounded text-xs"
                        >
                          <option value={0}>0%</option>
                          <option value={5}>5%</option>
                          <option value={12}>12%</option>
                          <option value={18}>18%</option>
                          <option value={28}>28%</option>
                        </select>
                      ) : (
                        <span>{cat.defaultGstRate}% GST</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 font-medium ${
                        cat.isActive ? 'text-emerald-700' : 'text-slate-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          cat.isActive ? 'bg-emerald-500' : 'bg-slate-400'
                        }`} />
                        {cat.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSaveEdit(cat.id)}
                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1 text-slate-400 hover:bg-slate-100 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingId(cat.id);
                              setForm({
                                name: cat.name,
                                description: cat.description,
                                defaultGstRate: cat.defaultGstRate,
                                isActive: cat.isActive
                              });
                            }}
                            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                            title="Edit Category"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete category ${cat.name}?`)) {
                                deleteCategory(cat.id);
                              }
                            }}
                            className="p-1 text-rose-400 hover:text-rose-700 hover:bg-rose-50 rounded"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
