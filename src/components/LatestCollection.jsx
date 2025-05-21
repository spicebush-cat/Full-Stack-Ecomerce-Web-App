<<<<<<< HEAD
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  // console.log(products);
  const [latestProduct, setLatestProduct] = useState([]);
  useEffect(() => {
    setLatestProduct(products.slice(2, 12));
  }, []);
  return (
    <div className="flex flex-col gap-10 ">
      <Title text1={"LATEST"} text2={"COLLECTIONS"} />
      <div className="grid lg:grid-cols-5 md:grid-col-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center   ">
        
          {latestProduct.map((p,index) => (
            <ProductItem
              name={p.name}
              id={p.id}
              image={p.image}
              price={p.price}
              key={index}
            />
          ))}
        
      </div>
      {/*
       */}
    </div>
  );
};
=======
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
          />
        ))}
      </div>
    </div>
  );
};

>>>>>>> 83b28a122e6991040aa412dd99885b36616d6165
export default LatestCollection;
