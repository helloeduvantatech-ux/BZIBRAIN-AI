import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Store, 
  MapPin, 
  Sliders, 
  UserCheck, 
  CreditCard, 
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddBusinessModal: React.FC<AddBusinessModalProps> = ({ isOpen, onClose }) => {
  const { categories, plans, addBusiness } = useApp();

  const [step, setStep] = useState(1);
  const [createdResult, setCreatedResult] = useState<{ business: any; tempPassword: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // STEP 1: Business Information
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    category: categories[0]?.name || 'Retail',
    type: 'Retail Store',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    whatsappNumber: '',
    gstNumber: '',
    panNumber: '',
    website: '',
    description: ''
  });

  // STEP 2: Location
  const [location, setLocation] = useState({
    country: 'India',
    state: 'Maharashtra',
    city: 'Mumbai',
    address: '',
    pincode: ''
  });

  // STEP 3: Business Configuration
  const [config, setConfig] = useState({
    currency: '₹',
    taxSystem: 'GST',
    defaultTaxPercentage: 18,
    invoicePrefix: 'INV-',
    lowStockThreshold: 10,
    openingTime: '09:00 AM',
    closingTime: '09:00 PM',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  });

  // STEP 4: Owner Account
  const [ownerData, setOwnerData] = useState({
    email: '',
    setupMethod: 'auto_password',
    role: 'business_owner'
  });

  // STEP 5: Subscription
  const [subData, setSubData] = useState({
    plan: 'Growth',
    startDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString().split('T')[0],
    maxUsers: 10,
    maxProducts: 2500,
    aiRequestsLimit: 600
  });

  if (!isOpen) return null;

  const handlePlanSelect = (planName: string) => {
    const selected = plans.find(p => p.name === planName);
    if (selected) {
      setSubData(prev => ({
        ...prev,
        plan: selected.name,
        maxUsers: selected.maxUsers,
        maxProducts: selected.maxProducts,
        aiRequestsLimit: selected.aiRequestsMonthly
      }));
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!businessInfo.name || !businessInfo.ownerName || !businessInfo.ownerEmail || !businessInfo.ownerPhone) {
        alert('Please fill in required fields: Business Name, Owner Name, Owner Email, and Phone.');
        return;
      }
      setOwnerData(prev => ({ ...prev, email: businessInfo.ownerEmail }));
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleFinalSubmit = () => {
    const result = addBusiness(businessInfo, location, config, ownerData, subData);
    setCreatedResult(result);
  };

  const handleCopyCredentials = () => {
    if (!createdResult) return;
    const text = `EduVanta BizBrain AI — Store Credentials
Business Name: ${createdResult.business.name}
Business ID: ${createdResult.business.id}
Owner Login: ${createdResult.business.ownerEmail}
Temporary Password: ${createdResult.tempPassword}
Portal URL: ${window.location.origin}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const resetFormAndClose = () => {
    setStep(1);
    setCreatedResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {createdResult ? 'Business Created Successfully' : 'Add New Business Tenant'}
            </h2>
            <p className="text-xs text-slate-500">
              {createdResult 
                ? 'Owner account generated & connected' 
                : `Step ${step} of 6 — Multi-tenant Onboarding Wizard`}
            </p>
          </div>
          <button 
            onClick={resetFormAndClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker (Only before creation) */}
        {!createdResult && (
          <div className="px-6 py-2.5 bg-indigo-50/50 border-b border-indigo-100 flex items-center justify-between text-xs font-medium text-slate-600 overflow-x-auto">
            <span className={step >= 1 ? 'text-indigo-600 font-bold' : ''}>1. Info</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className={step >= 2 ? 'text-indigo-600 font-bold' : ''}>2. Location</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className={step >= 3 ? 'text-indigo-600 font-bold' : ''}>3. Config</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className={step >= 4 ? 'text-indigo-600 font-bold' : ''}>4. Account</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className={step >= 5 ? 'text-indigo-600 font-bold' : ''}>5. Plan</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className={step >= 6 ? 'text-indigo-600 font-bold' : ''}>6. Confirm</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {createdResult ? (
            /* Success Screen */
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{createdResult.business.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Business ID: <span className="font-mono font-bold text-indigo-600">{createdResult.business.id}</span>
                </p>
              </div>

              {/* Login Credentials Box */}
              <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-lg p-4 text-left space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-semibold text-slate-700">Owner Access Credentials</span>
                  <button
                    onClick={handleCopyCredentials}
                    className="flex items-center gap-1 text-[11px] text-indigo-600 font-medium hover:text-indigo-800"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-700">
                  <p><span className="text-slate-400 font-sans">Owner Email:</span> {createdResult.business.ownerEmail}</p>
                  <p><span className="text-slate-400 font-sans">Temporary Password:</span> <strong className="text-slate-900">{createdResult.tempPassword}</strong></p>
                  <p><span className="text-slate-400 font-sans">Assigned Plan:</span> {createdResult.business.subscription.planName}</p>
                  <p><span className="text-slate-400 font-sans">Max Products:</span> {createdResult.business.subscription.maxProducts.toLocaleString()}</p>
                  <p><span className="text-slate-400 font-sans">AI Limits:</span> {createdResult.business.subscription.aiRequestsLimit} queries/mo</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                The business owner can now log in securely using these credentials. Their product, inventory, and sales tables have been initialized.
              </p>
            </div>
          ) : (
            <>
              {/* STEP 1: Business Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <Store className="w-4 h-4 text-indigo-600" />
                    <span>Business Information</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Business Name *</label>
                      <input 
                        type="text"
                        placeholder="e.g. Anand Departmental Store"
                        value={businessInfo.name}
                        onChange={e => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Business Category *</label>
                      <select
                        value={businessInfo.category}
                        onChange={e => setBusinessInfo({ ...businessInfo, category: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 text-xs bg-white"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.name}>{c.name} (GST {c.defaultGstRate}%)</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Business Type</label>
                      <input 
                        type="text"
                        placeholder="e.g. Supermarket, Boutique, Clinic"
                        value={businessInfo.type}
                        onChange={e => setBusinessInfo({ ...businessInfo, type: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Owner Name *</label>
                      <input 
                        type="text"
                        placeholder="e.g. Ramesh Patel"
                        value={businessInfo.ownerName}
                        onChange={e => setBusinessInfo({ ...businessInfo, ownerName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Owner Email *</label>
                      <input 
                        type="email"
                        placeholder="owner@domain.com"
                        value={businessInfo.ownerEmail}
                        onChange={e => setBusinessInfo({ ...businessInfo, ownerEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Owner Phone *</label>
                      <input 
                        type="tel"
                        placeholder="+91 98200 12345"
                        value={businessInfo.ownerPhone}
                        onChange={e => setBusinessInfo({ ...businessInfo, ownerPhone: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">WhatsApp Number</label>
                      <input 
                        type="tel"
                        placeholder="+91 98200 12345"
                        value={businessInfo.whatsappNumber}
                        onChange={e => setBusinessInfo({ ...businessInfo, whatsappNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">GST Number (Optional)</label>
                      <input 
                        type="text"
                        placeholder="27AABCU9603R1ZM"
                        value={businessInfo.gstNumber}
                        onChange={e => setBusinessInfo({ ...businessInfo, gstNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs uppercase"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">PAN Number (Optional)</label>
                      <input 
                        type="text"
                        placeholder="ABCDE1234F"
                        value={businessInfo.panNumber}
                        onChange={e => setBusinessInfo({ ...businessInfo, panNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs uppercase"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Website (Optional)</label>
                      <input 
                        type="url"
                        placeholder="https://mybusiness.in"
                        value={businessInfo.website}
                        onChange={e => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Business Description</label>
                    <textarea
                      rows={2}
                      placeholder="Brief overview of products, services, or trade."
                      value={businessInfo.description}
                      onChange={e => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Location */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    <span>Physical Location & Address</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Country</label>
                      <input 
                        type="text"
                        value={location.country}
                        disabled
                        className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md text-xs text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">State *</label>
                      <input 
                        type="text"
                        placeholder="e.g. Maharashtra, Gujarat, Karnataka"
                        value={location.state}
                        onChange={e => setLocation({ ...location, state: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">City *</label>
                      <input 
                        type="text"
                        placeholder="e.g. Mumbai, Pune, Bengaluru"
                        value={location.city}
                        onChange={e => setLocation({ ...location, city: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">PIN Code *</label>
                      <input 
                        type="text"
                        placeholder="e.g. 400001"
                        value={location.pincode}
                        onChange={e => setLocation({ ...location, pincode: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Street Address</label>
                    <textarea
                      rows={2}
                      placeholder="Shop/Unit No, Building name, Main Market road"
                      value={location.address}
                      onChange={e => setLocation({ ...location, address: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Business Configuration */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-indigo-600" />
                    <span>Business Configuration & Tax System</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Currency Symbol</label>
                      <input 
                        type="text"
                        value={config.currency}
                        onChange={e => setConfig({ ...config, currency: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Tax System</label>
                      <select
                        value={config.taxSystem}
                        onChange={e => setConfig({ ...config, taxSystem: e.target.value as any })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white"
                      >
                        <option value="GST">Indian GST (Goods & Services Tax)</option>
                        <option value="VAT">VAT</option>
                        <option value="None">None (Exempt)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Default Tax Percentage (%)</label>
                      <input 
                        type="number"
                        value={config.defaultTaxPercentage}
                        onChange={e => setConfig({ ...config, defaultTaxPercentage: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Invoice Prefix</label>
                      <input 
                        type="text"
                        placeholder="e.g. INV-, RET-"
                        value={config.invoicePrefix}
                        onChange={e => setConfig({ ...config, invoicePrefix: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Low-Stock Alert Threshold</label>
                      <input 
                        type="number"
                        value={config.lowStockThreshold}
                        onChange={e => setConfig({ ...config, lowStockThreshold: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Working Hours</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          value={config.openingTime} 
                          onChange={e => setConfig({ ...config, openingTime: e.target.value })}
                          className="w-1/2 px-2 py-2 border border-slate-300 rounded-md text-xs" 
                        />
                        <span>to</span>
                        <input 
                          type="text" 
                          value={config.closingTime} 
                          onChange={e => setConfig({ ...config, closingTime: e.target.value })}
                          className="w-1/2 px-2 py-2 border border-slate-300 rounded-md text-xs" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Owner Account */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-600" />
                    <span>Owner Account Provisioning</span>
                  </h3>
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Primary Login Email</label>
                      <input 
                        type="email"
                        value={ownerData.email}
                        onChange={e => setOwnerData({ ...ownerData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Account Role</label>
                      <input 
                        type="text"
                        value="Business Owner (Full Admin)"
                        disabled
                        className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md text-xs text-slate-600 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Account Activation Method</label>
                      <select 
                        value={ownerData.setupMethod} 
                        onChange={e => setOwnerData({ ...ownerData, setupMethod: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white"
                      >
                        <option value="auto_password">Generate Secure Temporary Password</option>
                        <option value="email_invite">Send Email Activation Link</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    EduVanta BizBrain will link this tenant directly to this owner profile with full operational privileges over products, sales, inventory, and employees.
                  </p>
                </div>
              )}

              {/* STEP 5: Subscription */}
              {step === 5 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <span>Subscription Plan & Limits</span>
                  </h3>
                  
                  {/* Plan Picker */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {plans.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => handlePlanSelect(p.name)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          subData.plan === p.name 
                            ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-600' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <p className="font-bold text-slate-900 text-xs">{p.displayName}</p>
                        <p className="text-indigo-600 font-semibold text-[11px] mt-0.5 font-mono">
                          {p.priceMonthly === 0 ? 'Free' : `₹${p.priceMonthly.toLocaleString('en-IN')}/mo`}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{p.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Limits Configuration */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Max Products Limit</label>
                      <input 
                        type="number"
                        value={subData.maxProducts}
                        onChange={e => setSubData({ ...subData, maxProducts: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Max Users Limit</label>
                      <input 
                        type="number"
                        value={subData.maxUsers}
                        onChange={e => setSubData({ ...subData, maxUsers: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">AI Requests / Month</label>
                      <input 
                        type="number"
                        value={subData.aiRequestsLimit}
                        onChange={e => setSubData({ ...subData, aiRequestsLimit: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Start Date</label>
                      <input 
                        type="date"
                        value={subData.startDate}
                        onChange={e => setSubData({ ...subData, startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Expiry Date</label>
                      <input 
                        type="date"
                        value={subData.expiryDate}
                        onChange={e => setSubData({ ...subData, expiryDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: Confirmation */}
              {step === 6 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Review Business Details</span>
                  </h3>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Store Name</p>
                        <p className="font-bold text-slate-900">{businessInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Category</p>
                        <p className="font-semibold text-slate-800">{businessInfo.category} ({businessInfo.type})</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Owner Details</p>
                        <p className="font-semibold text-slate-900">{businessInfo.ownerName}</p>
                        <p className="text-slate-600">{businessInfo.ownerEmail} · {businessInfo.ownerPhone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Location</p>
                        <p className="text-slate-800">{location.city}, {location.state} ({location.pincode})</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Tax System</p>
                        <p className="font-semibold text-slate-800">{config.taxSystem} ({config.defaultTaxPercentage}%)</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Plan</p>
                        <p className="font-semibold text-indigo-600">{subData.plan}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">AI Quota</p>
                        <p className="font-semibold text-slate-800 font-mono">{subData.aiRequestsLimit} req/mo</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Clicking &quot;Create Business&quot; will provision an isolated database workspace, create the owner account, and generate secure temporary credentials.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          {createdResult ? (
            <button
              onClick={resetFormAndClose}
              className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors"
            >
              Done & Close
            </button>
          ) : (
            <>
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 text-slate-700 rounded-md text-xs font-medium hover:bg-slate-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : <div />}

              {step < 6 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-md text-xs font-semibold hover:bg-indigo-700 transition-colors"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinalSubmit}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-md text-xs font-semibold hover:bg-emerald-700 shadow-sm transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Create Business Now</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
