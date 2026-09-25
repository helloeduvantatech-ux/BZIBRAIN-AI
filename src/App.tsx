/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { MobileNav } from './components/common/MobileNav';

// Super Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BusinessList } from './components/admin/BusinessList';
import { AddBusinessModal } from './components/admin/AddBusinessModal';
import { UsersManagement } from './components/admin/UsersManagement';
import { PlansManagement } from './components/admin/PlansManagement';
import { CategoriesManagement } from './components/admin/CategoriesManagement';
import { PlatformAnalytics } from './components/admin/PlatformAnalytics';
import { PlatformAIManagement } from './components/admin/PlatformAIManagement';
import { SystemActivity } from './components/admin/SystemActivity';
import { AdminSettings } from './components/admin/AdminSettings';

// Business Owner & Staff Components
import { OwnerDashboard } from './components/business/OwnerDashboard';
import { BizBrainAI } from './components/business/BizBrainAI';
import { SalesPOS } from './components/business/SalesPOS';
import { OrdersList } from './components/business/OrdersList';
import { ProductsList } from './components/business/ProductsList';
import { InventoryManager } from './components/business/InventoryManager';
import { CustomersCRM } from './components/business/CustomersCRM';
import { SuppliersManager } from './components/business/SuppliersManager';
import { ExpensesTracker } from './components/business/ExpensesTracker';
import { EmployeesManager } from './components/business/EmployeesManager';
import { PaymentsTracker } from './components/business/PaymentsTracker';
import { ReportsHub } from './components/business/ReportsHub';
import { NotificationsCenter } from './components/business/NotificationsCenter';
import { BusinessSettingsView } from './components/business/BusinessSettingsView';
import { HelpSupportView } from './components/business/HelpSupportView';

// Public Landing Page
import { LandingPage } from './components/landing/LandingPage';

const AppContent: React.FC = () => {
  const { activeView, setActiveView, currentUser } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddBusinessModalOpen, setIsAddBusinessModalOpen] = useState(false);

  // If user navigated to public landing page
  if (activeView === 'landing') {
    return (
      <>
        <LandingPage
          onStartBusiness={() => setIsAddBusinessModalOpen(true)}
          onEnterApp={() => setActiveView(currentUser.role === 'super_admin' ? 'admin-dashboard' : 'dashboard')}
        />
        <AddBusinessModal
          isOpen={isAddBusinessModalOpen}
          onClose={() => setIsAddBusinessModalOpen(false)}
        />
      </>
    );
  }

  // Render main authenticated application views
  const renderActiveView = () => {
    switch (activeView) {
      // Super Admin Views
      case 'admin-dashboard':
        return <AdminDashboard onAddBusinessClick={() => setIsAddBusinessModalOpen(true)} />;
      case 'admin-businesses':
        return <BusinessList onAddBusinessClick={() => setIsAddBusinessModalOpen(true)} />;
      case 'admin-users':
        return <UsersManagement />;
      case 'admin-plans':
        return <PlansManagement />;
      case 'admin-categories':
        return <CategoriesManagement />;
      case 'admin-analytics':
        return <PlatformAnalytics />;
      case 'admin-ai':
        return <PlatformAIManagement />;
      case 'admin-activity':
        return <SystemActivity />;
      case 'admin-settings':
        return <AdminSettings />;

      // Business Owner & Staff Views
      case 'dashboard':
        return <OwnerDashboard />;
      case 'ai-advisor':
        return <BizBrainAI />;
      case 'sales':
        return <SalesPOS />;
      case 'orders':
        return <OrdersList />;
      case 'products':
        return <ProductsList />;
      case 'inventory':
        return <InventoryManager />;
      case 'customers':
        return <CustomersCRM />;
      case 'suppliers':
        return <SuppliersManager />;
      case 'expenses':
        return <ExpensesTracker />;
      case 'employees':
        return <EmployeesManager />;
      case 'payments':
        return <PaymentsTracker />;
      case 'reports':
        return <ReportsHub />;
      case 'notifications':
        return <NotificationsCenter />;
      case 'settings':
        return <BusinessSettingsView />;
      case 'help':
        return <HelpSupportView />;

      default:
        return currentUser.role === 'super_admin' ? (
          <AdminDashboard onAddBusinessClick={() => setIsAddBusinessModalOpen(true)} />
        ) : (
          <OwnerDashboard />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Desktop Left Sidebar (hidden on < lg screens) */}
      <div className="hidden lg:block">
        <Sidebar onAddBusinessClick={() => setIsAddBusinessModalOpen(true)} />
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-6">
        {/* Header Bar */}
        <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>

        {/* Mobile Navigation (Bottom bar + Slide-out drawer) */}
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onAddBusinessClick={() => setIsAddBusinessModalOpen(true)}
        />
      </div>

      {/* Global Add Business 6-Step Wizard */}
      <AddBusinessModal
        isOpen={isAddBusinessModalOpen}
        onClose={() => setIsAddBusinessModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
