'use client';

import Link from 'next/link';
import { useStore } from '@/context/store_context';
import { useState } from 'react';

export default function Header() {
  const {
    currentUser, setAuthModalOpen, cart, setCartModalOpen, logout,
    openCategoryModal
  } = useStore();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="backdrop-blur-xl bg-white/90 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <img src="../images/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-lg" />
              <span className="font-bold text-lg hidden sm:block gradient-text">
                Si20k Store
              </span>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/">Home</NavLink>
              <div className="relative group">
                <button
                  onClick={() => openCategoryModal('jackets')}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Products
                </button>
                <div className="absolute left-0 mt-0 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button
                    onClick={() => {
                     <NavLink href="all-products"></NavLink>
                    }}
                    className="block w-full text-left px-6 py-3 hover:bg-gray-50 first:rounded-t-xl"
                  >
                    Jackets
                  </button>
                  <button
                    onClick={() => {
                      openCategoryModal('pants');
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-6 py-3 hover:bg-gray-50"
                  >
                    Pants
                  </button>
                  <button
                    onClick={() => {
                      openCategoryModal('shirts');
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-6 py-3 hover:bg-gray-50 last:rounded-b-xl"
                  >
                    Shirts
                  </button>
                </div>
              </div>
              <NavLink href="/#about">About Us</NavLink>
              <NavLink href="/#contact">Contact</NavLink>
            </nav>

            {/* Right Section - Cart & User */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Cart Button */}
              <button
                onClick={() => setCartModalOpen(true)}
                className="relative p-2 md:p-3 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <i className="fas fa-shopping-cart w-6 h-6 text-gray-700 group-hover:text-indigo-600 transition-colors text-lg"></i>
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1 -translate-y-1 bg-gradient-to-r from-red-500 to-pink-600 rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* User Account */}
              {currentUser ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm flex items-center gap-1"><img src="../images/diamond.png" alt="Points" className="w-4 h-4 mr-1" />{currentUser.points}</span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-white font-semibold">
                      {currentUser.role === 'admin' ? (
          <img src="../images/admin.png" alt="admin" className="w-full h-full object-cover" />
        ) : (
          <img src="../images/user.png" alt="guest" className="w-full h-full object-cover" />
        )}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      {currentUser.name}
                    </span>
                  </button>

                  <div className="absolute right-0 mt-0 w-48 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      href="/profile"
                      className="block w-full text-left px-6 py-3 hover:bg-gray-50 first:rounded-t-xl flex items-center gap-2"
                    >
                      <i className="fas fa-user-circle text-lg"></i> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-6 py-3 hover:bg-gray-50 last:rounded-b-xl text-red-600 flex items-center gap-2"
                    >
                      <i className="fas fa-sign-out-alt text-lg"></i> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="btn btn-primary btn-sm hidden sm:block"
                >
                  Login
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <i className="fas fa-bars w-6 h-6 text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

        <div className="md:hidden bg-white border-b border-gray-100">
          <nav className="px-4 py-4 flex flex-col gap-2">
            <MobileNavLink href="/" onClick={() => setShowMenu(false)}>
              Home
            </MobileNavLink>
            <button
              onClick={() => {
                openCategoryModal('jackets');
                setShowMenu(false);
              }}
              className="text-left px-4 py-2 text-gray-700 hover:text-indigo-600"
            >
              Products
            </button>
            <MobileNavLink href="/#about" onClick={() => setShowMenu(false)}>
              About Us
            </MobileNavLink>
            <MobileNavLink href="/#contact" onClick={() => setShowMenu(false)}>
              Contact
            </MobileNavLink>
            {!currentUser && (
              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  setShowMenu(false);
                }}
                className="btn btn-primary w-full mt-2"
              >
                Login
              </button>
            )}
          </nav>
        </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} onClick={onClick} className="text-gray-700 hover:text-indigo-600">
      {children}
    </Link>
  );
}