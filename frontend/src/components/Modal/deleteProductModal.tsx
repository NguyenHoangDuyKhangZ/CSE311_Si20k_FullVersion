'use client';

import React, { useState } from 'react';
import { useStore } from '@/src/context/store_context';
import { deleteProductWithReason } from '@/src/services/productService'; // 🌟 Quan trọng: Phải import hàm này

export default function DeleteProductModal() {
  const {
    deleteProductModalOpen,
    setDeleteProductModalOpen,
    selectedProductToDelete,
    setSelectedProductToDelete,
    currentUser,
    refreshProducts,
    showNotification
  } = useStore();

  const [reason, setReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => {
    setDeleteProductModalOpen(false);
    setSelectedProductToDelete(null);
    setReason('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductToDelete || !currentUser?.token) return;
    if (!reason.trim()) {
      showNotification('Please provide a reason for deletion', 'warning');
      return;
    }

    setIsDeleting(true);
    try {
      // 🌟 Gọi hàm service đã tạo ở Bước 1
      await deleteProductWithReason(
        selectedProductToDelete.id,
        reason,
        currentUser.token
      );

      showNotification(`Deleted product: ${selectedProductToDelete.name}`, 'success');
      refreshProducts(); // Load lại danh sách sản phẩm mới nhất từ DB
      handleClose();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      showNotification(error.message || 'Action failed', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!deleteProductModalOpen || !selectedProductToDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <div className="bg-red-100 p-2 rounded-full">
              <i className="fas fa-exclamation-triangle text-xl"></i>
            </div>
            <h3 className="text-xl font-bold">Confirm Deletion</h3>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to delete <span className="font-bold text-gray-800 dark:text-white">"{selectedProductToDelete.name}"</span>?
            This action cannot be undone.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Reason for deletion
              </label>
              <textarea
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Out of stock forever, item damaged..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={3}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <><i className="fas fa-spinner animate-spin"></i> Processing...</>
                ) : (
                  'Confirm Delete'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}