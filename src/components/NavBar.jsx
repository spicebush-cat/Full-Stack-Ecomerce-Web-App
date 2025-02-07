import { NavLink, Link } from "react-router-dom";
import { assets } from "../../public/assets/frontend_assets/assets";
import { useState } from "react";
const NavBar = () => {
  const [visible, setvisible] = useState(false)
  return (
    <div className="flex justify-around   py-3 from-neutral-400 flex-row ">

      <NavLink to="/">
        <img className="h-10  p-0.5  " src={assets.logo} alt="logo" />
      </NavLink>


      <ul className=" hidden sm:flex flex-row text-gray-700  gap-5 items-center">
        <li>
          <NavLink className="flex flex-col gap-1 items-center" to="/">
            <p>Home</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink
            className="flex flex-col gap-1 items-center"
            to="/collection"
          >
            {" "}
            <p>Collection</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink className="flex flex-col gap-1 items-center" to="/about">
            {" "}
            <p>About</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <NavLink className="flex flex-col gap-1 items-center" to="/contact">
            {" "}
            <p>Contact</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </li>
        <li>
          <button className="rounded-3xl border  border-gray-300 font-light text-sm p-2.5 ">
            admin panel
          </button>
        </li>
      </ul>

      <div className="flex flex-row gap-5 items-center  p-1 ">
        <Link>
          <img
            className="h-5 font-bold"
            src={assets.search_icon}
            alt="searchIcon"
          />
        </Link>

        {" "}
        <div className="group relative cursor-pointer">
          <img
            to="/login"
            className="h-5 font-bold"
            src={assets.profile_icon}
            alt="profileIcon"
          />
          <div className="group-hover:block hidden absolute right-0  pt-3">
            <div className="flex flex-col gab-3 p-1 w-36  rounded-md font-semibold bg-slate-100 text-gray-500">
              <Link to='/login'>
                {" "}
                <p className="hover:text-black">My Profile</p>
              </Link>
              <Link to="/orders">
                {" "}
                <p className="hover:text-black">Orders</p>
              </Link>
              <Link>
                {" "}
                <p className="hover:text-black">LogOut</p>
              </Link>
            </div>
          </div>
        </div>

        <Link className="relative" to="/card">
          <img
            className="h-5 font-bold w-5"
            src={assets.cart_icon}
            alt="cartIcon"
          />
          <p className="absolute  rounded-full leading-4  text-[8px]  text-center -bottom-1 -right-1  text-white bg-slate-900 w-4 h-4">10</p>
        </Link>
        <img onClick={() => setvisible(!visible)} src={assets.menu_icon} alt="img" className=" h-5 font-bold w-5  sm:hidden" />
      </div>
      {/* // movile view  */}
      <div className={`absolute overflow-hidden top-0 right-0 bottom-0 bg-gray-100 transition-all duration-500 ease-in-out ${visible ? 'w-full' : 'w-0'} `}>
        <div className=" flex flex-col font-semibold gap-5 p-5 text-gray-500">

          <NavLink onClick={() => setvisible(!visible)} className="flex flex-row gap-1 font-bold items-center " to="/">
            <img src={assets.dropdown_icon} alt="drop_down_menu" className=" w-3 h-3 rotate-180" />
            <p className=" hover:text-black">back</p>

          </NavLink>

          <NavLink onClick={() => setvisible(!visible)} className="flex flex-col gap-1  hover:text-white hover:bg-black" to="/">
            <p >Home</p>
            <hr className="w-full border-none h-[1.5px] bg-gray-500 " />
          </NavLink>

          <NavLink
            onClick={() => setvisible(!visible)}
            className="flex flex-col gap-1  hover:text-white hover:bg-black"
            to="/collection"
          >
            {" "}
            <p>Collection</p>
            <hr className="w-full border-none h-[1px] bg-gray-500 " />
          </NavLink>

          <NavLink onClick={() => setvisible(!visible)} className="flex flex-col gap-1  hover:text-white hover:bg-black " to="/about">

            <p>About</p>
            <hr className="w-full border-none h-[1px] bg-gray-500 " />
          </NavLink>

          <NavLink onClick={() => setvisible(!visible)} className="flex flex-col gap-1  hover:text-white hover:bg-black" to="/contact">
            {" "}
            <p >Contact</p>
            <hr className="w-full border-none h-[1px] bg-gray-500 " />
          </NavLink>
          <NavLink onClick={() => setvisible(!visible)} className="flex flex-col gap-1  hover:text-white hover:bg-black" to="/contact">
            {" "}
            <p >Admin Panel</p>
            <hr className="w-full border-none h-[1px] bg-gray-500 " />
          </NavLink>

        </div>
      </div>
    </div>
  );
};
export default NavBar;
