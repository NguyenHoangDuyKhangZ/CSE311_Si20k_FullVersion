'use client';

import { useState } from 'react';
import { useStore } from '@/src/context/store_context';
import { Product } from '@/src/types/index';

// Initial blank form shape
const BLANK_FORM: Partial<Product> = {
  name: '', price: 0, originalPrice: 0,
  description: '', img: '', category: 'shirts', stock: 0, sold: 0,
};

export default function AdminProductManager() {
  const { adminProducts, addProduct, updateProduct, deleteProduct, updateProductStock } = useStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>(BLANK_FORM);

  // Submit: create or update
  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.description) {
      alert('Please fill in all required fields (Name, Price, Description)');
      return;
    }
    if (editingId) {
      updateProduct(editingId, formData);
      setEditingId(null);
    } else {
      addProduct(formData as Product);
    }
    setFormData(BLANK_FORM);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(BLANK_FORM);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Product Management</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 sm:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <i className="fas fa-plus" /> Add New Product
          </button>
        )}
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name ?? ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category ?? 'shirts'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors text-sm sm:text-base"
              >
                <option value="shirts">Shirts</option>
                <option value="pants">Pants</option>
                <option value="jackets">Jackets</option>
                <option value="accessories">Accessories</option>
                <option value="shoes">Shoes</option>
              </select>
            </div>

            {/* Current price */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Current Price (VND) *
              </label>
              <input
                type="number"
                value={formData.price ?? 0}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>

            {/* Original price */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Original Price (VND)
              </label>
              <input
                type="number"
                value={formData.originalPrice ?? 0}
                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                value={formData.stock ?? 0}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>

            {/* Units sold */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Units Sold
              </label>
              <input
                type="number"
                value={formData.sold ?? 0}
                onChange={(e) => setFormData({ ...formData, sold: Number(e.target.value) })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description ?? ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors text-sm sm:text-base"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.img ?? ''}
              onChange={(e) => setFormData({ ...formData, img: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors text-sm sm:text-base"
            />
          </div>

          {/* Image preview */}
          {formData.img && (
            <div className="flex justify-center">
              <img
                src={formData.img}
                alt="Preview"
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-md"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
              />
            </div>
          )}

          {/* Form actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 sm:justify-end">
            <button
              onClick={handleCancel}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-sm sm:text-base font-semibold"
            >
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </div>
      )}

      {/* Product list */}
      {!showForm && (
        <div className="space-y-3 sm:space-y-4">
          {adminProducts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                No products yet. Add your first product!
              </p>
            </div>
          ) : (
            adminProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-4 lg:p-6 shadow-md transition-colors"
              >
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* Image + basic info */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {/* Thumbnail */}
                    <div className="w-full sm:w-auto flex-shrink-0">
                      <img
                        src={product.img || 'https://via.placeholder.com/150'}
                        alt={product.name}
                        className="w-full sm:w-24 lg:w-32 h-32 sm:h-24 lg:h-32 object-cover rounded-lg"
                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-1 sm:mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-xs sm:text-sm line-clamp-2">
                        {product.description}
                      </p>

                      {/* Stats grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="bg-gray-50 dark:bg-gray-700 p-2 sm:p-3 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                          <p className="text-sm sm:text-base font-bold text-indigo-600">
                            {(product.price / 1000).toFixed(0)}k₫
                          </p>
                        </div>
                        {product.originalPrice && (
                          <div className="bg-gray-50 dark:bg-gray-700 p-2 sm:p-3 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Original</p>
                            <p className="text-xs sm:text-sm line-through text-gray-500">
                              {(product.originalPrice / 1000).toFixed(0)}k₫
                            </p>
                          </div>
                        )}
                        <div className="bg-gray-50 dark:bg-gray-700 p-2 sm:p-3 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Stock</p>
                          <p className="text-sm sm:text-base font-bold text-gray-800 dark:text-white">
                            {product.stock ?? 0}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-2 sm:p-3 rounded-lg">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Sold</p>
                          <p className="text-sm sm:text-base font-bold text-green-600">{product.sold ?? 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stock controls + actions */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                    {/* Stock adjuster */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        Stock:
                      </span>
                      <button
                        onClick={() => updateProductStock(product.id, Math.max(0, (product.stock ?? 0) - 1))}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <span className="px-3 sm:px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-800 dark:text-white font-semibold text-xs sm:text-sm">
                        {product.stock ?? 0}
                      </span>
                      <button
                        onClick={() => updateProductStock(product.id, (product.stock ?? 0) + 1)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
                      >
                        <i className="fas fa-plus" />
                      </button>
                    </div>

                    {/* Edit / Delete */}
                    <div className="flex gap-2 sm:ml-auto">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold"
                      >
                        <i className="fas fa-edit" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${product.name}"?`)) deleteProduct(product.id);
                        }}
                        className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold"
                      >
                        <i className="fas fa-trash" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
