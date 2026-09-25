import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  TrendingUp, 
  Calendar, 
  Filter, 
  DollarSign, 
  Boxes, 
  Users, 
  Receipt 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsHub: React.FC = () => {
  const { sales, products, expenses, customers, currentBusiness } = useApp();
  const [reportType, setReportType] = useState<'sales' | 'products' | 'inventory' | 'expenses' | 'profit' | 'customers'>('sales');
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | '3m' | '1y'>('30d');

  // Aggregations
  const totalSalesRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);
  const totalOrdersCount = sales.length;
  const totalUnitsSold = sales.reduce((sum, s) => sum + s.items.reduce((acc, i) => acc + i.quantity, 0), 0);
  const avgOrderValue = Math.round(totalSalesRevenue / Math.max(1, totalOrdersCount));

  const totalStockValue = products.reduce((sum, p) => sum + (p.currentStock * p.purchasePrice), 0);
  const totalRetailStockValue = products.reduce((sum, p) => sum + (p.currentStock * p.sellingPrice), 0);
  const lowStockCount = products.filter(p => p.currentStock <= p.minimumStock).length;
  const outOfStockCount = products.filter(p => p.currentStock <= 0).length;

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const estimatedProfit = totalSalesRevenue - totalExpenses;

  // Product sales mapping
  const productSalesMap: Record<string, { name: string; category: string; units: number; revenue: number }> = {};
  sales.forEach(s => {
    s.items.forEach(i => {
      if (!productSalesMap[i.productId]) {
        const prod = products.find(p => p.id === i.productId);
        productSalesMap[i.productId] = { 
          name: i.productName, 
          category: prod?.category || 'General', 
          units: 0, 
          revenue: 0 
        };
      }
      productSalesMap[i.productId].units += i.quantity;
      productSalesMap[i.productId].revenue += i.total;
    });
  });

  const productSalesReport = Object.values(productSalesMap).sort((a, b) => b.units - a.units);

  // Expense categories mapping
  const expenseCatMap: Record<string, number> = {};
  expenses.forEach(e => {
    expenseCatMap[e.category] = (expenseCatMap[e.category] || 0) + e.amount;
  });

  const handleExportCSV = () => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];
    let filename = `eduvanta_${reportType}_report.csv`;

    if (reportType === 'sales') {
      headers = ['Invoice ID', 'Date', 'Customer', 'Items Count', 'Payment Method', 'Total Amount'];
      rows = sales.map(s => [s.id, s.createdAt, `"${s.customerName}"`, s.items.length, s.paymentMethod, s.totalAmount]);
    } else if (reportType === 'products') {
      headers = ['Product Name', 'Category', 'Units Sold', 'Total Revenue'];
      rows = productSalesReport.map(p => [`"${p.name}"`, `"${p.category}"`, p.units, p.revenue]);
    } else if (reportType === 'inventory') {
      headers = ['Product Name', 'SKU', 'Current Stock', 'Cost Price', 'Stock Value Cost', 'Status'];
      rows = products.map(p => [`"${p.name}"`, p.sku, p.currentStock, p.purchasePrice, p.currentStock * p.purchasePrice, p.status]);
    } else if (reportType === 'expenses') {
      headers = ['Date', 'Category', 'Description', 'Amount', 'Payment Method'];
      rows = expenses.map(e => [e.date, e.category, `"${e.description}"`, e.amount, e.paymentMethod]);
    } else if (reportType === 'profit') {
      headers = ['Metric', 'Amount (INR)'];
      rows = [
        ['Total Sales Revenue', totalSalesRevenue],
        ['Total Operating Expenses', totalExpenses],
        ['Estimated Operating Profit', estimatedProfit]
      ];
    } else {
      headers = ['Customer Name', 'Phone', 'Total Orders', 'Total Spent', 'Tier'];
      rows = customers.map(c => [`"${c.name}"`, c.phone, c.totalOrders, c.totalSpent, c.status]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Business Reports & Ledgers</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-grade business intelligence, revenue statements, and inventory valuation for <strong>{currentBusiness?.name}</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector + Date Range */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
        {/* Report Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'sales', label: 'Sales Report', icon: TrendingUp },
            { id: 'products', label: 'Product Report', icon: Boxes },
            { id: 'inventory', label: 'Inventory Report', icon: Boxes },
            { id: 'expenses', label: 'Expense Report', icon: Receipt },
            { id: 'profit', label: 'Profit Report', icon: DollarSign },
            { id: 'customers', label: 'Customer Report', icon: Users },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = reportType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setReportType(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Date Filter */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Reporting Period:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['today', '7d', '30d', '3m', '1y'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDateRange(d)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  dateRange === d ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {d === 'today' ? 'Today' : d === '7d' ? '7 Days' : d === '30d' ? '30 Days' : d === '3m' ? '3 Months' : '1 Year'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* REPORT CONTENT PANELS */}

      {/* 1. SALES REPORT */}
      {reportType === 'sales' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500">Gross Sales Revenue</span>
              <p className="text-xl font-bold text-slate-900 mt-1 font-mono">₹{totalSalesRevenue.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500">Total Invoices</span>
              <p className="text-xl font-bold text-slate-900 mt-1 font-mono">{totalOrdersCount}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500">Total Units Sold</span>
              <p className="text-xl font-bold text-slate-900 mt-1 font-mono">{totalUnitsSold}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500">Average Order Value (AOV)</span>
              <p className="text-xl font-bold text-slate-900 mt-1 font-mono">₹{avgOrderValue.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Units</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sales.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-mono font-medium">{s.id}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{new Date(s.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{s.customerName}</td>
                      <td className="py-3 px-4 font-mono">{s.items.reduce((acc, i) => acc + i.quantity, 0)}</td>
                      <td className="py-3 px-4">{s.paymentMethod}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold">₹{s.totalAmount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. PRODUCT REPORT */}
      {reportType === 'products' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">Product Sales Velocity & Contribution</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 font-mono">Units Sold</th>
                    <th className="py-3 px-4 text-right">Total Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {productSalesReport.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">{p.name}</td>
                      <td className="py-3 px-4 text-slate-600">{p.category}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{p.units}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-indigo-700">₹{p.revenue.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. INVENTORY REPORT */}
      {reportType === 'inventory' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500">Stock Valuation (Cost)</span>
              <p className="text-xl font-bold text-slate-900 mt-1 font-mono">₹{totalStockValue.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500">Retail Value (MRP)</span>
              <p className="text-xl font-bold text-slate-900 mt-1 font-mono">₹{totalRetailStockValue.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500">Low Stock SKUs</span>
              <p className="text-xl font-bold text-amber-700 mt-1 font-mono">{lowStockCount}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500">Out of Stock SKUs</span>
              <p className="text-xl font-bold text-rose-700 mt-1 font-mono">{outOfStockCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Item & SKU</th>
                    <th className="py-3 px-4">Stock on Hand</th>
                    <th className="py-3 px-4">Unit Cost</th>
                    <th className="py-3 px-4 text-right">Holding Value</th>
                    <th className="py-3 px-4 text-right">Stock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-slate-900">{p.name}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{p.currentStock} {p.unit}</td>
                      <td className="py-3 px-4 font-mono">₹{p.purchasePrice}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold">₹{(p.currentStock * p.purchasePrice).toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`capitalize font-semibold ${
                          p.status === 'in_stock' ? 'text-emerald-700' :
                          p.status === 'low_stock' ? 'text-amber-700' : 'text-rose-700'
                        }`}>
                          {p.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. EXPENSE REPORT */}
      {reportType === 'expenses' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(expenseCatMap).map(([cat, amt]) => (
              <div key={cat} className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500">{cat}</span>
                <p className="text-lg font-bold text-slate-900 mt-1 font-mono">₹{amt.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PROFIT REPORT */}
      {reportType === 'profit' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Operating Profit & Loss Statement</h3>
            <div className="space-y-3 font-mono text-xs max-w-md">
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span>Gross Counter Sales Revenue:</span>
                <span className="font-bold text-slate-900">₹{totalSalesRevenue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200 text-rose-700">
                <span>Total Operational Cash Expenses:</span>
                <span className="font-bold">-₹{totalExpenses.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-3 font-bold text-base border-t-2 border-slate-900 text-emerald-700">
                <span>Estimated Operating Profit:</span>
                <span>₹{estimatedProfit.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              * Note: Operating profit is an operational estimate based on recorded POS sales and logged expense vouchers.
            </p>
          </div>
        </div>
      )}

      {/* 6. CUSTOMER REPORT */}
      {reportType === 'customers' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Orders</th>
                  <th className="py-3 px-4 font-mono">Total Spend</th>
                  <th className="py-3 px-4 text-right">Loyalty Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-semibold text-slate-900">{c.name}</td>
                    <td className="py-3 px-4 font-mono">{c.phone}</td>
                    <td className="py-3 px-4 font-mono">{c.totalOrders}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-right uppercase font-semibold text-indigo-700">{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
