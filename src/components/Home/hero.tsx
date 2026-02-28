'use client';

import { useStore } from '@/src/context/store_context';
import { useState } from 'react';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const { openCategoryModal } = useStore();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Logic tìm kiếm - có thể gọi hàm tìm kiếm hoặc mở modal
      console.log('Searching for:', searchQuery);
      // Hoặc: openCategoryModal('all'); với query
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 overflow-hidden" id="home">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">


        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
          Affordable Fashion
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
          Choose freely from products priced at just{' '}
          <span className="text-purple-600 font-bold">20k</span>
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white rounded-full shadow-2xl overflow-hidden border-2 border-purple-100 hover:border-purple-300 transition-all">
            <div className="pl-6 text-gray-400">
              <i className="fas fa-search text-xl"></i>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-6 py-4 text-lg outline-none text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 flex items-center gap-2"
            >
              <span>Search</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => openCategoryModal('jackets')}
            className="px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all border border-purple-100 hover:border-purple-300 flex items-center gap-2 text-gray-700 hover:text-purple-600"
          >
            <i className="fas fa-tshirt"></i>
            <span className="font-medium">Jackets</span>
          </button>
          <button
            onClick={() => openCategoryModal('pants')}
            className="px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all border border-purple-100 hover:border-purple-300 flex items-center gap-2 text-gray-700 hover:text-purple-600"
          >
            <i className="fas fa-user-tag"></i>
            <span className="font-medium">Pants</span>
          </button>
          <button
            onClick={() => openCategoryModal('shirts')}
            className="px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all border border-purple-100 hover:border-purple-300 flex items-center gap-2 text-gray-700 hover:text-purple-600"
          >
            <i className="fas fa-shopping-bag"></i>
            <span className="font-medium">Shirts</span>
          </button>
        </div>
      </div>
    </section>
  );
}