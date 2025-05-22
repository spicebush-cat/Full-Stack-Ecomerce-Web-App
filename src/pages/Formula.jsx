import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Formula = () => {
  const [formData, setFormData] = useState({
    sellerName: '',
    phoneNumber: '',
    email: '',
    productName: '',
    brand: '',
    pictures: [],
    descriptionChart: '',
    descriptionLine: '',
    color: '',
    size: '',
    price: '',
    specialPrice: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        toast.error('Maximum 5 images allowed');
        return;
      }
      setFormData(prev => ({
        ...prev,
        pictures: files
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append('name', formData.sellerName);
      form.append('email', formData.email);
      form.append('phone', formData.phoneNumber);
      form.append('title', formData.productName);
      form.append('brand', formData.brand);
      form.append('color', formData.color);
      form.append('size', formData.size);
      form.append('price', formData.price);
      form.append('special_price', formData.specialPrice);
      form.append('short_description', formData.descriptionChart);
      form.append('long_description', formData.descriptionLine);
      form.append('notes', '');

      // Append images with proper naming
      formData.pictures.forEach((file, index) => {
        const fieldName = index === 0 ? 'image' : `image_${['one', 'two', 'three', 'four'][index - 1]}`;
        form.append(fieldName, file);
      });

      const response = await fetch('http://localhost:8000/api/submitProduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: form,
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Product submitted successfully!');
        setFormData({
          sellerName: '',
          phoneNumber: '',
          email: '',
          productName: '',
          brand: '',
          pictures: [],
          descriptionChart: '',
          descriptionLine: '',
          color: '',
          size: '',
          price: '',
          specialPrice: ''
        });
      } else {
        throw new Error(data.message || 'Failed to submit product');
      }
    } catch (error) {
      toast.error(error.message || 'Error submitting product');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans pt-20">
      <main className="bg-white min-h-screen">
        <div className="max-w-5xl mx-auto p-6 rounded-2xl shadow-md">
          <div className="flex items-center gap-2 text-[#414141]">
            <p className="font-semibold text-2xl">
              <span className="font-extralight text-gray-500">PRODUCT </span> FORM
            </p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
          </div>
          
          <div className='text-left'>
            <p className="text-black mb-6 text-xl">Fill out the form so you can upload your product ...</p>
          </div>
          
          <form onSubmit={handleSubmit} className='border rounded-xl p-10 bg-gray-200'>
            {/* Seller Information Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#414141] mb-4 border-b pb-2">Seller Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Name:</label>
                  <input
                    type="text"
                    name="sellerName"
                    value={formData.sellerName}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Phone number:</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">E-mail:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Product Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#414141] mb-4 border-b pb-2">Product Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Product Name:</label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Brand:</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Color:</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Size:</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Special Price:</label>
                  <input
                    type="number"
                    name="specialPrice"
                    value={formData.specialPrice}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-black text-sm font-medium mb-1">Product Images (Max 5):</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-black text-sm font-medium mb-1">Short Description:</label>
                <textarea
                  name="descriptionChart"
                  value={formData.descriptionChart}
                  onChange={handleChange}
                  className="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  rows="3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-black text-sm font-medium mb-1">Long Description:</label>
                <textarea
                  name="descriptionLine"
                  value={formData.descriptionLine}
                  onChange={handleChange}
                  className="w-full px-3 py-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  rows="5"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-black text-white py-4 rounded-lg font-medium transition-all duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Product'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Formula;