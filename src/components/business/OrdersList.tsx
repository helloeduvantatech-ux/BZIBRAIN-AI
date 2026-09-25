import React, { useState } from 'react';
import { PackageCheck, Search, Filter, Clock, CheckCircle2, AlertCircle, X, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';

export const OrdersList: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [inspectingOrder, setInspectingOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (o.customerPhone && o.customerPhone.includes(searchTerm));
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses: OrderStatus[] = ['pending', 'confirmed', 'processing', 'ready', 'completed', 'cancelled', 'returned'];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Orders Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track customer order dispatch stages, fulfillments, packaging, and payments.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, phone..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs"
          />
        </div>

        {/* Status Pills / Segmented Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              statusFilter === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Orders ({orders.length})
          </button>
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap capitalize transition-colors ${
                statusFilter === st ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items Summary</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map(ord => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-700">{ord.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{ord.customerName}</p>
                    <p className="text-[11px] text-slate-400">{ord.customerPhone || 'Counter Pick'}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="font-medium text-slate-800">{ord.items.length} items</span> ({ord.items.map(i => i.productName.split(' ')[0]).slice(0, 2).join(', ')}...)
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-emerald-700 uppercase text-[11px]">
                      {ord.paymentStatus} ({ord.paymentMethod})
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={ord.orderStatus}
                      onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="px-2 py-1 border border-slate-300 rounded text-xs capitalize bg-white font-medium text-slate-800"
                    >
                      {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setInspectingOrder(ord)}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                      title="View Order Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Order Modal */}
      {inspectingOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden text-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">Order {inspectingOrder.id} Details</h3>
              <button 
                onClick={() => setInspectingOrder(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Customer</p>
                  <p className="font-bold text-slate-900">{inspectingOrder.customerName}</p>
                  <p className="text-slate-600">{inspectingOrder.customerPhone}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Payment & Method</p>
                  <p className="font-bold text-emerald-700">{inspectingOrder.paymentStatus.toUpperCase()} via {inspectingOrder.paymentMethod}</p>
                  <p className="text-slate-500 font-mono text-[11px]">{new Date(inspectingOrder.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Order Line Items</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                  {inspectingOrder.items.map((item, idx) => (
                    <div key={idx} className="p-2.5 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{item.productName}</p>
                        <p className="text-[10px] text-slate-500">{item.quantity} units × ₹{item.unitPrice}</p>
                      </div>
                      <span className="font-mono font-bold text-slate-900">₹{item.total}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 font-bold text-sm">
                <span>Total Amount:</span>
                <span className="font-mono text-indigo-700">₹{inspectingOrder.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setInspectingOrder(null)}
                className="px-4 py-1.5 bg-slate-800 text-white rounded-md font-semibold hover:bg-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
