import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Store, Globe, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PlatformAnalytics: React.FC = () => {
  const { allBusinesses, categories } = useApp();
  const [period, setPeriod] = useState('30d');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Platform Growth & Business Analytics</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Aggregated geographical distribution, industry penetration, and monthly tenant velocity.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-600">
          {(['7d', '30d', '3m', '1y'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-md transition-colors ${period === p ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'hover:text-slate-900'}`}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Tenant Retention</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1 font-mono">98.4%</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Low churn across retail shops</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Avg Products / Tenant</span>
          <p className="text-2xl font-bold text-slate-900 mt-1 font-mono">84 SKUs</p>
          <p className="text-[11px] text-indigo-600 font-medium mt-0.5">Expansion velocity +18%</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Daily Active Cashiers</span>
          <p className="text-2xl font-bold text-slate-900 mt-1 font-mono">312</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Peak time: 5 PM - 9 PM</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">State Coverage</span>
          <p className="text-2xl font-bold text-indigo-700 mt-1 font-mono">14 States</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Maharashtra, Gujarat, Karnataka lead</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">State & Geographic Penetration</h3>
          <p className="text-xs text-slate-500">Registered businesses by Indian state</p>
          <div className="space-y-2.5 pt-2">
            {[
              { state: 'Maharashtra', count: 18, pct: 45 },
              { state: 'Gujarat', count: 9, pct: 22 },
              { state: 'Karnataka', count: 6, pct: 15 },
              { state: 'Delhi NCR', count: 4, pct: 10 },
              { state: 'Tamil Nadu', count: 3, pct: 8 }
            ].map(s => (
              <div key={s.state} className="space-y-1 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-800">{s.state}</span>
                  <span className="text-slate-500 font-mono">{s.count} stores ({s.pct}%)</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">Category Market Share</h3>
          <p className="text-xs text-slate-500">Distribution across commercial business domains</p>
          <div className="space-y-2.5 pt-2">
            {[
              { name: 'Grocery & FMCG Kirana', pct: 38 },
              { name: 'Clothing & Textiles', pct: 24 },
              { name: 'Retail & Supermarkets', pct: 18 },
              { name: 'Pharmacy & Wellness', pct: 12 },
              { name: 'Restaurants & Cloud Kitchens', pct: 8 }
            ].map(c => (
              <div key={c.name} className="space-y-1 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-800">{c.name}</span>
                  <span className="text-slate-500 font-mono">{c.pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
