import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { currency } = useContext(ShopContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    avatar: 'https://via.placeholder.com/100'
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch user data');
      
      const data = await response.json();
      setUserData({
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.profile_photo_url || 'https://via.placeholder.com/100'
      });

    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUserData(prev => ({ ...prev, avatar: imageUrl }));
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      if (selectedFile) formData.append('profile_photo', selectedFile);

      const response = await fetch('http://localhost:8000/api/user/profile/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      const data = await response.json();
      setUserData(prev => ({
        ...prev,
        name: data.data.name,
        email: data.data.email,
        avatar: data.data.profile_photo_path
      }));
      
      if (selectedFile) URL.revokeObjectURL(userData.avatar);
      setSelectedFile(null);
      toast.success('Profile updated successfully');
      setIsEditing(false);
      
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  const renderProfileInfo = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Personal Information</h2>
        <div className="space-x-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            disabled={isSaving}
            className={`text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          <button
            onClick={logout}
            className={`text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Logout
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative group">
            <img
              src={userData.avatar}
              alt="Profile"
              className={`w-24 h-24 rounded-full object-cover ${isEditing ? 'cursor-pointer' : ''}`}
              onClick={handleImageClick}
            />
            {isEditing && (
              <div 
                className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all cursor-pointer"
                onClick={handleImageClick}
              >
                <span className="text-white opacity-0 group-hover:opacity-100">
                  Change Photo
                </span>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              disabled={!isEditing || isSaving}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              disabled={!isEditing || isSaving}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50"
              required
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className={`px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors ${
                isSaving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </form>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-[#414141] mb-8">
        <p className="font-semibold text-2xl">
          <span className="font-extralight text-gray-500">MY </span> ACCOUNT
        </p>
        <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64">
          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 ${
                activeTab === 'profile' ? 'bg-gray-100 font-medium' : ''
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 ${
                activeTab === 'orders' ? 'bg-gray-100 font-medium' : ''
              }`}
            >
              Order History
            </button>
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'profile' ? renderProfileInfo() : <div className="bg-white rounded-lg p-6 shadow-sm">Order History (Implement your order history component here)</div>}
        </div>
      </div>
    </div>
  );
};

export default Profile;