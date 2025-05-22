import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import { assets } from "../../public/assets/frontend_assets/assets";

const Favorits = () => {
  const { favorites, addToFavorites } = useContext(ShopContext);

  const handleRemoveFromFavorites = (product) => {
    addToFavorites(product); // Since addToFavorites already handles toggling
  };

  return (
    <div className="flex flex-col pt-9 pb-[150px]">
      <div className="flex items-center gap-2 text-[#414141]">
        <p className="font-semibold text-2xl">
          <span className="font-extralight text-gray-500">YOUR </span>
          FAVORITES
        </p>
        <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No favorite items yet.</p>
          <p className="mt-2">Start adding items to your favorites by clicking the heart icon on products!</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-8">
          {favorites.map((product) => (
            <div key={product._id} className="relative group">
              <ProductItem
                id={product._id}
                name={product.name}
                image={product.image}
                price={product.price}
              />
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorits;
