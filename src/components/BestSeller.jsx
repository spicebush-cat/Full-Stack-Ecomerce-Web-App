import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";
import React from 'react';
import { getProductsByRemark } from "../api/productApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slider.css";

const BestSeller = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    getProductsByRemark("FEATURED")
      .then(data => setFeaturedProducts(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div>
      <div className="flex flex-col gap-10">
        <Title text1={"FEATURED"} text2={"PRODUCTS"} />
      </div>
      <div className="px-4">
        <Slider {...settings}>
          {featuredProducts.map((p, index) => (
            <div key={index} className="px-3">
              <ProductItem
                name={p.title}
                id={p.id}
                image={p.image}
                price={p.price}
                specialPrice={p.special_price || p.specialPrice || null}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSeller;
