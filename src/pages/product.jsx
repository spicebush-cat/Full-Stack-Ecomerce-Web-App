import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Product() {
  const { productId } = useParams();
  const { addToCart, addToFavorites, isProductFavorite } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [validationErrors, setValidationErrors] = useState([]);

  // Ajout des états pour la notation utilisateur
  const [userRating, setUserRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch("http://127.0.0.1:8000/api/products").then(res => res.json()),
      fetch(`http://127.0.0.1:8000/api/productdetails/${productId}`).then(res => res.json())
    ])
      .then(([products, detailsData]) => {
        const productListItem = products.find(p => String(p.id) === String(productId));
        const details = detailsData.productDetails?.[0] || {};
        const list = detailsData.productList?.[0] || {};

        const mainImage = productListItem?.image &&
                         productListItem.image !== "http://127.0.0.1:8000/upload/product/default_image.jpg"
          ? { url: productListItem.image, alt: productListItem.title || "Main Image" }
          : null;

        const otherImages = [
          { url: details.image_one, alt: "Image 1" },
          { url: details.image_two, alt: "Image 2" },
          { url: details.image_three, alt: "Image 3" },
          { url: details.image_four, alt: "Image 4" },
        ].filter(img => img.url && img.url !== "http://127.0.0.1:8000/upload/product/default_image.jpg" && img.url !== mainImage?.url);

        const imagesRaw = mainImage ? [mainImage, ...otherImages] : otherImages;
        const images = imagesRaw.map((img, index) => ({
          original: img.url,
          thumbnail: img.url,
          originalAlt: img.alt,
          thumbnailAlt: img.alt,
        }));

        setProductData({
          _id: details.id || list.id || productListItem?.id,
          name: list.title || details.name || productListItem?.title || "Product",
          price: list.price || productListItem?.price,
          specialPrice: list.special_price,
          description: details.short_description,
          longDescription: details.long_description,
          category: list.category || productListItem?.category,
          subcategory: list.subcategory || productListItem?.subcategory,
          colors: details.color ? details.color.split(",") : [],
          sizes: details.size ? details.size.split(",") : [],
          images,
          reviews: list.reviews || 0,
          rating: list.star ? parseInt(list.star) : 0,
          clients: [],
        });
        setSelectedColor(details.color ? details.color.split(",")[0] : "");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [productId]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.info("Please login to add items to cart");
      navigate("/login");
      return;
    }

    const errors = [];
    
    if (productData.sizes.length > 0 && !selectedSize) {
      errors.push("Please select a size");
    }
    
    if (productData.colors.length > 0 && !selectedColor) {
      errors.push("Please select a color");
    }
    
    if (quantity < 1) {
      errors.push("Quantity must be at least 1");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setTimeout(() => setValidationErrors([]), 3000);
      return;
    }

    const cartItem = {
      _id: `${productData._id}-${Date.now()}`,
      productId: productData._id,
      name: productData.name,
      price: productData.specialPrice || productData.price,
      selectedSize,
      selectedColor,
      quantity,
      image: productData.images[0]?.original,
    };

    addToCart(cartItem);
    toast.success(`Added ${quantity} x ${productData.name} to cart!`);
  };

  const handleOrderNow = () => {
    if (!user) {
      toast.info("Please login to place an order");
      navigate("/login");
      return;
    }

    const errors = [];
    
    if (productData.sizes.length > 0 && !selectedSize) {
      errors.push("Please select a size");
    }
    
    if (productData.colors.length > 0 && !selectedColor) {
      errors.push("Please select a color");
    }
    
    if (quantity < 1) {
      errors.push("Quantity must be at least 1");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setTimeout(() => setValidationErrors([]), 3000);
      return;
    }

    // Create the order item
    const orderItem = {
      _id: `${productData._id}-${Date.now()}`,
      productId: productData._id,
      name: productData.name,
      price: productData.specialPrice || productData.price,
      selectedSize,
      selectedColor,
      quantity,
      image: productData.images[0]?.original,
      isDirectOrder: true // Flag to indicate this is a direct order
    };

    // Navigate to place order with the product data
    navigate("/PlaceOrder", { 
      state: { directOrderItem: orderItem }
    });
  };

  const handleAddToFavorites = () => {
    if (!user) {
      toast.info("Please login to add items to favorites");
      navigate("/login");
      return;
    }
    addToFavorites({
      _id: productData._id,
      name: productData.name,
      price: productData.specialPrice || productData.price,
      image: productData.images[0]?.original,
    });
  };

  // Fonction pour soumettre la note utilisateur
  const handleSubmitRating = () => {
    setRatingSubmitted(true);

    // Mise à jour locale de la note et du nombre d'avis
    setProductData(prev => ({
      ...prev,
      rating: Math.round(((prev.rating * prev.reviews) + userRating) / (prev.reviews + 1)),
      reviews: prev.reviews + 1,
    }));

    // Ici tu pourrais faire un POST vers une API pour stocker la note côté serveur.
    // fetch(`/api/products/${productId}/rate`, { method: "POST", ... })
  };

  if (loading) return <div>Loading...</div>;
  if (error || !productData) return <div>{error || "No product found."}</div>;

  // ImageGallery configuration
  let galleryProps = {
    items: productData.images,
    showPlayButton: productData.images.length > 1,
    showFullscreenButton: productData.images.length > 1,
    showThumbnails: productData.images.length > 1,
    thumbnailPosition: "bottom",
    additionalClass: "rounded-lg border shadow",
    renderItem: (item) => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={item.original}
          alt={item.originalAlt}
          style={{ width: '100%', height: '400px', objectFit: 'contain' }}
        />
      </div>
    ),
    renderThumbInner: (item) => (
      <img
        src={item.thumbnail}
        alt={item.thumbnailAlt}
        style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #ddd' }}
      />
    ),
  };

  if (productData.images.length === 0) return <div>No images available for this product.</div>;
  if (productData.images.length === 1) {
    galleryProps.showPlayButton = false;
    galleryProps.showFullscreenButton = false;
    galleryProps.showThumbnails = false;
  }

  return (
    <div className="flex flex-col gap-8 pt-9 pb-8 px-4 md:px-8">
      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 z-50">
          {validationErrors.map((error, index) => (
            <p key={index} className="mb-1 last:mb-0">⚠️ {error}</p>
          ))}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Product Images Section */}
        <div className="flex flex-col w-full lg:w-[600px]">
          <ImageGallery {...galleryProps} />
          <div className="mt-4 text-gray-700">
            <div className="font-semibold text-base mb-1">More Details</div>
            <div style={{ whiteSpace: "pre-line" }}>
              {productData.longDescription?.replace(/^More Details\n/, "")}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col gap-6 items-start justify-start w-full lg:max-w-[400px]">
          <div>
            <p className="text-2xl font-semibold pb-1">{productData.name}</p>
            <div className="flex flex-row items-center pb-2">
              <div className="flex flex-row">
                {[...Array(productData.rating)].map((_, i) => (
                  <span key={i} className="text-orange-500">★</span>
                ))}
                {[...Array(5 - productData.rating)].map((_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
              </div>
              <p className="pl-2">({productData.reviews})</p>
            </div>
            <p className="text-gray-600 font-light">{productData.description}</p>
          </div>

          {/* User Rating Section */}
          <div className="flex items-center gap-2 mt-2">
            <span className="font-medium">Your rating:</span>
            {[1,2,3,4,5].map((star) => (
              <button
                key={star}
                type="button"
                disabled={ratingSubmitted}
                onClick={() => setUserRating(star)}
                className="focus:outline-none"
                style={{ background: "none", border: "none", cursor: ratingSubmitted ? "not-allowed" : "pointer" }}
                aria-label={`Give ${star} star${star > 1 ? "s" : ""}`}
              >
                <span
                  style={{
                    color: userRating >= star ? "#f59e42" : "#d1d5db",
                    fontSize: "1.5rem",
                    transition: "color 0.2s"
                  }}
                >
                  ★
                </span>
              </button>
            ))}
            {ratingSubmitted && <span className="text-green-600 ml-2">Thank you for your rating!</span>}
          </div>
          {userRating > 0 && !ratingSubmitted && (
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={handleSubmitRating}
              type="button"
            >
              Submit
            </button>
          )}

          <div className="flex items-center gap-3">
            {productData.specialPrice ? (
              <>
                <span className="text-xl text-gray-400 line-through">{productData.price}</span>
                <span className="text-3xl font-bold" style={{ color: "#cc0000" }}>
                  {productData.specialPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold">{productData.price}</span>
            )}
          </div>

          {/* Color Selection */}
          {productData.colors.length > 0 && (
            <div className="w-full">
              <p className="font-medium mb-1">Select Color</p>
              <div className="flex flex-wrap gap-2">
                {productData.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1.5 border rounded transition ${
                      selectedColor === color ? "border-blue-600 bg-blue-100" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedColor(color)}
                    type="button"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {productData.sizes.length > 0 && (
            <div className="w-full">
              <p className="font-medium mb-1">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((size, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1.5 border rounded transition ${
                      selectedSize === size ? "border-red-600 bg-red-100" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedSize(size)}
                    type="button"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="w-full">
            <p className="font-medium mb-1">Quantity</p>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 border rounded"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                type="button"
              >-</button>
              <span className="px-3">{quantity}</span>
              <button
                className="px-2 py-1 border rounded"
                onClick={() => handleQuantityChange(1)}
                type="button"
              >+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 w-full">
            <button
              className="flex-1 min-w-[120px] border px-4 py-3 font-light text-black hover:text-white transition-all ease-in-out text-sm hover:bg-black rounded"
              onClick={handleAddToCart}
              type="button"
            >
              {user ? "ADD TO CART" : "LOGIN TO ADD TO CART"}
            </button>
            <button
              className="flex-1 min-w-[120px] border px-4 py-3 font-light text-black hover:text-white transition-all ease-in-out text-sm hover:bg-green-600 rounded"
              onClick={handleOrderNow}
              type="button"
            >
              {user ? "ORDER NOW" : "LOGIN TO ORDER"}
            </button>
            <button
              className={`border px-4 py-3 font-light transition-all ease-in-out text-sm rounded flex items-center justify-center ${
                user && isProductFavorite(productData._id)
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
              onClick={handleAddToFavorites}
              type="button"
              style={{ width: '40px', height: '40px' }}
            >
              <span style={{ fontSize: '24px' }}>♥</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="w-full flex justify-center mt-12">
        <div className="max-w-xl w-full">
          <h3 className="text-lg font-semibold mb-4 text-center">Client Reviews</h3>
          {productData.clients && productData.clients.length > 0 ? (
            <div className="flex flex-col gap-4">
              {productData.clients.map((client, idx) => (
                <div key={idx} className="border-b pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{client.name}</span>
                    <span className="text-yellow-500">
                      {[...Array(client.rating)].map((_, i) => <span key={i}>★</span>)}
                      {[...Array(5 - client.rating)].map((_, i) => <span key={i} className="text-gray-300">★</span>)}
                    </span>
                  </div>
                  <p className="text-gray-700">{client.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
