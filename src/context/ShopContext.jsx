import { createContext, useState, useEffect } from "react";
import { products } from "../../public/assets/frontend_assets/assets";

export const ShopContext = createContext(); //this the context will be use in my app and provide it the provider

export const Shopprovider = ({ children }) => {
  //this is what i xill provide to my app
  //some method and states
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [card, setCard] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [cardlength, setCardLength] = useState(0);
  
  const currency = "DA";
  const delevry_fee = 10;

  // Update cardlength whenever card changes
  useEffect(() => {
    setCardLength(card.length);
  }, [card]);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product) => {
    setFavorites(prev => {
      const isProductInFavorites = prev.some(item => item._id === product._id);
      if (isProductInFavorites) {
        return prev.filter(item => item._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isProductFavorite = (productId) => {
    return favorites.some(item => item._id === productId);
  };

  const value = {
    products,
    currency,
    delevry_fee,
    search,
    setSearch,
    setShowSearch,
    showSearch,
    card,
    setCard,
    setCardLength,
    cardlength,
    favorites,
    addToFavorites,
    isProductFavorite
  };
  
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
