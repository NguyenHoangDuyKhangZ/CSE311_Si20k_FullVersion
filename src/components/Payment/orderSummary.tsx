'use client';

import Image from 'next/image';
import type { CartItem } from '@/types/index';

interface OrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}

export default function OrderSummary({ cart, subtotal, discount, total }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit sticky top-24">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <i className="fas fa-shopping-bag text-primary"></i> Order Summary
      </h3>

      {/* Danh sách sản phẩm (Có cuộn nếu dài) */}
      <div className="max-h-[300px] overflow-y-auto pr-2 mb-6 space-y-4 scrollbar-thin">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
              <Image src={item.img} alt={item.name} fill className="object-cover" />
              <span className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded-tl-md font-bold">
                x{item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 text-sm line-clamp-2">{item.name}</h4>
              <p className="text-gray-500 text-xs mt-1">Size: Free Size</p>
            </div>
            <div className="font-bold text-gray-700 text-sm">
              {(item.price * item.quantity).toLocaleString()}₫
            </div>
          </div>
        ))}
      </div>

      {/* Phần tính tiền */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{subtotal.toLocaleString()}₫</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{discount.toLocaleString()}₫</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-2xl font-bold text-accent">{total.toLocaleString()}₫</span>
        </div>
      </div>
    </div>
  );
}