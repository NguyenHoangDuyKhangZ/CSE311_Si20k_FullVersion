'use client';

import React from 'react';
import { useStore } from '@/src/context/store_context';

export default function SellerDashboard() {
  const { adminProducts, currentUser } = useStore();

  // ─── Computed stats ───────────────────────────────────────────────────────────
  const totalProducts = adminProducts.length;
  const totalSold = adminProducts.reduce((sum, p) => sum + (p.sold ?? 0), 0);
  const totalRevenue = adminProducts.reduce((sum, p) => sum + p.price * (p.sold ?? 0), 0);
  const totalStock = adminProducts.reduce((sum, p) => sum + (p.stock ?? 0), 0);

  const topProducts = [...adminProducts].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0)).slice(0, 5);
  const lowStockProducts = adminProducts.filter((p) => (p.stock ?? 0) < 10);

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome back, {currentUser?.name}! 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Here&apos;s your store performance dashboard</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="fa-box" color="indigo"
          value={totalProducts} label="Total Products" sub="Active listings"
        />
        <StatCard
          icon="fa-bolt" color="orange"
          value={totalSold} label="Total Sold" sub="All time sales"
        />
        <StatCard
          icon="fa-chart-line" color="green"
          value={`${(totalRevenue / 1_000_000).toFixed(1)}M`}
          label="Total Revenue"
          sub={`${totalRevenue.toLocaleString('vi-VN')} VND`}
        />
        <StatCard
          icon="fa-gift" color="purple"
          value={totalStock} label="Current Stock" sub="Items in warehouse"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top selling */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-bolt text-orange-500 text-xl" /> Top Selling Products
          </h3>
          {topProducts.length > 0 ? (
            <div className="space-y-3">
              {topProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white rounded-full text-xs font-bold">
                        #{idx + 1}
                      </span>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{product.name}</p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Sold: {product.sold ?? 0} | Price: {product.price.toLocaleString('vi-VN')} VND
                    </p>
                  </div>
                  <p className="text-sm font-bold text-orange-600 ml-2 flex-shrink-0">
                    {((product.sold ?? 0) * product.price).toLocaleString('vi-VN')} VND
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No products yet. Add your first product!
            </p>
          )}
        </div>

        {/* Low stock alert */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-exclamation-triangle text-red-500 text-xl" /> Low Stock Alert
          </h3>
          {lowStockProducts.length > 0 ? (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{product.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Only {product.stock} items left</p>
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

      {/* Store summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-4">Store Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-indigo-600">
              {totalProducts === 0 ? '0%' : `${((totalSold / (totalProducts * 100)) * 100).toFixed(1)}%`}
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
            <p className="text-2xl font-bold text-purple-600">{currentUser?.points ?? 0}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Seller Points</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helper component ─────────────────────────────────────────────────────────
function StatCard({
  icon, color, value, label, sub,
}: {
  icon: string; color: string; value: string | number; label: string; sub: string;
}) {
  const colorMap: Record<string, string> = {
    indigo: 'from-indigo-50 to-indigo-100 border-indigo-200 dark:from-indigo-900/20 dark:to-indigo-800/20 dark:border-indigo-700',
    orange: 'from-orange-50 to-orange-100 border-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 dark:border-orange-700',
    green: 'from-green-50  to-green-100  border-green-200  dark:from-green-900/20  dark:to-green-800/20  dark:border-green-700',
    purple: 'from-purple-50 to-purple-100 border-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 dark:border-purple-700',
  };
  const iconBg: Record<string, string> = {
    indigo: 'bg-indigo-600', orange: 'bg-orange-600', green: 'bg-green-600', purple: 'bg-purple-600',
  };
  const textColor: Record<string, string> = {
    indigo: 'text-indigo-600', orange: 'text-orange-600', green: 'text-green-600', purple: 'text-purple-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} rounded-xl p-6 border`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconBg[color]} rounded-lg p-3`}>
          <i className={`fas ${icon} text-white text-xl`} />
        </div>
        <span className={`text-2xl font-bold ${textColor[color]}`}>{value}</span>
      </div>
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{sub}</p>
    </div>
  );
}
