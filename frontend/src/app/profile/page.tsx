'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/src/context/store_context';
import ProfileStats from '@/src/components/Profile/profileStats';
import AccountSettings from '@/src/components/Profile/accountSettings';
import AdminProductManager from '@/src/components/Profile/adminProductManager';
import SellerDashboard from '@/src/components/Profile/sellerDashboard';
import AdminDashboard from '@/src/components/Profile/adminDashboard';
import UserManagement from '@/src/components/Profile/userManagement';

export default function ProfilePage() {
  const { currentUser, logout, showNotification, updateUserProfile } = useStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  // Admin/Seller: 'dashboard' | 'info' | 'settings' | 'products'
  // Guest: 'info' | 'settings'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'info' | 'settings' | 'products' | 'users'>('info');

  useEffect(() => {
    if (!currentUser) {
      showNotification('Please login!', 'warning');
      router.push('/');
      return;
    }

    setFormData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      address: currentUser.address || '',
    });

    // Set default tab based on role
    if (currentUser.role === 'admin' || currentUser.role === 'seller') {
      setActiveTab('dashboard');
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const handleSave = () => {
    updateUserProfile({
      ...currentUser,
      ...formData,
    });
    showNotification('Profile updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-pink-500 py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg flex-shrink-0">
              {currentUser.role === 'admin' ? (
                <img src="../images/admin.png" alt="admin" className="w-full h-full object-cover" />
              ) : (
                <img src="../images/user.png" alt="user" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="text-white flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold break-words">{currentUser.name}</h1>
              <p className="text-indigo-100 text-sm sm:text-base break-all">{currentUser.email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm flex items-center gap-1 whitespace-nowrap">
                  <i className="fas fa-gem"></i>
                  {currentUser.points || 0} Points
                </span>
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm capitalize whitespace-nowrap font-semibold ${
                    currentUser.role === 'admin'
                      ? 'bg-purple-600/30'
                      : currentUser.role === 'seller'
                      ? 'bg-orange-600/30'
                      : 'bg-green-600/30'
                  }`}
                >
                  {currentUser.isLocked ? '🔒 Locked' : `✅ ${currentUser.role}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            {/* Mobile Tabs */}
            <div className="lg:hidden mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-md flex gap-2 overflow-x-auto transition-colors">
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                      activeTab === 'dashboard'
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <i className="fas fa-chart-line mr-1"></i>Dashboard
                  </button>
                )}
                {currentUser.role === 'seller' && (
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                      activeTab === 'dashboard'
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <i className="fas fa-store mr-1"></i>Store
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'info'
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <i className="fas fa-address-card mr-1"></i>Info
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === 'settings'
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <i className="fas fa-cog mr-1"></i>Settings
                </button>
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-md space-y-3 sm:space-y-4 transition-colors sticky top-20">
              {currentUser.role === 'admin' && (
                <>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm sm:text-base ${
                      activeTab === 'dashboard'
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <i className="fas fa-chart-line mr-2"></i>
                    Admin Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm sm:text-base ${
                      activeTab === 'users'
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <i className="fas fa-users mr-2"></i>
                    Manage Users
                  </button>
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm sm:text-base ${
                      activeTab === 'products'
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <i className="fas fa-box mr-2"></i>
                    Manage Products
                  </button>
                </>
              )}
              {currentUser.role === 'seller' && (
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm sm:text-base ${
                    activeTab === 'dashboard'
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <i className="fas fa-store mr-2"></i>
                  Store Dashboard
                </button>
              )}
              <button
                onClick={() => setActiveTab('info')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm sm:text-base ${
                  activeTab === 'info'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <i className="fas fa-address-card mr-2"></i>
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm sm:text-base ${
                  activeTab === 'settings'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <i className="fas fa-cog mr-2"></i>
                Settings
              </button>
              <hr className="dark:border-gray-700" />
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-all text-sm sm:text-base"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2 space-y-4 sm:space-y-6">
            {/* Admin Dashboard */}
            {activeTab === 'dashboard' && currentUser.role === 'admin' && (
              <AdminDashboard />
            )}

            {/* Seller Dashboard */}
            {activeTab === 'dashboard' && currentUser.role === 'seller' && (
              <SellerDashboard />
            )}

            {/* User Management (Admin Only) */}
            {activeTab === 'users' && currentUser.role === 'admin' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md transition-colors">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  👥 User Management
                </h2>
                <UserManagement />
              </div>
            )}

            {/* Product Management */}
            {activeTab === 'products' && currentUser.role === 'admin' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md transition-colors">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  📦 Product Management
                </h2>
                <AdminProductManager />
              </div>
            )}

            {/* Personal Info Tab */}
            {activeTab === 'info' && (
              <>
                {/* Statistics Section */}
                {(currentUser.role === 'admin' || currentUser.role === 'seller') && (
                  <ProfileStats currentUser={currentUser} />
                )}

                {/* Personal Info Form */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md space-y-4 sm:space-y-6 transition-colors">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                    Personal Information
                  </h2>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors text-sm sm:text-base bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors text-sm sm:text-base"
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    className="btn btn-primary w-full py-2 sm:py-3 text-sm sm:text-base"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <AccountSettings />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}