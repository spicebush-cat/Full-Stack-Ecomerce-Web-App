import { createContext, children } from "react";
import { products } from "../../public/assets/frontend_assets/assets";
export const ShopContext = createContext(); //this the context will be use in my app and provide it the provider
export const Shopprovider = ({ children }) => {
  //this is what i xill provide to my app
  //some method and states
  const currency = "$";
  const delevry_fee = 10;
  const value = {
    products,
    currency,
    delevry_fee,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
