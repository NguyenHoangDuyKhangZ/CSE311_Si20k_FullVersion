'use client';

import { useStore } from '@/src/context/store_context';

const CATEGORY_TITLE: Record<string, string> = {
  jackets: 'Jackets',
  pants:   'Pants',
  shirts:  'Shirts',
};

export default function CategoryModal() {
  const {
    products,
    categoryModalOpen,
    selectedCategory,
    closeCategoryModal,
    openProductDetail,
    addToCart,
    currentUser,
    setSelectedProductToDelete,
    setDeleteProductModalOpen,
  } = useStore();

  if (!categoryModalOpen || !selectedCategory) return null;

  // Filter to selected category
  const filtered = products.filter((p) => p.category === selectedCategory);

  return (
    <div className="modal-overlay" onClick={closeCategoryModal}>
      <div
        className="bg-white w-full mx-4 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-pink-500 p-6 flex justify-between items-center text-white shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <i className="fas fa-tag text-2xl" />
            {CATEGORY_TITLE[selectedCategory] ?? 'Category'}
          </h2>
          <button onClick={closeCategoryModal} className="text-2xl hover:text-gray-200 transition-colors">
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Products grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <i className="fas fa-box text-4xl mb-4 block" />
              <p>No products in this category</p>
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
                  <div key={product.id} className="card card-product group cursor-pointer">
                    {/* Image */}
                    <div className="relative overflow-hidden bg-gray-100 h-48">
                      <img
                        src={product.img || 'https://via.placeholder.com/400x300?text=No+Image'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onClick={() => { openProductDetail(product); closeCategoryModal(); }}
                      />

                      {discount > 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                          -{discount}%
                        </div>
                      )}

                      {/* Quick action buttons */}
                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                          className="btn btn-secondary btn-sm flex items-center justify-center gap-1"
                        >
                          <i className="fas fa-shopping-cart" /> Add
                        </button>

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
                        <span>⭐ 4.8</span>
                        {!!product.sold && <span>Sold: {product.sold}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}