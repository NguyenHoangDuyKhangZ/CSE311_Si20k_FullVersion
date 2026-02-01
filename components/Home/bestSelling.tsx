'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/store_context';

// 1. Giả lập dữ liệu Best Selling (Lấy từ project.js cũ của bạn)
const bestSellingProducts = [
  { id: 11, name: 'Graphic Unisex T-shirt', price: 15000, originalPrice: 20000, img: 'https://plus.unsplash.com/premium_photo-1673356301535-2cc45bcc79e4?q=80&w=687&auto=format&fit=crop', sold: 245, description: 'Unique print, streetwear style' },
  { id: 12, name: 'Black Skinny Jeans', price: 18000, originalPrice: 20000, img: 'https://images.unsplash.com/photo-1649566650740-cb0a625e1b40?q=80&w=687&auto=format&fit=crop', sold: 231, description: 'Figure-hugging, flattering' },
  { id: 13, name: 'Gray Hoodie Jacket', price: 19000, originalPrice: 20000, img: 'https://plus.unsplash.com/premium_photo-1673356301340-4522591be5f7?q=80&w=687&auto=format&fit=crop', sold: 218, description: 'Relaxed fit, easy to pair' },
  { id: 14, name: "Men's White Polo", price: 16000, originalPrice: 20000, img: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=687&auto=format&fit=crop', sold: 203, description: 'Smart for office environment' },
  { id: 15, name: 'Gray Baggy Pants', price: 20000, originalPrice: 20000, img: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?q=80&w=687&auto=format&fit=crop', sold: 198, description: '2024 fashion trend' },
];

export default function BestSelling() {
  const { showNotification, addToCart: addToCartAction } = useStore(); // Hàm thêm vào giỏ hàng
  const [currentIndex, setCurrentIndex] = useState(0); // Slide hiện tại
  const [itemsPerSlide, setItemsPerSlide] = useState(4); // Mặc định 4 sp/slide

  // Hàm xử lý Responsive: Tự động chỉnh số lượng sp/slide theo màn hình
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerSlide(2); // Mobile hiện 2
      else if (window.innerWidth < 1024) setItemsPerSlide(3); // Tablet hiện 3
      else setItemsPerSlide(4); // Laptop hiện 4
    };
    
    // Gọi ngay khi mở web
    handleResize(); 
    // Lắng nghe khi user co giãn cửa sổ
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Logic chuyển Slide (Next / Prev)
  const totalSlides = Math.ceil(bestSellingProducts.length / itemsPerSlide);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides); // Quay vòng về 0 nếu hết
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Hàm thêm vào giỏ hàng
  const addToCart = (product: any) => {
    addToCartAction(product);
  };

  // Cắt mảng sản phẩm theo slide hiện tại
  const startIndex = currentIndex * itemsPerSlide;
  const currentProducts = bestSellingProducts.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <section className="py-20 bg-gray-50" id="best-selling">
      <div className="container mx-auto px-4">
        
        {/* CONTAINER MÀU CẦU VỒNG (RGB BORDER) */}
        {/* Thay thế class .rgb-border-container cũ bằng Tailwind arbitrary values */}
        <div className="relative p-[3px] rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-2xl">
          <div className="bg-white rounded-[21px] p-8 min-h-[500px]">
            
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center gap-3">
              <i className="fas fa-star text-yellow-400 text-2xl animate-spin-slow"></i>
              Best Selling Products
              <i className="fas fa-star text-yellow-400 text-2xl animate-spin-slow"></i>
            </h2>

            {/* CAROUSEL BODY */}
            <div className="relative">
              
              {/* Nút Prev */}
              <button 
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              {/* Danh sách sản phẩm (Grid) */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                {currentProducts.map((product) => {
                   const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                   
                   return (
                     <div key={product.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
                        
                        {/* Ảnh & Badge */}
                        <div className="relative h-64 overflow-hidden">
                           <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           
                           {/* Badge Sold */}
                           <span className="absolute top-2 left-0 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-r shadow-md">
                             Sold {product.sold}
                           </span>

                           {/* Badge Discount */}
                           {discount > 0 && (
                             <span className="absolute top-2 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-l shadow-md">
                               -{discount}%
                             </span>
                           )}
                        </div>

                        {/* Nội dung */}
                        <div className="p-4 flex flex-col flex-grow">
                           <h3 className="font-bold text-gray-800 line-clamp-1 mb-1" title={product.name}>{product.name}</h3>
                           <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-grow">{product.description}</p>
                           
                           <div className="mt-auto">
                              <div className="flex justify-between items-center mb-3">
                                 <span className="text-red-500 font-bold text-lg">{product.price.toLocaleString()}₫</span>
                                 <del className="text-gray-400 text-sm">{product.originalPrice.toLocaleString()}₫</del>
                              </div>

                              <div className="flex gap-2">
                                <button 
                                  onClick={() => addToCart(product)}
                                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-lg font-semibold hover:shadow-lg hover:opacity-90 transition-all text-sm"
                                >
                                  <i className="fas fa-cart-plus mr-1"></i> Add
                                </button>
                                <button className="px-3 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all text-sm">
                                  Details
                                </button>
                              </div>
                           </div>
                        </div>
                     </div>
                   )
                })}
              </div>

              {/* Nút Next */}
              <button 
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-primary text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            {/* Indicators (Dấu chấm tròn) */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === idx ? 'bg-primary w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}