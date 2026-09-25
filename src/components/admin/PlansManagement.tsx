import React, { useState } from 'react';
import { CreditCard, Check, Sliders, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SubscriptionPlan } from '../../types';

export const PlansManagement: React.FC = () => {
  const { plans, updatePlan } = useApp();
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<SubscriptionPlan>>({});

  const handleStartEdit = (plan: SubscriptionPlan) => {
    setEditingPlanId(plan.id);
    setEditForm({
      priceMonthly: plan.priceMonthly,
      priceAnnual: plan.priceAnnual,
      maxUsers: plan.maxUsers,
      maxProducts: plan.maxProducts,
      aiRequestsMonthly: plan.aiRequestsMonthly,
      description: plan.description
    });
  };

  const handleSave = (id: string) => {
    updatePlan(id, editForm);
    setEditingPlanId(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Subscription Plans & Feature Limits</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure tier pricing, user capacities, catalog caps, and BizBrain AI monthly quotas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map(plan => {
          const isEditing = editingPlanId === plan.id;
          return (
            <div 
              key={plan.id}
              className={`bg-white rounded-xl border p-5 flex flex-col justify-between transition-all ${
                plan.isPopular ? 'border-indigo-600 ring-1 ring-indigo-600 shadow-sm' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{plan.displayName}</h3>
                  {plan.isPopular && (
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
                      POPULAR
                    </span>
                  )}
                </div>

                {isEditing ? (
                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-500 block">Monthly Price (₹)</label>
                      <input
                        type="number"
                        value={editForm.priceMonthly}
                        onChange={e => setEditForm({ ...editForm, priceMonthly: Number(e.target.value) })}
                        className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block">Annual Price (₹)</label>
                      <input
                        type="number"
                        value={editForm.priceAnnual}
                        onChange={e => setEditForm({ ...editForm, priceAnnual: Number(e.target.value) })}
                        className="w-full px-2 py-1 border border-slate-300 rounded font-mono"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      {plan.priceMonthly === 0 ? 'Free' : `₹${plan.priceMonthly.toLocaleString('en-IN')}`}
                    </span>
                    {plan.priceMonthly > 0 && <span className="text-xs text-slate-400">/month</span>}
                  </div>
                )}

                <p className="text-xs text-slate-500 mt-2">{plan.description}</p>

                {/* Quota specs */}
                <div className="mt-4 p-3 bg-slate-50 rounded-lg space-y-2 text-xs border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Max Products</span>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.maxProducts}
                        onChange={e => setEditForm({ ...editForm, maxProducts: Number(e.target.value) })}
                        className="w-20 px-1 py-0.5 border border-slate-300 rounded text-right font-mono"
                      />
                    ) : (
                      <span className="font-bold text-slate-900 font-mono">{plan.maxProducts.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Team Accounts</span>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.maxUsers}
                        onChange={e => setEditForm({ ...editForm, maxUsers: Number(e.target.value) })}
                        className="w-20 px-1 py-0.5 border border-slate-300 rounded text-right font-mono"
                      />
                    ) : (
                      <span className="font-bold text-slate-900 font-mono">{plan.maxUsers} Users</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">AI Queries / mo</span>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.aiRequestsMonthly}
                        onChange={e => setEditForm({ ...editForm, aiRequestsMonthly: Number(e.target.value) })}
                        className="w-20 px-1 py-0.5 border border-slate-300 rounded text-right font-mono text-indigo-600"
                      />
                    ) : (
                      <span className="font-bold text-indigo-600 font-mono">{plan.aiRequestsMonthly} req</span>
                    )}
                  </div>
                </div>

                {/* Features checklist */}
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSave(plan.id)}
                      className="flex-1 py-1.5 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingPlanId(null)}
                      className="px-3 py-1.5 border border-slate-300 rounded text-xs text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartEdit(plan)}
                    className="w-full py-1.5 border border-slate-200 hover:border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5 text-slate-400" />
                    <span>Edit Tier Parameters</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
