import { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { getProductsByRemark } from "../api/productApi";

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    getProductsByRemark("NEW")
      .then(data => setLatestProducts(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <Title text1="LATEST" text2="COLLECTIONS" />
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center">
        {latestProducts.map((p, index) => (
          <ProductItem
            key={index}
            id={p.id}
            name={p.title || p.name}
            image={p.image}
            price={p.price}
            specialPrice={p.special_price || p.specialPrice || null} // Ajout du specialPrice
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
