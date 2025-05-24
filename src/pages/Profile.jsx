import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currency } = useContext(ShopContext);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing]   = useState(false);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profile_photo_url: '',
    // add any extra fields you want to edit
    phone: '',
    address: '',
    wilaya: '',
  });

  // 1️⃣ Fetch user on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return navigate('/login');
    }

    fetch('http://localhost:8000/api/user', {
      headers: {
        'Accept':        'application/json',
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(async res => {
      if (!res.ok) {
        throw new Error('Not authenticated');
      }
      const body = await res.json();
      return body.user;
    })
    .then(user => {
      setUserData({
        name:              user.name || '',
        email:             user.email || '',
        profile_photo_url: user.profile_photo_url || '',
        // if your API returns phone/address/wilaya, map them here:
        phone:             user.phone || '',
        address:           user.address || '',
        wilaya:            user.wilaya || '',
      });
    })
    .catch(() => {
      navigate('/login');
    })
    .finally(() => setLoading(false));
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:8000/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error('Update failed');
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tabs */}
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
          {activeTab === 'profile' ? (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Personal Information</h2>
                <div className="space-x-4">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      logout();
                      navigate('/login');
                    }}
                    className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-4 text-red-500">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-6 mb-6">
                  <img
                    src={userData.profile_photo_url || 'https://via.placeholder.com/100'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  {isEditing && (
                    <button
                      type="button"
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Change Photo
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Full Name', name: 'name', type: 'text' },
                    { label: 'Email',     name: 'email',    type: 'email' },
                    { label: 'Phone',     name: 'phone',    type: 'tel' },
                    { label: 'Address',   name: 'address',  type: 'text' },
                    { label: 'Wilaya',    name: 'wilaya',   type: 'text' },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={userData[field.name]}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50"
                      />
                    </div>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Order History</h2>
              {/* ... your existing order history render ... */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
