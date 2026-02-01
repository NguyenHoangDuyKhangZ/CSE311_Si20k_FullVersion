'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/store_context';
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
    if (!currentUser) {
      showNotification('Vui lòng đăng nhập!', 'warning');
      router.push('/');
      return;
    }

    if (cart.length === 0) {
      showNotification('Giỏ hàng trống!', 'info');
      router.push('/');
      return;
    }

    setFormData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      address: currentUser.address || '',
    });
  }, [cart, currentUser, router, showNotification]);

  if (!currentUser || cart.length === 0) return null;

  const discount = calculateDiscount(cartTotal);
  const finalTotal = cartTotal - discount;

  const handleConfirmPayment = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      showNotification('Vui lòng điền đầy đủ thông tin giao hàng', 'warning');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      showNotification('Đặt hàng thành công! Cảm ơn bạn.', 'success');
      clearCart();
      router.push('/');
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12 gradient-text">
          💳 Thanh Toán Đơn Hàng
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Shipping & Payment Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6">📦 Thông Tin Giao Hàng</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Người nhận
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
                      Số điện thoại
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
                    Địa chỉ giao hàng
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
              <h2 className="text-2xl font-bold mb-6">💳 Phương Thức Thanh Toán</h2>

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
                    <p className="font-semibold">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-sm text-gray-500">
                      Không phí giao dịch, thanh toán trực tiếp cho người giao
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
                    <p className="font-semibold">
                      Chuyển khoản ngân hàng
                    </p>
                    <p className="text-sm text-gray-500">
                      Chuyển khoản trước khi giao hàng
                    </p>
                  </div>
                </label>
              </div>

              {paymentMethod === 'BANK' && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2">
                    Thông tin chuyển khoản:
                  </p>
                  <p className="text-sm text-blue-800">
                    Ngân hàng: TPBank<br />
                    Số tài khoản: 12345678901<br />
                    Chủ tài khoản: SI20K STORE
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-8 sticky top-20">
              <h2 className="text-2xl font-bold mb-6">📋 Đơn Hàng</h2>

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
                      <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
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
                  <span>Tạm tính:</span>
                  <span className="font-bold">
                    {cartTotal.toLocaleString('vi-VN')} ₫
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>
                      Giảm giá ({selectedVoucher?.code}):
                    </span>
                    <span className="font-bold">
                      -{discount.toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold border-t pt-3 text-indigo-600">
                  <span>Tổng cộng:</span>
                  <span>{finalTotal.toLocaleString('vi-VN')} ₫</span>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="btn btn-primary w-full mt-6 disabled:opacity-50"
              >
                {isProcessing ? '⏳ Đang xử lý...' : '✓ Xác Nhận Đặt Hàng'}
              </button>

              <Link
                href="/"
                className="btn btn-outline w-full mt-3 block text-center"
              >
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
