import { createContext, children, useState } from "react";
import { products } from "../../public/assets/frontend_assets/assets";
export const ShopContext = createContext(); //this the context will be use in my app and provide it the provider
export const Shopprovider = ({ children }) => {
  //this is what i xill provide to my app
  //some method and states
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [card, setCard] = useState([]);
  const currency = "$";
  const delevry_fee = 10;
   
  const [cardlength,setCardLength]=useState(0)//this is teh probrlm 
  // cardlength=card.length
  // const quentity = 0;

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
    cardlength
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
