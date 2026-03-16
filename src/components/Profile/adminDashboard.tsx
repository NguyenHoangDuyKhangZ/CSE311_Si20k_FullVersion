'use client';

import React from 'react';
import { useStore } from '@/src/context/store_context';

export default function AdminDashboard() {
  const { adminProducts, userList, currentUser } = useStore();

  // Calculate platform statistics
  const totalUsers = userList.length;
  const totalSellers = userList.filter((u) => u.role === 'seller').length;
  const totalGuests = userList.filter((u) => u.role === 'guest').length;
  const lockedUsers = userList.filter((u) => u.isLocked).length;

  const totalProducts = adminProducts.length;
  const totalProductsSold = adminProducts.reduce((sum, p) => sum + (p.sold || 0), 0);
  const totalPlatformRevenue = adminProducts.reduce(
    (sum, p) => sum + (p.price * (p.sold || 0)),
    0
  );
  const totalStock = adminProducts.reduce((sum, p) => sum + (p.stock || 0), 0);
  const lowStockCount = adminProducts.filter((p) => (p.stock || 0) < 10).length;

  // Recent products
  const recentProducts = [...adminProducts].slice(0, 6);

  // Top products by revenue
  const topProductsByRevenue = [...adminProducts]
    .map((p) => ({
      ...p,
      revenue: p.price * (p.sold || 0),
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Admin Dashboard 🛡️
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Platform overview and management
        </p>
      </div>

      {/* Platform Statistics */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Platform Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Users */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-600 rounded-lg p-3">
                <i className="fas fa-users text-white text-xl"></i>
              </div>
              <span className="text-3xl font-bold text-blue-600">{totalUsers}</span>
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Users</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              👤 {totalSellers} Sellers | 👥 {totalGuests} Guests
            </p>
          </div>

          {/* Active Products */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-600 rounded-lg p-3">
                <i className="fas fa-box text-white text-xl"></i>
              </div>
              <span className="text-3xl font-bold text-purple-600">{totalProducts}</span>
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Active Products</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              📦 {totalStock} in stock | ⚠️ {lowStockCount} low stock
            </p>
          </div>

          {/* Total Sales */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-600 rounded-lg p-3">
                <i className="fas fa-shopping-cart text-white text-xl"></i>
              </div>
              <span className="text-3xl font-bold text-green-600">{totalProductsSold}</span>
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Items Sold</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              All time transactions
            </p>
          </div>

          {/* Platform Revenue */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-600 rounded-lg p-3">
                <i className="fas fa-chart-line text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold text-orange-600">
                {(totalPlatformRevenue / 1000000).toFixed(1)}M
              </span>
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Platform Revenue</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {totalPlatformRevenue.toLocaleString('vi-VN')} VND
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-users text-blue-600 text-lg"></i>
            User Distribution
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Admin</span>
              </div>
              <span className="text-sm font-bold text-purple-600">
                {userList.filter((u) => u.role === 'admin').length}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sellers</span>
              </div>
              <span className="text-sm font-bold text-orange-600">{totalSellers}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Guests</span>
              </div>
              <span className="text-sm font-bold text-green-600">{totalGuests}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Locked Users</span>
              </div>
              <span className="text-sm font-bold text-red-600">{lockedUsers}</span>
            </div>
          </div>
        </div>

        {/* Product Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-box text-purple-600 text-lg"></i>
            Product Analytics
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Total Products
              </span>
              <span className="text-sm font-bold text-indigo-600">{totalProducts}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Items Sold</span>
              <span className="text-sm font-bold text-green-600">{totalProductsSold}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Current Stock
              </span>
              <span className="text-sm font-bold text-orange-600">{totalStock}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Low Stock Items
              </span>
              <span className="text-sm font-bold text-red-600">{lowStockCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products by Revenue */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-chart-bar text-orange-600 text-lg"></i>
          Top Products by Revenue
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-2 font-bold text-gray-700 dark:text-gray-300">
                  Product
                </th>
                <th className="text-center py-3 px-2 font-bold text-gray-700 dark:text-gray-300">
                  Sold
                </th>
                <th className="text-right py-3 px-2 font-bold text-gray-700 dark:text-gray-300">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {topProductsByRevenue.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-2 text-gray-700 dark:text-gray-300 font-medium">
                    {product.name}
                  </td>
                  <td className="text-center py-3 px-2 text-gray-600 dark:text-gray-400">
                    {product.sold || 0}
                  </td>
                  <td className="text-right py-3 px-2 font-bold text-orange-600">
                    {product.revenue.toLocaleString('vi-VN')} VND
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Summary */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3">System Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-2xl font-bold text-indigo-600">
              {((totalProductsSold / (totalProducts || 1)) / 100).toFixed(2)}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Avg Sales per Product</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {totalProducts === 0 ? '0' : (totalPlatformRevenue / totalProducts).toLocaleString('vi-VN')}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Avg Revenue per Product</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pink-600">
              {((lockedUsers / totalUsers) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Locked User Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
