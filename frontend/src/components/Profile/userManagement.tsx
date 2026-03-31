'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/src/context/store_context';
import { fetchAllUsers, toggleUserLock } from '@/src/services/userService';

export default function UserManagement() {
  const { currentUser, showNotification } = useStore();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'seller' | 'buyer' | 'admin'>('all');
  const [newUserData, setNewUserData] = useState({ name: '', username: '', email: '', phone: '', role: 'Buyer', password: '' });

  const loadUsers = async () => {
    if (!currentUser?.token) return;
    try {
      setIsLoading(true);
      const data = await fetchAllUsers(currentUser.token);
      setUsers(data);
    } catch (err) {
      showNotification('Failed to load users from DB', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, [currentUser]);

  const handleToggleLock = async (id: string) => {
    try {
      await toggleUserLock(id, currentUser?.token || '');
      showNotification('User status updated!', 'success');
      loadUsers();
    } catch (err) {
      showNotification('Failed to update user status', 'error');
    }
  };

  const handleCreateUser = async () => {
    try {
      const res = await fetch('http://localhost:5187/api/Auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: newUserData.name,
          username: newUserData.username || newUserData.name.split(' ')[0],
          email: newUserData.email,
          password: newUserData.password,
          phoneNumber: newUserData.phone,
          address: "Vietnam",
          role: newUserData.role
        })
      });

      if (!res.ok) throw new Error(await res.text());
      showNotification('User created successfully!', 'success');
      setShowCreateForm(false);
      loadUsers();
    } catch (err: any) {
      showNotification(err.message || 'Creation failed', 'error');
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || u.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role?.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const stats = {
    totalUsers: users.length,
    adminCount: users.filter((u) => u.role?.toLowerCase() === 'admin').length,
    sellerCount: users.filter((u) => u.role?.toLowerCase() === 'seller').length,
    guestCount: users.filter((u) => u.role?.toLowerCase() === 'buyer').length,
    lockedCount: users.filter((u) => u.isLocked).length,
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading users from database...</div>;

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
          <p className="text-xs md:text-sm text-green-600 font-semibold">Buyers</p>
          <p className="text-2xl md:text-3xl font-bold text-green-700">{stats.guestCount}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
          <p className="text-xs md:text-sm text-red-600 font-semibold">Locked</p>
          <p className="text-2xl md:text-3xl font-bold text-red-700">{stats.lockedCount}</p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value as any)} className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="all">All Roles</option><option value="admin">Admin</option><option value="seller">Seller</option><option value="buyer">Buyer</option>
          </select>
          <button onClick={() => setShowCreateForm(!showCreateForm)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg whitespace-nowrap"><i className="fas fa-plus mr-2"></i>New User</button>
        </div>

        {showCreateForm && (
          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600" />
            <input type="text" placeholder="Username" onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600" />
            <input type="email" placeholder="Email" onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600" />
            <input type="password" placeholder="Password" onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600" />
            <select onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })} className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="Buyer">Buyer</option><option value="Seller">Seller</option><option value="Admin">Admin</option>
            </select>
            <button onClick={handleCreateUser} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors">Create User</button>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr><th className="p-4">User Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-b dark:border-gray-700">
                <td className="p-4 font-medium dark:text-white">{u.fullName}</td>
                <td className="dark:text-gray-300">{u.email}</td>
                <td><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">{u.role}</span></td>
                <td className="dark:text-gray-300">{u.isLocked ? '🔒 Locked' : '✅ Active'}</td>
                <td>
                  <button onClick={() => handleToggleLock(u.id)} className={`px-3 py-1 rounded text-white font-semibold transition-colors ${u.isLocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                    {u.isLocked ? 'Unlock' : 'Lock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}