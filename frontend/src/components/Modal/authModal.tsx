'use client';

import { useStore } from '@/src/context/store_context';
import { useState } from 'react';
// Nếu có thư viện axios thì dùng axios, ở đây mình dùng fetch API mặc định của trình duyệt
// import axios from 'axios'; 

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, login, showNotification } = useStore();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: '', username: '' });
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading để UX mượt hơn

  // Đổi URL này nếu cổng Backend của bro không phải là 5187
  const API_BASE_URL = 'http://localhost:5187/api/Auth';

  if (!authModalOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showNotification('Please enter email and password', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usernameOrPassword: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        showNotification(errorData || 'Wrong email or password', 'error');
        setIsLoading(false);
        return;
      }

      const rawText = await response.text();
      let token: string = '';

      try {
        const parsed = JSON.parse(rawText);

        if (parsed.accessToken && typeof parsed.accessToken === 'object') {
          token = parsed.accessToken.accessToken || parsed.accessToken.AccessToken || '';
        } else {
          token = parsed.accessToken ?? parsed.AccessToken ?? '';
        }

      } catch {
        token = rawText.replace(/^"|"$/g, '').trim();
      }
      token = token.replace(/^"|"$/g, '').trim();

      if (!token || typeof token !== 'string') {
        console.error('[Login] Bad token — raw response was:', rawText.slice(0, 200));
        showNotification('Login failed: no token received', 'error');
        setIsLoading(false);
        return;
      }

      console.log('[Login] token OK, starts with:', token.slice(0, 20));

      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decodedToken = JSON.parse(jsonPayload);


        const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'guest';
        const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || formData.email.split('@')[0];
        const userId = decodedToken['UserId'] || Date.now().toString();

        login({
          id: userId,
          name: userName,
          email: formData.email,
          points: 0,
          role: userRole.toLowerCase(), // 'admin', 'seller', 'buyer'
          token: token
        });

        setFormData({ email: '', password: '', name: '', phone: '', username: '' });
        showNotification(`Welcome back, ${userName}!`, 'success');
        setAuthModalOpen(false);
      } catch (parseError) {
        console.error("Lỗi khi giải mã token:", parseError);
        showNotification('Login successful but failed to load user info.', 'warning');
      }

    } catch (error) {
      console.error('Login error:', error);
      showNotification('Cannot connect to server', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!formData.name || !formData.email || !formData.password || !formData.username) {
      showNotification('Please fill in all required information', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phone,
          address: "Vietnam",
          role: "Buyer"
        }),
      });

      if (!response.ok) {

        const errorData = await response.text();
        showNotification(errorData || 'Registration failed', 'error');
        setIsLoading(false);
        return;
      }

      showNotification('Registration successful! Please login.', 'success');

      setActiveTab('login');

      setFormData(prev => ({ ...prev, name: '', phone: '', username: '' }));
    } catch (error) {
      console.error('Register error:', error);
      showNotification('Cannot connect to server', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl transition-colors"
        >
          ✕
        </button>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 mt-4">
          <button
            className={`flex-1 pb-3 text-lg font-bold transition-all ${activeTab === 'login'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-400'
              }`}
            onClick={() => setActiveTab('login')}
          >
            <i className="fas fa-sign-in-alt mr-2"></i>Login
          </button>
          <button
            className={`flex-1 pb-3 text-lg font-bold transition-all ${activeTab === 'register'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-400'
              }`}
            onClick={() => setActiveTab('register')}
          >
            <i className="fas fa-user-plus mr-2"></i>Register
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4 px-6 pb-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
            />
            <p className="text-sm text-gray-500">
              Demo Buyer: buyer@example.com / 123
              <br></br>
              Demo Admin: admin@example.com / 123
              <br></br>
              Demo Seller: seller@example.com / 123
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className={`btn btn-primary w-full flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <i className="fas fa-sign-in-alt"></i>
              {isLoading ? 'Processing...' : 'Login'}
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4 px-6 pb-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-600 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`btn btn-primary w-full flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <i className="fas fa-user-plus"></i>
              {isLoading ? 'Processing...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}