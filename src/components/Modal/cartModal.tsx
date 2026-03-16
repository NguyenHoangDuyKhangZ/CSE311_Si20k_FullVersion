'use client';

import { useStore } from '@/src/context/store_context';
import Link from 'next/link';
import { useState } from 'react';

// List of available vouchers to display
const AVAILABLE_VOUCHERS = [
  { code: 'WELCOME10', discountText: '10%', description: '10% off for first order' },
  { code: 'S50', discountText: '50,000 VND', description: '50,000 VND off orders from 1,000,000 VND' },
  { code: 'SALE20', discountText: '20%', description: '20% off up to 500,000 VND' }
];

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

  // Handle when Apply button is clicked (manual input)
  const handleApplyVoucher = () => {
    if (!voucherCode.trim()) {
      showNotification('Please enter discount code', 'warning');
      return;
    }
    applyVoucher(voucherCode);
  };

  // Handle when clicking directly on voucher card
  const handleVoucherClick = (code: string) => {
    applyVoucher(code);
    setVoucherCode(code); // Auto-fill input for visual feedback
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-end bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={() => setCartModalOpen(false)}
    >
      <div
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50 flex-shrink-0">
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

        {/* Main Content - scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Cart Items Section */}
          <div className="p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <i className="fas fa-shopping-bag text-4xl mb-4 block"></i>
                <p className="font-medium">Your cart is empty</p>
                <button
                  onClick={() => setCartModalOpen(false)}
                  className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-bold hover:bg-indigo-50 mt-4 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
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
                        className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-indigo-100 text-gray-600 transition-colors text-xs"
                      >
                        −
                      </button>
                      <span className="font-semibold w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-indigo-100 text-gray-600 transition-colors text-xs"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <i className="fas fa-trash-alt text-sm"></i>
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
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <h3 className="font-bold text-gray-800 text-base flex items-center gap-2 mb-3">
                  <i className="fas fa-ticket-alt text-red-500"></i> Voucher & Discount Codes
                </h3>
                
                {/* Input nhập mã */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Enter voucher code"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none text-xs uppercase"
                  />
                  <button
                    onClick={handleApplyVoucher}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {/* Danh sách Voucher để click */}
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-gray-600 font-medium">Available vouchers:</p>
                  {AVAILABLE_VOUCHERS.map((v) => {
                    const isSelected = selectedVoucher?.code === v.code;
                    return (
                      <div
                        key={v.code}
                        onClick={() => handleVoucherClick(v.code)}
                        className={`p-3 rounded-lg cursor-pointer transition-all border-2 ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 bg-white hover:border-indigo-300'
                        }`}
                      >
                        <div className="font-bold text-gray-800 text-sm mb-1 flex items-center justify-between">
                          <span>{v.code} - {v.discountText}</span>
                          {isSelected && <i className="fas fa-check-circle text-indigo-500 text-sm"></i>}
                        </div>
                        <div className="text-xs text-gray-500">{v.description}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Total Calculation */}
                <div className="space-y-1 bg-white p-3 rounded-lg border border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-bold text-gray-800">
                      {cartTotal.toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-xs text-green-600 font-medium">
                      <span>Discount ({selectedVoucher?.code}):</span>
                      <span>
                        -{discount.toLocaleString('vi-VN')} ₫
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold border-t border-gray-100 pt-2 mt-1 text-indigo-600">
                    <span>Total:</span>
                    <span className="text-red-500">{finalTotal.toLocaleString('vi-VN')} ₫</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <>
            {/* Checkout Button - Sticky at bottom */}
            <div className="p-5 border-t border-gray-200 bg-white flex-shrink-0">
              <Link
                href="/payment"
                onClick={() => setCartModalOpen(false)}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
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