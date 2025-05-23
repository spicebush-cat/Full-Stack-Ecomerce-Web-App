import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ShopContext } from "../context/ShopContext"; // adjust if needed

function Product() {
  const { productId } = useParams();
  const { card, setCard } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);

    // Fetch both product list and details
    Promise.all([
      fetch("http://127.0.0.1:8000/api/products").then(res => res.json()),
      fetch(`http://127.0.0.1:8000/api/productdetails/${productId}`).then(res => res.json())
    ])
      .then(([products, detailsData]) => {
        const productListItem = products.find(p => String(p.id) === String(productId));
        const details = detailsData.productDetails?.[0] || {};
        const list = detailsData.productList?.[0] || {};

        // Main image from product list
        const mainImage = productListItem?.image &&
                         productListItem.image !== "http://127.0.0.1:8000/upload/product/default_image.jpg"
          ? { url: productListItem.image, alt: productListItem.title || "Main Image" }
          : null;

        // Other images from product details
        const otherImages = [
          { url: details.image_one, alt: "Image 1" },
          { url: details.image_two, alt: "Image 2" },
          { url: details.image_three, alt: "Image 3" },
          { url: details.image_four, alt: "Image 4" },
        ].filter(img => img.url && img.url !== "http://127.0.0.1:8000/upload/product/default_image.jpg" && img.url !== mainImage?.url);

        // Combine: main image first, then the rest
        const imagesRaw = mainImage
          ? [mainImage, ...otherImages]
          : otherImages;

        // Transform for ImageGallery format
        const images = imagesRaw.map((img, index) => ({
          original: img.url,
          thumbnail: img.url,
          originalAlt: img.alt,
          thumbnailAlt: img.alt,
        }));

        // Count valid images for layout logic
        const validImageCount = imagesRaw.length;

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
          images: images, // Only valid images (no placeholders)
          validImageCount: validImageCount, // Track number of valid images for dynamic layout
          reviews: list.reviews || 0,
          rating: list.star ? parseInt(list.star) : 0,
          clients: [], // Add if your API returns client reviews
        });
        setSelectedColor(details.color ? details.color.split(",")[0] : "");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error || !productData) return <div>{error || "No product found."}</div>;

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (productData.sizes.length && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    if (productData.colors.length && !selectedColor) {
      alert("Please select a color before adding to cart.");
      return;
    }
    if (quantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    const cartItem = {
      _id: productData._id,
      name: productData.name,
      price: productData.specialPrice || productData.price,
      selectedSize,
      selectedColor,
      quantity,
      image: productData.images[0]?.original,
    };

    const exists = card.find(
      item =>
        item._id === cartItem._id &&
        item.selectedSize === cartItem.selectedSize &&
        item.selectedColor === cartItem.selectedColor
    );

    if (exists) {
      setCard(card.map(item =>
        item._id === cartItem._id &&
        item.selectedSize === cartItem.selectedSize &&
        item.selectedColor === cartItem.selectedColor
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCard([...card, cartItem]);
    }

    alert(
      `Added ${quantity} x ${productData.name} (Size: ${selectedSize}, Color: ${selectedColor}) to cart.`
    );
  };

  // Dynamic ImageGallery configuration based on case
  let galleryProps = {};
  if (productData.validImageCount === 0) {
    // Case: No valid images
    return <div>No images available for this product.</div>;
  } else if (productData.validImageCount === 1) {
    // Case 2: Only principal image
    galleryProps = {
      items: productData.images,
      showPlayButton: false,
      showFullscreenButton: false,
      showThumbnails: false, // Hide thumbnails for single image
      additionalClass: "rounded-lg border shadow",
    };
  } else {
    // Cases 3, 4, 5 (2, 3, or 4 images) and Case 1 (5 images)
    galleryProps = {
      items: productData.images,
      showPlayButton: false,
      showFullscreenButton: true,
      showThumbnails: true,
      thumbnailPosition: "bottom",
      additionalClass: "rounded-lg border shadow",
      renderItem: (item) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={item.original}
            alt={item.originalAlt}
            style={{ width: '100%', height: '400px', objectFit: 'contain' }} // Fixed height for consistency
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
  }

  return (
    <div className="flex flex-col gap-8 pt-9 pb-8">
      {/* Top: Gallery + Info */}
      <div className="flex flex-row gap-8 items-start">
        {/* Gallery & More Details */}
        <div className="flex flex-col" style={{ minWidth: 400, maxWidth: 500, flex: 1 }}>
          <ImageGallery
            {...galleryProps}
          />
          <div className="mt-4 text-gray-700">
            <div className="font-semibold text-base mb-1">More Details</div>
            <div style={{ whiteSpace: "pre-line" }}>
              {productData.longDescription?.replace(/^More Details\n/, "")}
            </div>
          </div>
        </div>
        {/* Product Info */}
        <div className="flex flex-col gap-6 items-start justify-start" style={{ minWidth: 300, maxWidth: 400, flex: 1 }}>
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
          {/* Price Section */}
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
          {/* Color Selector */}
          {productData.colors.length > 0 && (
            <div>
              <p className="font-medium mb-1">Select Color</p>
              <div className="flex gap-2">
                {productData.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1.5 border m-1 rounded transition ${
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
          {/* Size Selector */}
          {productData.sizes.length > 0 && (
            <div>
              <p className="font-medium mb-1">Select Size</p>
              <div>
                {productData.sizes.map((size, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1.5 border m-1 rounded transition ${
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
          {/* Quantity Selector */}
          <div>
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
          <div className="flex gap-3">
            <button
              className="border px-4 py-3 font-light text-black hover:text-white transition-all ease-in-out text-sm hover:bg-black rounded"
              onClick={handleAddToCart}
              type="button"
              disabled={productData.sizes.length > 0 && !selectedSize}
            >
              ADD TO CART
            </button>
            <button
              className="border px-4 py-3 font-light text-black hover:text-white transition-all ease-in-out text-sm hover:bg-green-600 rounded"
              onClick={() => alert("Order placed!")}
              type="button"
            >
              ORDER NOW
            </button>
            <button
              className="border px-4 py-3 font-light text-black hover:text-white transition-all ease-in-out text-sm hover:bg-pink-500 rounded"
              onClick={() => alert("Added to favourites!")}
              type="button"
            >
              ♥
            </button>
          </div>
        </div>
      </div>

      {/* Centered Reviews under info */}
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
                      {[...Array(client.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                      {[...Array(5 - client.rating)].map((_, i) => (
                        <span key={i} className="text-gray-300">★</span>
                      ))}
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