import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShoppingCart, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  FileSpreadsheet, 
  Users, 
  HelpCircle,
  Store,
  ChevronRight,
  Phone,
  Mail,
  Zap,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LandingPageProps {
  onStartBusiness: () => void;
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartBusiness, onEnterApp }) => {
  const { switchRole, plans, categories, platformSettings } = useApp();
  const [selectedPlanTab, setSelectedPlanTab] = useState<'monthly' | 'annual'>('monthly');

  const heroImage = '/src/assets/images/hero_bizbrain_retail_1790334435878.jpg';
  const avatarImage = '/src/assets/images/avatar_biz_owner_1790334449601.jpg';
  const storeImage = '/src/assets/images/demomart_store_1790334464106.jpg';

  const handleLaunchDemoMart = () => {
    switchRole('business_owner');
    onEnterApp();
  };

  const handleLaunchAdmin = () => {
    switchRole('super_admin');
    onEnterApp();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Contract (Wordmark, Nav links, Action) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Wordmark (Single text element) */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-base shadow-xs">
              {(platformSettings.platformName || 'E').charAt(0)}
            </div>
            <a href="#" className="text-base font-bold tracking-tight text-slate-900">
              {platformSettings.platformName || 'EduVanta BizBrain AI'}
            </a>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#ai-co-pilot" className="hover:text-slate-900 transition-colors">BizBrain AI</a>
            <a href="#categories" className="hover:text-slate-900 transition-colors">Industries</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </nav>

          {/* Primary Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleLaunchDemoMart}
              className="px-3 py-1.5 border border-slate-300 hover:border-slate-400 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              DemoMart Live Demo
            </button>
            <button
              onClick={onStartBusiness}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
            >
              Start Your Business →
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200/80 rounded-full text-xs font-semibold text-indigo-800">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Next-Gen Operating OS by EduVantaTech</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight text-balance">
                Run your business smarter with <span className="text-indigo-600">BizBrain AI</span>.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                Manage sales, inventory, expenses and customers — while AI turns your business data into clear, actionable insights without guesswork.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onStartBusiness}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Start Your Business</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={handleLaunchDemoMart}
                  className="px-6 py-3 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore DemoMart (Live Store)</span>
                </button>
              </div>

              {/* Social Proof / Indian SME markers */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>GST Ready & Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Instant UPI POS Billing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Strict Data Isolation</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual / Live App Screenshot Artifact (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
                <img
                  src={heroImage}
                  alt="EduVanta BizBrain AI Store Owner"
                  className="w-full h-auto object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                  }}
                />
                
                {/* Floating Metric Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200/80 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        ₹
                      </div>
                      <span className="font-bold text-slate-900">Today&apos;s Store Performance</span>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-bold">+18.4%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-mono">
                    ₹12,450 Sales · 27 Orders · Estimated Profit ₹9,250
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              The BizBrain Formula
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Business Data → AI Analysis → Clear Insights → Practical Actions
            </p>
            <p className="text-xs sm:text-sm text-slate-500">
              Unlike generic chat bots, BizBrain AI is directly connected to your live product stocks, counter bills, and expense ledger.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            {[
              {
                step: '01',
                title: 'Business Data',
                desc: 'Your team records counter sales on POS, logs stock movements, and enters operating expenses.',
                icon: ShoppingCart
              },
              {
                step: '02',
                title: 'AI Analysis',
                desc: 'BizBrain AI continuously calculates inventory velocities, customer frequency, and margin shifts.',
                icon: Sparkles
              },
              {
                step: '03',
                title: 'Clear Insights',
                desc: 'Get structured answers: Insight + Supporting Numerical Evidence + Probable commercial reason.',
                icon: TrendingUp
              },
              {
                step: '04',
                title: 'Practical Actions',
                desc: 'Direct recommendations: reorder from distributor, mark clearance discount, or rebalance cash flows.',
                icon: CheckCircle2
              }
            ].map(card => {
              const Icon = card.icon;
              return (
                <div key={card.step} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-600 text-sm">{card.step}</span>
                    <Icon className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section id="features" className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Built for Indian Small & Medium Retail
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              A Complete Business Operating System
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Lightning Fast POS Billing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Search or barcode scan products, apply percentage discounts, auto-calculate GST tax slabs, and accept UPI / Cash with printable receipts.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Live Stock & Movement Ledger</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatic inventory deductions upon checkout. Log damaged packaging, distributor arrivals, and receive proactive low-stock warnings.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Profit Estimation & Ledgers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real-time formula: Sales Revenue - Operating Expenses = Estimated Net Operating Profit. Clearly distinguished facts from accounting estimates.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Customer Loyalty & CRM</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track repeat customers, total spend, and contact numbers. Easily identify VIP patrons vs inactive accounts needing festive discount reminders.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">BizBrain AI Co-Pilot</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated business advisor delivering structured insights on sales slowdowns, fast sellers, restock priority lists, and expense spikes.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Audit Reports & CSV Export</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Export 6 reports: Sales, Products, Inventory Valuation, Expenses, Estimated Profit, and Customer spending records in one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI CO-PILOT SPOTLIGHT SECTION */}
      <section id="ai-co-pilot" className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 font-semibold text-xs rounded-full">
                Strict Fact Grounding
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Not a generic chat bot. <br />A real store operating brain.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                BizBrain AI never fabricates numbers or guesses. It analyzes your store&apos;s real database and responds in a strict 4-point format:
              </p>
              
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                  <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px]">Insight</span>
                  <p className="text-white mt-0.5">Product X sales increased 52% this week.</p>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Evidence</span>
                  <p className="text-slate-300 mt-0.5 font-mono">32 units sold compared with 21 last week (₹8,160 revenue).</p>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">Possible Reason</span>
                  <p className="text-slate-300 mt-0.5">Competitive price point and weekend festival demand surge.</p>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Recommended Action</span>
                  <p className="text-white mt-0.5 font-semibold">Review current stock (currently 8 units left) and place distributor restock order today.</p>
                </div>
              </div>
            </div>

            {/* Visual Demo Box */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold text-xs text-white">BizBrain Live Advisor Mockup</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold font-mono">ONLINE · ISOLATED</span>
              </div>
              <div className="p-3 bg-indigo-600/30 rounded-lg text-xs text-indigo-100 font-medium">
                Merchant asked: &quot;Which products should I restock immediately?&quot;
              </div>
              <div className="p-4 bg-slate-900/80 rounded-lg text-xs space-y-2 border border-slate-700/80">
                <p className="font-semibold text-white">
                  &quot;Britannia Good Day (2 packs left) and Dettol Soap (4 packs left) are below safety threshold.&quot;
                </p>
                <p className="text-slate-400 font-mono text-[11px]">
                  Estimated zero-stock arrival: Tomorrow 04:00 PM based on past 7-day velocity.
                </p>
              </div>
              <button
                onClick={handleLaunchDemoMart}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Test BizBrain AI on DemoMart →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Transparent Indian SaaS Pricing
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Plans Scaled to Your Business Size
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {plans.map(p => (
              <div 
                key={p.id}
                className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  p.isPopular ? 'border-indigo-600 ring-2 ring-indigo-600 shadow-lg' : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">{p.displayName}</h3>
                    {p.isPopular && (
                      <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-950 font-mono">
                      {p.priceMonthly === 0 ? 'Free' : `₹${p.priceMonthly.toLocaleString('en-IN')}`}
                    </span>
                    {p.priceMonthly > 0 && <span className="text-xs text-slate-500">/mo</span>}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{p.description}</p>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1 text-xs text-slate-600 font-medium">
                    <p>• Up to <strong className="text-slate-900 font-mono">{p.maxProducts.toLocaleString()}</strong> Products</p>
                    <p>• <strong className="text-slate-900 font-mono">{p.maxUsers}</strong> Team Accounts</p>
                    <p>• <strong className="text-indigo-600 font-mono">{p.aiRequestsMonthly}</strong> AI Queries/mo</p>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    {p.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={onStartBusiness}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
                      p.isPopular 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    Select {p.name} Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">FAQ</h2>
            <p className="text-2xl font-extrabold text-slate-950">Common Questions from Business Owners</p>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-4 space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">Can I manage my store on an Android smartphone?</h3>
              <p className="text-slate-600 leading-relaxed">
                Yes! EduVanta BizBrain AI is mobile-first. Small business owners can open the POS counter, review today&apos;s profit, and chat with the AI advisor directly on their phone screen.
              </p>
            </div>
            <div className="py-4 space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">Can my cashier staff see overall shop profits or owner settings?</h3>
              <p className="text-slate-600 leading-relaxed">
                No. The Staff role is strictly restricted to recording sales, checking stock, and viewing assigned orders. They cannot see expenses, net profit, or platform configurations.
              </p>
            </div>
            <div className="py-4 space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">Can I switch between DemoMart and other accounts?</h3>
              <p className="text-slate-600 leading-relaxed">
                Yes. The top bar has a live persona switcher where you can toggle between Super Admin, DemoMart Owner, or Store Cashier in one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                {(platformSettings.platformName || 'E').charAt(0)}
              </div>
              <span className="font-bold text-white text-sm">{platformSettings.platformName}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Developed by {platformSettings.brandTagline} · Empowering Small & Medium Enterprises.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button onClick={handleLaunchAdmin} className="text-slate-400 hover:text-white">
              Super Admin Console
            </button>
            <span>·</span>
            <button onClick={handleLaunchDemoMart} className="text-slate-400 hover:text-white">
              DemoMart Store
            </button>
            <span>·</span>
            <a href="#pricing" className="text-slate-400 hover:text-white">Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
