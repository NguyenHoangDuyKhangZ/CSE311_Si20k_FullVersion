'use client';

import { useStore } from '@/context/store_context';

export default function FloatingCart() {
  const { cart, setCartModalOpen } = useStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Hide button if cart is empty
  if (totalItems === 0) return null;

  return (
    <button 
      onClick={() => setCartModalOpen(true)}
      className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-accent to-red-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 hover:scale-110 transition-transform animate-bounce-slow"
    >
      <i className="fas fa-shopping-cart text-xl"></i>
      <span className="font-bold">View Cart</span>
      <span className="bg-white text-red-600 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
        {totalItems}
      </span>
    </button>
  );
}