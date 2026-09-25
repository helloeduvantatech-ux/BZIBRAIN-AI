import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  ShoppingCart, 
  PackageCheck, 
  Boxes, 
  Layers, 
  Users, 
  Truck, 
  Receipt, 
  UserCheck, 
  CreditCard, 
  FileSpreadsheet, 
  Bell, 
  Settings, 
  HelpCircle,
  Store,
  Tag,
  BarChart3,
  ShieldCheck,
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  highlight?: boolean;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  onAddBusinessClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAddBusinessClick }) => {
  const { 
    currentUser, 
    currentBusiness, 
    activeView, 
    setActiveView, 
    notifications,
    platformSettings
  } = useApp();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Super Admin Navigation
  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'admin-businesses', label: 'Businesses', icon: Store },
    { id: 'admin-users', label: 'Platform Users', icon: Users },
    { id: 'admin-plans', label: 'Plans & Subscriptions', icon: CreditCard },
    { id: 'admin-categories', label: 'Business Categories', icon: Tag },
    { id: 'admin-analytics', label: 'Platform Analytics', icon: BarChart3 },
    { id: 'admin-ai', label: 'AI Management', icon: Sparkles },
    { id: 'admin-activity', label: 'System Activity', icon: ShieldCheck },
    { id: 'admin-settings', label: 'Admin Settings', icon: Settings },
  ];

  // Business Owner Navigation
  const ownerNavSections: NavSection[] = [
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'ai-advisor', label: 'BizBrain AI Advisor', icon: Sparkles, highlight: true },
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: 'sales', label: 'Sales (POS)', icon: ShoppingCart },
        { id: 'orders', label: 'Orders', icon: PackageCheck },
        { id: 'products', label: 'Products', icon: Boxes },
        { id: 'inventory', label: 'Inventory', icon: Layers },
      ]
    },
    {
      title: 'RELATIONSHIPS',
      items: [
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'suppliers', label: 'Suppliers', icon: Truck },
        { id: 'employees', label: 'Employees', icon: UserCheck },
      ]
    },
    {
      title: 'FINANCE & REPORTS',
      items: [
        { id: 'expenses', label: 'Expenses', icon: Receipt },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
      ]
    },
    {
      title: 'PREFERENCES',
      items: [
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
        { id: 'settings', label: 'Business Settings', icon: Settings },
        { id: 'help', label: 'Help & Support', icon: HelpCircle },
      ]
    }
  ];

  // Staff Navigation
  const staffNavItems = [
    { id: 'sales', label: 'Sales (POS)', icon: ShoppingCart },
    { id: 'products', label: 'Products Catalog', icon: Boxes },
    { id: 'inventory', label: 'Inventory Movements', icon: Layers },
    { id: 'orders', label: 'Assigned Orders', icon: PackageCheck },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 h-screen sticky top-0 border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800">
        <div 
          onClick={() => setActiveView(currentUser.role === 'super_admin' ? 'admin-dashboard' : 'dashboard')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black text-lg shadow-sm">
            {(platformSettings.platformName || 'E').charAt(0)}
          </div>
          <div className="truncate">
            <h1 className="text-sm font-bold text-white tracking-tight leading-tight truncate">
              {platformSettings.platformName || 'EduVanta BizBrain'}
            </h1>
            <p className="text-[10px] text-indigo-400 font-medium tracking-wider uppercase truncate">
              {platformSettings.brandTagline || 'by EduVantaTech'}
            </p>
          </div>
        </div>

        {/* Business Selector Pill or Admin Tag */}
        <div className="mt-3.5 p-2 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center justify-between">
          <div className="truncate">
            <p className="text-[11px] font-semibold text-slate-200 truncate">
              {currentUser.role === 'super_admin' ? 'Super Admin Console' : (currentBusiness?.name || 'My Store')}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {currentUser.role === 'super_admin' 
                ? 'All Tenants Access' 
                : `${currentBusiness?.category || 'Retail'} · ${currentBusiness?.subscription.planName || 'Free'} Plan`}
            </p>
          </div>
          {currentBusiness?.isDemo && currentUser.role !== 'super_admin' && (
            <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-1.5 py-0.5 rounded">
              DEMO
            </span>
          )}
        </div>
      </div>

      {/* Quick Action Button */}
      <div className="px-3 pt-3">
        {currentUser.role === 'super_admin' ? (
          <button
            onClick={() => {
              if (onAddBusinessClick) onAddBusinessClick();
              else setActiveView('admin-businesses');
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add New Business</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveView('sales')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Quick POS Billing</span>
          </button>
        )}
      </div>

      {/* Navigation Links Scrollable Area */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-xs font-medium">
        {currentUser.role === 'super_admin' && (
          <div className="space-y-1">
            <div className="px-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              PLATFORM MANAGEMENT
            </div>
            {adminNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-left ${
                    isActive 
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm' 
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {currentUser.role === 'business_owner' && (
          <>
            {ownerNavSections.map(sec => (
              <div key={sec.title} className="space-y-1">
                <div className="px-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {sec.title}
                </div>
                {sec.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveView(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-left ${
                        isActive 
                          ? 'bg-indigo-600 text-white font-semibold shadow-sm' 
                          : item.highlight
                            ? 'text-indigo-300 bg-indigo-950/40 hover:bg-indigo-900/60'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && item.badge > 0 ? (
                        <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ))}
          </>
        )}

        {currentUser.role === 'staff' && (
          <div className="space-y-1">
            <div className="px-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              STAFF WORKSPACE
            </div>
            {staffNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-left ${
                    isActive 
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm' 
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Footer info: Subscription & AI Co-pilot status */}
      <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-300">
            {currentUser.role === 'super_admin' ? 'EduVanta Core v2.4' : `${currentBusiness?.subscription.planName} Plan`}
          </span>
          {currentUser.role === 'business_owner' && (
            <span className="text-[10px] text-indigo-400 font-semibold tabular-nums">
              {currentBusiness?.subscription.aiRequestsUsed || 0}/{currentBusiness?.subscription.aiRequestsLimit || 600} AI
            </span>
          )}
        </div>
        <p className="text-[10px] text-slate-400 mt-1">
          Secure Indian SME Operating System
        </p>
      </div>
    </aside>
  );
};
