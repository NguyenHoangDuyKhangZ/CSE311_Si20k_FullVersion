'use client';

import { useStore } from '@/context/store_context';
import { products } from '@/constants/products';

export default function CategoryModal() {
  const {
    categoryModalOpen,
    selectedCategory,
    closeCategoryModal,
    openProductDetail,
    addToCart,
  } = useStore();

  if (!categoryModalOpen || !selectedCategory) return null;

  const categoryTitleMap: Record<string, string> = {
    jackets: 'Jackets',
    pants: 'Pants',
    shirts: 'Shirts',
  };

  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory
  );

  return (
    <div
      className="modal-overlay"
      onClick={closeCategoryModal}
    >
      <div
        className="bg-white w-full mx-4 max-h-[85vh] flex flex-col "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-pink-500 p-6 flex justify-between items-center text-white shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <i className="fas fa-tag text-2xl"></i>
            {categoryTitleMap[selectedCategory] || 'Category'}
          </h2>
          <button
            onClick={closeCategoryModal}
            className="text-2xl hover:text-gray-200 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <i className="fas fa-box text-4xl mb-4 block"></i>
              <p>No products in this category</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="card card-product group cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-gray-100 h-48">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onClick={() => {
                        openProductDetail(product);
                        closeCategoryModal();
                      }}
                    />

                    {/* Discount Badge */}
                    {product.originalPrice &&
                      product.price < product.originalPrice && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                          -
                          {Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100
                          )}
                          %
                        </div>
                      )}

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="absolute bottom-3 left-1/2 transform -translate-x-1/2 btn btn-secondary btn-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1"
                    >
                      <i className="fas fa-shopping-cart"></i>Add
                    </button>
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
                      {product.originalPrice &&
                        product.price < product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {product.originalPrice.toLocaleString('vi-VN')}
                          </span>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>⭐ 4.8</span>
                      {product.sold && (
                        <span>Bán: {product.sold}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}