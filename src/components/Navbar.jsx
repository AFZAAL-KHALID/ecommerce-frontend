import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci"; // icon
import { CiUser } from "react-icons/ci"; // icon
import { CiShoppingCart } from "react-icons/ci"; //icon
import { IoMenuOutline } from "react-icons/io5"; //icon
import { IoIosArrowBack } from "react-icons/io"; //icon
import { LuLogOut } from "react-icons/lu"; //icon
import { useDispatch, useSelector } from "react-redux";
import { setToken, showHideSearchBar } from ".././features/ProductSlice";
import { toast } from "react-toastify";


const Navbar = () => {
  const location = useLocation();
  const [visible, setvisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalItemsCart = useSelector((state) => state.counter.totalItemsCart);
  console.log(totalItemsCart);
  
  const token = useSelector((state) => state.counter.token);
  const [profileOptions, setprofileOptions] = useState(false)

  const removeToken = () => {
    localStorage.removeItem("token");
    dispatch(setToken(""));
    navigate("/login");
    toast.success("Logged out successfully!", {
      icon: <LuLogOut />,
      autoClose: 1500,
    });
  };


  

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium">
        <Link to={"/"}>
          {" "}
          <div className="logoDiv w-18 sm:w-36 h-18 sm:h-24 inline-block">
            <img
              src="/Assests/Images/LOGO.png"
              alt="logoImage"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "text-red-500 active" : "text-gray-700 no-active "
              } flex flex-col items-center gap-1`
            }
          >
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `${
                isActive ? "text-red-500 active" : "text-gray-700 no-active "
              } flex flex-col items-center gap-1`
            }
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${
                isActive ? "text-red-500 active" : "text-gray-700 no-active "
              } flex flex-col items-center gap-1`
            }
          >
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `${
                isActive ? "text-red-500 active" : "text-gray-700 no-active "
              } flex flex-col items-center gap-1`
            }
          >
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className={` icons   items-center gap-6 flex `}>
          <CiSearch
            onClick={() => dispatch(showHideSearchBar())}
            className={`${
              location.pathname === "/collection" ? " " : "hidden"
            } icon text-gray-500 hover:text-gray-800  w-6 h-6 cursor-pointer`}
          />

          {/* ---------profile */}
          <div 
          onClick={()=> setprofileOptions(prev => !prev)}
          className="profile-div group relative">
            <Link to={"/login"}>
              <CiUser className="icon text-gray-500  hover:text-gray-800  w-6 h-6 cursor-pointer" />
            </Link>

            <div // ----profile Options
              className={`${
                location.pathname === "/login" ? "hidden" : "block"
              } dropDown ${profileOptions === true ? '': 'hidden'}  absolute right-full top-[-50%]  pt-4`}
            >
              <div className="flex px-2 flex-col gap-2 w-35 py-3 bg-slate-100 text-gray-500 rounded">
                <p className=" cursor-pointer hover:text-black">My Profile</p>
                <p
                  className=" cursor-pointer hover:text-black"
                  onClick={() => navigate("/orders")}
                >
                  Order
                </p>
                <p
                  className=" cursor-pointer hover:text-black"
                  onClick={() => removeToken()}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>

          <Link to="/cart" className="relative ">
            <CiShoppingCart className="icon text-gray-500 hover:text-gray-800 w-6 h-6 cursor-pointer" />
            <p
              className={`${
                token ? "" : "hidden"
              } absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] `}
            >
              {Number(totalItemsCart)}
            </p>
          </Link>

          <div
            onClick={() => setvisible(true)}
            className="icon block sm:hidden text-gray-500 hover:text-gray-800  w-6 h-6 cursor-pointer"
          >
            <IoMenuOutline />
          </div>

          {/* sidebar menu for small screen */}

          <div
            className={`fixed inset-0 z-50 overflow-hidden bg-white transition-all duration-300 ease-in-out ${
              visible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex  flex-col text-gray-600">
              <div
                onClick={() => setvisible(false)}
                className="flex items-center gap-4 p-3"
              >
                <IoIosArrowBack className="h-4 cursor-pointer" />
                <p className="text-gray-700 font-bold">Back</p>
              </div>
              <NavLink
                onClick={() => setvisible(false)}
                className=" py-2 pl-6 border"
                to="/"
              >
                HOME
              </NavLink>
              <NavLink
                onClick={() => setvisible(false)}
                className=" py-2 pl-6 border"
                to="/collection"
              >
                COLLECTION
              </NavLink>
              <NavLink
                onClick={() => setvisible(false)}
                className=" py-2 pl-6 border"
                to="/about"
              >
                ABOUT
              </NavLink>
              <NavLink
                onClick={() => setvisible(false)}
                className=" py-2 pl-6 border"
                to="/contact-us"
              >
                CONTACT
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
