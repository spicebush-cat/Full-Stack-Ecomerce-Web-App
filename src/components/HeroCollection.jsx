import { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { getProductsByRemark } from "../api/productApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slider.css";

const HeroCollection = () => {
  const [collectionProducts, setCollectionProducts] = useState([]);

  useEffect(() => {
    getProductsByRemark("COLLECTION")
      .then(data => setCollectionProducts(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="flex flex-col gap-10">
      <div className="container mx-auto">
        <Title text1="OUR" text2="COLLECTION" />
        <div className="px-4">
          <Slider {...settings}>
            {collectionProducts.map((p, idx) => (
              <div key={idx} className="px-3">
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
    </section>
  );
};

export default HeroCollection;
