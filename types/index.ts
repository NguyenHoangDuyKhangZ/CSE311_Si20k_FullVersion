export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  img: string;
  category: string;
  stock?: number;
  sold?: number;
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
  role: 'guest' | 'customer' | 'admin';
  avatar?: string;
  createdAt?: string;
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
  id: number;
  code: string;
  discountType: 'percent' | 'fixed';
  discount: number;
  minOrder?: number;
  maxDiscount?: number;
  description: string;
  expiryDate?: string;
}

export interface NotificationType {
  message: string;      
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}
