import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  console.log(products);
  const [BestSellerProdect, setBestSellerProdect] = useState([]);
  useEffect(() => {
    setBestSellerProdect(products.slice(2, 8));
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-10 ">
        <Title text1={"BEST"} text2={"SELLERS"} />
      </div>
      <div className="grid lg:grid-cols-5 md:grid-col-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-items-center pt-6   ">
        {BestSellerProdect.map((p, index) =>
          p.bestseller ? (
            <ProductItem
              name={p.name}
              id={p.id}
              image={p.image}
              price={p.price}
              key={index}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default BestSeller;
