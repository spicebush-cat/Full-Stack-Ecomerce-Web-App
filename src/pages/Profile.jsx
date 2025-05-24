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
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [userData, setUserData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    wilaya: user?.wilaya || '',
    avatar: user?.avatar || 'https://via.placeholder.com/100'
  });

  // Mock order history - replace with actual order data from your backend
  const [orderHistory] = useState([
    {
      id: '#ORD001',
      date: '2024-03-20',
      status: 'Delivered',
      total: 129.99,
      items: [
        { name: 'Classic White T-Shirt', quantity: 1, price: 29.99 },
        { name: 'Black Jeans', quantity: 1, price: 100.00 }
      ]
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('userId', user.id);

      const response = await fetch('http://127.0.0.1:8000/api/upload-avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setUserData(prev => ({
        ...prev,
        avatar: data.avatarUrl
      }));
      toast.success('Profile picture updated successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  if (!user) {
    return null;
  }

  const renderProfileInfo = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Personal Information</h2>
        <div className="space-x-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          <button
            onClick={logout}
            className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
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
              className={`w-24 h-24 rounded-full object-cover ${isEditing ? 'cursor-pointer' : ''} ${isUploading ? 'opacity-50' : ''}`}
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
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
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
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50"
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
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wilaya
            </label>
            <input
              type="text"
              name="wilaya"
              value={userData.wilaya}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );

  const renderOrderHistory = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Order History</h2>
      <div className="space-y-6">
        {orderHistory.map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-medium">Order {order.id}</p>
                <p className="text-sm text-gray-600">Placed on {order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Total</p>
                <p className="text-lg font-semibold">{currency}{order.total}</p>
              </div>
            </div>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <p>{item.name} x{item.quantity}</p>
                  <p>{currency}{item.price}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className={`px-2 py-1 text-xs rounded ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status}
              </span>
              <Link
                to={`/order/${order.id}`}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
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
        {/* Sidebar */}
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

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' ? renderProfileInfo() : renderOrderHistory()}
        </div>
      </div>
    </div>
  );
};

export default Profile;