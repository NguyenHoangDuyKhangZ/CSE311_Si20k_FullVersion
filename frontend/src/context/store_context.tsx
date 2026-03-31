'use client';

import React, {
  createContext, useContext, useState, useEffect, ReactNode, useCallback,
} from 'react';
import { Product, CartItem, User, NotificationType, Voucher } from '@/src/types/index';
import { fetchProducts } from '@/src/services/productService';
import { vouchers as VOUCHERS } from '@/src/constants/products';

// ─── Context Shape ─────────────────────────────────────────────────────────────
interface StoreContextType {
  // Notification
  notification: NotificationType | null;
  setNotification: (notif: NotificationType | null) => void;
  showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) => void;

  // Auth
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUserProfile: (user: User) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  // User list (admin)
  userList: User[];
  toggleLockUser: (email: string) => void;
  createNewUser: (userData: Omit<User, 'id' | 'createdAt'>) => void;

  // Products (from API)
  products: Product[];
  isLoadingProducts: boolean;
  refreshProducts: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartModalOpen: boolean;
  setCartModalOpen: (open: boolean) => void;

  // Voucher
  selectedVoucher: Voucher | null;
  applyVoucher: (code: string) => void;
  removeVoucher: () => void;
  calculateDiscount: (total: number) => number;

  // Category modal
  categoryModalOpen: boolean;
  selectedCategory: string | null;
  openCategoryModal: (category: string) => void;
  closeCategoryModal: () => void;

  // Product detail modal
  productDetailModalOpen: boolean;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  // Delete product modal
  deleteProductModalOpen: boolean;
  setDeleteProductModalOpen: (open: boolean) => void;
  selectedProductToDelete: Product | null;
  setSelectedProductToDelete: (product: Product | null) => void;
  deleteProductWithReason: (productId: string, reason: string, warningMessage: string) => void;

  // Dark mode
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Admin-local product overrides (edit/stock, kept in memory)
  adminProducts: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateProductStock: (id: string, newStock: number) => void;
}

// ─── Context Creation ──────────────────────────────────────────────────────────
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productDetailModalOpen, setProductDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [darkMode, setDarkMode] = useState(false);

  // Admin local state (mirrors API data but allows local edits)
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);

  const [userList, setUserList] = useState<User[]>([]);
  const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);
  const [selectedProductToDelete, setSelectedProductToDelete] = useState<Product | null>(null);

  // ─── Notification ────────────────────────────────────────────────────────────
  const showNotification = useCallback(
    (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) => {
      setNotification({ message, type, duration });
      if (duration > 0) setTimeout(() => setNotification(null), duration);
    },
    []
  );

  // ─── Fetch Products from API ─────────────────────────────────────────────────
  const refreshProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setAdminProducts(data); // sync admin panel view
    } catch (err) {
      console.error('Failed to load products:', err);
      showNotification('Could not load products. Please check the backend.', 'error');
    } finally {
      setIsLoadingProducts(false);
    }
  }, [showNotification]);

  // ─── Bootstrap on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    // Restore cart
    try {
      const raw = localStorage.getItem('si20k_cart');
      if (raw && raw !== 'undefined') setCart(JSON.parse(raw));
    } catch { localStorage.removeItem('si20k_cart'); }

    // Restore user session
    try {
      const raw = localStorage.getItem('si20k_currentUser');
      if (raw && raw !== 'undefined') setCurrentUser(JSON.parse(raw));
    } catch { localStorage.removeItem('si20k_currentUser'); }

    // Restore voucher
    try {
      const raw = localStorage.getItem('si20k_voucher');
      if (raw && raw !== 'undefined') setSelectedVoucher(JSON.parse(raw));
    } catch { localStorage.removeItem('si20k_voucher'); }

    // Restore dark mode
    try {
      const saved = localStorage.getItem('si20k_darkMode');
      if (saved) {
        const isDark = saved === 'true';
        setDarkMode(isDark);
        if (isDark) document.documentElement.classList.add('dark');
      }
    } catch { /* ignore */ }

    // Restore or seed user list
    try {
      const raw = localStorage.getItem('si20k_userList');
      if (raw && raw !== 'undefined') {
        setUserList(JSON.parse(raw));
      } else {
        const seed: User[] = [
          { id: '1', name: 'Root Admin',     email: 'admin@si20k.com',   phone: '0123456789', points: 0,   role: 'admin',  password: '123', isLocked: false, createdAt: new Date().toISOString() },
          { id: '2', name: 'Seller Account', email: 'seller@si20k.com',  phone: '0987654321', points: 100, role: 'seller', password: '123', isLocked: false, createdAt: new Date().toISOString() },
          { id: '3', name: 'John Customer',  email: 'john@example.com',  phone: '0999111222', points: 50,  role: 'guest',  password: '123', isLocked: false, createdAt: new Date().toISOString() },
          { id: '4', name: 'Jane Seller',    email: 'jane@example.com',  phone: '0988222333', points: 200, role: 'seller', password: '123', isLocked: false, createdAt: new Date().toISOString() },
        ];
        setUserList(seed);
        localStorage.setItem('si20k_userList', JSON.stringify(seed));
      }
    } catch { localStorage.removeItem('si20k_userList'); }

    // Load products from API
    refreshProducts();
  }, [refreshProducts]);

  // Persist cart changes
  useEffect(() => { localStorage.setItem('si20k_cart', JSON.stringify(cart)); }, [cart]);

  // Persist user list changes
  useEffect(() => { localStorage.setItem('si20k_userList', JSON.stringify(userList)); }, [userList]);

  // ─── Auth ────────────────────────────────────────────────────────────────────
  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('si20k_currentUser', JSON.stringify(user));
    setAuthModalOpen(false);
    showNotification(`Welcome ${user.name}!`, 'success');
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

  // ─── Cart ────────────────────────────────────────────────────────────────────
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
    showNotification(`Added "${product.name}" to cart!`, 'success');
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showNotification('Removed from cart', 'info');
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) { removeFromCart(id); return; }
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedVoucher(null);
    localStorage.removeItem('si20k_voucher');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ─── Voucher ─────────────────────────────────────────────────────────────────
  const applyVoucher = (code: string) => {
    const voucher = VOUCHERS.find((v) => v.code === code);
    if (!voucher) { showNotification('Voucher code does not exist!', 'error'); return; }
    if (voucher.minOrder && cartTotal < voucher.minOrder) {
      showNotification(`Applies to orders from ${voucher.minOrder.toLocaleString('vi-VN')} VND`, 'warning');
      return;
    }
    setSelectedVoucher(voucher);
    localStorage.setItem('si20k_voucher', JSON.stringify(voucher));
    showNotification(`Applied code: ${code}`, 'success');
  };

  const removeVoucher = () => {
    setSelectedVoucher(null);
    localStorage.removeItem('si20k_voucher');
    showNotification('Voucher removed', 'info');
  };

  const calculateDiscount = (total: number): number => {
    if (!selectedVoucher) return 0;
    if (selectedVoucher.discountType === 'percent') {
      const discount = (total * selectedVoucher.discount) / 100;
      return selectedVoucher.maxDiscount ? Math.min(discount, selectedVoucher.maxDiscount) : discount;
    }
    return selectedVoucher.discount;
  };

  // ─── Dark Mode ───────────────────────────────────────────────────────────────
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('si20k_darkMode', String(next));
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  // ─── Modals ──────────────────────────────────────────────────────────────────
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

  // ─── Admin local product management ──────────────────────────────────────────
  const addProduct = (product: Product) => {
    const newProduct = { ...product, id: crypto.randomUUID(), stock: product.stock ?? 0, sold: product.sold ?? 0 };
    setAdminProducts((prev) => [...prev, newProduct]);
    showNotification(`Product "${newProduct.name}" added!`, 'success');
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setAdminProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...productData } : p)));
    showNotification('Product updated!', 'success');
  };

  const deleteProduct = (id: string) => {
    const product = adminProducts.find((p) => p.id === id);
    setAdminProducts((prev) => prev.filter((p) => p.id !== id));
    showNotification(`Product "${product?.name}" deleted!`, 'success');
  };

  const updateProductStock = (id: string, newStock: number) => {
    setAdminProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p)));
  };

  // ─── User management ─────────────────────────────────────────────────────────
  const toggleLockUser = (email: string) => {
    setUserList((prev) => prev.map((u) => u.email === email ? { ...u, isLocked: !u.isLocked } : u));
    const user = userList.find((u) => u.email === email);
    showNotification(`User ${email} ${user?.isLocked ? 'unlocked' : 'locked'}`, 'success');
  };

  const createNewUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = { ...userData, id: Date.now().toString(), createdAt: new Date().toISOString() };
    setUserList((prev) => [...prev, newUser]);
    showNotification(`Account "${userData.email}" created!`, 'success');
  };

  // ─── Delete product with reason ───────────────────────────────────────────────
  const deleteProductWithReason = (productId: string, reason: string, warningMessage: string) => {
    const product = adminProducts.find((p) => p.id === productId);
    if (product) {
      console.log('Admin deleted product:', { productId, name: product.name, reason, warningMessage });
      setAdminProducts((prev) => prev.filter((p) => p.id !== productId));
      showNotification(`"${product.name}" deleted. Warning sent to seller.`, 'success');
    }
    setDeleteProductModalOpen(false);
    setSelectedProductToDelete(null);
  };

  // ─── Provider value ───────────────────────────────────────────────────────────
  return (
    <StoreContext.Provider value={{
      notification, setNotification, showNotification,
      currentUser, login, logout, updateUserProfile, authModalOpen, setAuthModalOpen,
      userList, toggleLockUser, createNewUser,
      products, isLoadingProducts, refreshProducts,
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartModalOpen, setCartModalOpen,
      selectedVoucher, applyVoucher, removeVoucher, calculateDiscount,
      categoryModalOpen, selectedCategory, openCategoryModal, closeCategoryModal,
      productDetailModalOpen, selectedProduct, openProductDetail, closeProductDetail,
      deleteProductModalOpen, setDeleteProductModalOpen, selectedProductToDelete, setSelectedProductToDelete, deleteProductWithReason,
      darkMode, toggleDarkMode,
      adminProducts, addProduct, updateProduct, deleteProduct, updateProductStock,
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
