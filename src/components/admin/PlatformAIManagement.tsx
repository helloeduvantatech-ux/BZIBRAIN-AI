import React from 'react';
import { Sparkles, Activity, Clock, CheckCircle2, AlertTriangle, Zap, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PlatformAIManagement: React.FC = () => {
  const { allBusinesses } = useApp();

  const totalRequests = 14850;
  const requestsToday = 482;
  const requestsThisMonth = 3890;
  const avgResponseTimeMs = 412;
  const successRate = 99.8;
  const failedRequests = 7;

  const topQuestions = [
    { question: 'Which products should I restock this week?', count: 1840, category: 'Inventory' },
    { question: 'What are my best-selling products by revenue?', count: 1420, category: 'Sales' },
    { question: 'Give me today\'s business summary.', count: 1290, category: 'Overview' },
    { question: 'Where am I spending too much on expenses?', count: 960, category: 'Expenses' },
    { question: 'What products are not selling or slow moving?', count: 810, category: 'Inventory' },
    { question: 'How is my business performing this month vs last?', count: 740, category: 'Profit' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Platform AI Management & Telemetry</h2>
            <p className="text-xs text-slate-500">
              Aggregated system metrics for EduVanta BizBrain AI co-pilot queries across all tenants.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total AI Queries</span>
            <Activity className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">{totalRequests.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Platform-wide cumulative</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Queries Today</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">{requestsToday.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400 mt-1">Peak: 11:00 AM - 02:00 PM</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Avg Response Latency</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">{avgResponseTimeMs} ms</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Sub-second generation</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Success Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">{successRate}%</p>
          <p className="text-[11px] text-slate-400 mt-1">{failedRequests} failures (fallback caught)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Common Questions */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Most Frequent Merchant Prompts</h3>
            <p className="text-xs text-slate-500">Top analytical questions asked to BizBrain AI</p>
          </div>

          <div className="space-y-3">
            {topQuestions.map((q, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-xs">
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-slate-800 truncate">&quot;{q.question}&quot;</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                    {q.category}
                  </span>
                  <span className="font-mono font-bold text-slate-900">{q.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Usage by Business */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">AI Quota Utilization by Store</h3>
            <p className="text-xs text-slate-500">Tenant consumption vs allocated monthly quota</p>
          </div>

          <div className="space-y-3">
            {allBusinesses.map(b => {
              const used = b.subscription.aiRequestsUsed;
              const limit = b.subscription.aiRequestsLimit;
              const pct = Math.min(100, Math.round((used / limit) * 100));

              return (
                <div key={b.id} className="p-3 border border-slate-100 rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900">{b.name}</span>
                    <span className="font-mono text-slate-500 text-[11px]">
                      {used} / {limit} queries ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${pct > 85 ? 'bg-amber-500' : 'bg-indigo-600'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
