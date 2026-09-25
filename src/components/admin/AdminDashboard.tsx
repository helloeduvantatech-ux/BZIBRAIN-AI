import React, { useState } from 'react';
import { 
  Store, 
  Users, 
  TrendingUp, 
  CreditCard, 
  PlusCircle, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Calendar,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminDashboardProps {
  onAddBusinessClick: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onAddBusinessClick }) => {
  const { allBusinesses, allUsers, categories, plans, loginAsBusiness, setActiveView } = useApp();
  const [dateFilter, setDateFilter] = useState<'today' | '7d' | '30d' | '3m' | '1y'>('30d');

  // Overview metrics
  const totalBusinesses = allBusinesses.length;
  const activeBusinesses = allBusinesses.filter(b => b.status === 'active').length;
  const suspendedBusinesses = allBusinesses.filter(b => b.status === 'suspended').length;
  const totalUsers = allUsers.length;
  const newThisMonth = allBusinesses.filter(b => {
    const d = new Date(b.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  // Platform financial aggregates
  const totalSalesProcessed = 485200; // platform aggregate
  const platformRevenue = allBusinesses.reduce((acc, b) => {
    const plan = plans.find(p => p.name === b.subscription.planName);
    return acc + (plan?.priceMonthly || 0);
  }, 0);
  const activeSubscriptions = allBusinesses.filter(b => b.subscription.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Top Welcome & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Platform Command Center</h2>
          <p className="text-xs text-slate-500 mt-1">
            EduVantaTech Master Console · Multi-tenant business management and platform analytics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Date range filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-600">
            {(['today', '7d', '30d', '3m', '1y'] as const).map(f => (
              <button
                key={f}
                onClick={() => setDateFilter(f)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  dateFilter === f ? 'bg-white text-indigo-700 font-semibold shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {f === 'today' ? 'Today' : f === '7d' ? '7D' : f === '30d' ? '30D' : f === '3m' ? '3M' : '1Y'}
              </button>
            ))}
          </div>

          <button
            onClick={onAddBusinessClick}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add New Business</span>
          </button>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Businesses */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Businesses</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">{totalBusinesses}</span>
            <span className="text-[11px] text-emerald-600 font-semibold">+{newThisMonth} this mo</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {activeBusinesses} active · {suspendedBusinesses} suspended
          </p>
        </div>

        {/* Platform Revenue */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Monthly MRR</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums font-mono">
              ₹{platformRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold">+14.2%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {activeSubscriptions} active subscriptions
          </p>
        </div>

        {/* Total Sales Processed */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Sales Processed</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums font-mono">
              ₹{totalSalesProcessed.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-blue-600 font-semibold">1,240 orders</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Across all tenant storefronts
          </p>
        </div>

        {/* Total Users */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Platform Users</span>
            <div className="p-2 bg-violet-50 text-violet-600 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">{totalUsers}</span>
            <span className="text-[11px] text-slate-500 font-medium">Owners & Staff</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            100% active account health
          </p>
        </div>
      </div>

      {/* Visual Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registration & Growth Trend (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Tenant Growth & Monthly Onboarding</h3>
              <p className="text-xs text-slate-500">Businesses registered vs platform active volume</p>
            </div>
            <span className="text-xs text-indigo-600 font-semibold">Last 6 Months</span>
          </div>

          {/* Clean CSS Bar Chart */}
          <div className="pt-4 pb-2">
            <div className="h-44 flex items-end justify-between gap-3 px-2 border-b border-slate-100">
              {[
                { month: 'Apr', count: 4, sales: '₹85K' },
                { month: 'May', count: 7, sales: '₹120K' },
                { month: 'Jun', count: 11, sales: '₹195K' },
                { month: 'Jul', count: 16, sales: '₹260K' },
                { month: 'Aug', count: 22, sales: '₹370K' },
                { month: 'Sep', count: totalBusinesses + 8, sales: '₹485K' }
              ].map((item, idx) => {
                const heightPct = Math.min(100, Math.max(15, (item.count / 30) * 100));
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <div className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                      {item.sales}
                    </div>
                    <div 
                      className={`w-full max-w-[42px] rounded-t-md transition-all duration-300 ${
                        idx === 5 ? 'bg-indigo-600' : 'bg-slate-200 group-hover:bg-indigo-400'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="text-[11px] font-medium text-slate-600">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-indigo-600 rounded-sm"></span>
              <span>Active Tenant Growth</span>
            </div>
            <span>Average onboarding velocity: 4.8 stores/month</span>
          </div>
        </div>

        {/* Category & Plan Distribution (1 Col) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Industry Distribution</h3>
            <p className="text-xs text-slate-500">Breakdown of registered business domains</p>
          </div>

          <div className="space-y-3 py-2">
            {[
              { cat: 'Grocery & FMCG', count: 8, pct: 36, color: 'bg-emerald-500' },
              { cat: 'Apparel & Clothing', count: 5, pct: 23, color: 'bg-indigo-500' },
              { cat: 'Retail Merchandise', count: 4, pct: 18, color: 'bg-blue-500' },
              { cat: 'Pharmacy & Wellness', count: 3, pct: 14, color: 'bg-amber-500' },
              { cat: 'Restaurants & Cafe', count: 2, pct: 9, color: 'bg-rose-500' }
            ].map(c => (
              <div key={c.cat} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{c.cat}</span>
                  <span className="text-slate-400 tabular-nums font-mono">{c.count} stores ({c.pct}%)</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveView('admin-categories')}
            className="w-full text-center py-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/50 rounded-lg transition-colors"
          >
            Manage Categories & Tax Slabs →
          </button>
        </div>
      </div>

      {/* Businesses Table (Recent Tenants) */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 sm:px-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Registered Businesses</h3>
            <p className="text-xs text-slate-500">Live operational status and administrative actions</p>
          </div>
          <button
            onClick={() => setActiveView('admin-businesses')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            View All ({totalBusinesses}) →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Business ID</th>
                <th className="py-3 px-4">Store Name</th>
                <th className="py-3 px-4">Owner</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allBusinesses.map(biz => (
                <tr key={biz.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-600">{biz.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{biz.name}</p>
                    <p className="text-[11px] text-slate-500">{biz.businessType}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-slate-800">{biz.ownerName}</p>
                    <p className="text-[11px] text-slate-400">{biz.ownerEmail}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{biz.category}</td>
                  <td className="py-3 px-4 text-slate-600">{biz.location.city}, {biz.location.state}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-indigo-700">{biz.subscription.planName}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 font-medium capitalize ${
                      biz.status === 'active' ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        biz.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`} />
                      {biz.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => loginAsBusiness(biz.id)}
                      className="px-2.5 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors whitespace-nowrap"
                      title="Super Admin secure impersonation"
                    >
                      Login As Owner →
                    </button>
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
