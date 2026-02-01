'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/store_context';

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
      showNotification('Vui lòng đăng nhập!', 'warning');
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
    showNotification('Lưu thông tin thành công!', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-pink-500 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-indigo-600 shadow-lg">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold">{currentUser.name}</h1>
              <p className="text-indigo-100">{currentUser.email}</p>
              <div className="flex gap-3 mt-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  💎 {currentUser.points || 0} điểm
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
            <div className="card p-6 space-y-4">
              <button
                onClick={() => setActiveTab('info')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'info'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                👤 Thông tin cá nhân
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'settings'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                ⚙️ Cài đặt
              </button>
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600"
              >
                🚪 Đăng xuất
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'info' && (
              <div className="card p-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông Tin Cá Nhân</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <button onClick={handleSave} className="btn btn-primary w-full">
                  Lưu thay đổi
                </button>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Cài Đặt</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Thông báo email
                      </p>
                      <p className="text-sm text-gray-500">
                        Nhận thông báo về đơn hàng
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Chế độ tối
                      </p>
                      <p className="text-sm text-gray-500">
                        Bật/Tắt chế độ tối
                      </p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Bảo mật hai lớp
                      </p>
                      <p className="text-sm text-gray-500">
                        Bảo vệ tài khoản của bạn
                      </p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
