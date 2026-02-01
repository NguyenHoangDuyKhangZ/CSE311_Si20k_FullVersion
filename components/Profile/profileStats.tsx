'use client';

import type { User } from '@/types/index';

interface ProfileStatsProps {
  currentUser: User;
}

export default function ProfileStats({ currentUser }: ProfileStatsProps) {
  const isAdmin = currentUser.role === 'admin';

  // Dữ liệu giả lập (Sau này có thể thay bằng tính toán từ cart thật)
  const stats = isAdmin 
    ? [
        { label: 'Total Revenue', value: '100,000,000₫', icon: 'fa-money-bill-wave', color: 'from-green-400 to-green-600' },
        { label: 'Products Sold', value: '500', icon: 'fa-box-open', color: 'from-blue-400 to-blue-600' },
        { label: 'Remaining Stock', value: '1500', icon: 'fa-warehouse', color: 'from-purple-400 to-purple-600' },
        { label: 'Vouchers Active', value: '200', icon: 'fa-ticket-alt', color: 'from-yellow-400 to-yellow-600' },
      ]
    : [
        { label: 'Total Spending', value: '5,000,000₫', icon: 'fa-wallet', color: 'from-blue-400 to-blue-600' },
        { label: 'Savings', value: '1,200,000₫', icon: 'fa-piggy-bank', color: 'from-green-400 to-green-600' },
        { label: 'My Vouchers', value: '5', icon: 'fa-gift', color: 'from-pink-400 to-pink-600' },
        { label: 'Orders', value: '12', icon: 'fa-shopping-bag', color: 'from-orange-400 to-orange-600' },
      ];

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <i className="fas fa-chart-line text-primary"></i> Activity Statistics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} text-white flex items-center justify-center text-xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h4 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}