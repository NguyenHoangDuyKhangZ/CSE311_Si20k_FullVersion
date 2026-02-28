'use client';

import { products } from "@/src/constants/products";
import { useStore } from "@/src/context/store_context";

export default function SuperSale() {
  const { openProductDetail, addToCart } = useStore();

  // Lấy 6 sản phẩm đầu tiên (siêu sale)
  const saleProducts = products.slice(0, 6);

  return (
    <section className="section bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">

          <h2 className="section-title flex items-center justify-center gap-2">
            <img src="../images/fire.gif" alt="Fire" className="w-10 h-10 rounded-xl shadow-lg" /> Super Sale Items
            <img src="../images/fire.gif" alt="Fire" className="w-10 h-10 rounded-xl shadow-lg" />
          </h2>
          <p className="text-gray-600 mt-2">Up to 50% discount on selected products</p>
        </div>

        {/* Products Grid */}
        <div className="product-grid">
          {saleProducts.map((product) => {
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
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-100 h-48">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Discount Badge */}
                  {discount > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm">
                      -{discount}%
                    </div>
                  )}

                  {/* Quick Buttons */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => openProductDetail(product)}
                      className="btn btn-outline text-white border-white hover:bg-white/20 flex items-center justify-center gap-1"
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

                {/* Product Info */}
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
    </section>
  );
}