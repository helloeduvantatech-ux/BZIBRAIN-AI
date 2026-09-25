import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';

export const HelpSupportView: React.FC = () => {
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqs = [
    {
      q: 'How does BizBrain AI keep my business data private from other shops?',
      a: 'EduVanta BizBrain AI operates on a multi-tenant tenant isolation architecture. Every database query, sales record, and inventory update is strictly scoped by your unique Business ID. The AI co-pilot only ingests and reasons over your store\'s numbers.'
    },
    {
      q: 'How do low-stock inventory alerts work?',
      a: 'Whenever a product\'s stock drops below its configured Minimum Stock threshold (or zero), an instant alert is triggered in your Notification Center and highlighted on your dashboard with one-click restock options.'
    },
    {
      q: 'Can I print GST tax invoices directly from the counter POS?',
      a: 'Yes! Upon completing any sale via UPI, Cash, or Card, a printable thermal receipt is instantly rendered with your GSTIN, itemized taxes, and customer details.'
    },
    {
      q: 'How do staff role permissions work?',
      a: 'Staff accounts can record counter sales and check stock, but are prevented from seeing overall store profits, changing GST configurations, or managing team salaries.'
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    setTicketSubmitted(true);
    setTicketSubject('');
    setTicketMessage('');
    setTimeout(() => setTicketSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-5 rounded-xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Help & Merchant Support</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Dedicated assistance from EduVantaTech · FAQs, guides, and priority merchant helpline.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-1">
          <Phone className="w-5 h-5 text-indigo-600 mb-1" />
          <h3 className="font-bold text-slate-900">Priority Helpline</h3>
          <p className="text-slate-500">+91 1800-889-9942</p>
          <p className="text-[10px] text-slate-400">Mon - Sat, 08:00 AM - 10:00 PM IST</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-1">
          <MessageSquare className="w-5 h-5 text-emerald-600 mb-1" />
          <h3 className="font-bold text-slate-900">WhatsApp Merchant Desk</h3>
          <p className="text-slate-500">+91 98200 44551</p>
          <p className="text-[10px] text-slate-400">Instant billing & setup queries</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-1">
          <Mail className="w-5 h-5 text-blue-600 mb-1" />
          <h3 className="font-bold text-slate-900">Email Support</h3>
          <p className="text-slate-500">support@eduvantatech.com</p>
          <p className="text-[10px] text-slate-400">Guaranteed 2-hour response SLA</p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Frequently Asked Questions</h3>
        <div className="divide-y divide-slate-100 text-xs">
          {faqs.map((faq, i) => (
            <div key={i} className="py-3 space-y-1">
              <p className="font-semibold text-slate-900">{faq.q}</p>
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Support Ticket Submission */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Submit a Support Ticket</h3>
        {ticketSubmitted ? (
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Ticket submitted successfully! An EduVantaTech specialist will contact you shortly.</span>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Issue Subject</label>
              <input
                type="text"
                placeholder="e.g. Question about thermal receipt printer pairing"
                value={ticketSubject}
                onChange={e => setTicketSubject(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Detailed Description</label>
              <textarea
                rows={3}
                placeholder="Describe what happened or what you need assistance with..."
                value={ticketMessage}
                onChange={e => setTicketMessage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
            >
              Submit Ticket to Support Team
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
