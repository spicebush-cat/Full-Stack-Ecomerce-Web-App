import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";
import React from 'react';
import { getProductsByRemark } from "../api/productApi";

const BestSeller = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByRemark("FEATURED")
      .then(data => {
        setFeaturedProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const showMore = () => {
    setVisibleProducts(prev => prev + 5);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-10">
        <Title text1={"FEATURED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center pt-6">
        {featuredProducts.slice(0, visibleProducts).map((p, index) => (
          <ProductItem
            key={index}
            name={p.title}
            id={p.id}
            image={p.image}
            price={p.price}
            specialPrice={p.special_price || p.specialPrice || null}
          />
        ))}
      </div>
      {visibleProducts < featuredProducts.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={showMore}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default BestSeller;
