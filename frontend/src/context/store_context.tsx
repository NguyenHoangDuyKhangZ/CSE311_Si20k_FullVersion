'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, CartItem, User, NotificationType, Voucher } from '@/src/types/index';
import { fetchProducts } from '@/src/services/productService';
import { fetchAllVouchers, fetchVoucherByCode } from '@/src/services/voucherService';

interface StoreContextType {
  notification: NotificationType | null;
  setNotification: (notif: NotificationType | null) => void;
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) => void;

  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUserProfile: (user: User) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  products: Product[];
  isLoadingProducts: boolean;
  refreshProducts: () => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartModalOpen: boolean;
  setCartModalOpen: (open: boolean) => void;

  vouchers: Voucher[];
  isLoadingVouchers: boolean;
  selectedVoucher: Voucher | null;
  applyVoucher: (code: string) => Promise<void>;
  removeVoucher: () => void;
  calculateDiscount: (total: number) => number;

  categoryModalOpen: boolean;
  selectedCategory: string | null;
  openCategoryModal: (category: string) => void;
  closeCategoryModal: () => void;

  productDetailModalOpen: boolean;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  darkMode: boolean;
  toggleDarkMode: () => void;

  deleteProductModalOpen: boolean;
  setDeleteProductModalOpen: (open: boolean) => void;
  selectedProductToDelete: Product | null;
  setSelectedProductToDelete: (product: Product | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isLoadingVouchers, setIsLoadingVouchers] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productDetailModalOpen, setProductDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
  const [selectedProductToDelete, setSelectedProductToDelete] = useState<Product | null>(null);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) => {
    setNotification({ message, type, duration });
    if (duration > 0) setTimeout(() => setNotification(null), duration);
  }, []);

  const refreshProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      showNotification('Could not load products.', 'error');
    } finally { setIsLoadingProducts(false); }
  }, [showNotification]);

  const refreshVouchers = useCallback(async (token: string = '') => {
    setIsLoadingVouchers(true);
    try {
      const data = await fetchAllVouchers(token);
      setVouchers(data.map((v: any) => ({ ...v, code: v.voucherCode || v.code })));
    } catch (err) { console.error(err); }
    finally { setIsLoadingVouchers(false); }
  }, []);

  useEffect(() => {
    try {
      const rawCart = localStorage.getItem('si20k_cart');
      if (rawCart && rawCart !== 'undefined') setCart(JSON.parse(rawCart));
    } catch { }

    // Restore user session
    let restoredToken: string = '';
    try {
      const raw = localStorage.getItem('si20k_currentUser');
      if (raw && raw !== 'undefined') {
        const user: User = JSON.parse(raw);
        setCurrentUser(user);
        restoredToken = user.token || (user as any).accessToken || '';
      }
    } catch { localStorage.removeItem('si20k_currentUser'); }

    try {
      const rawVoucher = localStorage.getItem('si20k_voucher');
      if (rawVoucher && rawVoucher !== 'undefined') setSelectedVoucher(JSON.parse(rawVoucher));
    } catch { }

    refreshProducts();
    refreshVouchers(restoredToken);
  }, [refreshProducts, refreshVouchers]);

  useEffect(() => { localStorage.setItem('si20k_cart', JSON.stringify(cart)); }, [cart]);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('si20k_currentUser', JSON.stringify(user));
    setAuthModalOpen(false);
    showNotification(`Welcome ${user.name}!`, 'success');
    const tokenToUse = user.token || (user as any).accessToken;
    if (tokenToUse) refreshVouchers(tokenToUse);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('si20k_currentUser');
    showNotification('Logged out successfully.', 'info');
  };

  const updateUserProfile = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('si20k_currentUser', JSON.stringify(user));
    showNotification('Profile updated successfully!', 'success');
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      return [...prev, { ...product, quantity }];
    });
    showNotification(`Added "${product.name}" to cart!`, 'success');
  };

  const removeFromCart = (id: string) => { setCart((prev) => prev.filter((item) => item.id !== id)); };
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) { removeFromCart(id); return; }
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: newQuantity } : item));
  };
  const clearCart = () => { setCart([]); setSelectedVoucher(null); localStorage.removeItem('si20k_voucher'); };
  const cartTotal = cart.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);

  const applyVoucher = async (code: string): Promise<void> => {
    const voucher = vouchers.find(v => v.code?.toUpperCase() === code.toUpperCase() || (v as any).voucherCode?.toUpperCase() === code.toUpperCase());
    if (!voucher) { showNotification('Voucher code does not exist!', 'error'); return; }
    if (!voucher.isActive) { showNotification('This voucher is no longer active.', 'error'); return; }
    if (cartTotal < voucher.minOrder) { showNotification(`Applies to orders from ${voucher.minOrder.toLocaleString('vi-VN')} ₫`, 'warning'); return; }
    setSelectedVoucher(voucher);
    localStorage.setItem('si20k_voucher', JSON.stringify(voucher));
    showNotification(`Applied code: ${voucher.code}`, 'success');
  };

  const removeVoucher = () => { setSelectedVoucher(null); localStorage.removeItem('si20k_voucher'); };
  const calculateDiscount = (total: number): number => {
    if (!selectedVoucher) return 0;
    if (selectedVoucher.discountType === 'Percent' || selectedVoucher.discountType === 'PercentUpTo') {
      const discount = (total * selectedVoucher.discountAmount) / 100;
      return selectedVoucher.maxDiscount ? Math.min(discount, selectedVoucher.maxDiscount) : discount;
    }
    return selectedVoucher.discountAmount;
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  const openCategoryModal = (category: string) => { setSelectedCategory(category); setCategoryModalOpen(true); };
  const closeCategoryModal = () => setCategoryModalOpen(false);
  const openProductDetail = (product: Product) => { setSelectedProduct(product); setProductDetailModalOpen(true); };
  const closeProductDetail = () => setProductDetailModalOpen(false);

  return (
    <StoreContext.Provider value={{
      notification, setNotification, showNotification,
      currentUser, login, logout, updateUserProfile, authModalOpen, setAuthModalOpen,
      products, isLoadingProducts, refreshProducts,
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartModalOpen, setCartModalOpen,
      vouchers, isLoadingVouchers, selectedVoucher, applyVoucher, removeVoucher, calculateDiscount,
      categoryModalOpen, selectedCategory, openCategoryModal, closeCategoryModal,
      productDetailModalOpen, selectedProduct, openProductDetail, closeProductDetail,
      darkMode, toggleDarkMode,
      deleteProductModalOpen, setDeleteProductModalOpen, selectedProductToDelete, setSelectedProductToDelete
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