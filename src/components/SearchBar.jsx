import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../../public/assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  useEffect(() => {
    if (showSearch) {
      setShowSearch(false);
    }
  }, [location.pathname]);
  return showSearch === true ? (
    <div className="inline-flex  items-center justify-center gap-2 w-full bg-slate-50   border-gray-100 border-y-2">
      <div className="inline-flex border bg-white border-gray-300 py-1 px-5  items-center justify-between rounded-3xl w-3/4 sm:w-1/2 m-5 ">
        <input
          placeholder="search"
          className="outline-none  bg-inherit flex-1 text-sm"
          onChange={(e) => setSearch(e.target.value)}
          
        />
        <img src={assets.search_icon} className="w-4 h-4 " alt="search" />
      </div>

      <img
        src={assets.cross_icon}
        className="w-4 h-4 "
        alt="closeImg"
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
};
export default SearchBar;
