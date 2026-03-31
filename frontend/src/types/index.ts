// ─── Domain Types ──────────────────────────────────────────────────────────────

export interface Product {
  id: string;               // Guid from backend
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  img: string;
  category: string;
  categoryId?: string;
  stock?: number;
  sold?: number;
  sellerName?: string;
  sellerId?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  points: number;
  role: 'guest' | 'seller' | 'admin';
  avatar?: string;
  createdAt?: string;
  isLocked?: boolean;
  password?: string;
  token?: string;           // JWT returned on login
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  voucher?: Voucher;
  shippingAddress: string;
  shippingPhone: string;
  paymentMethod: 'COD' | 'BANK_TRANSFER';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface Voucher {
  id: string;                               // Guid from backend
  code: string;                             // maps to VoucherCode
  discountType: 'Percent' | 'Fixed' | 'PercentUpTo';
  discountAmount: number;                   // maps to DiscountAmount
  minOrder: number;                         // maps to MinOrder
  maxDiscount?: number | null;              // maps to MaxDiscount
  description: string;
  isActive: boolean;
}

export interface NotificationType {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}
