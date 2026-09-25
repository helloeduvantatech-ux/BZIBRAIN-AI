import { BusinessCategory, SubscriptionPlan } from '../types';

export const INITIAL_CATEGORIES: BusinessCategory[] = [
  { id: 'cat-retail', name: 'Retail', description: 'General retail store, departmental merchandise, gifts', defaultGstRate: 18, isActive: true, businessCount: 4 },
  { id: 'cat-grocery', name: 'Grocery', description: 'Supermarkets, Kirana stores, FMCG & daily essentials', defaultGstRate: 5, isActive: true, businessCount: 8 },
  { id: 'cat-clothing', name: 'Clothing', description: 'Apparel, textiles, boutique fashion and footwear', defaultGstRate: 12, isActive: true, businessCount: 5 },
  { id: 'cat-electronics', name: 'Electronics', description: 'Mobile phones, IT hardware, home appliances', defaultGstRate: 18, isActive: true, businessCount: 3 },
  { id: 'cat-stationery', name: 'Stationery', description: 'Books, office supplies, art & school stationery', defaultGstRate: 12, isActive: true, businessCount: 2 },
  { id: 'cat-restaurant', name: 'Restaurant', description: 'Dine-in restaurants, quick service foods, cloud kitchens', defaultGstRate: 5, isActive: true, businessCount: 4 },
  { id: 'cat-cafe', name: 'Cafe', description: 'Coffee houses, bakeries and beverage parlors', defaultGstRate: 5, isActive: true, businessCount: 2 },
  { id: 'cat-pharmacy', name: 'Pharmacy', description: 'Chemist shops, medical stores, healthcare OTC', defaultGstRate: 12, isActive: true, businessCount: 3 },
  { id: 'cat-beauty', name: 'Beauty', description: 'Cosmetics, salons, wellness products & personal care', defaultGstRate: 18, isActive: true, businessCount: 2 },
  { id: 'cat-services', name: 'Services', description: 'Repair, consulting, digital marketing, logistics', defaultGstRate: 18, isActive: true, businessCount: 3 },
  { id: 'cat-manufacturing', name: 'Manufacturing', description: 'Small workshops, packaging, fabrication units', defaultGstRate: 18, isActive: true, businessCount: 1 },
  { id: 'cat-education', name: 'Education', description: 'Coaching centers, academies, educational suppliers', defaultGstRate: 18, isActive: true, businessCount: 2 },
  { id: 'cat-freelance', name: 'Freelance', description: 'Independent professionals, consultants, designers', defaultGstRate: 18, isActive: true, businessCount: 1 },
  { id: 'cat-other', name: 'Other', description: 'Miscellaneous enterprises and specialty trades', defaultGstRate: 18, isActive: true, businessCount: 1 },
];

export const INITIAL_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-free',
    name: 'Free',
    displayName: 'Free Starter',
    priceMonthly: 0,
    priceAnnual: 0,
    description: 'Basic dashboard and limited AI co-pilot for micro-merchants.',
    maxUsers: 1,
    maxProducts: 50,
    aiRequestsMonthly: 30,
    features: [
      'Basic Sales POS',
      'Inventory Tracking (Up to 50 products)',
      '30 AI Co-pilot questions/mo',
      'Daily Business Summary (Basic)',
      '1 Staff Account',
      'Community Support'
    ],
    isPopular: false
  },
  {
    id: 'plan-starter',
    name: 'Starter',
    displayName: 'Starter Business',
    priceMonthly: 799,
    priceAnnual: 7990,
    description: 'Ideal for local shops and expanding retail stores.',
    maxUsers: 3,
    maxProducts: 500,
    aiRequestsMonthly: 150,
    features: [
      'Full Sales & Order Management',
      'Inventory Movement & Stock Alerts',
      '150 AI Business Advisor queries/mo',
      'Sales & Profit Reports',
      'Customer CRM & SMS/WhatsApp billing',
      '3 Staff Accounts with role permissions',
      'Standard Support'
    ],
    isPopular: false
  },
  {
    id: 'plan-growth',
    name: 'Growth',
    displayName: 'Growth Enterprise',
    priceMonthly: 1999,
    priceAnnual: 19990,
    description: 'Advanced analytics, predictive restocking & deep AI insights.',
    maxUsers: 10,
    maxProducts: 2500,
    aiRequestsMonthly: 600,
    features: [
      'Everything in Starter',
      '600 BizBrain AI inquiries/mo',
      'AI Restock & Sales anomaly alerts',
      'Comprehensive Tax & Profit ledgers',
      'Supplier & Expense tracking',
      '10 Staff Accounts with role restrictions',
      'Data CSV & Print Exports',
      'Priority Support'
    ],
    isPopular: true
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    displayName: 'Pro Powerhouse',
    priceMonthly: 3999,
    priceAnnual: 39990,
    description: 'High-volume business management with maximum AI co-pilot power.',
    maxUsers: 50,
    maxProducts: 15000,
    aiRequestsMonthly: 2500,
    features: [
      'Everything in Growth',
      '2,500 BizBrain AI questions/mo',
      'High-speed POS with barcode integration',
      'Custom Multi-branch permission matrix',
      'Complete Financial & Audit logs',
      'Dedicated Account Manager',
      '99.9% Uptime SLA'
    ],
    isPopular: false
  }
];
