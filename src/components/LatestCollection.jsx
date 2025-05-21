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
export default LatestCollection;
