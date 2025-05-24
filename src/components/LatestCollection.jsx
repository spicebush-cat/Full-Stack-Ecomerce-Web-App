import { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { getProductsByRemark } from "../api/productApi";

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByRemark("NEW")
      .then(data => {
        setLatestProducts(data);
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
    <div className="flex flex-col gap-10">
      <Title text1="LATEST" text2="COLLECTIONS" />
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center">
        {latestProducts.slice(0, visibleProducts).map((p, index) => (
          <ProductItem
            key={index}
            id={p.id}
            name={p.title || p.name}
            image={p.image}
            price={p.price}
            specialPrice={p.special_price || p.specialPrice || null}
          />
        ))}
      </div>
      {visibleProducts < latestProducts.length && (
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

export default LatestCollection;
