'use client';

import { useStore } from '@/src/context/store_context';
import Link from 'next/link';
import { useState } from 'react';

export default function CartModal() {
  const {
    cart,
    cartModalOpen,
    setCartModalOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    selectedVoucher,
    applyVoucher,
    calculateDiscount,
    showNotification,
  } = useStore();

  const [voucherCode, setVoucherCode] = useState('');

  if (!cartModalOpen) return null;

  const discount = calculateDiscount(cartTotal);
  const finalTotal = cartTotal - discount;

  const handleApplyVoucher = () => {
    if (!voucherCode.trim()) {
      showNotification('Please enter discount code', 'warning');
      return;
    }
    applyVoucher(voucherCode);
    setVoucherCode('');
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => setCartModalOpen(false)}
    >
      <div
        className="modal-content max-w-md w-full mx-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
              <i className="fas fa-shopping-cart text-xl"></i>Your Cart
            </h2>
            <p className="text-sm text-gray-500 mt-1">{cart.length} products</p>
          </div>
          <button
            onClick={() => setCartModalOpen(false)}
            className="text-gray-400 hover:text-red-500 text-2xl transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <i className="fas fa-shopping-bag text-4xl mb-4 block"></i>
              <p className="font-medium">Your cart is empty</p>
              <button
                onClick={() => setCartModalOpen(false)}
                className="btn btn-outline mt-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 line-clamp-2 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-indigo-600 font-bold mt-1">
                    {item.price.toLocaleString('vi-VN')} ₫
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors"
                    >
                      −
                    </button>
                    <span className="font-semibold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-400 hover:text-red-600 transition-colors"
                    >
                      <i className="fas fa-trash-alt text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <>
            {/* Voucher Section */}
            <div className="p-6 border-t border-gray-200 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code (e.g.: WELCOME10)"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none text-sm"
                />
                <button
                  onClick={handleApplyVoucher}
                  className="btn btn-secondary btn-sm"
                >
                  Apply
                </button>
              </div>

              {selectedVoucher && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-3 text-sm">
                  <p className="font-bold text-green-700 flex items-center gap-2">
                    <i className="fas fa-check-circle"></i>{selectedVoucher.code}
                  </p>
                  <p className="text-green-600 text-xs mt-1">
                    {selectedVoucher.description}
                  </p>
                </div>
              )}

              {/* Total */}
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold">
                    {cartTotal.toLocaleString('vi-VN')} ₫
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount:</span>
                    <span className="font-bold">
                      -{discount.toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2 text-indigo-600">
                  <span>Total:</span>
                  <span>{finalTotal.toLocaleString('vi-VN')} ₫</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="p-6 border-t border-gray-200">
              <Link
                href="/payment"
                onClick={() => setCartModalOpen(false)}
                className="btn btn-primary w-full block text-center flex items-center justify-center gap-2"
              >
                <i className="fas fa-credit-card"></i>Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}