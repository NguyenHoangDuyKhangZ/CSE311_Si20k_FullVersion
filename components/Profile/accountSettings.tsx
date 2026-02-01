'use client';

import { useState } from 'react';
import { useStore } from '@/context/store_context';

export default function AccountSettings() {
  const { setNotification } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('123');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      setNotification({ message: 'Please enter new password and confirmation!', type: 'error' });
      return;
    }

    if (newPassword.length < 6) {
      setNotification({ message: 'Password must be at least 6 characters!', type: 'error' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setNotification({ message: 'Passwords do not match!', type: 'error' });
      return;
    }

    // Update password
    setCurrentPassword(newPassword);
    setNotification({ message: 'Password changed successfully!', type: 'success' });
    setIsEditing(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <i className="fas fa-cog text-primary text-xl"></i> Account Settings
      </h3>

      <div className="space-y-6 max-w-2xl">
        
        {/* Password Management Section */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            <i className="fas fa-lock text-primary mr-2"></i>Password
          </label>
          <div className="flex gap-4 items-center flex-wrap">
            {isEditing ? (
              <>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all min-w-[200px]"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </>
            ) : (
              <div className="flex-1 p-3 bg-gray-100 rounded-xl text-gray-500 tracking-widest min-w-[200px]">
                {showPassword ? currentPassword : '••••••••'}
              </div>
            )}
            
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                isEditing 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                  : 'text-primary bg-primary/10 hover:bg-primary/20'
              }`}
            >
              <i className={`fas ${isEditing ? 'fa-times' : 'fa-edit'} mr-2`}></i>
              {isEditing ? 'Cancel' : 'Change'}
            </button>
          </div>

          {isEditing && (
            <div className="mt-4 space-y-4 animate-fade-in">
              <div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 text-sm select-none">
                <input 
                  type="checkbox" 
                  checked={showPassword} 
                  onChange={() => setShowPassword(!showPassword)}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <i className="fas fa-eye text-primary"></i>
                Show password
              </label>
              
              <button 
                onClick={handleChangePassword}
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-check-circle"></i>
                Update Password
              </button>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <i className="fas fa-moon text-lg"></i>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Dark Mode</h4>
              <p className="text-xs text-gray-500">Adjust the appearance to reduce eye strain.</p>
            </div>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

      </div>
    </div>
  );
}