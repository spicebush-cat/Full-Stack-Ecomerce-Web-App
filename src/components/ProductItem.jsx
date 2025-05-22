import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { assets } from "../../public/assets/frontend_assets/assets";

const ProductItem = ({ name, image, price, id }) => {
  const { currency, addToFavorites, isProductFavorite } = useContext(ShopContext);
  const product = { name, image, price, _id: id };
  const isFavorite = isProductFavorite(id);

  return (
    <div className="relative">
      <button 
        onClick={(e) => {
          e.preventDefault();
          addToFavorites(product);
        }}
        className={`absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow-md transition-all duration-300 ${
          isFavorite ? 'hover:bg-red-100' : 'hover:bg-gray-100'
        }`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <img 
          src={isFavorite ? assets.bin_icon : assets.heart_icon} 
          alt={isFavorite ? "remove from favorites" : "add to favorites"} 
          className="w-5 h-5"
        />
      </button>
      <Link className="text-gray-700 cursor-pointer block" to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 transition ease-in-out"
            src={image}
            alt={`img_${id}`}
          />
        </div>
        <p className="pt-2 pb-1 text-sm font-extralight">{name}</p>
        <p className="font-semibold text-sm">
          {currency}
          {price}
        </p>
      </Link>
    </div>
  );
};
export default ProductItem;
