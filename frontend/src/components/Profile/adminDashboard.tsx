'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/src/context/store_context';
import { fetchAllUsers } from '@/src/services/userService';

export default function AdminDashboard() {
  const { products, currentUser } = useStore();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (currentUser?.token) {
      fetchAllUsers(currentUser.token).then(data => setUsers(data)).catch(console.error);
    }
  }, [currentUser]);

  const totalSellers = users.filter((u) => u.role?.toLowerCase() === 'seller').length;
  const totalBuyers = users.filter((u) => u.role?.toLowerCase() === 'buyer').length;

  const totalProducts = products.length;
  const totalProductsSold = products.reduce((sum, p) => sum + (p.sold || 0), 0);
  const totalPlatformRevenue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.sold || 0)), 0);
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  const topProductsByRevenue = [...products]
    .map((p) => ({ ...p, revenue: (p.price || 0) * (p.sold || 0) }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">Admin Dashboard 🛡️</h2>
        <p className="text-gray-600 dark:text-gray-400">Real-time platform overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <span className="text-3xl font-bold text-blue-600">{users.length}</span>
          <p className="text-sm font-semibold mt-2 dark:text-gray-300">Total Users</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <span className="text-3xl font-bold text-purple-600">{totalProducts}</span>
          <p className="text-sm font-semibold mt-2 dark:text-gray-300">Active Products</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <span className="text-3xl font-bold text-green-600">{totalProductsSold}</span>
          <p className="text-sm font-semibold mt-2 dark:text-gray-300">Total Items Sold</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
          <span className="text-2xl font-bold text-orange-600">{(totalPlatformRevenue / 1000000).toFixed(1)}M</span>
          <p className="text-sm font-semibold mt-2 dark:text-gray-300">Platform Revenue (VND)</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mt-6">
        <h3 className="font-bold mb-4 dark:text-white">Top Revenue Products</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b dark:border-gray-700"><th className="text-left py-2 dark:text-gray-300">Product</th><th className="text-right dark:text-gray-300">Revenue</th></tr></thead>
          <tbody>
            {topProductsByRevenue.map(p => (
              <tr key={p.id} className="border-b dark:border-gray-700">
                <td className="py-2 dark:text-white">{p.name}</td>
                <td className="text-right text-orange-600 font-bold">{p.revenue.toLocaleString('vi-VN')} ₫</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}