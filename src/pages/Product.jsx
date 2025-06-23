import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6"; //icon
import { addToCart } from "../features/ProductSlice";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Product = () => {
  const { id } = useParams();
  const allProducts = useSelector((state) => state.counter.allProducts);

  const Cart = useSelector((state) => state.counter.Cart);
  const [productData, setproductData] = useState(false);
  const [image, setimage] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.counter.token);

  const fetchProductData = () => {
    const product = allProducts.find((item) => item._id == id);
    if (product) {
      setproductData(product);

      setimage(product.image);
      return null;
    }
  };

  const AddtoCartAtBackEND = async (userId, itemId) => {
    if (!token) {
      return toast.error('you need to logIn First')
    }
    const response = await axios.post(
      backendUrl + "/api/Cart/add",
      { userId, itemId: id },
      { headers: { token } }
    );
    if (response.data.success) {
      toast.success('product added successfully ✅')
      dispatch(addToCart(response.data.CartData));
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id, allProducts]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify([Cart]));
  }, [Cart]);

  return productData ? (
    <>
      <Link
        to={"/collection"}
        className="inline-flex flex-nowrap  justify-center items-center gap-2"
      >
        {" "}
        <FaArrowLeft /> Go back to Collections{" "}
      </Link>

      <div className="max-w-[20rem] rounded-2xl overflow-hidden mx-auto shadow-lg p-4 bg-white">
        <div className="imgDiv w-full h-[70%] overflow-hidden">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={image}
            alt={"product image"}
          />
        </div>

        <div className="py-4">
          <h2 className="text-xl  text-gray-600 mb-2">{productData.name}</h2>
          <p className="text-gray-700 text-sm mb-4">{}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-800">
              $ {productData.price}
            </span>
            <button
              onClick={() => AddtoCartAtBackEND()} //FIXME:  NEED TO FIXME
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
