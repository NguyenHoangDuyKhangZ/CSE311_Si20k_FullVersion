'use client';

import { useState } from 'react';
import { useStore } from '@/src/context/store_context';

// Ánh xạ Category ID chuẩn của Backend
const CAT_MAP: Record<string, string> = {
  shirts: 'ecd905d9-4030-4440-8a39-40f2257cf10a',
  pants: '4660b1e2-d4c1-4162-9973-02ac762d1b55',
  jackets: 'bac4a38e-e093-42fd-8b26-054f41b3d1ee'
};

export default function AdminProductManager() {
  const { products, refreshProducts, showNotification, currentUser } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', price: 0, originalPrice: 0, description: '', img: '', category: 'shirts', stock: 0, sold: 0
  });

  const handleSubmit = async () => {
    try {
      const url = editingId ? `http://localhost:5187/api/Products/${editingId}` : 'http://localhost:5187/api/Products';
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        name: formData.name,
        currentPrice: formData.price,
        originalPrice: formData.originalPrice,
        description: formData.description,
        imageUrl: formData.img,
        categoryId: CAT_MAP[formData.category] || CAT_MAP['shirts'],
        quantity: formData.stock,
        soldNumber: formData.sold
      };
      const cleanToken = currentUser?.token?.replace(/^"|"$/g, '') || '';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cleanToken}` },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('API Error');

      showNotification(editingId ? 'Updated DB!' : 'Added to DB!', 'success');
      refreshProducts();
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      showNotification('Action failed', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      const res = await fetch(`http://localhost:5187/api/Products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${currentUser?.token}` }
      });
      if (!res.ok) throw new Error('Failed');
      showNotification('Deleted from DB', 'success');
      refreshProducts();
    } catch { showNotification('Delete failed', 'error'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Manage DB Products</h2>
        {!showForm && (
          <button onClick={() => {
            setFormData({ name: '', price: 0, originalPrice: 0, description: '', img: '', category: 'shirts', stock: 0, sold: 0 });
            setEditingId(null);
            setShowForm(true);
          }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
            <i className="fas fa-plus mr-2" /> Add Product
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <input type="number" placeholder="Current Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <input type="number" placeholder="Original Price" value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <input type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="shirts">Shirts</option><option value="pants">Pants</option><option value="jackets">Jackets</option>
            </select>
            <input type="text" placeholder="Image URL" value={formData.img} onChange={(e) => setFormData({ ...formData, img: e.target.value })} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border p-2 rounded mt-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={3} />
          <div className="mt-4 flex gap-2 justify-end">
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded font-semibold transition-colors">Cancel</button>
            <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition-colors">{editingId ? 'Update to DB' : 'Save to DB'}</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex gap-4 items-center">
            <img src={p.img || 'https://via.placeholder.com/150'} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-bold dark:text-white line-clamp-1">{p.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Stock: {p.stock} | Price: {(p.price)?.toLocaleString('vi-VN')}₫</p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => {
                setEditingId(p.id);
                setFormData({ name: p.name, price: p.price || 0, originalPrice: p.originalPrice || 0, description: p.description || '', img: p.img || '', category: 'shirts', stock: p.stock || 0, sold: p.sold || 0 });
                setShowForm(true);
              }} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold transition-colors">Edit</button>
              <button onClick={() => handleDelete(p.id, p.name)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition-colors">Del</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}