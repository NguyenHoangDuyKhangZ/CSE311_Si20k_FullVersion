'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/src/context/store_context';
import { Product } from '@/src/types';

export default function BestSelling() {
  const {
    products,
    isLoadingProducts,
    addToCart,
    openProductDetail,
    currentUser,
    setSelectedProductToDelete,
    setDeleteProductModalOpen,
  } = useStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  // Adjust items per slide based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerSlide(2);
      else if (window.innerWidth < 1024) setItemsPerSlide(3);
      else setItemsPerSlide(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Top 12 best-selling products
  const bestSelling = [...products].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0)).slice(0, 12);
  const totalSlides = Math.ceil(bestSelling.length / itemsPerSlide);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const currentProducts = bestSelling.slice(
    currentIndex * itemsPerSlide,
    currentIndex * itemsPerSlide + itemsPerSlide
  );

  return (
    <section className="py-20 bg-gray-50" id="best-selling">
      <div className="container mx-auto px-4">
        {/* Rainbow gradient border wrapper */}
        <div className="relative p-[3px] rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-2xl">
          <div className="bg-white rounded-[21px] p-8 min-h-[500px]">

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center gap-3">
              <i className="fas fa-star text-yellow-400 text-2xl animate-spin-slow" />
              Best Selling Products
              <i className="fas fa-star text-yellow-400 text-2xl animate-spin-slow" />
            </h2>

            {/* Loading state */}
            {isLoadingProducts ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
              </div>
            ) : bestSelling.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <i className="fas fa-box-open text-4xl mb-3 block" />
                <p>No products available yet.</p>
              </div>
            ) : (
              <div className="relative">
                {/* Prev button */}
                <button
                  onClick={prevSlide}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                >
                  <i className="fas fa-chevron-left" />
                </button>

                {/* Product grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                  {currentProducts.map((product: Product) => {
                    const originalPrice = product.originalPrice ?? product.price;
                    const discount =
                      originalPrice > product.price
                        ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
                        : 0;

                    return (
                      <div
                        key={product.id}
                        className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full"
                      >
                        {/* Image & badges */}
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={product.img || 'https://via.placeholder.com/400x300?text=No+Image'}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />

                          {!!product.sold && (
                            <span className="absolute top-2 left-0 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-r shadow-md">
                              Sold {product.sold}
                            </span>
                          )}
                          {discount > 0 && (
                            <span className="absolute top-2 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-l shadow-md">
                              -{discount}%
                            </span>
                          )}
                        </div>

                        {/* Card body */}
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="font-bold text-gray-800 line-clamp-1 mb-1" title={product.name}>
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-grow">
                            {product.description}
                          </p>

                          <div className="mt-auto">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-red-500 font-bold text-lg">
                                {product.price.toLocaleString('vi-VN')}₫
                              </span>
                              {discount > 0 && (
                                <del className="text-gray-400 text-sm">
                                  {originalPrice.toLocaleString('vi-VN')}₫
                                </del>
                              )}
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg hover:opacity-90 transition-all text-sm"
                              >
                                <i className="fas fa-cart-plus mr-1" /> Add
                              </button>
                              <button
                                onClick={() => openProductDetail(product)}
                                className="px-3 py-2 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-500 hover:text-white transition-all text-sm"
                              >
                                Details
                              </button>
                              {currentUser?.role === 'admin' && (
                                <button
                                  onClick={() => {
                                    setSelectedProductToDelete(product);
                                    setDeleteProductModalOpen(true);
                                  }}
                                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm"
                                  title="Delete (admin only)"
                                >
                                  <i className="fas fa-trash" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Next button */}
                <button
                  onClick={nextSlide}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
                >
                  <i className="fas fa-chevron-right" />
                </button>
              </div>
            )}

            {/* Dot indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-3 rounded-full transition-all ${
                      currentIndex === idx ? 'bg-purple-600 w-8' : 'bg-gray-300 w-3'
                    }`}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}