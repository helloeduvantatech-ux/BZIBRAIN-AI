import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Lightbulb, 
  ShieldCheck, 
  ArrowRight, 
  TrendingDown,
  TrendingUp,
  Package,
  Receipt,
  DollarSign,
  Users,
  Clock,
  Truck,
  Percent,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIMessage } from '../../types';

interface PresetQuestion {
  id: string;
  label: string;
  category: 'Sales' | 'Inventory' | 'Expenses' | 'Profit' | 'Customers' | 'Strategy';
  icon: any;
  contextHint: string;
}

export const BizBrainAI: React.FC = () => {
  const { currentBusiness, askBizBrainAI } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');

  const [conversation, setConversation] = useState<AIMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      content: `Welcome to BizBrain AI! I am continuously monitoring your sales transactions, inventory velocities, customer orders, and expenses for ${currentBusiness?.name}. Select any analytical question below or type your custom inquiry.`,
      insight: `Store operating analysis initialized for ${currentBusiness?.name}.`,
      evidence: `Direct database connection active across 15 products, 50 sales, and 20 expense vouchers. Zero cross-tenant data leakage.`,
      possibleReason: `Real-time analytical telemetry synchronization.`,
      recommendedAction: `Tap any recommended business query below to evaluate store margins, restock priority, or profit leaks.`,
      timestamp: new Date().toISOString()
    }
  ]);

  // 14 Pre-defined insightful questions covering common challenges & opportunities
  const presetQuestions: PresetQuestion[] = [
    {
      id: 'q1',
      label: 'What are my top 5 performing products this month?',
      category: 'Sales',
      icon: TrendingUp,
      contextHint: 'Evaluates units sold & gross revenue contribution'
    },
    {
      id: 'q2',
      label: 'Analyze my expense categories for potential savings.',
      category: 'Expenses',
      icon: Receipt,
      contextHint: 'Breaks down rent, energy, and transport outflows'
    },
    {
      id: 'q3',
      label: 'Provide a summary of my business performance over the last quarter.',
      category: 'Profit',
      icon: Calendar,
      contextHint: 'Consolidated quarterly sales, cash flows, and margins'
    },
    {
      id: 'q4',
      label: 'Which products are at critical risk of stockout?',
      category: 'Inventory',
      icon: Package,
      contextHint: 'Identifies items below safety buffers with distributor lead times'
    },
    {
      id: 'q5',
      label: 'Why are my sales decreasing or fluctuating?',
      category: 'Sales',
      icon: TrendingDown,
      contextHint: 'Uncovers footfall patterns, weekday dips, or basket size shifts'
    },
    {
      id: 'q6',
      label: 'What products are slow-moving and tying up working capital?',
      category: 'Inventory',
      icon: Layers,
      contextHint: 'Highlights dead stock with low 30-day velocity'
    },
    {
      id: 'q7',
      label: 'How healthy is my current operating profit margin?',
      category: 'Profit',
      icon: DollarSign,
      contextHint: 'Compares gross markup vs fixed overhead expenses'
    },
    {
      id: 'q8',
      label: 'Which customers are my top revenue contributors (VIPs)?',
      category: 'Customers',
      icon: Users,
      contextHint: 'Ranks top 10% patrons for WhatsApp loyalty offers'
    },
    {
      id: 'q9',
      label: 'How does today\'s counter performance compare to my 7-day average?',
      category: 'Sales',
      icon: Clock,
      contextHint: 'Benchmarks today\'s revenue vs rolling 7-day baseline'
    },
    {
      id: 'q10',
      label: 'What are my highest supplier credit liabilities due soon?',
      category: 'Expenses',
      icon: Truck,
      contextHint: 'Tracks distributor balances across Net 15/30 payment terms'
    },
    {
      id: 'q11',
      label: 'What are my best margin items vs lowest margin staples?',
      category: 'Strategy',
      icon: Percent,
      contextHint: 'Calculates markup percentage differences across categories'
    },
    {
      id: 'q12',
      label: 'Suggest a weekend promotional bundle to clear stagnant inventory.',
      category: 'Strategy',
      icon: Lightbulb,
      contextHint: 'Pairs slow-movers with high-velocity staples'
    },
    {
      id: 'q13',
      label: 'Give me today\'s actionable daily business briefing.',
      category: 'Profit',
      icon: Sparkles,
      contextHint: '3 immediate operational actions for today\'s shift'
    },
    {
      id: 'q14',
      label: 'What can I improve across store operations this week?',
      category: 'Strategy',
      icon: Lightbulb,
      contextHint: 'Cashier checkout speed, restock schedules, and expense audits'
    }
  ];

  const categories = ['all', 'Sales', 'Inventory', 'Expenses', 'Profit', 'Customers', 'Strategy'];

  const filteredPresets = presetQuestions.filter(q => 
    selectedCategoryTab === 'all' || q.category === selectedCategoryTab
  );

  const handleSend = async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim() || isLoading) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: q,
      timestamp: new Date().toISOString()
    };

    setConversation(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const responseMsg = await askBizBrainAI(q);
      setConversation(prev => [...prev, responseMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Dedicated Header: Title & Subtitle */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>BizBrain AI</span>
                <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                  CO-PILOT
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Your intelligent business co-pilot · Grounded in real-time store figures for <strong>{currentBusiness?.name}</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Multi-Tenant Data Isolated</span>
          </div>
        </div>

        {/* Category Tabs for Pre-defined Questions */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2 mb-3">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Explore Merchant Inquiries (14 Pre-defined Analytical Questions)
            </p>
            <span className="text-[11px] text-indigo-600 font-semibold hidden sm:inline">
              Click any question to analyze live data
            </span>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryTab(cat)}
                className={`px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors capitalize ${
                  selectedCategoryTab === cat
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Questions (14)' : cat}
              </button>
            ))}
          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
            {filteredPresets.map(q => {
              const Icon = q.icon;
              return (
                <button
                  key={q.id}
                  onClick={() => handleSend(q.label)}
                  disabled={isLoading}
                  className="text-left p-3 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-indigo-50/60 hover:border-indigo-300 transition-all text-xs text-slate-800 hover:text-indigo-950 flex flex-col justify-between group active:scale-99"
                >
                  <div className="flex items-start gap-2">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 leading-snug">&quot;{q.label}&quot;</p>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{q.contextHint}</p>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px]">
                    <span className="text-indigo-600 font-medium">{q.category}</span>
                    <span className="text-slate-400 group-hover:text-indigo-600 font-semibold flex items-center gap-0.5">
                      Analyze →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Structured Conversational Stream */}
      <div className="space-y-4">
        {conversation.map(msg => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-xl bg-indigo-600 text-white p-3.5 rounded-2xl rounded-tr-xs shadow-xs text-xs font-medium">
                  <p className="leading-relaxed">{msg.content}</p>
                  <p className="text-[10px] text-indigo-200 text-right mt-1 font-mono">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          }

          // Structured AI Response: Insight, Evidence, Possible Reason, Recommended Action
          return (
            <div key={msg.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs">BizBrain Analysis</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* 4 Structured Cards */}
              <div className="space-y-3 text-xs">
                {/* 1. INSIGHT */}
                <div className="p-3.5 bg-indigo-50/60 rounded-lg border-l-4 border-indigo-600">
                  <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider">Insight</p>
                  <p className="text-slate-900 font-semibold mt-0.5 leading-relaxed text-[13px]">{msg.insight || msg.content}</p>
                </div>

                {/* 2. EVIDENCE */}
                {msg.evidence && (
                  <div className="p-3.5 bg-slate-50 rounded-lg border-l-4 border-slate-400">
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Evidence (Direct Store Data)</p>
                    <p className="text-slate-800 mt-0.5 font-mono leading-relaxed">{msg.evidence}</p>
                  </div>
                )}

                {/* 3. POSSIBLE REASON */}
                {msg.possibleReason && (
                  <div className="p-3.5 bg-amber-50/40 rounded-lg border-l-4 border-amber-500">
                    <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Possible Reason</p>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">{msg.possibleReason}</p>
                  </div>
                )}

                {/* 4. RECOMMENDED ACTION */}
                {msg.recommendedAction && (
                  <div className="p-3.5 bg-emerald-50/70 rounded-lg border-l-4 border-emerald-600">
                    <p className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">Recommended Action</p>
                    <p className="text-emerald-950 font-semibold mt-0.5 leading-relaxed">{msg.recommendedAction}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-center gap-3 text-xs text-slate-600">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span>BizBrain AI is synthesizing your sales invoices, stock levels, and expense vouchers...</span>
          </div>
        )}
      </div>

      {/* Query Input Box */}
      <div className="sticky bottom-16 lg:bottom-4 bg-white p-3 rounded-xl border border-slate-300 shadow-lg">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask anything about sales, expenses, top products, or inventory restocking..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-3.5 py-2.5 text-xs text-slate-900 bg-transparent focus:outline-hidden"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
