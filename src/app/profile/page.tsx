'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/src/context/store_context';
import ProfileStats from '@/src/components/Profile/profileStats';
import AccountSettings from '@/src/components/Profile/accountSettings';


export default function ProfilePage() {
  const { currentUser, logout, showNotification, updateUserProfile } = useStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [activeTab, setActiveTab] = useState<'info' | 'settings'>('info');

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
      <div className="bg-gradient-to-r from-indigo-600 to-pink-500 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
              {currentUser.role === 'admin' ? (
                <img src="../images/admin.png" alt="admin" className="w-full h-full object-cover" />
              ) : (
                <img src="../images/user.png" alt="user" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold">{currentUser.name}</h1>
              <p className="text-indigo-100">{currentUser.email}</p>
              <div className="flex gap-3 mt-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm flex items-center gap-1">
                  <i className="fas fa-gem"></i>
                  {currentUser.points || 0} Points
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm capitalize">
                  {currentUser.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md space-y-4 transition-colors">
              <button
                onClick={() => setActiveTab('info')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === 'info'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                  }`}
              >
                <i className="fas fa-address-card mr-2"></i>
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === 'settings'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                  }`}
              >
                <i className="fas fa-cog mr-2"></i>
                Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-all"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'info' && (
              <>
                {/* Statistics Section */}
                <ProfileStats currentUser={currentUser} />

                {/* Personal Info Form */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md space-y-6 transition-colors">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    Personal Information
                  </h2>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-indigo-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <button onClick={handleSave} className="btn btn-primary w-full">
                    Save Changes
                  </button>
                </div>
              </>
            )}

            {activeTab === 'settings' && (
              <AccountSettings />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}