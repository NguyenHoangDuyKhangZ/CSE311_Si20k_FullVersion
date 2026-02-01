'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/context/store_context';
import { products } from '@/constants/products';

export default function BestSelling() {
  const { openProductDetail, addToCart } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  // Responsive
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

  // Sort by sold (descending)
  const bestSellingProducts = [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 12);

  const totalSlides = Math.ceil(bestSellingProducts.length / itemsPerSlide);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const visibleProducts = bestSellingProducts.slice(
    currentIndex * itemsPerSlide,
    currentIndex * itemsPerSlide + itemsPerSlide
  );

  return (
    <section className="section bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
                 {/* Section Title */}
        <div className="text-center mb-12">
         <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center gap-3">
            <img src="../images/star.png" alt="Star" className="w-10 h-10 animate-spin-slow " />
            Best Selling Products
            <img src="../images/star.png" alt="Star" className="w-10 h-10 animate-spin-slow" />
          </h2>
          <p className="text-gray-600 mt-2">Most popular products from our store</p>
        </div>
          <p className="text-gray-600 mt-2">Most popular products from our store</p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="flex items-center gap-4">
            {/* Previous Button */}
            <button
              onClick={goToPrev}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center"
            >
              ◀
            </button>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="product-grid">
                {visibleProducts.map((product) => {
                  const discount =
                    product.originalPrice && product.price < product.originalPrice
                      ? Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )
                      : 0;

                  return (
                    <div
                      key={product.id}
                      className="card card-product group"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden bg-gray-100 h-48">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />

                        {discount > 0 && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm">
                            -{discount}%
                          </div>
                        )}

                        {/* Quick Actions */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => openProductDetail(product)}
                            className="btn btn-outline text-white border-white hover:bg-white/20"
                          >
                            <i className="fas fa-eye"></i>View
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="btn btn-secondary flex items-center justify-center gap-1"
                          >
                            <i className="fas fa-shopping-cart"></i>Add
                          </button>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 line-clamp-2 text-sm mb-2">
                          {product.name}
                        </h3>

                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-lg font-bold text-indigo-600">
                            {product.price.toLocaleString('vi-VN')} ₫
                          </span>
                          {product.originalPrice && discount > 0 && (
                            <span className="text-xs text-gray-400 line-through">
                              {product.originalPrice.toLocaleString('vi-VN')}
                            </span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span><i className="fas fa-star text-yellow-400"></i>4.8</span>
                          {product.sold && (
                            <span><i className="fas fa-fire text-red-500"></i>Sold: {product.sold}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center"
            >
              ▶
            </button>
          </div>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-indigo-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
