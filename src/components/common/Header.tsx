import React, { useState } from 'react';
import { 
  Bell, 
  ChevronRight, 
  ExternalLink, 
  UserCheck, 
  LogOut, 
  RotateCcw,
  Sparkles,
  Store,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { 
    currentUser, 
    currentBusiness, 
    activeView, 
    setActiveView, 
    switchRole, 
    notifications, 
    markNotificationRead,
    markAllNotificationsRead,
    isImpersonating,
    exitLoginAs,
    resetDemoData,
    platformSettings
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.isRead);

  // Format view title
  const getViewTitle = (view: string) => {
    switch(view) {
      case 'dashboard': return 'Business Overview';
      case 'ai-advisor': return 'BizBrain AI Advisor';
      case 'sales': return 'Point of Sale (POS)';
      case 'orders': return 'Orders Management';
      case 'products': return 'Products Catalog';
      case 'inventory': return 'Inventory & Stock Control';
      case 'customers': return 'Customers CRM';
      case 'suppliers': return 'Suppliers Directory';
      case 'expenses': return 'Expense Ledger';
      case 'employees': return 'Staff & Permissions';
      case 'payments': return 'Payments Tracker';
      case 'reports': return 'Business Reports & Analytics';
      case 'notifications': return 'Notifications Center';
      case 'settings': return 'Business Settings';
      case 'help': return 'Help & Support';
      case 'admin-dashboard': return 'Platform Command Center';
      case 'admin-businesses': return 'All Businesses';
      case 'admin-users': return 'Platform Users';
      case 'admin-plans': return 'Subscription Plans';
      case 'admin-categories': return 'Business Categories';
      case 'admin-analytics': return 'Platform Analytics';
      case 'admin-ai': return 'Platform AI Management';
      case 'admin-activity': return 'System Activity Logs';
      case 'admin-settings': return 'Super Admin Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <>
      {/* Impersonation Banner */}
      {isImpersonating && (
        <div className="bg-amber-600 text-white px-4 py-2 text-xs flex items-center justify-between font-medium">
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider bg-amber-700 px-2 py-0.5 rounded text-[11px]">
              Admin Impersonation Mode
            </span>
            <span>You are securely accessing <strong>{currentBusiness?.name}</strong> as Super Admin.</span>
          </div>
          <button 
            onClick={exitLoginAs}
            className="bg-white text-amber-900 px-3 py-1 rounded text-xs font-semibold hover:bg-amber-50 transition-colors"
          >
            Exit Impersonation
          </button>
        </div>
      )}

      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: Mobile trigger & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-medium text-slate-700 hidden sm:inline">
              {currentUser.role === 'super_admin' ? (platformSettings.platformName || 'Platform') : (currentBusiness?.name || platformSettings.platformName)}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <span className="font-semibold text-slate-900 text-sm">{getViewTitle(activeView)}</span>
          </div>
        </div>

        {/* Right: Actions, Notifications, Role Switcher, Public Landing link */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Landing Page link */}
          <button
            onClick={() => setActiveView('landing')}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            title="View Public Landing Page"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </button>

          {/* Reset Demo Data button */}
          <button
            onClick={() => {
              if (window.confirm('Reset all DemoMart data back to original state?')) {
                resetDemoData();
              }
            }}
            className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
            title="Restore initial DemoMart dataset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-2 text-slate-800">
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">Notifications</span>
                    <span className="text-[11px] text-slate-500">({unreadNotifications.length} new)</span>
                  </div>
                  {unreadNotifications.length > 0 && (
                    <button 
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.slice(0, 6).map(notif => (
                    <div 
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${!notif.isRead ? 'bg-indigo-50/40' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className={`font-semibold ${!notif.isRead ? 'text-indigo-950' : 'text-slate-900'}`}>
                          {notif.title}
                        </p>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-0.5 line-clamp-2">{notif.message}</p>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No notifications yet
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 p-2 text-center">
                  <button
                    onClick={() => {
                      setActiveView('notifications');
                      setShowNotifications(false);
                    }}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    View All Notifications →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher & Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 border border-slate-200 rounded-lg hover:border-slate-300 bg-white transition-colors"
            >
              <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-slate-900 leading-tight">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500 capitalize">
                  {currentUser.role.replace('_', ' ')}
                </p>
              </div>
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-2 text-slate-800">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                  <p className="text-[10px] text-indigo-600 font-medium mt-1">
                    Role: {currentUser.role.toUpperCase()}
                  </p>
                </div>

                <div className="py-1">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Persona (Demo)
                  </div>
                  <button
                    onClick={() => {
                      switchRole('super_admin');
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-md flex items-center justify-between ${
                      currentUser.role === 'super_admin' ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <p>Platform Super Admin</p>
                      <span className="text-[10px] text-slate-400">EduVantaTech Owner</span>
                    </div>
                    {currentUser.role === 'super_admin' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('business_owner');
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-md flex items-center justify-between ${
                      currentUser.role === 'business_owner' ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <p>Business Owner</p>
                      <span className="text-[10px] text-slate-400">DemoMart Retail Store</span>
                    </div>
                    {currentUser.role === 'business_owner' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('staff');
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-md flex items-center justify-between ${
                      currentUser.role === 'staff' ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <p>Store Staff / Cashier</p>
                      <span className="text-[10px] text-slate-400">Pooja Verma (POS Access)</span>
                    </div>
                    {currentUser.role === 'staff' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1 mt-1">
                  <button
                    onClick={() => {
                      setActiveView('landing');
                      setShowRoleDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5 text-slate-400" />
                    <span>View Public Landing Page</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
