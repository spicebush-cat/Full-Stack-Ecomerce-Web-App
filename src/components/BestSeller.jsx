import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";
//nini
import React, { Component, Fragment } from 'react'
import { getProductsByRemark } from "../api/productApi";
import { Link } from 'react-router-dom'
import AppURL from '../api/AppURL';

//enini
const BestSeller = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    getProductsByRemark("FEATURED")
      .then(data => setFeaturedProducts(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-10">
        <Title text1={"FEATURED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center pt-6">
        {featuredProducts.map((p, index) => (
          <ProductItem
            name={p.title}
            id={p.id}
            image={p.image}
            price={p.price}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
