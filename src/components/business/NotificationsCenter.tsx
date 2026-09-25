import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertTriangle, AlertCircle, Sparkles, Filter, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsCenter: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [filterType, setFilterType] = useState('all');

  const filteredNotifs = notifications.filter(n => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return !n.isRead;
    return n.type === filterType;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Notification Center</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational alerts, automated inventory threshold warnings, and BizBrain AI business digests.
          </p>
        </div>
        {notifications.some(n => !n.isRead) && (
          <button
            onClick={markAllNotificationsRead}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 self-start sm:self-auto"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${filterType === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600'}`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilterType('unread')}
          className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${filterType === 'unread' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600'}`}
        >
          Unread ({notifications.filter(n => !n.isRead).length})
        </button>
        <button
          onClick={() => setFilterType('low_stock')}
          className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${filterType === 'low_stock' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600'}`}
        >
          Low Stock Alerts
        </button>
        <button
          onClick={() => setFilterType('ai_business_alert')}
          className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${filterType === 'ai_business_alert' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600'}`}
        >
          BizBrain AI Alerts
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {filteredNotifs.map(notif => (
          <div
            key={notif.id}
            onClick={() => markNotificationRead(notif.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
              !notif.isRead 
                ? 'bg-white border-indigo-200 shadow-xs ring-1 ring-indigo-50' 
                : 'bg-slate-50/60 border-slate-200 opacity-80'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {!notif.isRead && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                <h3 className={`text-xs font-bold ${!notif.isRead ? 'text-indigo-950' : 'text-slate-800'}`}>
                  {notif.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
            </div>

            <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap shrink-0">
              {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        {filteredNotifs.length === 0 && (
          <div className="bg-white p-12 text-center text-slate-400 text-xs rounded-xl border border-slate-200">
            No notifications in this filter view.
          </div>
        )}
      </div>
    </div>
  );
};
