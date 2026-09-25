import React from 'react';
import { ShieldCheck, Clock, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SystemActivity: React.FC = () => {
  const { auditLogs } = useApp();

  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">System Activity Audit Trail</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Immutable audit logs of administrative changes, user logins, tenant creations, and critical database actions.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action Code</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Tenant Scope</th>
                <th className="py-3 px-4">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">{log.userName}</td>
                  <td className="py-3 px-4 capitalize text-slate-600">{log.userRole.replace('_', ' ')}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{log.businessName || 'Platform'}</td>
                  <td className="py-3 px-4 text-slate-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
