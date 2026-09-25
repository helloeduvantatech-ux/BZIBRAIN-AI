import { 
  Business, 
  Product, 
  Customer, 
  Supplier, 
  Expense, 
  Sale, 
  Order, 
  InventoryMovement, 
  Employee, 
  AppNotification, 
  User,
  AuditLog
} from '../types';

export const DEMO_BUSINESS_ID = 'BIZ-DEMOMART-01';

export const DEMO_USERS: User[] = [
  {
    id: 'usr-admin-eduvanta',
    name: 'Vikramaditya Sharma',
    email: 'admin@eduvantatech.com',
    phone: '+91 98200 11001',
    role: 'super_admin',
    status: 'active',
    createdAt: '2026-01-10T09:00:00Z',
    lastLogin: '2026-09-25T08:30:00Z'
  },
  {
    id: 'usr-owner-demomart',
    name: 'Rajesh Agarwal',
    email: 'rajesh@demomart.in',
    phone: '+91 98110 54321',
    role: 'business_owner',
    businessId: DEMO_BUSINESS_ID,
    status: 'active',
    createdAt: '2026-03-01T10:00:00Z',
    lastLogin: '2026-09-25T09:15:00Z'
  },
  {
    id: 'usr-staff-demomart',
    name: 'Pooja Verma',
    email: 'pooja.verma@demomart.in',
    phone: '+91 98765 43210',
    role: 'staff',
    businessId: DEMO_BUSINESS_ID,
    status: 'active',
    permissions: ['record_sales', 'view_products', 'manage_inventory', 'view_orders'],
    createdAt: '2026-04-15T11:00:00Z',
    lastLogin: '2026-09-25T09:45:00Z'
  }
];

export const DEMO_BUSINESS: Business = {
  id: DEMO_BUSINESS_ID,
  name: 'DemoMart Daily Store (DEMO)',
  category: 'Grocery',
  businessType: 'Retail & Supermarket',
  description: 'Neighborhood supermarket specializing in daily groceries, branded FMCG, dairy, and household essentials.',
  ownerName: 'Rajesh Agarwal',
  ownerEmail: 'rajesh@demomart.in',
  ownerPhone: '+91 98110 54321',
  whatsappNumber: '+91 98110 54321',
  gstNumber: '27AADCB2234P1Z8',
  panNumber: 'AADCB2234P',
  website: 'https://demomart.eduvanta.in',
  location: {
    country: 'India',
    state: 'Maharashtra',
    city: 'Pune',
    address: 'Shop 12-14, Green Valley Arcade, Baner Road',
    pincode: '411045'
  },
  settings: {
    currency: '₹',
    taxSystem: 'GST',
    defaultTaxPercentage: 5,
    invoicePrefix: 'DM-',
    lowStockThreshold: 10,
    openingTime: '08:00 AM',
    closingTime: '10:00 PM',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    autoAiDailyReport: true,
    whatsappAlerts: true,
    emailAlerts: true
  },
  subscription: {
    planId: 'plan-growth',
    planName: 'Growth',
    status: 'active',
    startDate: '2026-03-01T00:00:00Z',
    expiryDate: '2027-03-01T00:00:00Z',
    maxUsers: 10,
    maxProducts: 2500,
    aiRequestsLimit: 600,
    aiRequestsUsed: 142
  },
  status: 'active',
  createdAt: '2026-03-01T10:00:00Z',
  lastActivity: '2026-09-25T10:30:00Z',
  isDemo: true
};

export const DEMO_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    businessId: DEMO_BUSINESS_ID,
    name: 'Metro FMCG Distributors',
    contactPerson: 'Suresh Singhania',
    phone: '+91 98221 44556',
    email: 'orders@metrofmcg.com',
    address: 'Godown 4, APMC Market Yard, Pune',
    productsSupplied: ['Tata Salt', 'Tata Tea Gold', 'Aashirvaad Atta', 'Fortune Sunflower Oil'],
    paymentTerms: 'Net 15 Days',
    outstandingBalance: 12500,
    createdAt: '2026-03-05T10:00:00Z'
  },
  {
    id: 'sup-2',
    businessId: DEMO_BUSINESS_ID,
    name: 'Maharashtra Dairy & Cold Chain',
    contactPerson: 'Kailash Patil',
    phone: '+91 94220 88990',
    email: 'kailash@mahadairy.org',
    address: 'Katraj Milk Dairy Road, Pune',
    productsSupplied: ['Amul Butter', 'Amul Cheese Slices', 'Amul Taaza Milk'],
    paymentTerms: 'Immediate',
    outstandingBalance: 0,
    createdAt: '2026-03-08T10:00:00Z'
  },
  {
    id: 'sup-3',
    businessId: DEMO_BUSINESS_ID,
    name: 'Western Confectioneries & Snacks Ltd',
    contactPerson: 'Deepak Merchant',
    phone: '+91 98901 22334',
    email: 'sales@westernconfect.in',
    address: 'MIDC Bhosari Industrial Area, Pune',
    productsSupplied: ['Maggi 2-Min Noodles', 'Parle-G Gold', 'Britannia Good Day', 'Haldirams Bhujia', 'Cadbury Dairy Milk Silk'],
    paymentTerms: 'Net 30 Days',
    outstandingBalance: 8400,
    createdAt: '2026-03-12T10:00:00Z'
  },
  {
    id: 'sup-4',
    businessId: DEMO_BUSINESS_ID,
    name: 'Hindustan Home & Personal Care Depot',
    contactPerson: 'Mehul Choksi',
    phone: '+91 97654 33211',
    email: 'depot.pune@hpcwholesale.com',
    address: 'Wakad Highway Bypass, Pune',
    productsSupplied: ['Surf Excel Easy Wash', 'Dettol Soap', 'Colgate Strong Teeth', 'Nescafe Classic'],
    paymentTerms: 'Net 15 Days',
    outstandingBalance: 4200,
    createdAt: '2026-03-15T10:00:00Z'
  }
];

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    businessId: DEMO_BUSINESS_ID,
    name: 'Aashirvaad Shudh Chakki Atta (5kg)',
    sku: 'SKU-ATT-05K',
    barcode: '8901030381023',
    category: 'Staples & Grains',
    brand: 'Aashirvaad',
    description: '100% whole wheat flour with natural dietary fiber.',
    purchasePrice: 215,
    sellingPrice: 255,
    mrp: 275,
    taxRate: 5,
    currentStock: 42,
    minimumStock: 15,
    maximumStock: 120,
    supplierId: 'sup-1',
    supplierName: 'Metro FMCG Distributors',
    status: 'in_stock',
    unit: 'Pack',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'prod-02',
    businessId: DEMO_BUSINESS_ID,
    name: 'Fortune Sunlite Refined Sunflower Oil (1L)',
    sku: 'SKU-OIL-01L',
    barcode: '8906007280112',
    category: 'Edible Oils',
    brand: 'Fortune',
    description: 'Light and healthy refined sunflower cooking oil.',
    purchasePrice: 122,
    sellingPrice: 145,
    mrp: 160,
    taxRate: 5,
    currentStock: 35,
    minimumStock: 12,
    maximumStock: 100,
    supplierId: 'sup-1',
    supplierName: 'Metro FMCG Distributors',
    status: 'in_stock',
    unit: 'Pouch',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-24T12:00:00Z'
  },
  {
    id: 'prod-03',
    businessId: DEMO_BUSINESS_ID,
    name: 'Amul Pasteurised Butter (500g)',
    sku: 'SKU-BTR-500',
    barcode: '8901262010052',
    category: 'Dairy & Refrigerated',
    brand: 'Amul',
    description: 'Utterly butterly delicious salted table butter.',
    purchasePrice: 240,
    sellingPrice: 275,
    mrp: 285,
    taxRate: 12,
    currentStock: 18,
    minimumStock: 10,
    maximumStock: 60,
    supplierId: 'sup-2',
    supplierName: 'Maharashtra Dairy & Cold Chain',
    status: 'in_stock',
    unit: 'Pack',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-25T08:00:00Z'
  },
  {
    id: 'prod-04',
    businessId: DEMO_BUSINESS_ID,
    name: 'Tata Tea Gold Leaf Tea (500g)',
    sku: 'SKU-TEA-500',
    barcode: '8901052002135',
    category: 'Beverages',
    brand: 'Tata Tea',
    description: 'Fine blend of Assam teas with gently rolled long leaves.',
    purchasePrice: 280,
    sellingPrice: 330,
    mrp: 360,
    taxRate: 5,
    currentStock: 8, // LOW STOCK
    minimumStock: 12,
    maximumStock: 50,
    supplierId: 'sup-1',
    supplierName: 'Metro FMCG Distributors',
    status: 'low_stock',
    unit: 'Pack',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-25T08:00:00Z'
  },
  {
    id: 'prod-05',
    businessId: DEMO_BUSINESS_ID,
    name: 'Tata Salt Vacuum Evaporated Iodized (1kg)',
    sku: 'SKU-SLT-01K',
    barcode: '8901058852338',
    category: 'Staples & Grains',
    brand: 'Tata Salt',
    description: 'Desh Ka Namak - pure iodized table salt.',
    purchasePrice: 22,
    sellingPrice: 28,
    mrp: 30,
    taxRate: 0,
    currentStock: 80,
    minimumStock: 25,
    maximumStock: 200,
    supplierId: 'sup-1',
    supplierName: 'Metro FMCG Distributors',
    status: 'in_stock',
    unit: 'Pack',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-23T10:00:00Z'
  },
  {
    id: 'prod-06',
    businessId: DEMO_BUSINESS_ID,
    name: 'Maggi 2-Minute Masala Noodles (Pack of 4)',
    sku: 'SKU-MAG-04P',
    barcode: '8901058854499',
    category: 'Instant Food & Snacks',
    brand: 'Nestle',
    description: 'Instant noodles with authentic Indian masala tastemaker.',
    purchasePrice: 50,
    sellingPrice: 58,
    mrp: 64,
    taxRate: 12,
    currentStock: 5, // LOW STOCK
    minimumStock: 15,
    maximumStock: 80,
    supplierId: 'sup-3',
    supplierName: 'Western Confectioneries & Snacks Ltd',
    status: 'low_stock',
    unit: 'Pack',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-25T09:00:00Z'
  },
  {
    id: 'prod-07',
    businessId: DEMO_BUSINESS_ID,
    name: 'Parle-G Gold Biscuits (1kg Family Pack)',
    sku: 'SKU-PAR-01K',
    barcode: '8901719114221',
    category: 'Instant Food & Snacks',
    brand: 'Parle',
    description: 'Original glucose biscuits, golden baked crunch.',
    purchasePrice: 105,
    sellingPrice: 125,
    mrp: 140,
    taxRate: 18,
    currentStock: 28,
    minimumStock: 10,
    maximumStock: 90,
    supplierId: 'sup-3',
    supplierName: 'Western Confectioneries & Snacks Ltd',
    status: 'in_stock',
    unit: 'Pack',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-22T14:00:00Z'
  },
  {
    id: 'prod-08',
    businessId: DEMO_BUSINESS_ID,
    name: 'Surf Excel Easy Wash Detergent Powder (1kg)',
    sku: 'SKU-DET-01K',
    barcode: '8901030825015',
    category: 'Household & Cleaning',
    brand: 'Surf Excel',
    description: 'Superior stain removal in washing machine and bucket.',
    purchasePrice: 115,
    sellingPrice: 138,
    mrp: 150,
    taxRate: 18,
    currentStock: 22,
    minimumStock: 10,
    maximumStock: 75,
    supplierId: 'sup-4',
    supplierName: 'Hindustan Home & Personal Care Depot',
    status: 'in_stock',
    unit: 'Pack',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-24T11:00:00Z'
  },
  {
    id: 'prod-09',
    businessId: DEMO_BUSINESS_ID,
    name: 'Dettol Original Bathing Soap (Pack of 4x125g)',
    sku: 'SKU-SOP-4PK',
    barcode: '8901396388447',
    category: 'Personal Care',
    brand: 'Dettol',
    description: 'Antibacterial germ protection soap with pine fragrance.',
    purchasePrice: 160,
    sellingPrice: 195,
    mrp: 215,
    taxRate: 18,
    currentStock: 4, // CRITICAL LOW STOCK
    minimumStock: 12,
    maximumStock: 60,
    supplierId: 'sup-4',
    supplierName: 'Hindustan Home & Personal Care Depot',
    status: 'low_stock',
    unit: 'Pack',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-25T08:30:00Z'
  },
  {
    id: 'prod-10',
    businessId: DEMO_BUSINESS_ID,
    name: 'Cadbury Dairy Milk Silk Chocolate (150g)',
    sku: 'SKU-CHOC-150',
    barcode: '8901233024881',
    category: 'Instant Food & Snacks',
    brand: 'Cadbury',
    description: 'Smooth, creamy melt-in-mouth milk chocolate bar.',
    purchasePrice: 145,
    sellingPrice: 175,
    mrp: 185,
    taxRate: 18,
    currentStock: 32,
    minimumStock: 10,
    maximumStock: 80,
    supplierId: 'sup-3',
    supplierName: 'Western Confectioneries & Snacks Ltd',
    status: 'in_stock',
    unit: 'Bar',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-24T16:00:00Z'
  },
  {
    id: 'prod-11',
    businessId: DEMO_BUSINESS_ID,
    name: 'Daawat Rozana Gold Basmati Rice (5kg)',
    sku: 'SKU-RIC-05K',
    barcode: '8901537002014',
    category: 'Staples & Grains',
    brand: 'Daawat',
    description: 'Aromatic long grain everyday basmati rice.',
    purchasePrice: 380,
    sellingPrice: 449,
    mrp: 495,
    taxRate: 5,
    currentStock: 25,
    minimumStock: 8,
    maximumStock: 60,
    supplierId: 'sup-1',
    supplierName: 'Metro FMCG Distributors',
    status: 'in_stock',
    unit: 'Bag',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-24T14:30:00Z'
  },
  {
    id: 'prod-12',
    businessId: DEMO_BUSINESS_ID,
    name: 'Haldiram’s Nagpur Bhujia Sev (400g)',
    sku: 'SKU-BHU-400',
    barcode: '8904004402131',
    category: 'Instant Food & Snacks',
    brand: 'Haldiram',
    description: 'Crispy spicy tepary bean and chickpea noodles snack.',
    purchasePrice: 90,
    sellingPrice: 110,
    mrp: 120,
    taxRate: 12,
    currentStock: 19,
    minimumStock: 10,
    maximumStock: 60,
    supplierId: 'sup-3',
    supplierName: 'Western Confectioneries & Snacks Ltd',
    status: 'in_stock',
    unit: 'Pack',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-23T11:00:00Z'
  },
  {
    id: 'prod-13',
    businessId: DEMO_BUSINESS_ID,
    name: 'Nescafe Classic Instant Coffee Jar (100g)',
    sku: 'SKU-COF-100',
    barcode: '8901058852000',
    category: 'Beverages',
    brand: 'Nescafe',
    description: '100% pure instant coffee with bold aroma.',
    purchasePrice: 285,
    sellingPrice: 340,
    mrp: 360,
    taxRate: 18,
    currentStock: 14,
    minimumStock: 6,
    maximumStock: 40,
    supplierId: 'sup-4',
    supplierName: 'Hindustan Home & Personal Care Depot',
    status: 'in_stock',
    unit: 'Jar',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-24T15:00:00Z'
  },
  {
    id: 'prod-14',
    businessId: DEMO_BUSINESS_ID,
    name: 'Colgate Strong Teeth Toothpaste (500g Saver)',
    sku: 'SKU-COL-500',
    barcode: '8901314010214',
    category: 'Personal Care',
    brand: 'Colgate',
    description: 'Calcium boost formula for 2x stronger teeth.',
    purchasePrice: 185,
    sellingPrice: 220,
    mrp: 240,
    taxRate: 18,
    currentStock: 26,
    minimumStock: 8,
    maximumStock: 60,
    supplierId: 'sup-4',
    supplierName: 'Hindustan Home & Personal Care Depot',
    status: 'in_stock',
    unit: 'Pack',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-24T10:00:00Z'
  },
  {
    id: 'prod-15',
    businessId: DEMO_BUSINESS_ID,
    name: 'Britannia Good Day Butter Cookies (600g Mega)',
    sku: 'SKU-GDY-600',
    barcode: '8901063012245',
    category: 'Instant Food & Snacks',
    brand: 'Britannia',
    description: 'Rich butter cookies with playful smiley ridge patterns.',
    purchasePrice: 95,
    sellingPrice: 115,
    mrp: 130,
    taxRate: 18,
    currentStock: 2, // OUT / VERY LOW STOCK
    minimumStock: 10,
    maximumStock: 50,
    supplierId: 'sup-3',
    supplierName: 'Western Confectioneries & Snacks Ltd',
    status: 'low_stock',
    unit: 'Pack',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-09-25T08:00:00Z'
  }
];

export const DEMO_CUSTOMERS: Customer[] = [
  { id: 'c-01', businessId: DEMO_BUSINESS_ID, name: 'Ananya Deshmukh', phone: '+91 98230 44101', email: 'ananya.d@gmail.com', city: 'Pune', totalOrders: 14, totalSpent: 8450, status: 'vip', createdAt: '2026-03-15T09:00:00Z' },
  { id: 'c-02', businessId: DEMO_BUSINESS_ID, name: 'Rahul Kulkarni', phone: '+91 98220 55102', email: 'rahul.kulkarni@yahoo.com', city: 'Pune', totalOrders: 9, totalSpent: 4890, status: 'frequent', createdAt: '2026-03-18T10:00:00Z' },
  { id: 'c-03', businessId: DEMO_BUSINESS_ID, name: 'Priya Sundaram', phone: '+91 98901 66103', email: 'priya.sundar@gmail.com', city: 'Pune', totalOrders: 18, totalSpent: 12340, status: 'vip', createdAt: '2026-03-20T11:00:00Z' },
  { id: 'c-04', businessId: DEMO_BUSINESS_ID, name: 'Amitabh Joshi', phone: '+91 97640 77104', email: 'amjoshi@outlook.com', city: 'Pune', totalOrders: 6, totalSpent: 3120, status: 'active', createdAt: '2026-04-01T12:00:00Z' },
  { id: 'c-05', businessId: DEMO_BUSINESS_ID, name: 'Neha Shinde', phone: '+91 98810 88105', email: 'nehashinde92@gmail.com', city: 'Pune', totalOrders: 11, totalSpent: 6720, status: 'frequent', createdAt: '2026-04-05T13:00:00Z' },
  { id: 'c-06', businessId: DEMO_BUSINESS_ID, name: 'Sanjay Bapat', phone: '+91 94220 99106', email: 'sbapat.finance@gmail.com', city: 'Pune', totalOrders: 5, totalSpent: 2890, status: 'active', createdAt: '2026-04-10T14:00:00Z' },
  { id: 'c-07', businessId: DEMO_BUSINESS_ID, name: 'Sunita Rao', phone: '+91 98224 10107', email: 'sunitarao@hotmail.com', city: 'Pune', totalOrders: 15, totalSpent: 10980, status: 'vip', createdAt: '2026-04-12T15:00:00Z' },
  { id: 'c-08', businessId: DEMO_BUSINESS_ID, name: 'Manoj Gavaskar', phone: '+91 98908 20108', email: 'manoj.g@rediffmail.com', city: 'Pune', totalOrders: 4, totalSpent: 1950, status: 'active', createdAt: '2026-04-20T16:00:00Z' },
  { id: 'c-09', businessId: DEMO_BUSINESS_ID, name: 'Kavita Iyer', phone: '+91 97652 30109', email: 'iyer.kavita@gmail.com', city: 'Pune', totalOrders: 8, totalSpent: 5120, status: 'frequent', createdAt: '2026-05-02T10:00:00Z' },
  { id: 'c-10', businessId: DEMO_BUSINESS_ID, name: 'Vikas Kadam', phone: '+91 98814 40110', email: 'vikas.kadam@gmail.com', city: 'Pune', totalOrders: 2, totalSpent: 860, status: 'inactive', createdAt: '2026-05-05T11:00:00Z' },
  { id: 'c-11', businessId: DEMO_BUSINESS_ID, name: 'Meera Chidambaram', phone: '+91 98235 50111', email: 'meera.c@gmail.com', city: 'Pune', totalOrders: 13, totalSpent: 9140, status: 'frequent', createdAt: '2026-05-12T12:00:00Z' },
  { id: 'c-12', businessId: DEMO_BUSINESS_ID, name: 'Deepak Bhosale', phone: '+91 98229 60112', email: 'deepak.bhosale@tcs.com', city: 'Pune', totalOrders: 7, totalSpent: 4210, status: 'active', createdAt: '2026-05-18T14:00:00Z' },
  { id: 'c-13', businessId: DEMO_BUSINESS_ID, name: 'Shweta Mathur', phone: '+91 98905 70113', email: 'shweta.m@gmail.com', city: 'Pune', totalOrders: 9, totalSpent: 5670, status: 'frequent', createdAt: '2026-05-25T15:00:00Z' },
  { id: 'c-14', businessId: DEMO_BUSINESS_ID, name: 'Gaurav Sawant', phone: '+91 97648 80114', email: 'gsawant@infosys.com', city: 'Pune', totalOrders: 3, totalSpent: 1650, status: 'active', createdAt: '2026-06-01T16:00:00Z' },
  { id: 'c-15', businessId: DEMO_BUSINESS_ID, name: 'Tanvi Gadgil', phone: '+91 98818 90115', email: 'tanvi.gadgil@gmail.com', city: 'Pune', totalOrders: 16, totalSpent: 11450, status: 'vip', createdAt: '2026-06-10T10:00:00Z' },
  { id: 'c-16', businessId: DEMO_BUSINESS_ID, name: 'Rohan Nambiar', phone: '+91 94225 11116', email: 'rohan.nambiar@gmail.com', city: 'Pune', totalOrders: 6, totalSpent: 3580, status: 'active', createdAt: '2026-06-15T11:00:00Z' },
  { id: 'c-17', businessId: DEMO_BUSINESS_ID, name: 'Snehal More', phone: '+91 98236 22117', email: 'snehal.more@yahoo.in', city: 'Pune', totalOrders: 8, totalSpent: 4920, status: 'frequent', createdAt: '2026-06-22T12:00:00Z' },
  { id: 'c-18', businessId: DEMO_BUSINESS_ID, name: 'Nikhil Rane', phone: '+91 98227 33118', email: 'nikhil.rane@gmail.com', city: 'Pune', totalOrders: 1, totalSpent: 480, status: 'inactive', createdAt: '2026-07-02T14:00:00Z' },
  { id: 'c-19', businessId: DEMO_BUSINESS_ID, name: 'Archana Dixit', phone: '+91 98909 44119', email: 'adixit@wipro.com', city: 'Pune', totalOrders: 10, totalSpent: 7320, status: 'frequent', createdAt: '2026-07-08T15:00:00Z' },
  { id: 'c-20', businessId: DEMO_BUSINESS_ID, name: 'Kishore Mahajan', phone: '+91 97656 55120', email: 'kishore.mahajan@gmail.com', city: 'Pune', totalOrders: 5, totalSpent: 2790, status: 'active', createdAt: '2026-07-15T16:00:00Z' },
  { id: 'c-21', businessId: DEMO_BUSINESS_ID, name: 'Smita Pande', phone: '+91 98812 66121', email: 'smita.pande@gmail.com', city: 'Pune', totalOrders: 12, totalSpent: 8760, status: 'frequent', createdAt: '2026-07-25T10:00:00Z' },
  { id: 'c-22', businessId: DEMO_BUSINESS_ID, name: 'Abhishek Tambe', phone: '+91 94228 77122', email: 'abhi.tambe@gmail.com', city: 'Pune', totalOrders: 4, totalSpent: 2210, status: 'active', createdAt: '2026-08-01T11:00:00Z' },
  { id: 'c-23', businessId: DEMO_BUSINESS_ID, name: 'Jyoti Tendulkar', phone: '+91 98238 88123', email: 'jyoti.t@gmail.com', city: 'Pune', totalOrders: 14, totalSpent: 10250, status: 'vip', createdAt: '2026-08-05T12:00:00Z' },
  { id: 'c-24', businessId: DEMO_BUSINESS_ID, name: 'Mahesh Jadhav', phone: '+91 98223 99124', email: 'mahesh.jadhav@gmail.com', city: 'Pune', totalOrders: 6, totalSpent: 3940, status: 'active', createdAt: '2026-08-12T14:00:00Z' },
  { id: 'c-25', businessId: DEMO_BUSINESS_ID, name: 'Pallavi Gokhale', phone: '+91 98903 11125', email: 'pallavi.g@gmail.com', city: 'Pune', totalOrders: 9, totalSpent: 6180, status: 'frequent', createdAt: '2026-08-20T15:00:00Z' },
  { id: 'c-26', businessId: DEMO_BUSINESS_ID, name: 'Sachin Salvi', phone: '+91 97650 22126', email: 'sachin.salvi@gmail.com', city: 'Pune', totalOrders: 2, totalSpent: 920, status: 'inactive', createdAt: '2026-08-28T16:00:00Z' },
  { id: 'c-27', businessId: DEMO_BUSINESS_ID, name: 'Varsha Khedekar', phone: '+91 98816 33127', email: 'varsha.k@gmail.com', city: 'Pune', totalOrders: 7, totalSpent: 4560, status: 'active', createdAt: '2026-09-02T10:00:00Z' },
  { id: 'c-28', businessId: DEMO_BUSINESS_ID, name: 'Harish Nair', phone: '+91 94222 44128', email: 'harish.nair@gmail.com', city: 'Pune', totalOrders: 11, totalSpent: 7890, status: 'frequent', createdAt: '2026-09-08T11:00:00Z' },
  { id: 'c-29', businessId: DEMO_BUSINESS_ID, name: 'Ritu Agarwal', phone: '+91 98232 55129', email: 'ritu.agarwal@gmail.com', city: 'Pune', totalOrders: 17, totalSpent: 13200, status: 'vip', createdAt: '2026-09-12T12:00:00Z' },
  { id: 'c-30', businessId: DEMO_BUSINESS_ID, name: 'Chetan Mhatre', phone: '+91 98226 66130', email: 'chetan.mhatre@gmail.com', city: 'Pune', totalOrders: 4, totalSpent: 2640, status: 'active', createdAt: '2026-09-18T14:00:00Z' }
];

export const DEMO_EXPENSES: Expense[] = [
  { id: 'exp-01', businessId: DEMO_BUSINESS_ID, amount: 45000, category: 'Rent', date: '2026-09-01', description: 'Monthly store shop lease rent (September 2026)', paymentMethod: 'Bank Transfer', referenceNumber: 'NEFT-BNR-98421', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-01T10:00:00Z' },
  { id: 'exp-02', businessId: DEMO_BUSINESS_ID, amount: 8450, category: 'Electricity', date: '2026-09-03', description: 'MSEDCL Commercial Power bill for store and chillers', paymentMethod: 'UPI', referenceNumber: 'UPI-MSE-20260903', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-03T11:30:00Z' },
  { id: 'exp-03', businessId: DEMO_BUSINESS_ID, amount: 32000, category: 'Salary', date: '2026-09-05', description: 'Staff salaries for store assistants and cashier', paymentMethod: 'Bank Transfer', referenceNumber: 'SAL-SEP-2026-P1', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-05T12:00:00Z' },
  { id: 'exp-04', businessId: DEMO_BUSINESS_ID, amount: 2400, category: 'Transport', date: '2026-09-06', description: 'APMC market yard tempo pickup charges', paymentMethod: 'Cash', createdByName: 'Pooja Verma', createdAt: '2026-09-06T14:00:00Z' },
  { id: 'exp-05', businessId: DEMO_BUSINESS_ID, amount: 3500, category: 'Marketing', date: '2026-09-08', description: 'Local festival pamphlet printing & distribution in Baner', paymentMethod: 'UPI', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-08T16:00:00Z' },
  { id: 'exp-06', businessId: DEMO_BUSINESS_ID, amount: 18500, category: 'Inventory Purchase', date: '2026-09-10', description: 'Bulk flour & sunflower oil replenishment from Metro FMCG', paymentMethod: 'Bank Transfer', referenceNumber: 'INV-METRO-091', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-10T11:00:00Z' },
  { id: 'exp-07', businessId: DEMO_BUSINESS_ID, amount: 1200, category: 'Maintenance', date: '2026-09-11', description: 'Deep cleaning and sanitization of dairy glass chiller', paymentMethod: 'Cash', createdByName: 'Pooja Verma', createdAt: '2026-09-11T17:00:00Z' },
  { id: 'exp-08', businessId: DEMO_BUSINESS_ID, amount: 1999, category: 'Software', date: '2026-09-12', description: 'EduVanta BizBrain AI Growth Plan subscription', paymentMethod: 'UPI', referenceNumber: 'EDV-SUB-9942', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-12T09:00:00Z' },
  { id: 'exp-09', businessId: DEMO_BUSINESS_ID, amount: 850, category: 'Other', date: '2026-09-13', description: 'Biodegradable carry bags and thermal billing rolls', paymentMethod: 'Cash', createdByName: 'Pooja Verma', createdAt: '2026-09-13T13:00:00Z' },
  { id: 'exp-10', businessId: DEMO_BUSINESS_ID, amount: 3100, category: 'Transport', date: '2026-09-15', description: 'Emergency replenishment delivery from cold chain hub', paymentMethod: 'UPI', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-15T15:30:00Z' },
  { id: 'exp-11', businessId: DEMO_BUSINESS_ID, amount: 14200, category: 'Inventory Purchase', date: '2026-09-16', description: 'Snacks & confectionery restock from Western Confectioneries', paymentMethod: 'Bank Transfer', referenceNumber: 'WEST-0916', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-16T12:00:00Z' },
  { id: 'exp-12', businessId: DEMO_BUSINESS_ID, amount: 1800, category: 'Maintenance', date: '2026-09-18', description: 'Barcode scanner cord replacement and UPS battery check', paymentMethod: 'UPI', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-18T18:00:00Z' },
  { id: 'exp-13', businessId: DEMO_BUSINESS_ID, amount: 4200, category: 'Marketing', date: '2026-09-19', description: 'Instagram & Facebook sponsored ad for weekend grocery offers', paymentMethod: 'Card', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-19T10:00:00Z' },
  { id: 'exp-14', businessId: DEMO_BUSINESS_ID, amount: 1600, category: 'Transport', date: '2026-09-20', description: 'Fuel reimbursement for home delivery 2-wheeler', paymentMethod: 'Cash', createdByName: 'Pooja Verma', createdAt: '2026-09-20T19:00:00Z' },
  { id: 'exp-15', businessId: DEMO_BUSINESS_ID, amount: 2200, category: 'Other', date: '2026-09-21', description: 'Drinking water dispenser 20L jars supply (Monthly)', paymentMethod: 'Cash', createdByName: 'Pooja Verma', createdAt: '2026-09-21T11:00:00Z' },
  { id: 'exp-16', businessId: DEMO_BUSINESS_ID, amount: 16800, category: 'Inventory Purchase', date: '2026-09-22', description: 'Soaps, detergents & personal care stock from Hindustan HPC', paymentMethod: 'Bank Transfer', referenceNumber: 'HPC-0922', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-22T14:00:00Z' },
  { id: 'exp-17', businessId: DEMO_BUSINESS_ID, amount: 1500, category: 'Maintenance', date: '2026-09-23', description: 'Shop pest control and rodent proofing maintenance', paymentMethod: 'UPI', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-23T15:00:00Z' },
  { id: 'exp-18', businessId: DEMO_BUSINESS_ID, amount: 950, category: 'Other', date: '2026-09-24', description: 'Store cleaning supplies, mop heads and disinfectant fluids', paymentMethod: 'Cash', createdByName: 'Pooja Verma', createdAt: '2026-09-24T10:00:00Z' },
  { id: 'exp-19', businessId: DEMO_BUSINESS_ID, amount: 2500, category: 'Transport', date: '2026-09-24', description: 'Delivery van service and tyre pressure alignment', paymentMethod: 'UPI', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-24T18:00:00Z' },
  { id: 'exp-20', businessId: DEMO_BUSINESS_ID, amount: 1100, category: 'Other', date: '2026-09-25', description: 'High-speed broadband internet recharge for POS & CCTV', paymentMethod: 'UPI', referenceNumber: 'ACT-BROADBAND-09', createdByName: 'Rajesh Agarwal', createdAt: '2026-09-25T09:00:00Z' }
];

// Generate 50 realistic sales transactions across the last 30 days
export function generateDemoSales(): Sale[] {
  const sales: Sale[] = [];
  const paymentMethods: ('Cash' | 'UPI' | 'Card' | 'Bank Transfer')[] = ['UPI', 'UPI', 'Cash', 'Card', 'UPI', 'Cash'];
  
  const sampleItemsPool = [
    { productId: 'prod-01', productName: 'Aashirvaad Shudh Chakki Atta (5kg)', sku: 'SKU-ATT-05K', unitPrice: 255, taxRate: 5 },
    { productId: 'prod-02', productName: 'Fortune Sunlite Sunflower Oil (1L)', sku: 'SKU-OIL-01L', unitPrice: 145, taxRate: 5 },
    { productId: 'prod-03', productName: 'Amul Pasteurised Butter (500g)', sku: 'SKU-BTR-500', unitPrice: 275, taxRate: 12 },
    { productId: 'prod-04', productName: 'Tata Tea Gold Leaf Tea (500g)', sku: 'SKU-TEA-500', unitPrice: 330, taxRate: 5 },
    { productId: 'prod-05', productName: 'Tata Salt Iodized (1kg)', sku: 'SKU-SLT-01K', unitPrice: 28, taxRate: 0 },
    { productId: 'prod-06', productName: 'Maggi 2-Minute Masala Noodles (Pack of 4)', sku: 'SKU-MAG-04P', unitPrice: 58, taxRate: 12 },
    { productId: 'prod-07', productName: 'Parle-G Gold Biscuits (1kg Family Pack)', sku: 'SKU-PAR-01K', unitPrice: 125, taxRate: 18 },
    { productId: 'prod-08', productName: 'Surf Excel Easy Wash Detergent (1kg)', sku: 'SKU-DET-01K', unitPrice: 138, taxRate: 18 },
    { productId: 'prod-09', productName: 'Dettol Original Bathing Soap (Pack of 4)', sku: 'SKU-SOP-4PK', unitPrice: 195, taxRate: 18 },
    { productId: 'prod-10', productName: 'Cadbury Dairy Milk Silk Chocolate (150g)', sku: 'SKU-CHOC-150', unitPrice: 175, taxRate: 18 },
    { productId: 'prod-11', productName: 'Daawat Rozana Gold Basmati Rice (5kg)', sku: 'SKU-RIC-05K', unitPrice: 449, taxRate: 5 },
    { productId: 'prod-12', productName: 'Haldiram’s Nagpur Bhujia Sev (400g)', sku: 'SKU-BHU-400', unitPrice: 110, taxRate: 12 },
    { productId: 'prod-13', productName: 'Nescafe Classic Instant Coffee Jar (100g)', sku: 'SKU-COF-100', unitPrice: 340, taxRate: 18 },
    { productId: 'prod-14', productName: 'Colgate Strong Teeth Toothpaste (500g)', sku: 'SKU-COL-500', unitPrice: 220, taxRate: 18 },
    { productId: 'prod-15', productName: 'Britannia Good Day Butter Cookies (600g)', sku: 'SKU-GDY-600', unitPrice: 115, taxRate: 18 }
  ];

  // Specific 50 dates spanning late August to September 25, 2026
  for (let i = 1; i <= 50; i++) {
    const daysAgo = Math.floor((50 - i) * 0.5); // spread nicely
    const dateObj = new Date(2026, 8, 25); // Sept 25, 2026
    dateObj.setDate(dateObj.getDate() - daysAgo);
    const hour = 9 + (i % 12);
    const min = (i * 7) % 60;
    dateObj.setHours(hour, min, 0, 0);

    const customer = DEMO_CUSTOMERS[(i - 1) % DEMO_CUSTOMERS.length];
    const payMethod = paymentMethods[i % paymentMethods.length];

    // Pick 2 to 4 items
    const itemCount = 2 + (i % 3);
    const items = [];
    let subtotal = 0;
    let taxTotal = 0;

    for (let k = 0; k < itemCount; k++) {
      const template = sampleItemsPool[(i + k * 3) % sampleItemsPool.length];
      const qty = 1 + ((i + k) % 3);
      const lineSubtotal = template.unitPrice * qty;
      const lineTax = Math.round((lineSubtotal * template.taxRate) / 100);
      subtotal += lineSubtotal;
      taxTotal += lineTax;

      items.push({
        productId: template.productId,
        productName: template.productName,
        sku: template.sku,
        quantity: qty,
        unitPrice: template.unitPrice,
        taxRate: template.taxRate,
        taxAmount: lineTax,
        discountAmount: 0,
        total: lineSubtotal + lineTax
      });
    }

    const discountPercentage = (i % 7 === 0) ? 5 : 0;
    const discountAmount = Math.round((subtotal * discountPercentage) / 100);
    const grandTotal = subtotal + taxTotal - discountAmount;

    sales.push({
      id: `INV-2026-${(1000 + i).toString()}`,
      businessId: DEMO_BUSINESS_ID,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      items,
      subtotal,
      discountPercentage,
      discountAmount,
      taxAmount: taxTotal,
      totalAmount: grandTotal,
      paymentMethod: payMethod,
      paymentStatus: 'paid',
      notes: i % 10 === 0 ? 'Home delivery via WhatsApp order' : 'Counter POS Sale',
      createdByName: i % 2 === 0 ? 'Pooja Verma' : 'Rajesh Agarwal',
      createdAt: dateObj.toISOString()
    });
  }

  return sales;
}

export const DEMO_SALES = generateDemoSales();

// Generate orders matching recent sales or pending status
export const DEMO_ORDERS: Order[] = DEMO_SALES.slice(-15).map((sale, idx) => {
  const statuses: Order['orderStatus'][] = ['completed', 'completed', 'ready', 'processing', 'confirmed', 'completed'];
  const status = idx === 14 ? 'processing' : idx === 13 ? 'ready' : statuses[idx % statuses.length];

  return {
    id: `ORD-98${40 + idx}`,
    businessId: DEMO_BUSINESS_ID,
    customerId: sale.customerId || 'c-01',
    customerName: sale.customerName,
    customerPhone: sale.customerPhone,
    customerAddress: 'Shop / Baner, Pune',
    items: sale.items,
    subtotal: sale.subtotal,
    discountAmount: sale.discountAmount,
    taxAmount: sale.taxAmount,
    totalAmount: sale.totalAmount,
    orderStatus: status,
    paymentStatus: sale.paymentStatus,
    paymentMethod: sale.paymentMethod,
    notes: sale.notes,
    createdAt: sale.createdAt,
    updatedAt: sale.createdAt
  };
});

export const DEMO_INVENTORY_MOVEMENTS: InventoryMovement[] = [
  { id: 'mov-1', businessId: DEMO_BUSINESS_ID, productId: 'prod-01', productName: 'Aashirvaad Shudh Chakki Atta (5kg)', type: 'stock_in', quantity: 50, previousStock: 10, newStock: 60, reason: 'Bulk Purchase from Metro FMCG', user: 'Rajesh Agarwal', date: '2026-09-10T10:30:00Z' },
  { id: 'mov-2', businessId: DEMO_BUSINESS_ID, productId: 'prod-04', productName: 'Tata Tea Gold Leaf Tea (500g)', type: 'sale_deduction', quantity: 4, previousStock: 12, newStock: 8, reason: 'Counter Sale INV-2026-1048', user: 'Pooja Verma', date: '2026-09-24T18:00:00Z' },
  { id: 'mov-3', businessId: DEMO_BUSINESS_ID, productId: 'prod-06', productName: 'Maggi 2-Minute Masala Noodles (Pack of 4)', type: 'damaged', quantity: 2, previousStock: 7, newStock: 5, reason: 'Packaging seal torn during shelf arrangement', user: 'Pooja Verma', date: '2026-09-25T08:15:00Z' },
  { id: 'mov-4', businessId: DEMO_BUSINESS_ID, productId: 'prod-09', productName: 'Dettol Original Bathing Soap (Pack of 4)', type: 'sale_deduction', quantity: 3, previousStock: 7, newStock: 4, reason: 'Online order dispatched', user: 'Pooja Verma', date: '2026-09-25T08:45:00Z' },
  { id: 'mov-5', businessId: DEMO_BUSINESS_ID, productId: 'prod-15', productName: 'Britannia Good Day Butter Cookies (600g)', type: 'sale_deduction', quantity: 5, previousStock: 7, newStock: 2, reason: 'Customer Bulk Purchase', user: 'Rajesh Agarwal', date: '2026-09-25T09:10:00Z' },
  { id: 'mov-6', businessId: DEMO_BUSINESS_ID, productId: 'prod-02', productName: 'Fortune Sunlite Refined Sunflower Oil (1L)', type: 'stock_in', quantity: 20, previousStock: 15, newStock: 35, reason: 'Direct Van Delivery from Distributor', user: 'Rajesh Agarwal', date: '2026-09-23T11:00:00Z' }
];

export const DEMO_EMPLOYEES: Employee[] = [
  { id: 'emp-1', businessId: DEMO_BUSINESS_ID, name: 'Pooja Verma', phone: '+91 98765 43210', email: 'pooja.verma@demomart.in', role: 'Sales Staff', joiningDate: '2026-04-15', status: 'active', permissions: ['record_sales', 'view_products', 'manage_inventory', 'view_orders'], monthlySalary: 16000 },
  { id: 'emp-2', businessId: DEMO_BUSINESS_ID, name: 'Rameshwar Mane', phone: '+91 98224 88771', email: 'rameshwar@demomart.in', role: 'Inventory Staff', joiningDate: '2026-05-01', status: 'active', permissions: ['view_products', 'manage_inventory'], monthlySalary: 14000 },
  { id: 'emp-3', businessId: DEMO_BUSINESS_ID, name: 'Sunil Gholap', phone: '+91 94229 11223', email: 'sunil@demomart.in', role: 'Manager', joiningDate: '2026-03-15', status: 'active', permissions: ['record_sales', 'view_products', 'manage_inventory', 'view_orders', 'manage_customers', 'view_reports'], monthlySalary: 22000 }
];

export const DEMO_NOTIFICATIONS: AppNotification[] = [
  { id: 'notif-1', businessId: DEMO_BUSINESS_ID, title: 'Low Stock Alert: Britannia Good Day', message: 'Current stock is 2 packs (minimum safety threshold: 10 packs). Consider placing restock order with Western Confectioneries.', type: 'low_stock', severity: 'alert', isRead: false, createdAt: '2026-09-25T09:15:00Z' },
  { id: 'notif-2', businessId: DEMO_BUSINESS_ID, title: 'Low Stock Alert: Dettol Bathing Soap', message: 'Current stock is 4 packs. Only 1 day of projected inventory left based on 7-day velocity.', type: 'low_stock', severity: 'warning', isRead: false, createdAt: '2026-09-25T08:50:00Z' },
  { id: 'notif-3', businessId: DEMO_BUSINESS_ID, title: 'New Customer Order ORD-9854', message: 'Order for ₹1,850 received from Priya Sundaram via WhatsApp billing.', type: 'new_order', severity: 'info', isRead: true, createdAt: '2026-09-25T08:30:00Z' },
  { id: 'notif-4', businessId: DEMO_BUSINESS_ID, title: 'UPI Payment Confirmed ₹2,450', message: 'Payment successfully credited via PhonePe QR for invoice INV-2026-1050.', type: 'payment_received', severity: 'success', isRead: true, createdAt: '2026-09-25T08:10:00Z' },
  { id: 'notif-5', businessId: DEMO_BUSINESS_ID, title: 'BizBrain AI Daily Morning Insight Ready', message: 'Your Thursday sales surpassed the 7-day benchmark by 18.4%. Tap to view action points.', type: 'ai_business_alert', severity: 'info', isRead: false, createdAt: '2026-09-25T07:00:00Z' }
];

export const DEMO_AUDIT_LOGS: AuditLog[] = [
  { id: 'log-1', businessId: DEMO_BUSINESS_ID, businessName: 'DemoMart Daily Store', userName: 'Rajesh Agarwal', userRole: 'business_owner', action: 'CREATE_EXPENSE', details: 'Added expense ₹1,100 for high-speed broadband recharge', timestamp: '2026-09-25T09:00:00Z' },
  { id: 'log-2', businessId: DEMO_BUSINESS_ID, businessName: 'DemoMart Daily Store', userName: 'Pooja Verma', userRole: 'staff', action: 'ADJUST_INVENTORY', details: 'Marked 2 units of Maggi Masala Noodles as damaged due to packaging tear', timestamp: '2026-09-25T08:15:00Z' },
  { id: 'log-3', businessId: DEMO_BUSINESS_ID, businessName: 'DemoMart Daily Store', userName: 'Rajesh Agarwal', userRole: 'business_owner', action: 'UPDATE_PRODUCT_PRICE', details: 'Updated selling price of Amul Butter to ₹275 (MRP ₹285)', timestamp: '2026-09-24T17:30:00Z' },
  { id: 'log-4', businessId: DEMO_BUSINESS_ID, businessName: 'DemoMart Daily Store', userName: 'Vikramaditya Sharma', userRole: 'super_admin', action: 'SYSTEM_AUDIT', details: 'Verified GST Compliance and schema checks across all active Maharashtra stores', timestamp: '2026-09-24T14:00:00Z' }
];
