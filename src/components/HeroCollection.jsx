// src/components/HeroCollection.js

import { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { getProductsByRemark } from "../api/productApi";

const HeroCollection = () => {
  const [collectionProducts, setCollectionProducts] = useState([]);

  useEffect(() => {
    getProductsByRemark("COLLECTION")
      .then(data => setCollectionProducts(data))
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
    <section className="flex flex-col gap-10">
      <div className="container mx-auto">
        <Title text1="OUR" text2="COLLECTION" />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 pt-6">
          {collectionProducts.map((p, idx) => (
            <ProductItem
              key={idx}
              id={p.id}
              name={p.title || p.name}
              image={p.image}
              price={p.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCollection;
