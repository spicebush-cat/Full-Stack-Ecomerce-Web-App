import React, { useState } from 'react';

const Formula = () => {
  const [formData, setFormData] = useState({
    sellerName: '',
    phoneNumber: '',
    email: '',
    productName: '',
    breed: '',
    pictures: [],
    descriptionChart: '',
    descriptionLine: '',
    color: '',
    size: '',
    price: '',
    specialPrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        pictures: Array.from(e.target.files)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="font-sans pt-20">
      <main style={{
        backgroundColor: "white",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        inset: "0",
        opacity: "0.8",
        zIndex: "0",
      }}>
        <div className="max-w-5xl text-center mx-auto p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 text-[#414141]   ">
        <p className="font-semibold text-2xl ">
          <span className="font-extralight text-gray-500 ">PRODUCT </span> FORM
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
                    className="w-full px-3 py-4 text-[#8B8B8B] border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#EBD7BF] placeholder:text-white"
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
                    className="w-full px-3 py-4 text-[#8B8B8B] border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#EBD7BF]"
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
                    className="w-full px-3 py-4 text-[#8B8B8B] border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#EBD7BF]"
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
                    className="w-full px-3 py-4 text-[#8B8B8B] border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#EBD7BF]"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Brand:</label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-[#8B8B8B] border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#EBD7BF]"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Color:</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-[#8B8B8B] border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#EBD7BF]"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Size:</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-[#8B8B8B] border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#EBD7BF]"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-4 text-[#8B8B8B] border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#EBD7BF]"
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
                    className="w-full px-3 py-4 text-[#8B8B8B] border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#EBD7BF]"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black text-sm font-medium mb-1">Pictures:</label>
                  <input
                    type="file"
                    name="pictures"
                    onChange={handleFileChange}
                    className="w-full px-3 py-4 text-[#8B8B8B] border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#EBD7BF]"
                    multiple
                    accept="image/*"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-black text-sm font-medium mb-1">Description short:</label>
                <textarea
                  name="descriptionChart"
                  value={formData.descriptionChart}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-4 text-white border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#EBD7BF]"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-black text-sm font-medium mb-1">Description Long:</label>
                <textarea
                  name="descriptionLine"
                  value={formData.descriptionLine}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-4 text-white border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-[#EBD7BF]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="border-[1px] border-black px-4 py-3 font-light text-black  hover:text-white transition-all ease-in-out text-sm"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Formula;