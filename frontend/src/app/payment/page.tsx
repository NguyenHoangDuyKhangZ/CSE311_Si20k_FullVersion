'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from "@/src/context/store_context";
import Link from 'next/link';

export default function PaymentPage() {
  const {
    cart,
    currentUser,
    cartTotal,
    selectedVoucher,
    calculateDiscount,
    clearCart,
    showNotification,
  } = useStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BANK'>('COD');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    // Only check on first mount
    if (!currentUser) {
      showNotification('Please login first!', 'warning');
      router.push('/');
      return;
    }

    if (cart.length === 0) {
      showNotification('Your cart is empty!', 'info');
      router.push('/');
      return;
    }

    setFormData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      address: currentUser.address || '',
    });
  }, []);

  if (!currentUser || cart.length === 0) return null;

  const discount = calculateDiscount(cartTotal);
  const finalTotal = cartTotal - discount;

  const handleConfirmPayment = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      showNotification('Please fill in complete delivery information', 'warning');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      showNotification('Order successful! Thank you.', 'success');
      clearCart();
      router.push('/');
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12 gradient-text flex items-center justify-center gap-3">
          <i className="fas fa-credit-card text-4xl"></i> Order Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Shipping & Payment Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <i className="fas fa-box text-indigo-600 text-2xl"></i>Shipping Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <i className="fas fa-credit-card text-indigo-600 text-2xl"></i>Payment Method
              </h2>

              <div className="space-y-4">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-600 transition-colors">
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value as 'COD' | 'BANK')
                    }
                    className="w-5 h-5"
                  />
                  <div className="ml-4">
                    <p className="font-semibold flex items-center gap-2">
                      <i className="fas fa-truck text-indigo-600"></i>Cash on Delivery (COD)
                    </p>
                    <p className="text-sm text-gray-500">
                      No transaction fee, pay directly to delivery person
                    </p>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-600 transition-colors">
                  <input
                    type="radio"
                    value="BANK"
                    checked={paymentMethod === 'BANK'}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value as 'COD' | 'BANK')
                    }
                    className="w-5 h-5"
                  />
                  <div className="ml-4">
                    <p className="font-semibold flex items-center gap-2">
                      <i className="fas fa-university text-indigo-600"></i>Bank Transfer
                    </p>
                    <p className="text-sm text-gray-500">
                      Transfer before delivery
                    </p>
                  </div>
                </label>
              </div>

              {paymentMethod === 'BANK' && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                  <p className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <i className="fas fa-qrcode text-lg"></i>Bank Transfer Information:
                  </p>
                  <div className="flex justify-center mb-3">
                    <img src="../images/qr.png" alt="QR Code" className="w-48 h-48 rounded-lg border-2 border-blue-300" />
                  </div>
                  <p className="text-sm text-blue-800 space-y-2">
                    <div><strong>Bank:</strong> TPBank</div>
                    <div><strong>Account Number:</strong> 0397675801</div>
                    <div><strong>Account Holder:</strong> SI20K STORE</div>
                    <div><strong>Amount:</strong> <span className="text-lg font-bold">{finalTotal.toLocaleString('vi-VN')} ₫</span></div>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-8 sticky top-20">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <i className="fas fa-list text-indigo-600 text-2xl"></i>Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center pb-4 border-b"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-800 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-indigo-600">
                      {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span className="font-bold">
                    {cartTotal.toLocaleString('vi-VN')} ₫
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>
                      Discount ({selectedVoucher?.code}):
                    </span>
                    <span className="font-bold">
                      -{discount.toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold border-t pt-3 text-indigo-600">
                  <span>Total:</span>
                  <span>{finalTotal.toLocaleString('vi-VN')} ₫</span>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="btn btn-primary w-full mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle"></i>Confirm Order
                  </>
                )}
              </button>

              <Link
                href="/"
                className="btn btn-outline w-full mt-3 block text-center flex items-center justify-center gap-2"
              >
                <i className="fas fa-arrow-left"></i>Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
