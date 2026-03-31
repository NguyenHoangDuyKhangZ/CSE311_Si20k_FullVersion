'use client';

import { useState } from 'react';
import { useStore } from '@/src/context/store_context';

const CATEGORIES = [
  { key: 'jackets', label: 'Jackets' },
  { key: 'pants', label: 'Pants' },
  { key: 'shirts', label: 'Shirts' },
];

export default function AllProducts() {
  const { products, isLoadingProducts, openProductDetail, addToCart } = useStore();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  // Filter by category, or show all if none selected
  const filtered = selectedCat ? products.filter((p) => p.category === selectedCat) : products;

  return (
    <section className="section" id="all-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title flex items-center justify-center gap-2">
          <i className="fas fa-box text-indigo-600 text-3xl" />ALL PRODUCTS
        </h2>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setSelectedCat(null)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${selectedCat === null ? 'btn btn-primary' : 'btn btn-outline'
              }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCat(cat.key)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${selectedCat === cat.key ? 'btn btn-primary' : 'btn btn-outline'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading / empty states */}
        {isLoadingProducts ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <i className="fas fa-box-open text-4xl mb-3 block" />
            <p>No products found.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => {
              const originalPrice = product.originalPrice ?? product.price;
              const discount =
                originalPrice > product.price
                  ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
                  : 0;

              return (
                <div
                  key={product.id}
                  className="card card-product group cursor-pointer"
                  onClick={() => openProductDetail(product)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-gray-100 h-48">
                    <img
                      src={product.img || 'https://via.placeholder.com/400x300?text=No+Image'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {discount > 0 && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm">
                        -{discount}%
                      </div>
                    )}

                    {/* Quick actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={(e) => { e.stopPropagation(); openProductDetail(product); }}
                        className="btn btn-outline text-white border-white flex items-center justify-center gap-1"
                      >
                        <i className="fas fa-eye" />View
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="btn btn-secondary flex items-center justify-center gap-1"
                      >
                        <i className="fas fa-shopping-cart" />Add
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 line-clamp-2 text-sm mb-2">{product.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold text-indigo-600">
                        {product.price.toLocaleString('vi-VN')} ₫
                      </span>
                      {discount > 0 && (
                        <span className="text-xs text-gray-400 line-through">
                          {originalPrice.toLocaleString('vi-VN')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span><i className="fas fa-star text-yellow-400" /> 4.8</span>
                      {!!product.sold && (
                        <span><i className="fas fa-fire text-red-500" /> Sold: {product.sold}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}