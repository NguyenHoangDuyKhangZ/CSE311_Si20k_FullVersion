'use client';

import { useStore } from '@/context/store_context';

export default function ProductDetailModal() {
  const {
    productDetailModalOpen,
    selectedProduct,
    closeProductDetail,
    addToCart,
  } = useStore();

  if (!productDetailModalOpen || !selectedProduct) return null;

  const discount =
    selectedProduct.originalPrice && selectedProduct.price < selectedProduct.originalPrice
      ? Math.round(
          ((selectedProduct.originalPrice - selectedProduct.price) /
            selectedProduct.originalPrice) *
            100
        )
      : 0;

  return (
    <div className="modal-overlay" onClick={closeProductDetail}>
      <div
        className="modal-content max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl transition-colors z-10"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={selectedProduct.img}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedProduct.name}
              </h2>

              {/* Category & Stock */}
              <div className="flex items-center gap-2 mb-4">
                <span className="badge badge-primary">
                  {selectedProduct.category === 'jackets'
                    ? 'Jackets'
                    : selectedProduct.category === 'pants'
                    ? 'Pants'
                    : 'Shirts'}
                </span>
                {selectedProduct.stock && selectedProduct.stock > 0 && (
                  <span className="badge badge-success">
                    {selectedProduct.stock} in stock
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mb-6 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-indigo-600">
                    {selectedProduct.price.toLocaleString('vi-VN')} ₫
                  </span>
                  {selectedProduct.originalPrice &&
                    selectedProduct.price < selectedProduct.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">
                        {selectedProduct.originalPrice.toLocaleString(
                          'vi-VN'
                        )}{' '}
                        ₫
                      </span>
                    )}
                </div>
                {discount > 0 && (
                  <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-lg font-bold flex items-center gap-1">
                    <i className="fas fa-tag"></i>Save {discount}%
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Stats */}
              {selectedProduct.sold && (
                <div className="flex gap-6 mb-6 text-sm text-gray-600">
                  <div>
                    <p className="font-bold text-indigo-600">
                      {selectedProduct.sold}
                    </p>
                    <p>Sold</p>
                  </div>
                  <div>
                    <p className="font-bold text-indigo-600 flex items-center gap-1">
                      <i className="fas fa-star text-yellow-400"></i>4.8
                    </p>
                    <p>Rating</p>
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                addToCart(selectedProduct);
                closeProductDetail();
              }}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <i className="fas fa-shopping-cart"></i>Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
