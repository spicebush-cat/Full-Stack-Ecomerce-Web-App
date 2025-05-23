import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

function Order() {
  const { currency } = useContext(ShopContext);
  const [orders] = useState([
    {
      id: 1,
      date: '2024-03-20',
      status: 'Delivered',
      items: [
        {
          id: 1,
          name: 'Classic White T-Shirt',
          price: 29.99,
          image: '/path/to/image1.jpg',
          size: 'M',
          quantity: 1,
          hasReview: false
        },
        // Add more items as needed
      ],
      total: 29.99,
      deliveryInfo: {
        address: '123 Main St',
        wilaya: 'Example Wilaya',
      }
    }
    // Add more orders as needed
  ]);

  const [reviewModal, setReviewModal] = useState({
    isOpen: false,
    productId: null,
    rating: 0,
    comment: ''
  });

  const handleReviewSubmit = (orderId, productId) => {
    const review = {
      rating: reviewModal.rating,
      comment: reviewModal.comment,
      productId,
      orderId
    };
    
    // TODO: Send review to backend
    console.log('Submitting review:', review);
    
    setReviewModal({
      isOpen: false,
      productId: null,
      rating: 0,
      comment: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-[#414141] mb-8">
        <p className="font-semibold text-2xl">
          <span className="font-extralight text-gray-500">YOUR </span> ORDERS
        </p>
        <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg shadow-sm">
            <div className="bg-gray-50 p-4 rounded-t-lg border-b">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Status</p>
                  <p className={`text-sm ${
                    order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        <p>Size: {item.size}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p className="mt-1 font-medium">{currency}{item.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setReviewModal({
                        isOpen: true,
                        productId: item.id,
                        rating: 0,
                        comment: ''
                      })}
                      className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors"
                      disabled={item.hasReview}
                    >
                      {item.hasReview ? 'Review Added' : 'Add Review'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <p>Delivery Address: {order.deliveryInfo.address}</p>
                    <p>Wilaya: {order.deliveryInfo.wilaya}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Order Total</p>
                    <p className="text-lg font-medium">{currency}{order.total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {reviewModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Write a Review</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewModal(prev => ({ ...prev, rating: star }))}
                      className={`text-2xl ${
                        star <= reviewModal.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  value={reviewModal.comment}
                  onChange={(e) => setReviewModal(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full border rounded-lg p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="Write your review here..."
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setReviewModal({
                    isOpen: false,
                    productId: null,
                    rating: 0,
                    comment: ''
                  })}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReviewSubmit(orders[0].id, reviewModal.productId)}
                  disabled={!reviewModal.rating || !reviewModal.comment.trim()}
                  className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;