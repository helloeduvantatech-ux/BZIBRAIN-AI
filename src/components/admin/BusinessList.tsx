import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  Filter, 
  PlusCircle, 
  ExternalLink, 
  MoreVertical, 
  ShieldAlert, 
  CheckCircle2, 
  Trash2, 
  LogIn, 
  BarChart2, 
  Edit3,
  MapPin,
  Clock,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Business } from '../../types';

interface BusinessListProps {
  onAddBusinessClick: () => void;
}

export const BusinessList: React.FC<BusinessListProps> = ({ onAddBusinessClick }) => {
  const { 
    allBusinesses, 
    categories, 
    plans, 
    toggleBusinessStatus, 
    deleteBusiness, 
    loginAsBusiness, 
    updateBusiness 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Detail / Edit modal state
  const [inspectingBiz, setInspectingBiz] = useState<Business | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);

  // Filter logic
  const filteredBusinesses = allBusinesses.filter(biz => {
    const matchesSearch = 
      biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      biz.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      biz.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      biz.location.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = selectedCategory === 'all' || biz.category === selectedCategory;
    const matchesPlan = selectedPlan === 'all' || biz.subscription.planName === selectedPlan;
    const matchesStatus = selectedStatus === 'all' || biz.status === selectedStatus;

    return matchesSearch && matchesCat && matchesPlan && matchesStatus;
  });

  const handleStartEdit = (biz: Business) => {
    setEditForm({
      name: biz.name,
      category: biz.category,
      ownerName: biz.ownerName,
      ownerEmail: biz.ownerEmail,
      ownerPhone: biz.ownerPhone,
      city: biz.location.city,
      state: biz.location.state
    });
    setInspectingBiz(biz);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!inspectingBiz || !editForm) return;
    updateBusiness(inspectingBiz.id, {
      name: editForm.name,
      category: editForm.category,
      ownerName: editForm.ownerName,
      ownerEmail: editForm.ownerEmail,
      ownerPhone: editForm.ownerPhone,
      location: {
        ...inspectingBiz.location,
        city: editForm.city,
        state: editForm.state
      }
    });
    setIsEditing(false);
    setInspectingBiz(null);
  };

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Businesses Directory</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage all tenant organizations, plans, operational statuses, and secure admin access.
          </p>
        </div>
        <button
          onClick={onAddBusinessClick}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add New Business</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by store name, ID, owner, or city..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Plan Filter */}
          <div>
            <select
              value={selectedPlan}
              onChange={e => setSelectedPlan(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
            >
              <option value="all">All Plans</option>
              {plans.map(p => (
                <option key={p.id} value={p.name}>{p.displayName}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="suspended">Suspended</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Showing <strong>{filteredBusinesses.length}</strong> of {allBusinesses.length} businesses</span>
          {(searchTerm || selectedCategory !== 'all' || selectedPlan !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedPlan('all');
                setSelectedStatus('all');
              }}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Businesses Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Business ID</th>
                <th className="py-3 px-4">Business Name</th>
                <th className="py-3 px-4">Owner Info</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Plan & Quota</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBusinesses.map(biz => (
                <tr key={biz.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-600">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">{biz.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-900">{biz.name}</span>
                      {biz.isDemo && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1 rounded">DEMO</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">{biz.businessType}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-slate-800">{biz.ownerName}</p>
                    <p className="text-[11px] text-slate-400">{biz.ownerPhone}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{biz.category}</td>
                  <td className="py-3 px-4 text-slate-600">
                    {biz.location.city}, {biz.location.state}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-indigo-700">{biz.subscription.planName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {biz.subscription.aiRequestsUsed}/{biz.subscription.aiRequestsLimit} AI
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 font-medium capitalize ${
                      biz.status === 'active' ? 'text-emerald-700' :
                      biz.status === 'suspended' ? 'text-rose-700' :
                      'text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        biz.status === 'active' ? 'bg-emerald-500' :
                        biz.status === 'suspended' ? 'bg-rose-500' :
                        'bg-amber-500'
                      }`} />
                      {biz.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    {new Date(biz.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Secure Login As Button */}
                      <button
                        onClick={() => loginAsBusiness(biz.id)}
                        className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded text-[11px] transition-colors flex items-center gap-1"
                        title="Login as Business Owner"
                      >
                        <LogIn className="w-3 h-3" />
                        <span>Login As</span>
                      </button>

                      {/* View details */}
                      <button
                        onClick={() => { setInspectingBiz(biz); setIsEditing(false); }}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                        title="View details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => handleStartEdit(biz)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                        title="Edit business"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Suspend or Activate toggle */}
                      {biz.status === 'active' ? (
                        <button
                          onClick={() => {
                            if (window.confirm(`Suspend ${biz.name}? Users won't be able to process sales.`)) {
                              toggleBusinessStatus(biz.id, 'suspended');
                            }
                          }}
                          className="p-1 text-amber-500 hover:text-amber-700 hover:bg-amber-50 rounded"
                          title="Suspend business"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleBusinessStatus(biz.id, 'active')}
                          className="p-1 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 rounded"
                          title="Activate business"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${biz.name}? This will remove all tenant records.`)) {
                            deleteBusiness(biz.id);
                          }
                        }}
                        className="p-1 text-rose-400 hover:text-rose-700 hover:bg-rose-50 rounded"
                        title="Delete business"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBusinesses.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                    No businesses match the specified filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect / Edit Modal */}
      {inspectingBiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden text-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">
                {isEditing ? `Edit ${inspectingBiz.name}` : inspectingBiz.name}
              </h3>
              <button 
                onClick={() => setInspectingBiz(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Business Name</label>
                    <input 
                      type="text"
                      value={editForm.name}
                      onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Owner Name</label>
                      <input 
                        type="text"
                        value={editForm.ownerName}
                        onChange={e => setEditForm({ ...editForm, ownerName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Owner Phone</label>
                      <input 
                        type="tel"
                        value={editForm.ownerPhone}
                        onChange={e => setEditForm({ ...editForm, ownerPhone: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">City</label>
                      <input 
                        type="text"
                        value={editForm.city}
                        onChange={e => setEditForm({ ...editForm, city: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">State</label>
                      <input 
                        type="text"
                        value={editForm.state}
                        onChange={e => setEditForm({ ...editForm, state: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Business ID</p>
                      <p className="font-mono font-bold text-slate-900">{inspectingBiz.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Category</p>
                      <p className="font-semibold text-slate-800">{inspectingBiz.category}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Owner</p>
                      <p className="text-slate-800">{inspectingBiz.ownerName} ({inspectingBiz.ownerEmail})</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Location</p>
                      <p className="text-slate-800">{inspectingBiz.location.address}, {inspectingBiz.location.city}, {inspectingBiz.location.state} - {inspectingBiz.location.pincode}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Plan</p>
                      <p className="font-semibold text-indigo-600">{inspectingBiz.subscription.planName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">AI Quota</p>
                      <p className="font-mono text-slate-800">{inspectingBiz.subscription.aiRequestsUsed}/{inspectingBiz.subscription.aiRequestsLimit}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Tax System</p>
                      <p className="font-mono text-slate-800">{inspectingBiz.settings.taxSystem} ({inspectingBiz.settings.defaultTaxPercentage}%)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded-md font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-1.5 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => loginAsBusiness(inspectingBiz.id)}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Login as Owner</span>
                  </button>
                  <button
                    onClick={() => setInspectingBiz(null)}
                    className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded-md font-medium"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
