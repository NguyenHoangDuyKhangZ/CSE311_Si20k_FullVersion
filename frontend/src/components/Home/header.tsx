'use client';

import { useStore } from '@/src/context/store_context';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const {
    currentUser, setAuthModalOpen, cart, setCartModalOpen, logout,
    openCategoryModal
  } = useStore();
  
  // Mobile menu & products dropdown state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* 1. Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="../images/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-lg" />
            <span className="font-bold text-lg hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
              Si20k Store
            </span>
          </Link>

          {/* 2. Navigation Menu (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/">Home</NavLink>
            
            {/* Dropdown Products */}
            <div className="relative group">
              <Link
                href="/#all-products"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
              >
                Products <i className="fas fa-chevron-down text-xs ml-1"></i>
              </Link>

              <div className="absolute left-0 mt-0 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={() => openCategoryModal('jackets')}
                  className="block w-full text-left px-6 py-3 hover:bg-gray-50 first:rounded-t-xl"
                >
                  Jackets
                </button>
                <button
                  onClick={() => openCategoryModal('pants')}
                  className="block w-full text-left px-6 py-3 hover:bg-gray-50"
                >
                  Pants
                </button>
                <button
                  onClick={() => openCategoryModal('shirts')}
                  className="block w-full text-left px-6 py-3 hover:bg-gray-50 last:rounded-b-xl"
                >
                  Shirts
                </button>
              </div>
            </div>
            
            <NavLink href="/#about">About Us</NavLink>
            <NavLink href="/#contact">Contact</NavLink>
          </nav>

          {/* 3. Right Section - Cart, User & Hamburger */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Cart Button */}
            <button
              onClick={() => setCartModalOpen(true)}
              className="relative p-2 md:p-3 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <i className="fas fa-shopping-cart text-gray-700 group-hover:text-indigo-600 transition-colors text-xl"></i>
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1 -translate-y-1 bg-gradient-to-r from-red-500 to-pink-600 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>

            {/* User Account (Desktop) */}
            <div className="hidden md:block">
              {currentUser ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1 font-medium text-gray-700">
                      <img src="../images/diamond.png" alt="Points" className="w-4 h-4" />
                      {currentUser.points}
                    </span>
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                      <img 
                        src={currentUser.role === 'admin' ? "../images/admin.png" : "../images/user.png"} 
                        alt="avatar" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {currentUser.name}
                    </span>
                  </button>

                  <div className="absolute right-0 mt-0 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
                    <Link
                      href="/profile"
                      className="w-full text-left px-6 py-3 hover:bg-gray-50 first:rounded-t-xl flex items-center gap-2 text-gray-700"
                    >
                      <i className="fas fa-user-circle text-lg"></i> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-6 py-3 hover:bg-red-50 last:rounded-b-xl text-red-600 flex items-center gap-2"
                    >
                      <i className="fas fa-sign-out-alt text-lg"></i> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Login
                </button>
              )}
            </div>

            {/* Hamburger Button (Mobile) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation menu (animated slide-down) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <nav className="px-6 py-4 flex flex-col gap-4 font-medium text-gray-700">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600">
            Home
          </Link>
          
          {/* Products dropdown (mobile) */}
          <div>
            <button
              onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
              className="flex justify-between w-full items-center hover:text-indigo-600"
            >
              Products <i className={`fas fa-chevron-${isProductsDropdownOpen ? 'up' : 'down'} text-sm`} />
            </button>

            {/* Animated sub-menu */}
            <div className={`flex flex-col gap-3 ml-2 pl-4 border-l-2 border-indigo-100 overflow-hidden transition-all duration-300 ease-in-out ${isProductsDropdownOpen ? 'max-h-40 mt-3' : 'max-h-0'}`}>
              <button
                onClick={() => { openCategoryModal('jackets'); setIsMobileMenuOpen(false); }}
                className="text-left text-gray-500 hover:text-indigo-600"
              >
                Jackets
              </button>
              <button
                onClick={() => { openCategoryModal('pants'); setIsMobileMenuOpen(false); }}
                className="text-left text-gray-500 hover:text-indigo-600"
              >
                Pants
              </button>
              <button
                onClick={() => { openCategoryModal('shirts'); setIsMobileMenuOpen(false); }}
                className="text-left text-gray-500 hover:text-indigo-600"
              >
                Shirts
              </button>
            </div>
          </div>

          <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600">
            About Us
          </Link>
          <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-indigo-600">
            Contact
          </Link>

          {/* Auth section (mobile) */}
          <div className="pt-4 border-t border-gray-100 mt-2">
            {currentUser ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src={currentUser.role === 'admin' ? "../images/admin.png" : "../images/user.png"} 
                    alt="avatar" 
                    className="w-10 h-10 rounded-full object-cover border border-gray-200" 
                  />
                  <div>
                    <p className="font-bold text-gray-800">{currentUser.name}</p>
                    <p className="text-sm text-indigo-600 flex items-center gap-1">
                      <img src="../images/diamond.png" alt="Points" className="w-3 h-3" /> {currentUser.points} points
                    </p>
                  </div>
                </div>
                <Link 
                  href="/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-gray-50 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-100"
                >
                  <i className="fas fa-user-circle mr-2"></i> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold hover:bg-red-100"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-indigo-700"
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
    >
      {children}
    </Link>
  );
}