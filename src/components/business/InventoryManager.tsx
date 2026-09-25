import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Minus, 
  AlertTriangle, 
  RotateCcw, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search, 
  History,
  X,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InventoryMovementType } from '../../types';

export const InventoryManager: React.FC = () => {
  const { products, inventoryMovements, adjustStock, suppliers } = useApp();

  const [activeTab, setActiveTab] = useState<'levels' | 'movements'>('levels');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Adjustment Modal
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [adjustType, setAdjustType] = useState<InventoryMovementType>('stock_in');
  const [quantity, setQuantity] = useState(10);
  const [reason, setReason] = useState('Distributor Stock Replenishment');

  const lowStockCount = products.filter(p => p.currentStock <= p.minimumStock).length;
  const outOfStockCount = products.filter(p => p.currentStock <= 0).length;
  const totalStockUnits = products.reduce((acc, p) => acc + p.currentStock, 0);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMovements = inventoryMovements.filter(m => 
    m.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdjust = (prodId?: string, type?: InventoryMovementType) => {
    setSelectedProductId(prodId || products[0]?.id || '');
    setAdjustType(type || 'stock_in');
    setQuantity(10);
    setReason(type === 'damaged' ? 'Packaging damaged during handling' : 'Distributor Stock Replenishment');
    setIsAdjustModalOpen(true);
  };

  const handleSaveAdjustment = () => {
    if (!selectedProductId || quantity <= 0) return;
    adjustStock(selectedProductId, adjustType, quantity, reason);
    setIsAdjustModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Inventory & Stock Control</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit inventory buffers, record stock arrivals, log damaged/returned items, and inspect movement history.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenAdjust(undefined, 'stock_in')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Stock In (+)</span>
          </button>
          <button
            onClick={() => handleOpenAdjust(undefined, 'damaged')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Minus className="w-4 h-4" />
            <span>Adjust / Damaged</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-medium text-slate-500">Total Stock On Hand</span>
          <p className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">{totalStockUnits.toLocaleString()} units</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Across {products.length} catalog items</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-medium text-slate-500">Low Stock Items</span>
          <p className="text-2xl font-bold text-amber-700 mt-1 font-mono tabular-nums">{lowStockCount}</p>
          <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Under minimum threshold</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-medium text-slate-500">Out of Stock</span>
          <p className="text-2xl font-bold text-rose-700 mt-1 font-mono tabular-nums">{outOfStockCount}</p>
          <p className="text-[11px] text-rose-600 font-semibold mt-0.5">Urgent PO required</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-medium text-slate-500">Stock Movements Logged</span>
          <p className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">{inventoryMovements.length}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Audit-verified history</p>
        </div>
      </div>

      {/* Tab bar + Search */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('levels')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'levels' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Current Stock Levels
          </button>
          <button
            onClick={() => setActiveTab('movements')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'movements' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Inventory Movement Ledger ({inventoryMovements.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search items or movements..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs"
          />
        </div>
      </div>

      {/* Tab 1: Current Stock Levels */}
      {activeTab === 'levels' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Item & SKU</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Current Stock</th>
                  <th className="py-3 px-4">Safety Buffer</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Supplier</th>
                  <th className="py-3 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-900">{p.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{p.sku}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{p.category}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 text-sm">
                      {p.currentStock} {p.unit}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono">
                      Min: {p.minimumStock} · Max: {p.maximumStock}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 font-medium capitalize ${
                        p.status === 'in_stock' ? 'text-emerald-700' :
                        p.status === 'low_stock' ? 'text-amber-700' :
                        'text-rose-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          p.status === 'in_stock' ? 'bg-emerald-500' :
                          p.status === 'low_stock' ? 'bg-amber-500' :
                          'bg-rose-500'
                        }`} />
                        {p.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{p.supplierName || 'Distributor'}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenAdjust(p.id, 'stock_in')}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded font-semibold text-[11px]"
                          title="Restock"
                        >
                          + In
                        </button>
                        <button
                          onClick={() => handleOpenAdjust(p.id, 'damaged')}
                          className="px-2 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded font-semibold text-[11px]"
                          title="Damage"
                        >
                          - Damaged
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Inventory Movement Ledger */}
      {activeTab === 'movements' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Movement Type</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Stock Shift</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Authorized User</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMovements.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                      {new Date(m.date).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{m.productName}</td>
                    <td className="py-3 px-4 capitalize">
                      <span className={`font-semibold ${
                        m.type === 'stock_in' ? 'text-emerald-700' :
                        m.type === 'sale_deduction' ? 'text-indigo-700' :
                        m.type === 'damaged' ? 'text-rose-700' :
                        'text-slate-700'
                      }`}>
                        {m.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold">
                      {m.type === 'stock_in' || m.type === 'returned' ? '+' : '-'}{m.quantity}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                      {m.previousStock} → <strong>{m.newStock}</strong>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{m.reason}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{m.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {isAdjustModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">Record Inventory Adjustment</h3>
              <button 
                onClick={() => setIsAdjustModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Select Product *</label>
                <select
                  value={selectedProductId}
                  onChange={e => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Current: {p.currentStock} {p.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Adjustment Type</label>
                  <select
                    value={adjustType}
                    onChange={e => setAdjustType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800 font-medium"
                  >
                    <option value="stock_in">Stock In (Replenish)</option>
                    <option value="stock_out">Stock Out (Manual Transfer)</option>
                    <option value="damaged">Damaged Stock</option>
                    <option value="returned">Customer Return</option>
                    <option value="adjustment">Audit Count Adjustment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Reason / Note</label>
                <input
                  type="text"
                  placeholder="e.g. Broken packaging, Distributor batch arrival, Stock count correction"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                />
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => setIsAdjustModalOpen(false)}
                className="px-3 py-1.5 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAdjustment}
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700"
              >
                Apply Stock Movement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
