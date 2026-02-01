// context/StoreContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, CartItem, User, NotificationType, Voucher } from '@/types/index';

interface StoreContextType {
  // Notification
  notification: NotificationType | null;
  setNotification: (notif: NotificationType | null) => void;
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) => void;

  // User
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUserProfile: (user: User) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, newQuantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartModalOpen: boolean;
  setCartModalOpen: (open: boolean) => void;

  // Voucher
  selectedVoucher: Voucher | null;
  applyVoucher: (code: string) => void;
  removeVoucher: () => void;
  calculateDiscount: (total: number) => number;

  // Modals
  categoryModalOpen: boolean;
  selectedCategory: string | null;
  openCategoryModal: (category: string) => void;
  closeCategoryModal: () => void;

  productDetailModalOpen: boolean;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productDetailModalOpen, setProductDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('si20k_cart');
      if (savedCart && savedCart !== 'undefined') {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Error loading cart:', e);
      localStorage.removeItem('si20k_cart');
    }

    try {
      const savedUser = localStorage.getItem('si20k_currentUser');
      if (savedUser && savedUser !== 'undefined') {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Error loading user:', e);
      localStorage.removeItem('si20k_currentUser');
    }

    try {
      const savedVoucher = localStorage.getItem('si20k_voucher');
      if (savedVoucher && savedVoucher !== 'undefined') {
        setSelectedVoucher(JSON.parse(savedVoucher));
      }
    } catch (e) {
      console.error('Error loading voucher:', e);
      localStorage.removeItem('si20k_voucher');
    }
  }, []);

  // Save cart on change
  useEffect(() => {
    localStorage.setItem('si20k_cart', JSON.stringify(cart));
  }, [cart]);

  // Show notification with auto-hide
  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) => {
    setNotification({ message, type, duration });
    if (duration > 0) {
      setTimeout(() => setNotification(null), duration);
    }
  }, []);

  // Auth
  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('si20k_currentUser', JSON.stringify(user));
    setAuthModalOpen(false);
    showNotification(`Xin chào ${user.name}!`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('si20k_currentUser');
    showNotification('Đã đăng xuất.', 'info');
  };

  const updateUserProfile = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('si20k_currentUser', JSON.stringify(user));
    showNotification('Cập nhật hồ sơ thành công!', 'success');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showNotification(`Đã thêm ${product.name} vào giỏ!`, 'success');
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showNotification('Đã xóa khỏi giỏ hàng', 'info');
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedVoucher(null);
    localStorage.removeItem('si20k_voucher');
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Voucher
  const applyVoucher = (code: string) => {
    const allVouchers: Voucher[] = [
      { id: 1, code: 'WELCOME10', discountType: 'percent', discount: 10, minOrder: 100000, description: '10% off for first order' },
      { id: 2, code: 'S50', discountType: 'fixed', discount: 50000, minOrder: 1000000, description: '50,000 VND off orders from 1,000,000 VND' },
      { id: 3, code: 'SALE20', discountType: 'percent', discount: 20, minOrder: 500000, maxDiscount: 500000, description: '20% off up to 500,000 VND' },
      { id: 4, code: 'SUMMER15', discountType: 'percent', discount: 15, minOrder: 300000, description: '15% off on summer collection' },
    ];

    const voucher = allVouchers.find((v) => v.code === code);
    if (!voucher) {
      showNotification('Mã giảm giá không tồn tại!', 'error');
      return;
    }

    if (voucher.minOrder && cartTotal < voucher.minOrder) {
      showNotification(`Mã này áp dụng cho đơn hàng từ ${voucher.minOrder?.toLocaleString('vi-VN')} VND`, 'warning');
      return;
    }

    setSelectedVoucher(voucher);
    localStorage.setItem('si20k_voucher', JSON.stringify(voucher));
    showNotification(`Áp dụng mã: ${code}`, 'success');
  };

  const removeVoucher = () => {
    setSelectedVoucher(null);
    localStorage.removeItem('si20k_voucher');
    showNotification('Đã xóa mã giảm giá', 'info');
  };

  const calculateDiscount = (total: number): number => {
    if (!selectedVoucher) return 0;

    if (selectedVoucher.discountType === 'percent') {
      const discount = (total * selectedVoucher.discount) / 100;
      return selectedVoucher.maxDiscount ? Math.min(discount, selectedVoucher.maxDiscount) : discount;
    }
    return selectedVoucher.discount;
  };

  // Modals
  const openCategoryModal = (category: string) => {
    setSelectedCategory(category);
    setCategoryModalOpen(true);
  };

  const closeCategoryModal = () => setCategoryModalOpen(false);

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setProductDetailModalOpen(true);
  };

  const closeProductDetail = () => setProductDetailModalOpen(false);

  return (
    <StoreContext.Provider value={{
      notification, setNotification, showNotification,
      currentUser, login, logout, updateUserProfile, authModalOpen, setAuthModalOpen,
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartModalOpen, setCartModalOpen,
      selectedVoucher, applyVoucher, removeVoucher, calculateDiscount,
      categoryModalOpen, selectedCategory, openCategoryModal, closeCategoryModal,
      productDetailModalOpen, selectedProduct, openProductDetail, closeProductDetail
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};