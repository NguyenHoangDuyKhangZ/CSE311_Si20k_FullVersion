'use client';

import { useState } from 'react';
import { useStore } from '@/context/store_context';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, login, showNotification } = useStore();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: '' });

  if (!authModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      showNotification('Please enter email and password', 'error');
      return;
    }

    if (formData.email === 'guest@si20k.com' && formData.password === '123') {
      login({
        id: '1',
        name: 'Guest User',
        email: 'guest@si20k.com',
        points: 1500,
        role: 'customer',
      });
      setFormData({ email: '', password: '', name: '', phone: '' });
      showNotification('Login successful!', 'success');
      setAuthModalOpen(false);
    } else if (formData.email === 'admin@si20k.com' && formData.password === '123') {
      login({
        id: '2',
        name: 'Administrator',
        email: 'admin@si20k.com',
        points: 9999,
        role: 'admin',
      });
      setFormData({ email: '', password: '', name: '', phone: '' });
      showNotification('Login successful!', 'success');
      setAuthModalOpen(false);
    } else {
      showNotification('Wrong email or password. Try: guest@si20k.com / 123', 'error');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      showNotification('Please fill in all required information', 'error');
      return;
    }

    login({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      points: 0,
      role: 'customer',
    });
    showNotification('Registration successful!', 'success');
    setFormData({ email: '', password: '', name: '', phone: '' });
    setAuthModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            className={`flex-1 pb-3 text-lg font-bold transition-all ${
              activeTab === 'login'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('login')}
          >
            <i className="fas fa-sign-in-alt mr-2"></i>Login
          </button>
          <button
            className={`flex-1 pb-3 text-lg font-bold transition-all ${
              activeTab === 'register'
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
              Demo: guest@si20k.com / 123
              Demo: admin@si20k.com / 123
            </p>
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <i className="fas fa-sign-in-alt"></i>Login
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
              placeholder="Phone Number"
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
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <i className="fas fa-user-plus"></i>Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}