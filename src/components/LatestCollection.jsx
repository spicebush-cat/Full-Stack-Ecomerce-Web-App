import { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { getProductsByRemark } from "../api/productApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slider.css";

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    getProductsByRemark("NEW")
      .then(data => setLatestProducts(data))
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
    <div className="flex flex-col gap-10">
      <Title text1="LATEST" text2="COLLECTIONS" />
      <div className="px-4">
        <Slider {...settings}>
          {latestProducts.map((p, index) => (
            <div key={index} className="px-3">
              <ProductItem
                id={p.id}
                name={p.title || p.name}
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

export default LatestCollection;
