import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  Copy, 
  Trash2, 
  Edit3, 
  Boxes, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight,
  Filter,
  Eye,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

export const ProductsList: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    suppliers, 
    currentBusiness,
    sales,
    inventoryMovements 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [detailedProduct, setDetailedProduct] = useState<Product | null>(null);

  // Form state
  const [form, setForm] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: 'Staples & Grains',
    brand: '',
    description: '',
    purchasePrice: 0,
    sellingPrice: 0,
    mrp: 0,
    taxRate: 5,
    currentStock: 20,
    minimumStock: 10,
    maximumStock: 100,
    supplierId: suppliers[0]?.id || '',
    unit: 'Pack'
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

    return matchesSearch && matchesCat && matchesStatus;
  });

  const handleStartAdd = () => {
    setEditingProduct(null);
    setForm({
      name: '',
      sku: `SKU-${Math.floor(100 + Math.random() * 900)}`,
      barcode: `8901058${Math.floor(100000 + Math.random() * 900000)}`,
      category: categories[0] || 'Staples & Grains',
      brand: '',
      description: '',
      purchasePrice: 100,
      sellingPrice: 125,
      mrp: 140,
      taxRate: 5,
      currentStock: 25,
      minimumStock: 10,
      maximumStock: 100,
      supplierId: suppliers[0]?.id || '',
      unit: 'Pack'
    });
    setIsAddModalOpen(true);
  };

  const handleStartEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      sku: p.sku,
      barcode: p.barcode || '',
      category: p.category,
      brand: p.brand || '',
      description: p.description || '',
      purchasePrice: p.purchasePrice,
      sellingPrice: p.sellingPrice,
      mrp: p.mrp,
      taxRate: p.taxRate,
      currentStock: p.currentStock,
      minimumStock: p.minimumStock,
      maximumStock: p.maximumStock,
      supplierId: p.supplierId || '',
      unit: p.unit
    });
    setIsAddModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      alert('Product name is required.');
      return;
    }

    const sup = suppliers.find(s => s.id === form.supplierId);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...form,
        supplierName: sup?.name
      });
    } else {
      addProduct({
        ...form,
        supplierName: sup?.name,
        status: form.currentStock <= 0 ? 'out_of_stock' : form.currentStock <= form.minimumStock ? 'low_stock' : 'in_stock'
      });
    }

    setIsAddModalOpen(false);
    setEditingProduct(null);
  };

  const handleDuplicate = (p: Product) => {
    addProduct({
      name: `${p.name} (Copy)`,
      sku: `${p.sku}-CP`,
      barcode: p.barcode,
      category: p.category,
      brand: p.brand,
      description: p.description,
      purchasePrice: p.purchasePrice,
      sellingPrice: p.sellingPrice,
      mrp: p.mrp,
      taxRate: p.taxRate,
      currentStock: p.currentStock,
      minimumStock: p.minimumStock,
      maximumStock: p.maximumStock,
      supplierId: p.supplierId,
      supplierName: p.supplierName,
      unit: p.unit,
      status: p.status
    });
    alert(`Duplicated ${p.name}`);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'SKU', 'Category', 'PurchasePrice', 'SellingPrice', 'MRP', 'TaxRate', 'Stock', 'MinStock', 'Status'];
    const rows = products.map(p => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      p.sku,
      `"${p.category}"`,
      p.purchasePrice,
      p.sellingPrice,
      p.mrp,
      p.taxRate,
      p.currentStock,
      p.minimumStock,
      p.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `eduvanta_products_${currentBusiness?.id || 'export'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Products Catalog</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage SKUs, pricing margins, barcodes, supplier links, and minimum inventory thresholds.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleStartAdd}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by title, SKU, brand..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
            >
              <option value="all">All Stock Statuses</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock Alerts</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Product Name & SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Cost Price</th>
                <th className="py-3 px-4">Selling Price</th>
                <th className="py-3 px-4">Margin</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(p => {
                const margin = p.sellingPrice - p.purchasePrice;
                const marginPct = Math.round((margin / p.purchasePrice) * 100);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-900 leading-tight">{p.name}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 font-mono">
                        <span>{p.sku}</span>
                        {p.barcode && <span>· {p.barcode}</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{p.category}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">₹{p.purchasePrice}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                      ₹{p.sellingPrice}
                      {p.mrp > p.sellingPrice && (
                        <span className="text-[10px] text-slate-400 line-through ml-1">₹{p.mrp}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-700 font-semibold font-mono text-[11px]">
                        +₹{margin} ({marginPct}%)
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span className="font-bold text-slate-900">{p.currentStock} {p.unit}</span>
                      <span className="text-slate-400 text-[10px] block">Min: {p.minimumStock}</span>
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
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Detail Modal trigger */}
                        <button
                          onClick={() => setDetailedProduct(p)}
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                          title="View Product Insights"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Duplicate */}
                        <button
                          onClick={() => handleDuplicate(p)}
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                          title="Duplicate"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1 text-rose-400 hover:text-rose-700 hover:bg-rose-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden text-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingProduct ? `Edit ${editingProduct.name}` : 'Add New Product to Catalog'}
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Aashirvaad Shudh Chakki Atta (5kg)"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">SKU Code</label>
                  <input
                    type="text"
                    value={form.sku}
                    onChange={e => setForm({ ...form, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Barcode / EAN</label>
                  <input
                    type="text"
                    value={form.barcode}
                    onChange={e => setForm({ ...form, barcode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Tata, Amul, Nestle"
                    value={form.brand}
                    onChange={e => setForm({ ...form, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Purchase Price (₹)</label>
                  <input
                    type="number"
                    value={form.purchasePrice}
                    onChange={e => setForm({ ...form, purchasePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={form.sellingPrice}
                    onChange={e => setForm({ ...form, sellingPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={form.mrp}
                    onChange={e => setForm({ ...form, mrp: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">GST Tax Rate (%)</label>
                  <select
                    value={form.taxRate}
                    onChange={e => setForm({ ...form, taxRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white"
                  >
                    <option value={0}>0% GST (Exempt)</option>
                    <option value={5}>5% GST</option>
                    <option value={12}>12% GST</option>
                    <option value={18}>18% GST</option>
                    <option value={28}>28% GST</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={form.currentStock}
                    onChange={e => setForm({ ...form, currentStock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Low-Stock Alert Level</label>
                  <input
                    type="number"
                    value={form.minimumStock}
                    onChange={e => setForm({ ...form, minimumStock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Assigned Supplier</label>
                  <select
                    value={form.supplierId}
                    onChange={e => setForm({ ...form, supplierId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white"
                  >
                    <option value="">None / Self Procurement</option>
                    {suppliers.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Unit of Measure</label>
                  <input
                    type="text"
                    placeholder="Pack, Kg, Ltr, Pouch, Box"
                    value={form.unit}
                    onChange={e => setForm({ ...form, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Key features, pack size, storage conditions..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs"
                />
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-3 py-1.5 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal (History, Movements, AI Insights) */}
      {detailedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden text-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{detailedProduct.name}</h3>
                <p className="text-[11px] text-slate-500 font-mono">SKU: {detailedProduct.sku} · {detailedProduct.category}</p>
              </div>
              <button 
                onClick={() => setDetailedProduct(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Financial Snapshot */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Current Stock</p>
                  <p className="text-base font-bold text-slate-900 font-mono">{detailedProduct.currentStock} {detailedProduct.unit}</p>
                  <p className="text-[10px] text-slate-400">Min Safety: {detailedProduct.minimumStock}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Pricing</p>
                  <p className="font-bold text-slate-900 font-mono">₹{detailedProduct.sellingPrice}</p>
                  <p className="text-[10px] text-slate-400">Cost: ₹{detailedProduct.purchasePrice} (MRP ₹{detailedProduct.mrp})</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Supplier</p>
                  <p className="font-semibold text-slate-800 truncate">{detailedProduct.supplierName || 'Distributor'}</p>
                  <p className="text-[10px] text-slate-400">GST: {detailedProduct.taxRate}%</p>
                </div>
              </div>

              {/* AI Product Insight */}
              <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-lg space-y-1">
                <span className="font-bold text-indigo-900 text-[11px] flex items-center gap-1.5">
                  <span>BizBrain Co-Pilot Insight</span>
                </span>
                <p className="text-slate-800 leading-relaxed">
                  {detailedProduct.currentStock <= detailedProduct.minimumStock
                    ? `Critical safety threshold reached (${detailedProduct.currentStock} units left). At current checkout velocity, estimated stockout in 1-2 days. Place an order with ${detailedProduct.supplierName || 'your distributor'}.`
                    : `Healthy inventory level. Gross unit contribution is ₹${detailedProduct.sellingPrice - detailedProduct.purchasePrice}. Keep maintaining buffer.`}
                </p>
              </div>

              {/* Recent Movements for this product */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Recent Inventory Movements</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                  {inventoryMovements
                    .filter(m => m.productId === detailedProduct.id)
                    .slice(0, 5)
                    .map(m => (
                      <div key={m.id} className="p-2.5 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-800 capitalize">{m.type.replace('_', ' ')}</p>
                          <p className="text-[10px] text-slate-400">{m.reason} · by {m.user}</p>
                        </div>
                        <div className="text-right font-mono">
                          <span className={`font-bold ${m.type === 'stock_in' ? 'text-emerald-700' : 'text-slate-700'}`}>
                            {m.type === 'stock_in' ? '+' : '-'}{m.quantity}
                          </span>
                          <span className="text-[10px] text-slate-400 block">{new Date(m.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  {inventoryMovements.filter(m => m.productId === detailedProduct.id).length === 0 && (
                    <div className="p-4 text-center text-slate-400 text-xs">
                      No stock movement ledger records found yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setDetailedProduct(null)}
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
