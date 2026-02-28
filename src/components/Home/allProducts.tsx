'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/src/context/store_context';
import { Product } from '@/src/types';


// 2. Dữ liệu mẫu (Copy từ project.js cũ và chuẩn hóa lại)
const categoriesData: Record<string, Product[]> = {
  jackets: [
    { id: 3, name: 'Black Jacket', price: 15000, originalPrice: 20000, description: 'Lightweight, good sun protection', img: 'https://plus.unsplash.com/premium_photo-1673356301340-4522591be5f7?q=80&w=687', sold: 128, category: 'jackets' },
    { id: 4, name: 'Gray Hoodie', price: 18000, originalPrice: 20000, description: 'Soft fleece, warm', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072', sold: 198, category: 'jackets' },
    { id: 101, name: 'Red-Black Jacket', price: 20000, originalPrice: 20000, description: 'Thick material, eye-catching color mix', img: 'https://plus.unsplash.com/premium_photo-1673356301340-4522591be5f7?q=80&w=687', sold: 56, category: 'jackets' },
    { id: 102, name: 'Olive Bomber', price: 20000, originalPrice: 20000, description: 'Youthful style, suitable for school', img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072', sold: 89, category: 'jackets' },
  ],
  pants: [
    { id: 201, name: 'Men Black Jeans', price: 20000, originalPrice: 25000, description: 'Slimfit, slightly stretchy', img: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?q=80&w=687', sold: 201, category: 'pants' },
    { id: 202, name: 'Blue Wash Jeans', price: 20000, originalPrice: 22000, description: 'Youthful cut for women', img: 'https://images.unsplash.com/photo-1649566650740-cb0a625e1b40?q=80&w=687', sold: 154, category: 'pants' },
    { id: 203, name: 'Baggy Jeans', price: 20000, originalPrice: 20000, description: 'Oversized trendy style', img: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?q=80&w=687', sold: 312, category: 'pants' },
  ],
  shirts: [
    { id: 301, name: 'White Basic T-shirt', price: 15000, originalPrice: 20000, description: 'Cotton tee, breathable', img: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=687', sold: 405, category: 'shirts' },
    { id: 302, name: 'Graphic Unisex Tee', price: 20000, originalPrice: 25000, description: 'Bold print, street style', img: 'https://plus.unsplash.com/premium_photo-1673356301535-2cc45bcc79e4?q=80&w=687', sold: 220, category: 'shirts' },
    { id: 303, name: 'Polo Shirt', price: 20000, originalPrice: 30000, description: 'Smart, elegant look', img: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=687', sold: 180, category: 'shirts' },
  ]
};

// 3. Ảnh đại diện cho từng danh mục (Lấy từ project.js)
const categoryImages: Record<string, string> = {
  jackets: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
  pants: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
  shirts: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
};

export default function AllProducts() {
  const { showNotification, addToCart: addToCartAction } = useStore();

  // State quản lý Tab đang chọn (mặc định là jackets)
  const [activeTab, setActiveTab] = useState<'jackets' | 'pants' | 'shirts'>('jackets');

  const addToCart = (product: Product) => {
    addToCartAction(product);
  };

  return (
    <section className="py-20 bg-gray-50" id="all-products">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-2">= All Products =</h2>
          <p className="text-gray-500 text-lg">Explore our full collection</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* CỘT TRÁI: Tabs & Danh sách sản phẩm */}
          <div className="lg:w-2/3 w-full">

            {/* Tabs Navigation (Thay thế Bootstrap Nav Tabs) */}
            <div className="flex justify-center gap-4 mb-8 border-b-2 border-primary/20 pb-1">
              {(['jackets', 'pants', 'shirts'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-6 py-3 font-bold text-lg rounded-t-lg transition-all capitalize
                    ${activeTab === tab
                      ? 'bg-primary text-white shadow-lg translate-y-[2px]'
                      : 'bg-white text-primary hover:bg-gray-100'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Danh sách sản phẩm (Horizontal Cards) */}
            <div className="space-y-4 animate-fade-in">
              {categoriesData[activeTab].map((product) => {
                const originalPrice = product.originalPrice || product.price;
                const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

                return (
                  <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 flex gap-4 items-center">

                    {/* Ảnh nhỏ bên trái */}
                    <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden">
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Thông tin ở giữa */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2 line-clamp-1">{product.description}</p>

                      <div className="flex items-center gap-2 mb-2">
                        {discount > 0 && (
                          <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <i className="fas fa-fire"></i> -{discount}%
                          </span>
                        )}
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">
                          Sold {product.sold}
                        </span>
                      </div>

                      <div className="flex justify-between items-end mt-1">
                        <div>
                          <span className="text-accent font-bold text-xl mr-2">{product.price.toLocaleString()}₫</span>
                          <del className="text-gray-400 text-sm">{originalPrice.toLocaleString()}₫</del>
                        </div>

                        {/* Nút hành động */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
                          >
                            <i className="fas fa-cart-plus"></i> Add
                          </button>
                          <button className="border border-gray-300 hover:border-primary hover:text-primary text-gray-600 px-3 py-2 rounded-lg text-sm transition-all hidden sm:block">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CỘT PHẢI: Sticky Display Image */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="sticky top-24 transition-all duration-500 ease-in-out">
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src={categoryImages[activeTab]}
                  alt="Category Display"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <h3 className="text-white text-3xl font-bold capitalize">
                    {activeTab} Collection
                  </h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}