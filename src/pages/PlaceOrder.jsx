import React, { useState, useContext } from 'react';
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from 'react-router-dom';
import { assets } from "../../public/assets/frontend_assets/assets";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { currency, delevry_fee, subTotal, getTotalAmount, card } = useContext(ShopContext);
  const navigate = useNavigate();

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    wilaya: '',
    phone: ''
  });

  // Redirect to cart if cart is empty
  React.useEffect(() => {
    if (card.length === 0) {
      navigate('/card');
    }
  }, [card, navigate]);

  const handleDeliveryInfoChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Combine order information
    const orderData = {
      deliveryInfo,
      paymentMethod,
      items: card,
      totals: {
        subtotal: subTotal,
        shippingFee: delevry_fee,
        total: getTotalAmount()
      }
    };

    console.log('Order submitted:', orderData);
    // Add your order submission logic here
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      {/* Delivery Information */}
      <div>
        <div className="flex items-center gap-2 text-[#414141]">
          <p className="font-semibold text-2xl">
            <span className="font-extralight text-gray-500">DELIVERY </span> INFORMATION
          </p>
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                value={deliveryInfo.firstName}
                onChange={handleDeliveryInfoChange}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={deliveryInfo.lastName}
                onChange={handleDeliveryInfoChange}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                required
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              value={deliveryInfo.email}
              onChange={handleDeliveryInfoChange}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Delivery Address</label>
            <input
              type="text"
              name="address"
              value={deliveryInfo.address}
              onChange={handleDeliveryInfoChange}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Wilaya</label>
            <input
              type="text"
              name="wilaya"
              value={deliveryInfo.wilaya}
              onChange={handleDeliveryInfoChange}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={deliveryInfo.phone}
              onChange={handleDeliveryInfoChange}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>
        </form>
      </div>

      {/* Cart Summary */}
      <div>
        <div className="flex items-center gap-2 text-[#414141] mb-6">
          <p className="font-semibold text-2xl">
            <span className="font-extralight text-gray-500">ORDER </span> SUMMARY
          </p>
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
        </div>

        {/* Cart Items */}
        <div className="max-h-[300px] overflow-y-auto mb-6 border rounded-lg">
          {card.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border-b last:border-b-0">
              <img
                src={item.productData.image}
                alt={item.productData.name}
                className="w-16 h-20 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.productData.name}</h3>
                <div className="flex items-center gap-4 text-gray-600 text-sm mt-1">
                  <span>Size: {item.selectedSize}</span>
                  <span>Quantity: {item.quentity}</span>
                </div>
                <p className="text-sm font-medium mt-1">
                  {currency}{item.productData.price * item.quentity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Totals */}
        <div className="border rounded-lg p-4 mb-6">
          <div className="flex justify-between py-2 text-gray-600">
            <span>Subtotal</span>
            <span>{currency}{subTotal}</span>
          </div>
          <div className="flex justify-between py-2 text-gray-600">
            <span>Shipping Fee</span>
            <span>{currency}{delevry_fee}</span>
          </div>
          <div className="flex justify-between py-2 font-semibold text-lg border-t mt-2">
            <span>Total</span>
            <span>{currency}{getTotalAmount()}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex items-center gap-2 text-[#414141] mb-6">
          <p className="font-semibold text-2xl">
            <span className="font-extralight text-gray-500">PAYMENT </span> METHOD
          </p>
          <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <label className="flex items-center space-x-2 border px-4 py-2 rounded cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="text-blue-950 font-bold">Pay<span className='text-blue-600'>Pal</span></span>
          </label>
          <label className="flex items-center space-x-2 border px-4 py-2 rounded cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="Baridimob"
              checked={paymentMethod === "Baridimob"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="text-blue-900 font-bold">Baridi<span className='text-yellow-400'>mob</span></span>
          </label>
          <label className="flex items-center space-x-2 border px-4 py-2 rounded cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="font-bold">CASH ON DELIVERY</span>
          </label>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={!paymentMethod || !deliveryInfo.firstName || !deliveryInfo.email || !deliveryInfo.phone}
          className={`w-full bg-black text-white px-6 py-3 rounded transition-all ${
            (!paymentMethod || !deliveryInfo.firstName || !deliveryInfo.email || !deliveryInfo.phone) 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-800'
          }`}
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;