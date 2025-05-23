import React, { useState } from "react";

const productData = {
  name: "Product 1",
  price: "DZ",
  description: "ksjdklfjkljskldj",
  images: [
    { url: "first-img-url", alt: "first-img" },
    { url: "second-img-url", alt: "second-img" },
    { url: "third-img-url", alt: "third-img" },
    { url: "fourth-img-url", alt: "fourth-img" },
    { url: "fifth-img-url", alt: "fifth-img" },
  ],
  sizes: ["S", "M", "L", "XL"],
  reviews: 122,
  rating: 4,
};

function ProductDetail() {
  // The first image is the principal one by default
  const [selectedImage, setSelectedImage] = useState(productData.images[0].url);
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="flex flex-col gap-8 pt-9 pb-8">
      {/* Images Section */}
      <div className="grid sm:grid-cols-[7fr_9fr] gap-8">
        {/* Images (left) */}
        <div className="flex flex-col items-center">
          {/* Sub Images Row */}
          <div className="flex gap-2 mb-4">
            {productData.images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={img.alt}
                className={`w-16 h-16 object-cover border cursor-pointer rounded
                  ${selectedImage === img.url ? "border-black" : "border-gray-300"}
                `}
                onClick={() => setSelectedImage(img.url)}
              />
            ))}
          </div>
          {/* Principal Image */}
          <img
            src={selectedImage}
            alt="Selected product"
            className="w-80 h-80 object-cover rounded-lg border"
          />
        </div>
        {/* Product Info (right) */}
        <div className="flex flex-col gap-6 items-start justify-center">
          <div>
            <p className="text-2xl pb-3">{productData.name}</p>
            <div className="flex flex-row items-center">
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
          </div>
          <p className="text-3xl">{productData.price}</p>
          <p className="text-gray-500 font-light">{productData.description}</p>
          <div>
            <p>Select Size</p>
            <div>
              {productData.sizes.map((size, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1.5 border-[0.5px] m-1 bg-slate-50 ${
                    selectedSize === size ? "border-red-600" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button
            className="border-[1px] border-black px-4 py-3 font-light text-black hover:text-white transition-all ease-in-out text-sm hover:bg-black"
            disabled={!selectedSize}
            onClick={() => {
              if (!selectedSize) {
                alert("Please choose a size");
              } else {
                alert(`Added: ${productData.name} - Size: ${selectedSize}`);
              }
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      {/* Delivery Info */}
      <div className="flex flex-col w-auto font-light text-gray-400 items-end">
        <p>100% Original product.</p>
        <p>Cash on delivery is available on this product.</p>
        <p>Easy return and exchange policy within 7 days.</p>
      </div>
    </div>
  );
}

export default ProductDetail;
