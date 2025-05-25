import { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { getProductsByRemark } from "../api/productApi";

const HeroCollection = () => {
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByRemark("COLLECTION")
      .then(data => {
        setCollectionProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const showMore = () => {
    setVisibleProducts(prev => prev + 4);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-10">
      <div className="container mx-auto">
        <Title text1="OUR" text2="COLLECTION" /> 
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center pt-6">
          {collectionProducts.slice(0, visibleProducts).map((p, idx) => (
            <ProductItem
              key={idx}
              id={p.id}
              name={p.title || p.name}
              image={p.image}
              price={p.price}
              specialPrice={p.special_price || p.specialPrice || null}
            />
          ))}
        </div>
        {visibleProducts < collectionProducts.length && (
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
    </section>
  );
};

export default HeroCollection;
