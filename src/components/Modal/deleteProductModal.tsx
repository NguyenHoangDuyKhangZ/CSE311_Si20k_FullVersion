'use client';

import React, { useState } from 'react';
import { useStore } from '@/src/context/store_context';

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ isOpen, onClose }) => {
  const { selectedProductToDelete, deleteProductWithReason, currentUser } = useStore();
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Predefined deletion reasons
  const deletionReasons = [
    { id: 'fake_product', label: 'Counterfeit product', emoji: '❌' },
    { id: 'policy_violation', label: 'Policy violation', emoji: '⚠️' },
    { id: 'quality_issue', label: 'Poor quality', emoji: '🔴' },
    { id: 'prohibited_item', label: 'Prohibited item', emoji: '🚫' },
    { id: 'duplicate', label: 'Duplicate product', emoji: '📋' },
    { id: 'misleading', label: 'Misleading information', emoji: '🤥' },
    { id: 'other', label: 'Other', emoji: '❓' },
  ];

  const handleSubmit = async () => {
    if (!selectedReason.trim()) {
      alert('Please select a reason for deleting the product');
      return;
    }

    if (!selectedProductToDelete) {
      alert('Product not found');
      return;
    }

    setIsSubmitting(true);
    try {
      // Call the delete function with reason and warning message
      deleteProductWithReason(
        selectedProductToDelete.id,
        selectedReason,
        warningMessage || 'No reminder provided'
      );
      
      // Reset form
      setSelectedReason('');
      setWarningMessage('');
      onClose();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !selectedProductToDelete) {
    return null;
  }

  // Only show modal for admin users
  if (currentUser?.role !== 'admin') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-2xl flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-3">
              <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Confirm Product Deletion</h2>
              <p className="text-sm text-gray-500">Only admins can perform this action</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
            aria-label="Close modal"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Product Info */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700">Product to delete:</p>
          <p className="mt-2 text-base font-bold text-gray-900">{selectedProductToDelete.name}</p>
          <p className="mt-1 text-sm text-gray-600">ID: {selectedProductToDelete.id}</p>
          <p className="mt-1 text-sm text-gray-600">
            Price: {selectedProductToDelete.price.toLocaleString('vi-VN')} VND
          </p>
        </div>

        {/* Deletion Reason Selection */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-semibold text-gray-700">
            Select deletion reason <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {deletionReasons.map((reason) => (
              <button
                key={reason.id}
                onClick={() => setSelectedReason(reason.id)}
                className={`rounded-lg border-2 p-3 text-left transition-all duration-200 ${
                  selectedReason === reason.id
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white hover:border-red-300'
                }`}
              >
                <span className="text-lg">{reason.emoji}</span>
                <p className="mt-1 text-xs font-medium text-gray-800">{reason.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Warning Message */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Reminder for Seller (optional)
          </label>
          <textarea
            value={warningMessage}
            onChange={(e) => setWarningMessage(e.target.value)}
            placeholder="Enter detailed message to send to the seller..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
          />
          <p className="mt-2 text-xs text-gray-500">
            This reminder will be sent to the Seller so they understand why the product was deleted
          </p>
        </div>

        {/* Warning Box */}
        <div className="mb-6 rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            <strong>⚠️ Warning:</strong> This action cannot be undone. The product will be permanently deleted from the system.
          </p>
        </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-300 flex gap-3 bg-gray-50">
          <button
            onClick={() => {
              setSelectedReason('');
              setWarningMessage('');
              onClose();
            }}
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-gray-400 px-4 py-2 font-semibold text-white hover:bg-gray-500 disabled:opacity-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedReason}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <i className="fas fa-trash"></i>
            {isSubmitting ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;