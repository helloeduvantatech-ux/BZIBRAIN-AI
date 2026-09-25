import React, { useState } from 'react';
import { 
  Settings, 
  Store, 
  Receipt, 
  Users, 
  Bell, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  Download,
  Save,
  Check,
  Globe,
  Copy,
  ExternalLink,
  Lock,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BusinessSettingsView: React.FC = () => {
  const { currentBusiness, updateBusinessSettings, updateBusiness } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'tax' | 'domain' | 'notifications' | 'ai' | 'subscription' | 'export'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings form states
  const [profileForm, setProfileForm] = useState({
    name: currentBusiness?.name || '',
    category: currentBusiness?.category || '',
    phone: currentBusiness?.ownerPhone || '',
    email: currentBusiness?.ownerEmail || '',
    whatsappNumber: currentBusiness?.whatsappNumber || '',
    gstNumber: currentBusiness?.gstNumber || '',
    panNumber: currentBusiness?.panNumber || '',
    website: currentBusiness?.website || '',
    address: currentBusiness?.location.address || '',
    city: currentBusiness?.location.city || '',
    state: currentBusiness?.location.state || '',
    pincode: currentBusiness?.location.pincode || '',
  });

  const [domainForm, setDomainForm] = useState({
    storeWebsiteName: currentBusiness?.settings.storeWebsiteName || currentBusiness?.name || '',
    website: currentBusiness?.website || 'https://demomart.eduvanta.in',
    customDomain: currentBusiness?.settings.customDomain?.domain || 'demomart.in',
  });
  const [isVerifyingDomain, setIsVerifyingDomain] = useState(false);
  const [domainVerified, setDomainVerified] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleVerifyDomain = () => {
    setIsVerifyingDomain(true);
    setTimeout(() => {
      setIsVerifyingDomain(false);
      setDomainVerified(true);
      showSaveNotice();
    }, 1000);
  };

  const handleSaveDomain = () => {
    if (!currentBusiness) return;
    updateBusiness(currentBusiness.id, {
      name: domainForm.storeWebsiteName,
      website: domainForm.website
    });
    updateBusinessSettings({
      storeWebsiteName: domainForm.storeWebsiteName,
      customDomain: {
        domain: domainForm.customDomain,
        cnameRecord: 'tenant.eduvanta.in',
        aRecord: '76.76.21.21',
        status: 'active',
        sslActive: true,
        verifiedAt: new Date().toISOString()
      }
    });
    showSaveNotice();
  };

  const [taxForm, setTaxForm] = useState({
    currency: currentBusiness?.settings.currency || '₹',
    taxSystem: currentBusiness?.settings.taxSystem || 'GST',
    defaultTaxPercentage: currentBusiness?.settings.defaultTaxPercentage || 5,
    invoicePrefix: currentBusiness?.settings.invoicePrefix || 'INV-',
    lowStockThreshold: currentBusiness?.settings.lowStockThreshold || 10,
    openingTime: currentBusiness?.settings.openingTime || '08:00 AM',
    closingTime: currentBusiness?.settings.closingTime || '10:00 PM',
  });

  const [alertSettings, setAlertSettings] = useState({
    autoAiDailyReport: currentBusiness?.settings.autoAiDailyReport ?? true,
    whatsappAlerts: currentBusiness?.settings.whatsappAlerts ?? true,
    emailAlerts: currentBusiness?.settings.emailAlerts ?? true,
  });

  const handleSaveProfile = () => {
    if (!currentBusiness) return;
    updateBusiness(currentBusiness.id, {
      name: profileForm.name,
      category: profileForm.category,
      ownerPhone: profileForm.phone,
      ownerEmail: profileForm.email,
      whatsappNumber: profileForm.whatsappNumber,
      gstNumber: profileForm.gstNumber,
      panNumber: profileForm.panNumber,
      website: profileForm.website,
      location: {
        ...currentBusiness.location,
        address: profileForm.address,
        city: profileForm.city,
        state: profileForm.state,
        pincode: profileForm.pincode
      }
    });
    showSaveNotice();
  };

  const handleSaveTax = () => {
    updateBusinessSettings(taxForm);
    showSaveNotice();
  };

  const handleSaveAlerts = () => {
    updateBusinessSettings(alertSettings);
    showSaveNotice();
  };

  const showSaveNotice = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Business Settings</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage store profile, tax configuration, operating hours, and BizBrain AI preferences.
          </p>
        </div>
        {savedSuccess && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
            <Check className="w-3.5 h-3.5" />
            <span>Changes Saved!</span>
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="md:col-span-3 space-y-1 bg-white p-3 rounded-xl border border-slate-200 text-xs">
          {[
            { id: 'profile', label: 'Business Profile', icon: Store },
            { id: 'domain', label: 'Store Website & Domain', icon: Globe },
            { id: 'tax', label: 'Tax & Invoicing', icon: Receipt },
            { id: 'notifications', label: 'Notification Alerts', icon: Bell },
            { id: 'ai', label: 'BizBrain AI Config', icon: Sparkles },
            { id: 'subscription', label: 'Plan & Billing', icon: CreditCard },
            { id: 'export', label: 'Data Export & Backup', icon: Download },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-left transition-colors ${
                  isActive ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Setting Panel Content */}
        <div className="md:col-span-9 bg-white p-6 rounded-xl border border-slate-200 text-xs space-y-5">
          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Store Identification & Contacts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Store Legal Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Trade Category</label>
                  <input
                    type="text"
                    value={profileForm.category}
                    onChange={e => setProfileForm({ ...profileForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Official Mobile Phone</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">WhatsApp Billing Number</label>
                  <input
                    type="tel"
                    value={profileForm.whatsappNumber}
                    onChange={e => setProfileForm({ ...profileForm, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={profileForm.gstNumber}
                    onChange={e => setProfileForm({ ...profileForm, gstNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">PAN Card Number</label>
                  <input
                    type="text"
                    value={profileForm.panNumber}
                    onChange={e => setProfileForm({ ...profileForm, panNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Store Address</label>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={profileForm.city}
                    onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={profileForm.state}
                    onChange={e => setProfileForm({ ...profileForm, state: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">PIN Code</label>
                  <input
                    type="text"
                    value={profileForm.pincode}
                    onChange={e => setProfileForm({ ...profileForm, pincode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          )}

          {/* STORE WEBSITE & CUSTOM DOMAIN */}
          {activeTab === 'domain' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-600" />
                    <span>Store Website & Custom Domain</span>
                  </h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Configure your online storefront address, custom domain, and automated SSL encryption.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-semibold text-[11px]">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>SSL Certificate Active</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Storefront Website Display Name
                  </label>
                  <input
                    type="text"
                    value={domainForm.storeWebsiteName}
                    onChange={e => setDomainForm({ ...domainForm, storeWebsiteName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-semibold focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="DemoMart Daily Store"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Title shown on digital receipts, invoices, and customer WhatsApp links.
                  </p>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    EduVanta Cloud Subdomain
                  </label>
                  <input
                    type="text"
                    value={domainForm.website}
                    onChange={e => setDomainForm({ ...domainForm, website: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="https://demomart.eduvanta.in"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Free instant HTTPS web URL provided by EduVanta.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">
                    Custom Store Domain (Root or Subdomain)
                  </label>
                  <div className="flex rounded-md shadow-xs">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-xs font-mono">
                      https://
                    </span>
                    <input
                      type="text"
                      value={domainForm.customDomain}
                      onChange={e => {
                        setDomainForm({ ...domainForm, customDomain: e.target.value });
                        setDomainVerified(false);
                      }}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-slate-300 text-xs font-mono focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="store.yourdomain.com or yourbrand.in"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Use your own brand domain purchased from GoDaddy, BigRock, Namecheap, or Cloudflare.
                  </p>
                </div>
              </div>

              {/* DNS Records Guide */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">DNS Setup Instructions</h4>
                    <p className="text-[11px] text-slate-500">
                      Add this CNAME record in your domain registrar DNS settings:
                    </p>
                  </div>
                  <button
                    onClick={handleVerifyDomain}
                    disabled={isVerifyingDomain}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 text-indigo-700 border border-indigo-200 rounded-md font-semibold transition-colors disabled:opacity-50 text-xs shadow-xs"
                  >
                    <RefreshCw className={`w-3 h-3 ${isVerifyingDomain ? 'animate-spin' : ''}`} />
                    <span>{isVerifyingDomain ? 'Verifying...' : 'Verify DNS'}</span>
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden font-mono text-[11px]">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">Type</th>
                        <th className="py-2 px-3">Host</th>
                        <th className="py-2 px-3">Target Value</th>
                        <th className="py-2 px-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2 px-3 font-bold text-indigo-700">CNAME</td>
                        <td className="py-2 px-3 text-slate-800">store / @</td>
                        <td className="py-2 px-3 text-slate-600 flex items-center justify-between">
                          <span>tenant.eduvanta.in</span>
                          <button
                            onClick={() => handleCopy('tenant.eduvanta.in', 'cname_target')}
                            className="text-slate-400 hover:text-slate-700"
                            title="Copy CNAME target"
                          >
                            {copiedKey === 'cname_target' ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                            <Check className="w-3 h-3" /> Active
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleSaveDomain}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Store Website & Domain</span>
                </button>

                <a
                  href={`https://${domainForm.customDomain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold text-xs"
                >
                  <span>Preview Storefront</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* TAX & INVOICING */}
          {activeTab === 'tax' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Tax Rates & Invoicing Prefix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tax System</label>
                  <select
                    value={taxForm.taxSystem}
                    onChange={e => setTaxForm({ ...taxForm, taxSystem: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white"
                  >
                    <option value="GST">Indian GST (Goods & Services Tax)</option>
                    <option value="VAT">VAT</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Default Tax Percentage (%)</label>
                  <input
                    type="number"
                    value={taxForm.defaultTaxPercentage}
                    onChange={e => setTaxForm({ ...taxForm, defaultTaxPercentage: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Invoice Number Prefix</label>
                  <input
                    type="text"
                    value={taxForm.invoicePrefix}
                    onChange={e => setTaxForm({ ...taxForm, invoicePrefix: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Store Low-Stock Safety Threshold</label>
                  <input
                    type="number"
                    value={taxForm.lowStockThreshold}
                    onChange={e => setTaxForm({ ...taxForm, lowStockThreshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveTax}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Tax Preferences</span>
              </button>
            </div>
          )}

          {/* NOTIFICATION ALERTS */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Alerts & Dispatches</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alertSettings.autoAiDailyReport}
                    onChange={e => setAlertSettings({ ...alertSettings, autoAiDailyReport: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">Daily Morning BizBrain AI Summary</p>
                    <p className="text-[11px] text-slate-500">Automatically prepare a daily business performance digest at 08:00 AM.</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alertSettings.whatsappAlerts}
                    onChange={e => setAlertSettings({ ...alertSettings, whatsappAlerts: e.target.checked })}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">WhatsApp Stockout Alerts</p>
                    <p className="text-[11px] text-slate-500">Receive instant WhatsApp alerts when critical products hit zero units.</p>
                  </div>
                </label>
              </div>

              <button
                onClick={handleSaveAlerts}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notification Settings</span>
              </button>
            </div>
          )}

          {/* BIZBRAIN AI CONFIG */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">BizBrain AI Co-Pilot Settings</h3>
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 space-y-2">
                <p className="font-bold text-indigo-950">Active Model: Gemini 3.8 Flash</p>
                <p className="text-slate-700 leading-relaxed">
                  BizBrain AI strictly references the logged-in store&apos;s product inventory, POS transactions, customer history, and expenses. No cross-tenant data is ever shared or accessible.
                </p>
                <div className="pt-2 text-indigo-900 font-mono text-[11px]">
                  Usage this month: {currentBusiness?.subscription.aiRequestsUsed} / {currentBusiness?.subscription.aiRequestsLimit} queries
                </div>
              </div>
            </div>
          )}

          {/* SUBSCRIPTION */}
          {activeTab === 'subscription' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Current SaaS Subscription</h3>
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-slate-900">{currentBusiness?.subscription.planName} Tier</span>
                    <p className="text-slate-500 text-[11px]">Valid until {new Date(currentBusiness?.subscription.expiryDate || '').toLocaleDateString()}</p>
                  </div>
                  <span className="font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded text-xs uppercase">
                    {currentBusiness?.subscription.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Catalog Limit</span>
                    <span className="font-bold text-slate-900 font-mono">{currentBusiness?.subscription.maxProducts.toLocaleString()} items</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Staff Accounts</span>
                    <span className="font-bold text-slate-900 font-mono">{currentBusiness?.subscription.maxUsers} Users</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">AI Quota</span>
                    <span className="font-bold text-indigo-600 font-mono">{currentBusiness?.subscription.aiRequestsLimit} queries/mo</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DATA EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Download Backup Archives</h3>
              <p className="text-slate-600">
                Generate an immediate full-database JSON dump containing all your products, sales invoices, customer CRM records, and inventory movements.
              </p>
              <button
                onClick={() => {
                  const dump = {
                    business: currentBusiness,
                    exportedAt: new Date().toISOString(),
                    platform: 'EduVanta BizBrain AI'
                  };
                  const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `eduvanta_backup_${currentBusiness?.id}.json`;
                  a.click();
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Complete Business JSON Dump</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
