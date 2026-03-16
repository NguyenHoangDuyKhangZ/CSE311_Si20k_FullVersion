'use client';

import React from 'react';
import { useStore } from '@/src/context/store_context';

export default function SellerDashboard() {
  const { adminProducts, currentUser } = useStore();

  // Calculate seller statistics
  const totalProducts = adminProducts.length;
  const totalSold = adminProducts.reduce((sum, product) => sum + (product.sold || 0), 0);
  const totalRevenue = adminProducts.reduce(
    (sum, product) => sum + (product.price * (product.sold || 0)),
    0
  );
  const totalStock = adminProducts.reduce((sum, product) => sum + (product.stock || 0), 0);

  // Top selling products
  const topProducts = [...adminProducts]
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 5);

  // Low stock products
  const lowStockProducts = adminProducts.filter((p) => (p.stock || 0) < 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome back, {currentUser?.name}! 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your store performance dashboard
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-indigo-600 rounded-lg p-3">
              <i className="fas fa-box text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold text-indigo-600">{totalProducts}</span>
          </div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Products</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Active listings</p>
        </div>

        {/* Total Sold */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-600 rounded-lg p-3">
              <i className="fas fa-bolt text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold text-orange-600">{totalSold}</span>
          </div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Sold</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">All time sales</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-600 rounded-lg p-3">
              <i className="fas fa-chart-line text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold text-green-600">
              {(totalRevenue / 1000000).toFixed(1)}M
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Revenue</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {totalRevenue.toLocaleString('vi-VN')} VND
          </p>
        </div>

        {/* Current Stock */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-600 rounded-lg p-3">
              <i className="fas fa-gift text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold text-purple-600">{totalStock}</span>
          </div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Current Stock</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Items in warehouse</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-bolt text-orange-500 text-xl"></i>
            Top Selling Products
          </h3>

          {topProducts.length > 0 ? (
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white rounded-full text-xs font-bold">
                        #{index + 1}
                      </span>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                        {product.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Sold: {product.sold || 0} | Price: {product.price.toLocaleString('vi-VN')} VND
                    </p>
                  </div>
                  <div className="text-right ml-2 flex-shrink-0">
                    <p className="text-sm font-bold text-orange-600">
                      {((product.sold || 0) * product.price).toLocaleString('vi-VN')} VND
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No products yet. Add your first product!
            </p>
          )}
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-gift text-red-500 text-xl"></i>
            Low Stock Alert
          </h3>

          {lowStockProducts.length > 0 ? (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Only {product.stock} items left
                    </p>
                  </div>
                  <button className="flex-shrink-0 ml-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold transition-all">
                    Restock
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              ✅ All products have sufficient stock
            </p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-colors">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-4">
          Store Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-indigo-600">
              {totalProducts === 0 ? '0%' : ((totalSold / (totalProducts * 100)) * 100).toFixed(1) + '%'}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Average Sales Rate</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">
              {totalSold === 0 ? '0' : (totalRevenue / totalSold).toLocaleString('vi-VN')}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Avg Price per Item Sold</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{currentUser?.points || 0}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Seller Points</p>
          </div>
        </div>
      </div>
    </div>
  );
}
