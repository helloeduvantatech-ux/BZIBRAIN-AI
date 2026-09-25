import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Sparkles, 
  Layers, 
  Menu, 
  X, 
  Boxes, 
  PackageCheck, 
  Users, 
  Truck, 
  Receipt, 
  CreditCard, 
  FileSpreadsheet, 
  Bell, 
  Settings, 
  HelpCircle,
  Store,
  Tag,
  BarChart3,
  ShieldCheck,
  PlusCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBusinessClick?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, onAddBusinessClick }) => {
  const { 
    currentUser, 
    currentBusiness, 
    activeView, 
    setActiveView, 
    notifications,
    switchRole,
    platformSettings
  } = useApp();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navigateTo = (view: string) => {
    setActiveView(view);
    onClose();
  };

  // Primary bottom bar items for fast thumb access
  const bottomBarItems = currentUser.role === 'super_admin' ? [
    { id: 'admin-dashboard', label: 'Admin', icon: LayoutDashboard },
    { id: 'admin-businesses', label: 'Stores', icon: Store },
    { id: 'admin-analytics', label: 'Growth', icon: BarChart3 },
    { id: 'admin-ai', label: 'AI Platform', icon: Sparkles },
  ] : currentUser.role === 'staff' ? [
    { id: 'sales', label: 'POS', icon: ShoppingCart },
    { id: 'products', label: 'Items', icon: Boxes },
    { id: 'inventory', label: 'Stock', icon: Layers },
    { id: 'orders', label: 'Orders', icon: PackageCheck },
  ] : [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'sales', label: 'POS', icon: ShoppingCart },
    { id: 'ai-advisor', label: 'AI Advisor', icon: Sparkles },
    { id: 'inventory', label: 'Inventory', icon: Layers },
  ];

  return (
    <>
      {/* Bottom Navigation Bar (Visible on mobile/tablet screens < lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {bottomBarItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}

        {/* More Menu Trigger */}
        <button
          onClick={onClose ? () => onClose() : undefined}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-slate-600 hover:text-slate-900 rounded-lg"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">All</span>
        </button>
      </div>

      {/* Slide-out Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs bg-slate-900 text-slate-200 flex flex-col h-full shadow-2xl z-10">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white leading-tight">
                  {platformSettings.platformName || 'EduVanta BizBrain'}
                </h2>
                <p className="text-[10px] text-slate-400">
                  {currentUser.role === 'super_admin' ? 'Super Admin' : (currentBusiness?.name || 'Store')}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action */}
            <div className="p-3">
              {currentUser.role === 'super_admin' ? (
                <button
                  onClick={() => {
                    onClose();
                    if (onAddBusinessClick) onAddBusinessClick();
                    else setActiveView('admin-businesses');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Add Business</span>
                </button>
              ) : (
                <button
                  onClick={() => navigateTo('sales')}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>+ New Sale (POS)</span>
                </button>
              )}
            </div>

            {/* Scrollable Navigation */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
              {currentUser.role === 'super_admin' ? (
                <>
                  <button onClick={() => navigateTo('admin-dashboard')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Admin Dashboard</button>
                  <button onClick={() => navigateTo('admin-businesses')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Businesses Directory</button>
                  <button onClick={() => navigateTo('admin-users')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Platform Users</button>
                  <button onClick={() => navigateTo('admin-plans')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Plans & Subscriptions</button>
                  <button onClick={() => navigateTo('admin-categories')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Business Categories</button>
                  <button onClick={() => navigateTo('admin-analytics')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Platform Analytics</button>
                  <button onClick={() => navigateTo('admin-ai')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">AI Management</button>
                  <button onClick={() => navigateTo('admin-activity')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">System Activity</button>
                  <button onClick={() => navigateTo('admin-settings')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Admin Settings</button>
                </>
              ) : currentUser.role === 'business_owner' ? (
                <>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase px-3 pt-2">CORE</div>
                  <button onClick={() => navigateTo('dashboard')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Dashboard</button>
                  <button onClick={() => navigateTo('ai-advisor')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800 text-indigo-300 font-semibold">BizBrain AI Advisor</button>
                  <button onClick={() => navigateTo('sales')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Sales (POS)</button>
                  <button onClick={() => navigateTo('orders')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Orders</button>
                  <button onClick={() => navigateTo('products')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Products</button>
                  <button onClick={() => navigateTo('inventory')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Inventory</button>
                  
                  <div className="text-[10px] text-slate-400 font-semibold uppercase px-3 pt-2">RELATIONS & ACCOUNTS</div>
                  <button onClick={() => navigateTo('customers')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Customers CRM</button>
                  <button onClick={() => navigateTo('suppliers')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Suppliers</button>
                  <button onClick={() => navigateTo('expenses')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Expenses</button>
                  <button onClick={() => navigateTo('employees')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Staff Management</button>
                  <button onClick={() => navigateTo('payments')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Payments</button>
                  <button onClick={() => navigateTo('reports')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Reports</button>
                  
                  <div className="text-[10px] text-slate-400 font-semibold uppercase px-3 pt-2">SYSTEM</div>
                  <button onClick={() => navigateTo('notifications')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Notifications ({unreadCount})</button>
                  <button onClick={() => navigateTo('settings')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Business Settings</button>
                  <button onClick={() => navigateTo('help')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Help & Support</button>
                </>
              ) : (
                <>
                  <button onClick={() => navigateTo('sales')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Sales (POS)</button>
                  <button onClick={() => navigateTo('products')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Products Catalog</button>
                  <button onClick={() => navigateTo('inventory')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Inventory Movements</button>
                  <button onClick={() => navigateTo('orders')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Orders</button>
                  <button onClick={() => navigateTo('notifications')} className="w-full text-left py-2 px-3 rounded hover:bg-slate-800">Notifications</button>
                </>
              )}
            </div>

            {/* Quick Public Site trigger */}
            <div className="p-3 border-t border-slate-800">
              <button
                onClick={() => navigateTo('landing')}
                className="w-full py-2 text-center text-xs text-indigo-400 font-semibold"
              >
                Go to Public Landing Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
