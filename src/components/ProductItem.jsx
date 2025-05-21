import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ name, image, price, id }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer " to={`/product/${id}`}>
      <div className="overflow-hidden ">
        <img
          className=" hover:scale-110 transition ease-in-out"
          src={image}
          alt={`img_${id}`}
        />
      </div>
      <p className=" pt-2 pb-1 text-sm font-extralight">{name} </p>
      <p  className="font-semibold
       text-sm ">
        {currency}
        {price}
      </p>
    </Link>
  );
};
export default ProductItem;
