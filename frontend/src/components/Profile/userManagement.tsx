'use client';

import React, { useState } from 'react';
import { useStore } from '@/src/context/store_context';
import { User } from '@/src/types/index';

export default function UserManagement() {
  const { userList, toggleLockUser, createNewUser, showNotification } = useStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'seller' | 'guest' | 'admin'>('all');
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'guest' as const,
    password: '123',
  });

  const filteredUsers = userList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = () => {
    if (!newUserData.name.trim() || !newUserData.email.trim()) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    if (userList.some((u) => u.email === newUserData.email)) {
      showNotification('Email already exists', 'error');
      return;
    }

    createNewUser({
      name: newUserData.name,
      email: newUserData.email,
      phone: newUserData.phone,
      points: 0,
      role: newUserData.role,
      password: newUserData.password,
      isLocked: false,
    });

    setNewUserData({
      name: '',
      email: '',
      phone: '',
      role: 'guest',
      password: '123',
    });
    setShowCreateForm(false);
  };

  const stats = {
    totalUsers: userList.length,
    adminCount: userList.filter((u) => u.role === 'admin').length,
    sellerCount: userList.filter((u) => u.role === 'seller').length,
    guestCount: userList.filter((u) => u.role === 'guest').length,
    lockedCount: userList.filter((u) => u.isLocked).length,
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <p className="text-xs md:text-sm text-blue-600 font-semibold">Total Users</p>
          <p className="text-2xl md:text-3xl font-bold text-blue-700">{stats.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <p className="text-xs md:text-sm text-purple-600 font-semibold">Admin</p>
          <p className="text-2xl md:text-3xl font-bold text-purple-700">{stats.adminCount}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <p className="text-xs md:text-sm text-orange-600 font-semibold">Sellers</p>
          <p className="text-2xl md:text-3xl font-bold text-orange-700">{stats.sellerCount}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <p className="text-xs md:text-sm text-green-600 font-semibold">Guests</p>
          <p className="text-2xl md:text-3xl font-bold text-green-700">{stats.guestCount}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
          <p className="text-xs md:text-sm text-red-600 font-semibold">Locked</p>
          <p className="text-2xl md:text-3xl font-bold text-red-700">{stats.lockedCount}</p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-md space-y-4 transition-colors">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="guest">Guest</option>
          </select>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap"
          >
            <i className="fas fa-plus"></i>
            New User
          </button>
        </div>

        {/* Create User Form */}
        {showCreateForm && (
          <div className="border-t pt-4 mt-4">
            <h3 className="font-bold text-gray-800 dark:text-white mb-4">Create New User</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter user name"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="0123456789"
                  value={newUserData.phone}
                  onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as any })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="guest">Guest</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleCreateUser}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <i className="fas fa-check"></i>
                Create User
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <i className="fas fa-times"></i>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                  User Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Points
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize ${user.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : user.role === 'seller'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {user.points || 0}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${user.isLocked
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                        }`}
                    >
                      {user.isLocked ? '🔒 Locked' : '🔓 Active'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => {
                        toggleLockUser(user.email);
                      }}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-xs transition-all ${user.isLocked
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                      title={user.isLocked ? 'Unlock user' : 'Lock user'}
                    >
                      {user.isLocked ? (
                        <>
                          <i className="fas fa-unlock"></i>
                          <span className="hidden sm:inline">Unlock</span>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-lock"></i>
                          <span className="hidden sm:inline">Lock</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No users found matching your criteria</p>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <p>📝 Showing {filteredUsers.length} of {userList.length} users</p>
      </div>
    </div>
  );
}
