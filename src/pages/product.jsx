import React, { useState } from "react";

const productData = {
  name: "Product 1",
  price: "DZ",
  description: "ksjdklfjkljskldj",
  images: [
    { url: "first-img-url", alt: "first-img" },    // principal
    { url: "second-img-url", alt: "second-img" },  // left top
    { url: "third-img-url", alt: "third-img" },    // left bottom
    { url: "fourth-img-url", alt: "fourth-img" },  // bottom left
    { url: "fifth-img-url", alt: "fifth-img" },    // bottom right
  ],
  sizes: ["S", "M", "L", "XL"],
  reviews: 122,
  rating: 4,
};

function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(productData.images[0].url);
  const [selectedSize, setSelectedSize] = useState("");

  const PRINCIPAL_SIZE = 320; // px

  return (
    <div className="flex flex-col gap-8 pt-9 pb-8">
      {/* Images and Info Section */}
      <div className="flex flex-row gap-8">
        {/* Left Column: Two stacked images */}
        <div className="flex flex-col gap-2 justify-center">
          <img
            src={productData.images[1].url}
            alt={productData.images[1].alt}
            style={{ width: PRINCIPAL_SIZE / 2, height: PRINCIPAL_SIZE / 2 }}
            className={`object-cover border rounded cursor-pointer ${
              selectedImage === productData.images[1].url ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(productData.images[1].url)}
          />
          <img
            src={productData.images[2].url}
            alt={productData.images[2].alt}
            style={{ width: PRINCIPAL_SIZE / 2, height: PRINCIPAL_SIZE / 2 }}
            className={`object-cover border rounded cursor-pointer ${
              selectedImage === productData.images[2].url ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(productData.images[2].url)}
          />
        </div>

        {/* Center Column: Principal image with two images below */}
        <div className="flex flex-col items-center">
          <img
            src={selectedImage}
            alt="Selected product"
            style={{ width: PRINCIPAL_SIZE, height: PRINCIPAL_SIZE }}
            className="object-cover rounded-lg border"
          />
          <div className="flex flex-row gap-2 mt-2">
            <img
              src={productData.images[3].url}
              alt={productData.images[3].alt}
              style={{ width: PRINCIPAL_SIZE / 2, height: PRINCIPAL_SIZE / 2 }}
              className={`object-cover border rounded cursor-pointer ${
                selectedImage === productData.images[3].url ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(productData.images[3].url)}
            />
            <img
              src={productData.images[4].url}
              alt={productData.images[4].alt}
              style={{ width: PRINCIPAL_SIZE / 2, height: PRINCIPAL_SIZE / 2 }}
              className={`object-cover border rounded cursor-pointer ${
                selectedImage === productData.images[4].url ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(productData.images[4].url)}
            />
          </div>
        </div>

        {/* Right Column: Product Info */}
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
