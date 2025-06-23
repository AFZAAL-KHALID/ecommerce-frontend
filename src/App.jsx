import React, { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/collections";
import About from "./pages/About";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addDataFromBackend } from "./features/ProductSlice";
import axios from "axios";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const totalItemsCart = useSelector((state) => state.counter.totalItemsCart);
  const dispatch = useDispatch();

  const ListdataFromBackend = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        dispatch(addDataFromBackend(response.data.products));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    ListdataFromBackend();
  }, []);

  const prevCountRef = useRef(totalItemsCart);

  
  useEffect(() => {
    const prevCount = prevCountRef.current;
    if (totalItemsCart > prevCount) {
    } else if (totalItemsCart < prevCount) {
    }
    prevCountRef.current = totalItemsCart;
  }, [totalItemsCart]);

  return (
    <>
    <div className=" px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer className={"mt-24"} />

      <Navbar />
      <SearchBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Order />} />
      </Routes>

      <Footer />
    </div>
    </>
  );
};

export default App;
