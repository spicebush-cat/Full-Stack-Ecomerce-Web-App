import { NavLink, Link } from "react-router-dom";
import { assets } from "../../public/assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { setShowSearch, cardlength, favorites } = useContext(ShopContext);
  const { user, logout } = useAuth();
  const [visible, setvisible] = useState(false);
  
  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-around py-3 from-neutral-400 flex-row">
      <NavLink to="/">
        <img
          src="/assets/frontend_assets/handy-logo1.png"
          alt="Company Logo"
          className="h-24"
        />
      </NavLink>
      <ul className="hidden sm:flex flex-row text-gray-700 gap-5 items-center">
        <li>
          <NavLink className="flex flex-col gap-1 items-center" to="/">
            <p>Home</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink className="flex flex-col gap-1 items-center" to="/collection">
            <p>Collection</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink className="flex flex-col gap-1 items-center" to="/about">
            <p>About</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink className="flex flex-col gap-1 items-center" to="/contact">
            <p>Contact</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink className="flex flex-col gap-1 items-center" to="/form">
            <p>Form</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <a
            href="http://localhost:8000/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-3xl border border-gray-300 font-light text-sm p-2.5 inline-block text-center"
          >
            admin panel
          </a>
        </li>
      </ul>

      <div className="flex flex-row gap-5 items-center p-1">
        <Link to="/collection" onClick={handleSearchClick}>
          <img
            className="h-5 font-bold"
            src={assets.search_icon}
            alt="searchIcon"
          />
        </Link>
        <div className="group relative cursor-pointer">
          <img
            className="h-5 font-bold"
            src={assets.profile_icon}
            alt="profileIcon"
          />
          <div className="group-hover:block hidden absolute right-0 pt-3">
            <div className="flex flex-col gap-3 p-1 w-36 rounded-md font-semibold bg-slate-100 text-gray-500">
              {user ? (
                <>
                  <Link to="/profile">
                    <p className="hover:text-black">My Profile</p>
                  </Link>
                  <Link to="/orders">
                    <p className="hover:text-black">Orders</p>
                  </Link>
                  <button onClick={handleLogout} className="text-left hover:text-black">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login">
                  <p className="hover:text-black">Login</p>
                </Link>
              )}
            </div>
          </div>
        </div>
        <Link className="relative" to="/favorits">
          <img
            className="h-5 font-bold w-5"
            src={assets.heart_icon}
            alt="heartIcon"
          />
          {favorites.length > 0 && (
            <p className="absolute rounded-full leading-4 text-[8px] text-center -bottom-1 -right-1 text-white bg-slate-900 w-4 h-4">
              {favorites.length}
            </p>
          )}
        </Link>
        <Link className="relative" to="/card">
          <img
            className="h-5 font-bold w-5"
            src={assets.cart_icon}
            alt="cartIcon"
          />
          <p className="absolute rounded-full leading-4 text-[8px] text-center -bottom-1 -right-1 text-white bg-slate-900 w-4 h-4">
            {cardlength}
          </p>
        </Link>
        <img
          onClick={() => setvisible(!visible)}
          src={assets.menu_icon}
          alt="img"
          className="h-5 font-bold w-5 sm:hidden"
        />
      </div>

      {/* Mobile view */}
      <div
        className={`absolute overflow-hidden top-0 right-0 bottom-0 bg-gray-100 transition-all duration-500 ease-in-out ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col font-semibold gap-5 p-5 text-gray-500">
          <NavLink
            onClick={() => setvisible(!visible)}
            className="flex flex-row gap-1 font-bold items-center"
            to="/"
          >
            <img
              src={assets.dropdown_icon}
              alt="drop_down_menu"
              className="w-3 h-3 rotate-180"
            />
            <p className="hover:text-black">back</p>
          </NavLink>

          <NavLink
            onClick={() => setvisible(!visible)}
            className="flex flex-col gap-1 hover:text-white hover:bg-black"
            to="/"
          >
            <p>Home</p>
            <hr className="w-full border-none h-[1.5px] bg-gray-500" />
          </NavLink>

          <NavLink
            onClick={() => setvisible(!visible)}
            className="flex flex-col gap-1 hover:text-white hover:bg-black"
            to="/collection"
          >
            <p>Collection</p>
            <hr className="w-full border-none h-[1px] bg-gray-500" />
          </NavLink>

          <NavLink
            onClick={() => setvisible(!visible)}
            className="flex flex-col gap-1 hover:text-white hover:bg-black"
            to="/about"
          >
            <p>About</p>
            <hr className="w-full border-none h-[1px] bg-gray-500" />
          </NavLink>

          <NavLink
            onClick={() => setvisible(!visible)}
            className="flex flex-col gap-1 hover:text-white hover:bg-black"
            to="/contact"
          >
            <p>Contact</p>
            <hr className="w-full border-none h-[1px] bg-gray-500" />
          </NavLink>

          <NavLink
            onClick={() => setvisible(!visible)}
            className="flex flex-col gap-1 hover:text-white hover:bg-black"
            to="/form"
          >
            <p>Form</p>
            <hr className="w-full border-none h-[1px] bg-gray-500" />
          </NavLink>

          <NavLink
            onClick={() => setvisible(!visible)}
            className="flex flex-col gap-1 hover:text-white hover:bg-black"
            to="/favorits"
          >
            <p>Favorites</p>
            <hr className="w-full border-none h-[1px] bg-gray-500" />
          </NavLink>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setvisible(!visible);
              }}
              className="flex flex-col gap-1 hover:text-white hover:bg-black text-left"
            >
              <p>Logout</p>
              <hr className="w-full border-none h-[1px] bg-gray-500" />
            </button>
          ) : (
            <NavLink
              onClick={() => setvisible(!visible)}
              className="flex flex-col gap-1 hover:text-white hover:bg-black"
              to="/login"
            >
              <p>Login</p>
              <hr className="w-full border-none h-[1px] bg-gray-500" />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;