'use client';

import React from 'react';
import { useStore } from '@/src/context/store_context';
import DeleteProductModal from './deleteProductModal';

export default function DeleteProductModalWrapper() {
  const { deleteProductModalOpen, setDeleteProductModalOpen } = useStore();

  return (
    <DeleteProductModal
      isOpen={deleteProductModalOpen}
      onClose={() => setDeleteProductModalOpen(false)}
    />
  );
}
