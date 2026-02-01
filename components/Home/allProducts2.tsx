'use client';

import { useStore } from '@/context/store_context';
import { products } from '@/constants/products';
import { useState } from 'react';

export default function AllProducts() {
  const { openProductDetail, addToCart, openCategoryModal } = useStore();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const filtered = selectedCat
    ? products.filter((p) => p.category === selectedCat)
    : products;

  const categories = [
    { key: 'jackets', label: 'Jackets' },
    { key: 'pants', label: 'Pants' },
    { key: 'shirts', label: 'Shirts' },
  ];

  return (
    <section className="section" id="all-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title flex items-center justify-center gap-2">
          <i className="fas fa-box text-indigo-600 text-3xl"></i>ALL PRODUCTS
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setSelectedCat(null)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedCat === null
                ? 'btn btn-primary'
                : 'btn btn-outline'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCat(cat.key)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedCat === cat.key
                  ? 'btn btn-primary'
                  : 'btn btn-outline'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="product-grid">
          {filtered.map((product) => {
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
                className="card card-product group cursor-pointer"
                onClick={() => openProductDetail(product)}
              >
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

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductDetail(product);
                      }}
                      className="btn btn-outline text-white border-white flex items-center justify-center gap-1"
                    >
                      <i className="fas fa-eye"></i>View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="btn btn-secondary flex items-center justify-center gap-1"
                    >
                      <i className="fas fa-shopping-cart"></i>Add
                    </button>
                  </div>
                </div>

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

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span><i className="fas fa-star text-yellow-400"></i>4.8</span>
                    {product.sold && <span><i className="fas fa-fire text-red-500"></i>Sold: {product.sold}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
