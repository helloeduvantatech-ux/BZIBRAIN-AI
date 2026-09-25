/**
 * EduVanta BizBrain AI — Core Types and Domain Entities
 */

export type UserRole = 'super_admin' | 'business_owner' | 'staff';

export type StaffPermission = 
  | 'record_sales' 
  | 'view_products' 
  | 'manage_inventory' 
  | 'view_orders' 
  | 'manage_customers' 
  | 'view_reports';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  businessId?: string; // null for super_admin
  status: 'active' | 'suspended' | 'inactive';
  permissions?: StaffPermission[];
  createdAt: string;
  lastLogin?: string;
}

export type BusinessCategoryType = 
  | 'Retail' 
  | 'Grocery' 
  | 'Clothing' 
  | 'Electronics' 
  | 'Stationery' 
  | 'Restaurant' 
  | 'Cafe' 
  | 'Pharmacy' 
  | 'Beauty' 
  | 'Services' 
  | 'Manufacturing' 
  | 'Education' 
  | 'Freelance' 
  | 'Other';

export interface BusinessCategory {
  id: string;
  name: string;
  description: string;
  defaultGstRate: number;
  iconName?: string;
  isActive: boolean;
  businessCount: number;
}

export interface CustomDomainConfig {
  domain: string;
  cnameRecord: string;
  aRecord: string;
  status: 'active' | 'pending_dns' | 'ssl_issuing';
  sslActive: boolean;
  verifiedAt?: string;
}

export interface PlatformSettings {
  platformName: string;
  brandTagline: string;
  primaryDomain: string;
  supportEmail: string;
  allowPublicSignup: boolean;
  maintenanceMode: boolean;
  customDomain: CustomDomainConfig;
}

export interface BusinessSettings {
  currency: string; // e.g. '₹' (INR)
  taxSystem: 'GST' | 'VAT' | 'None';
  defaultTaxPercentage: number;
  invoicePrefix: string;
  lowStockThreshold: number;
  openingTime: string;
  closingTime: string;
  workingDays: string[];
  autoAiDailyReport: boolean;
  whatsappAlerts: boolean;
  emailAlerts: boolean;
  storeWebsiteName?: string;
  customDomain?: CustomDomainConfig;
}

export type SubscriptionPlanType = 'Free' | 'Starter' | 'Growth' | 'Pro' | 'Custom';

export interface SubscriptionPlan {
  id: string;
  name: SubscriptionPlanType;
  displayName: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  maxUsers: number;
  maxProducts: number;
  aiRequestsMonthly: number;
  features: string[];
  isPopular?: boolean;
}

export interface BusinessSubscription {
  planId: string;
  planName: SubscriptionPlanType;
  status: 'active' | 'trial' | 'suspended' | 'expired';
  startDate: string;
  expiryDate: string;
  maxUsers: number;
  maxProducts: number;
  aiRequestsLimit: number;
  aiRequestsUsed: number;
}

export interface BusinessLocation {
  country: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
}

export interface Business {
  id: string; // e.g. "BIZ-8921"
  name: string;
  logo?: string;
  category: string;
  businessType: string;
  description?: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  whatsappNumber?: string;
  gstNumber?: string;
  panNumber?: string;
  website?: string;
  location: BusinessLocation;
  settings: BusinessSettings;
  subscription: BusinessSubscription;
  status: 'active' | 'trial' | 'suspended' | 'expired';
  createdAt: string;
  lastActivity: string;
  isDemo?: boolean;
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  brand?: string;
  description?: string;
  imageUrl?: string;
  purchasePrice: number;
  sellingPrice: number;
  mrp: number;
  taxRate: number; // percentage, e.g. 5, 12, 18
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  supplierId?: string;
  supplierName?: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'archived';
  unit: string; // e.g. "Pcs", "Kg", "Ltr", "Pack"
  createdAt: string;
  updatedAt: string;
}

export type InventoryMovementType = 
  | 'stock_in' 
  | 'stock_out' 
  | 'adjustment' 
  | 'damaged' 
  | 'returned' 
  | 'sale_deduction';

export interface InventoryMovement {
  id: string;
  businessId: string;
  productId: string;
  productName: string;
  type: InventoryMovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  user: string;
  date: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
}

export type PaymentMethod = 'Cash' | 'UPI' | 'Card' | 'Bank Transfer' | 'Other';

export interface Sale {
  id: string; // e.g. "INV-2026-0042"
  businessId: string;
  orderId?: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  items: SaleItem[];
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  notes?: string;
  createdByName: string;
  createdAt: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'ready' 
  | 'completed' 
  | 'cancelled' 
  | 'returned';

export interface Order {
  id: string; // e.g. "ORD-9842"
  businessId: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  items: SaleItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  businessId: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  notes?: string;
  totalOrders: number;
  totalSpent: number;
  lastPurchaseDate?: string;
  status: 'active' | 'frequent' | 'inactive' | 'vip';
  createdAt: string;
}

export interface Supplier {
  id: string;
  businessId: string;
  name: string;
  contactPerson: string;
  phone: string;
  email?: string;
  address?: string;
  productsSupplied: string[];
  paymentTerms: string; // e.g. "Net 15 Days", "Immediate", "Net 30 Days"
  outstandingBalance: number;
  notes?: string;
  createdAt: string;
}

export type ExpenseCategory = 
  | 'Rent' 
  | 'Electricity' 
  | 'Salary' 
  | 'Transport' 
  | 'Marketing' 
  | 'Inventory Purchase' 
  | 'Maintenance' 
  | 'Software' 
  | 'Other';

export interface Expense {
  id: string;
  businessId: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description: string;
  paymentMethod: PaymentMethod;
  referenceNumber?: string;
  receiptNote?: string;
  createdByName: string;
  createdAt: string;
}

export interface Employee {
  id: string;
  businessId: string;
  name: string;
  phone: string;
  email: string;
  role: 'Manager' | 'Sales Staff' | 'Inventory Staff' | 'Custom';
  joiningDate: string;
  status: 'active' | 'on_leave' | 'inactive';
  permissions: StaffPermission[];
  monthlySalary?: number;
}

export interface PaymentTransaction {
  id: string;
  businessId: string;
  orderOrSaleId: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  transactionReference?: string;
  date: string;
}

export type NotificationType = 
  | 'low_stock' 
  | 'out_of_stock' 
  | 'new_order' 
  | 'payment_received' 
  | 'subscription_expiry' 
  | 'ai_business_alert' 
  | 'system_notification';

export interface AppNotification {
  id: string;
  businessId?: string; // null if platform-wide
  title: string;
  message: string;
  type: NotificationType;
  severity: 'info' | 'warning' | 'alert' | 'success';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  insight?: string;
  evidence?: string;
  possibleReason?: string;
  recommendedAction?: string;
  timestamp: string;
}

export interface AIConversation {
  id: string;
  businessId: string;
  title: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AIDailyReport {
  date: string;
  businessId: string;
  businessName: string;
  metrics: {
    totalSales: number;
    totalOrders: number;
    totalExpenses: number;
    estimatedProfit: number;
    topProduct: string;
    lowStockCount: number;
  };
  highlights: string[];
  suggestedActions: string[];
  generatedAt: string;
}

export interface AuditLog {
  id: string;
  businessId?: string;
  businessName?: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  ipAddress?: string;
  timestamp: string;
}

export interface PlatformAIAnalytics {
  totalRequests: number;
  requestsToday: number;
  requestsThisMonth: number;
  averageResponseTimeMs: number;
  successRate: number;
  topQuestions: { question: string; count: number }[];
  usageByBusiness: { businessId: string; businessName: string; count: number; plan: string }[];
}
