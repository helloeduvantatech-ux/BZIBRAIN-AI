import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  CheckCircle2, 
  Printer, 
  User, 
  Percent, 
  QrCode,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, PaymentMethod, Sale } from '../../types';

export const SalesPOS: React.FC = () => {
  const { products, customers, recordSale, currentBusiness } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Cart state
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [orderNotes, setOrderNotes] = useState('');

  // Completed sale receipt modal
  const [completedSale, setCompletedSale] = useState<Sale | null>(null);

  // Filter products for POS
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.barcode && p.barcode.includes(searchTerm));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  // Cart operations
  const addToCart = (product: Product) => {
    if (product.currentStock <= 0) {
      alert(`Cannot add ${product.name} — currently out of stock!`);
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.currentStock) {
          alert(`Only ${product.currentStock} units available in stock!`);
          return prev;
        }
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          if (newQty > item.product.currentStock) {
            alert(`Only ${item.product.currentStock} units available in stock!`);
            return item;
          }
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as { product: Product; quantity: number }[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.product.sellingPrice * item.quantity), 0);
  const taxTotal = cart.reduce((sum, item) => {
    const lineSubtotal = item.product.sellingPrice * item.quantity;
    return sum + Math.round((lineSubtotal * item.product.taxRate) / 100);
  }, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = subtotal + taxTotal - discountAmount;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty. Please select products to complete sale.');
      return;
    }

    const customer = customers.find(c => c.id === selectedCustomerId);

    const sale = recordSale({
      items: cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      customerId: selectedCustomerId || undefined,
      customerName: customer ? customer.name : 'Walk-in Customer',
      customerPhone: customer?.phone,
      paymentMethod,
      discountPercentage: discountPercent,
      notes: orderNotes
    });

    setCompletedSale(sale);
    setCart([]);
    setDiscountPercent(0);
    setOrderNotes('');
  };

  return (
    <div className="space-y-4">
      {/* POS Screen: Two Column Grid (Product Catalog on Left, Billing Register on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Section: Catalog (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {/* Search & Category Filter */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by name, SKU, or scan barcode..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Category horizontal scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-slate-900 text-white font-semibold' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-slate-900 text-white font-semibold' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredProducts.map(prod => {
              const isOutOfStock = prod.currentStock <= 0;
              const isLowStock = prod.currentStock <= prod.minimumStock && !isOutOfStock;
              return (
                <div
                  key={prod.id}
                  onClick={() => !isOutOfStock && addToCart(prod)}
                  className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between select-none ${
                    isOutOfStock
                      ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                      : 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-xs cursor-pointer active:scale-98'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] text-slate-400 font-mono truncate">{prod.sku}</span>
                      <span className="text-[10px] text-slate-400">{prod.taxRate}% GST</span>
                    </div>
                    <p className="font-semibold text-slate-900 text-xs mt-1 line-clamp-2 leading-tight">
                      {prod.name}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="font-bold text-slate-900 font-mono text-sm">
                        ₹{prod.sellingPrice}
                      </span>
                      {prod.mrp > prod.sellingPrice && (
                        <span className="text-[10px] text-slate-400 line-through ml-1 font-mono">
                          ₹{prod.mrp}
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-mono font-semibold ${
                      isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-600' : 'text-slate-400'
                    }`}>
                      {prod.currentStock} left
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Section: Billing Register / Cart (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between shadow-xs">
          {/* Cart Header */}
          <div className="p-4 border-b border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">Current Order Register</h3>
              </div>
              {cart.length > 0 && (
                <button
                  onClick={() => setCart([])}
                  className="text-xs text-rose-600 hover:text-rose-800 font-medium"
                >
                  Clear Cart
                </button>
              )}
            </div>

            {/* Customer Picker */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Select Customer</label>
              <select
                value={selectedCustomerId}
                onChange={e => setSelectedCustomerId(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-800"
              >
                <option value="">Walk-in Customer (Counter Sale)</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.phone}) {c.status === 'vip' ? '★ VIP' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5 max-h-[300px]">
            {cart.map(item => (
              <div 
                key={item.product.id} 
                className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs"
              >
                <div className="truncate pr-2">
                  <p className="font-semibold text-slate-900 truncate">{item.product.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    ₹{item.product.sellingPrice} × {item.quantity} = ₹{(item.product.sellingPrice * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center border border-slate-300 rounded-md bg-white">
                    <button
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="p-1 hover:bg-slate-100 text-slate-600 rounded-l"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 font-mono font-bold text-slate-900 text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="p-1 hover:bg-slate-100 text-slate-600 rounded-r"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-xs">
                <ShoppingCart className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <span>Cart is empty. Tap items on the left to add.</span>
              </div>
            )}
          </div>

          {/* Totals & Payment Checkout Panel */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-3 text-xs">
            {/* Discount & Payment mode row */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-semibold text-slate-500 block mb-0.5">Discount (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discountPercent}
                    onChange={e => setDiscountPercent(Math.min(100, Math.max(0, Number(e.target.value))))}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-xs font-mono bg-white"
                  />
                  <Percent className="w-3 h-3 text-slate-400 absolute right-2 top-2" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-500 block mb-0.5">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-xs bg-white text-slate-900 font-medium"
                >
                  <option value="UPI">UPI (PhonePe, GPay, Paytm)</option>
                  <option value="Cash">Cash Currency</option>
                  <option value="Card">Debit / Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer / NEFT</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1 pt-1 border-t border-slate-200 text-slate-600 font-mono text-[11px]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Calculated Tax (GST):</span>
                <span>+₹{taxTotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount ({discountPercent}%):</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Amount Due:</span>
                <span className="text-base text-indigo-700">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Complete Sale Action Button */}
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Sale & Deduct Stock (₹{grandTotal.toLocaleString('en-IN')})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sale Receipt & Invoice Modal */}
      {completedSale && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">Sale Completed Successfully</h3>
              </div>
              <button 
                onClick={() => setCompletedSale(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Receipt Layout */}
            <div className="p-6 space-y-4 font-mono text-slate-800">
              <div className="text-center space-y-0.5">
                <h4 className="font-bold font-sans text-base text-slate-900">{currentBusiness?.name}</h4>
                <p className="text-[10px] text-slate-500 font-sans">{currentBusiness?.location.address}, {currentBusiness?.location.city}</p>
                <p className="text-[10px] text-slate-500">GSTIN: {currentBusiness?.gstNumber || '27AADCB2234P1Z8'}</p>
                <div className="pt-2 text-xs font-bold border-b border-dashed border-slate-300 pb-2">
                  TAX INVOICE: {completedSale.id}
                </div>
              </div>

              <div className="text-[11px] space-y-0.5 border-b border-dashed border-slate-300 pb-2">
                <p>Date: {new Date(completedSale.createdAt).toLocaleString()}</p>
                <p>Customer: {completedSale.customerName} {completedSale.customerPhone ? `(${completedSale.customerPhone})` : ''}</p>
                <p>Payment: {completedSale.paymentMethod} (PAID)</p>
                <p>Cashier: {completedSale.createdByName}</p>
              </div>

              {/* Items List */}
              <div className="space-y-1.5 border-b border-dashed border-slate-300 pb-2 text-[11px]">
                {completedSale.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <div>
                      <p className="font-semibold">{item.productName}</p>
                      <span className="text-[10px] text-slate-500">{item.quantity} × ₹{item.unitPrice} (GST {item.taxRate}%)</span>
                    </div>
                    <span className="font-bold">₹{item.total}</span>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-1 text-[11px] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{completedSale.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Tax:</span>
                  <span>₹{completedSale.taxAmount}</span>
                </div>
                {completedSale.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount:</span>
                    <span>-₹{completedSale.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t border-slate-300">
                  <span>GRAND TOTAL:</span>
                  <span>₹{completedSale.totalAmount}</span>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-400 font-sans pt-2">
                Inventory was automatically updated in your stock ledger.
                <br />Thank you for shopping with us!
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-md font-medium text-slate-700 hover:bg-slate-100"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={() => setCompletedSale(null)}
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700"
              >
                Done / Next Sale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
