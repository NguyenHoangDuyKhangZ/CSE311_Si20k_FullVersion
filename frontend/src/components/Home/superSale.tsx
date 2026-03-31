'use client';

import { useStore } from '@/src/context/store_context';

export default function SuperSale() {
  const {
    products,
    isLoadingProducts,
    openProductDetail,
    addToCart,
    currentUser,
    setSelectedProductToDelete,
    setDeleteProductModalOpen,
  } = useStore();

  // Show first 6 products as "super sale" items
  const saleProducts = products.slice(0, 6);

  return (
    <section className="section bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="section-title flex items-center justify-center gap-2">
            <img src="../images/fire.gif" alt="Fire" className="w-10 h-10 rounded-xl shadow-lg" />
            Super Sale Items
            <img src="../images/fire.gif" alt="Fire" className="w-10 h-10 rounded-xl shadow-lg" />
          </h2>
          <p className="text-gray-600 mt-2">Up to 50% discount on selected products</p>
        </div>

        {/* Loading state */}
        {isLoadingProducts ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
          </div>
        ) : saleProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <i className="fas fa-box-open text-4xl mb-3 block" />
            <p>No products available yet.</p>
          </div>
        ) : (
          <div className="product-grid">
            {saleProducts.map((product) => {
              const originalPrice = product.originalPrice ?? product.price;
              const discount =
                originalPrice > product.price
                  ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
                  : 0;

              return (
                <div key={product.id} className="card card-product group">
                  {/* Product image */}
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

                    {/* Hover action buttons */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => openProductDetail(product)}
                        className="btn btn-outline text-white border-white hover:bg-white/20 flex items-center justify-center gap-1"
                      >
                        <i className="fas fa-eye" />View
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="btn btn-secondary flex items-center justify-center gap-1"
                      >
                        <i className="fas fa-shopping-cart" />Add
                      </button>

                      {/* Admin-only delete */}
                      {currentUser?.role === 'admin' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProductToDelete(product);
                            setDeleteProductModalOpen(true);
                          }}
                          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-red-500"
                        >
                          <i className="fas fa-trash" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Product info */}
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