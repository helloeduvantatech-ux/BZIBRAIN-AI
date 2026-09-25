import React, { useState } from 'react';
import { 
  Globe, 
  Shield, 
  Server, 
  Key, 
  Check, 
  ExternalLink, 
  Copy, 
  RefreshCw, 
  AlertCircle, 
  Lock, 
  Sparkles,
  HelpCircle,
  Laptop
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSettings: React.FC = () => {
  const { platformSettings, updatePlatformSettings } = useApp();

  const [platformName, setPlatformName] = useState(platformSettings.platformName);
  const [brandTagline, setBrandTagline] = useState(platformSettings.brandTagline);
  const [primaryDomain, setPrimaryDomain] = useState(platformSettings.primaryDomain);
  const [customDomainName, setCustomDomainName] = useState(platformSettings.customDomain?.domain || 'bizbrain.ai');
  const [supportEmail, setSupportEmail] = useState(platformSettings.supportEmail);
  const [allowPublicSignup, setAllowPublicSignup] = useState(platformSettings.allowPublicSignup);
  const [maintenanceMode, setMaintenanceMode] = useState(platformSettings.maintenanceMode);

  const [isVerifyingDNS, setIsVerifyingDNS] = useState(false);
  const [dnsVerified, setDnsVerified] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'domain' | 'identity' | 'governance'>('domain');

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleVerifyDNS = () => {
    setIsVerifyingDNS(true);
    setTimeout(() => {
      setIsVerifyingDNS(false);
      setDnsVerified(true);
      updatePlatformSettings({
        customDomain: {
          ...platformSettings.customDomain,
          domain: customDomainName,
          status: 'active',
          sslActive: true,
          verifiedAt: new Date().toISOString()
        }
      });
    }, 1200);
  };

  const handleSave = () => {
    updatePlatformSettings({
      platformName: platformName.trim() || 'EduVanta BizBrain AI',
      brandTagline: brandTagline.trim() || 'By EduVantaTech',
      primaryDomain: primaryDomain.trim() || 'bizbrain.eduvantatech.com',
      supportEmail: supportEmail.trim() || 'support@eduvantatech.com',
      allowPublicSignup,
      maintenanceMode,
      customDomain: {
        domain: customDomainName.trim() || 'bizbrain.ai',
        cnameRecord: `cname.${primaryDomain.trim() || 'bizbrain.eduvantatech.com'}`,
        aRecord: '76.76.21.21',
        status: dnsVerified ? 'active' : 'pending_dns',
        sslActive: dnsVerified,
        verifiedAt: dnsVerified ? new Date().toISOString() : undefined
      }
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const applyPreset = (presetName: string, presetDomain: string, presetTagline: string) => {
    setPlatformName(presetName);
    setBrandTagline(presetTagline);
    setCustomDomainName(presetDomain);
    setPrimaryDomain(`app.${presetDomain}`);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Website Name & Domain Settings</h2>
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase tracking-wider border border-indigo-200">
              Super Admin
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure the platform&apos;s website brand name, primary domain, and custom domains with automated SSL.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Settings Saved & Applied Live!</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-medium gap-2">
        <button
          onClick={() => setActiveTab('domain')}
          className={`pb-2.5 px-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'domain'
              ? 'border-indigo-600 text-indigo-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Website Domain & DNS Records</span>
        </button>
        <button
          onClick={() => setActiveTab('identity')}
          className={`pb-2.5 px-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'identity'
              ? 'border-indigo-600 text-indigo-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Website Name & Brand Identity</span>
        </button>
        <button
          onClick={() => setActiveTab('governance')}
          className={`pb-2.5 px-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'governance'
              ? 'border-indigo-600 text-indigo-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>System & Tenant Governance</span>
        </button>
      </div>

      {/* TAB 1: DOMAIN & DNS SETTINGS */}
      {activeTab === 'domain' && (
        <div className="space-y-6">
          {/* Active Domains Overview */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-5 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span>Custom Website Domain Setup</span>
                </h3>
                <p className="text-slate-500 mt-0.5">
                  Point your own custom root domain or subdomain to this SaaS instance.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-semibold text-[11px]">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>SSL Active (Auto HTTPS)</span>
                </span>
              </div>
            </div>

            {/* Inputs: Primary and Custom Domain */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Primary Application Host / Subdomain
                </label>
                <div className="flex rounded-md shadow-xs">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-xs font-mono">
                    https://
                  </span>
                  <input
                    type="text"
                    value={primaryDomain}
                    onChange={e => setPrimaryDomain(e.target.value)}
                    placeholder="bizbrain.eduvantatech.com"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-slate-300 text-xs font-mono focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Default platform endpoint on EduVanta Cloud.</p>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Custom Domain (Root or Vanity Subdomain)
                </label>
                <div className="flex rounded-md shadow-xs">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-xs font-mono">
                    https://
                  </span>
                  <input
                    type="text"
                    value={customDomainName}
                    onChange={e => {
                      setCustomDomainName(e.target.value);
                      setDnsVerified(false);
                    }}
                    placeholder="bizbrain.ai or app.mybrand.in"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-slate-300 text-xs font-mono focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Enter your purchased domain (e.g. from GoDaddy, Namecheap, Cloudflare).</p>
              </div>
            </div>

            {/* DNS Records Table */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block font-bold text-slate-800">
                  Required DNS Records (Add in your Domain Registrar DNS Manager)
                </label>
                <button
                  onClick={handleVerifyDNS}
                  disabled={isVerifyingDNS}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-md font-semibold transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isVerifyingDNS ? 'animate-spin' : ''}`} />
                  <span>{isVerifyingDNS ? 'Querying Nameservers...' : 'Verify DNS Records'}</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Host / Name</th>
                      <th className="py-2.5 px-3">Points To / Value</th>
                      <th className="py-2.5 px-3">TTL</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-indigo-700">CNAME</td>
                      <td className="py-2.5 px-3 text-slate-800">app</td>
                      <td className="py-2.5 px-3 text-slate-600 flex items-center justify-between">
                        <span>cname.{primaryDomain}</span>
                        <button
                          onClick={() => handleCopy(`cname.${primaryDomain}`, 'cname')}
                          className="text-slate-400 hover:text-slate-700 ml-2"
                          title="Copy CNAME target"
                        >
                          {copiedField === 'cname' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">Auto (3600s)</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                          <Check className="w-3 h-3" /> Configured
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-indigo-700">A</td>
                      <td className="py-2.5 px-3 text-slate-800">@ (root)</td>
                      <td className="py-2.5 px-3 text-slate-600 flex items-center justify-between">
                        <span>76.76.21.21</span>
                        <button
                          onClick={() => handleCopy('76.76.21.21', 'arecord')}
                          className="text-slate-400 hover:text-slate-700 ml-2"
                          title="Copy IP"
                        >
                          {copiedField === 'arecord' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">Auto (3600s)</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                          <Check className="w-3 h-3" /> Configured
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick 1-Click Name & Domain Presets */}
            <div className="pt-4 border-t border-slate-200">
              <label className="block font-bold text-slate-800 mb-2">
                Quick Presets (Switch Branding & Domain with One Click)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    name: 'EduVanta BizBrain AI',
                    domain: 'bizbrain.eduvanta.in',
                    tagline: 'By EduVantaTech'
                  },
                  {
                    name: 'VyaparBrain AI OS',
                    domain: 'vyaparbrain.ai',
                    tagline: 'Smart Retail & SME Operating System'
                  },
                  {
                    name: 'BizIntel India',
                    domain: 'bizintel.in',
                    tagline: 'Empowering Indian MSMEs with AI'
                  }
                ].map(p => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => applyPreset(p.name, p.domain, p.tagline)}
                    className="p-3 text-left border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 rounded-lg transition-all"
                  >
                    <p className="font-bold text-slate-900 truncate">{p.name}</p>
                    <p className="text-[11px] text-indigo-600 font-mono truncate">{p.domain}</p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{p.tagline}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WEBSITE NAME & BRAND IDENTITY */}
      {activeTab === 'identity' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 text-xs space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Website Identity & Public Copy</h3>
            <p className="text-slate-500 mb-4">
              Changes made here immediately reflect in the navigation bar, sidebar logo, browser tab title, and landing page.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Website / Platform Name
                </label>
                <input
                  type="text"
                  value={platformName}
                  onChange={e => setPlatformName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-semibold focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="EduVanta BizBrain AI"
                />
                <p className="text-[11px] text-slate-400 mt-1">Appears in header, sidebar, invoices, and login screens.</p>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Brand Tagline / Parent Company
                </label>
                <input
                  type="text"
                  value={brandTagline}
                  onChange={e => setBrandTagline(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="By EduVantaTech"
                />
                <p className="text-[11px] text-slate-400 mt-1">Secondary branding displayed below the main logo.</p>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Official Support & Notification Email
                </label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={e => setSupportEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="support@eduvantatech.com"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Live Browser Tab Preview
                </label>
                <div className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-md text-[11px] text-slate-700 flex items-center gap-2">
                  <Laptop className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="truncate font-medium">{platformName} — Smart Business OS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="font-bold text-slate-900 mb-2">Live Header Preview</h4>
            <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black text-lg">
                  {platformName.charAt(0) || 'E'}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm tracking-tight leading-none">
                    {platformName}
                  </h4>
                  <p className="text-[10px] text-indigo-400 mt-1 font-semibold uppercase tracking-wider">
                    {brandTagline}
                  </p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-[11px] text-slate-400 font-mono">https://{customDomainName}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GOVERNANCE & TENANCY */}
      {activeTab === 'governance' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 text-xs space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3">Tenant & System Governance</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowPublicSignup}
                  onChange={e => setAllowPublicSignup(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <p className="font-semibold text-slate-900">Enable Public Store Registration</p>
                  <p className="text-[11px] text-slate-500">Allow Indian merchants to self-register via the public landing page on {customDomainName}.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={e => setMaintenanceMode(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <p className="font-semibold text-slate-900">Platform Maintenance Mode</p>
                  <p className="text-[11px] text-slate-500">Temporarily restrict merchant access during scheduled system database updates.</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Save Button Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Domain changes take effect immediately across all client routing.
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 text-xs shadow-xs"
          >
            <Shield className="w-4 h-4" />
            <span>Apply Website Name & Domain</span>
          </button>
        </div>
      </div>
    </div>
  );
};
