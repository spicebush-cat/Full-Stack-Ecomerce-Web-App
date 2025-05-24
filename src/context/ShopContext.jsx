import { createContext, useState, useEffect } from "react";
import { products } from "../../public/assets/frontend_assets/assets";

export const ShopContext = createContext();

export const Shopprovider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [card, setCard] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [subTotal, setSubTotal] = useState(0);
  
  const currency = "DA";
  const delevry_fee = 10;

  // Update card length and save to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(card));
    setCardLength(card.length);
  }, [card]);

  // Calculate subtotal whenever cart changes
  useEffect(() => {
    const newSubTotal = card.reduce((total, item) => total + (item.price || item.productData?.price) * (item.quantity || item.quentity || 1), 0);
    setSubTotal(newSubTotal);
  }, [card]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product, quantity = 1, selectedSize = "", selectedColor = "") => {
    setCard(prevCart => {
      const existingItem = prevCart.find(item => 
        item._id === product._id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );

      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
            ? { 
                ...item, 
                quantity: (item.quantity || item.quentity || 0) + quantity 
              }
            : item
        );
      }
      
      return [...prevCart, { 
        ...product, 
        quantity,
        selectedSize, 
        selectedColor,
        price: product.price || product.productData?.price
      }];
    });
  };

  const removeFromCart = (productId, selectedSize = "", selectedColor = "") => {
    setCard(prevCart => 
      prevCart.filter(item => 
        !(item._id === productId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor)
      )
    );
  };

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

  const getTotalAmount = () => {
    return subTotal + delevry_fee;
  };

  const setCardLength = (length) => {
    // This is now handled automatically in the useEffect
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
    addToCart,
    removeFromCart,
    cardlength: card.length, // Now calculated directly
    favorites,
    addToFavorites,
    isProductFavorite,
    subTotal,
    getTotalAmount
  };
  
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};