'use client';

import { useStore } from '@/src/context/store_context';
import { useState } from 'react';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const { openCategoryModal } = useStore();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // TODO: integrate search into product list filter
      console.log('Searching for:', searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 overflow-hidden"
      id="home"
    >
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
          Affordable Fashion
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
          Choose freely from products priced at just{' '}
          <span className="text-purple-600 font-bold">20k</span>
        </p>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white rounded-full shadow-2xl overflow-hidden border-2 border-purple-100 hover:border-purple-300 focus-within:border-purple-400 transition-all">
            <div className="pl-6 text-gray-400">
              <i className="fas fa-search text-xl" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-6 py-4 text-lg text-gray-700 placeholder-gray-400 bg-transparent border-none !outline-none !ring-0"
            />
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 focus:outline-none"
            >
              <span>Search</span>
              <i className="fas fa-arrow-right" />
            </button>
          </div>
        </div>

        {/* Category quick links */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            { key: 'jackets', icon: 'fa-tshirt', label: 'Jackets' },
            { key: 'pants', icon: 'fa-user-tag', label: 'Pants' },
            { key: 'shirts', icon: 'fa-shopping-bag', label: 'Shirts' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => openCategoryModal(cat.key)}
              className="px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all border border-purple-100 hover:border-purple-300 flex items-center gap-2 text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              <i className={`fas ${cat.icon}`} />
              <span className="font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}