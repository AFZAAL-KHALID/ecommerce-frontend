import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartAmount } from "../features/ProductSlice";
import axios from "axios";
import { backendUrl } from "../App";

const Cart = () => {
  const token = useSelector((state) => state.counter.token);
  const deliveryFee = useSelector((state) => state.counter.deliveryFee);
  const allProducts = useSelector((state) => state.counter.allProducts);
  const Cart = useSelector((state) => state.counter.Cart);

  const dispatch = useDispatch();

  const totalAmount = Cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  



  // fetching user Cart
  const getCartDataFromBackend = async () => {
    const response = await axios.post(
      backendUrl + "/api/Cart/get",
      {},
      { headers: { token } }
    );
    const userCartData = response.data.CartData;

    // Filter products that are in the cart
    const filteredProductsWithQty = userCartData
      ? allProducts
          .filter((product) => userCartData.hasOwnProperty(product._id))
          .map((product) => ({
            ...product,
            quantity: userCartData[product._id],
          }))
      : [];

    dispatch(addToCart(filteredProductsWithQty));
  };

  const updateQty = async (itemId, quantity) => {
    try {
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/Cart/update",
          { itemId, quantity },
          { headers: { token } }
        );

        if (response.data.success) {
          return response.data.updateCartData; // ✅ Returns updated Cart
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const decreaseQty = async (itemId, quantity) => {
    try {
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/Cart/decreseQty",
          { itemId, quantity },
          { headers: { token } }
        );

        if (response.data.success) {
          return response.data.updateCartData; // ✅ Returns updated Cart
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/Cart/delete",
        { itemId },
        { headers: { token } }
      );

      if (response.data.success) {
        dispatch(addToCart(response.data.updateUserCart));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCartDataFromBackend();
    dispatch(getCartAmount(totalAmount))
    localStorage.setItem("cart", JSON.stringify(Cart));
  }, [Cart]);

  return (
    <>
      <div className="border-t pt-14  justify-center items-center gap-2">
        <div className="text-2xl mb-3">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>

        {Cart.length > 0 ? (
          <div className="div flex flex-col sm:flex-row my-2  gap-2">
            {/* Left Side ⬅️ */}
            <div className="w-full sm:w-full">
              <div className="overflow-hidden space-y-4">
                {Cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 border border-gray-300 rounded-xl bg-white shadow hover:shadow-lg transition-all"
                  >
                    {/* Image + Name + Price */}
                    <div className="flex items-center gap-4 w-full md:w-2/3">
                      <div className="h-24 w-24 md:h-28 md:w-28 overflow-hidden rounded-md border bg-gray-50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </h2>
                        <p className="text-lg mt-1 text-black font-bold">
                          Rs. {item.price * item.quantity}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button // qty add
                        onClick={async () => {
                          const updatedCart = await updateQty(
                            item._id,
                            item.quantity
                          );

                          if (updatedCart) {
                            // Convert object to array
                            const cartArray = Object.entries(updatedCart).map(
                              ([itemId, quantity]) => ({
                                itemId,
                                quantity,
                              })
                            );

                            dispatch(addToCart(cartArray)); // ✅ This updates Redux state
                          }
                        }}
                        className="w-9 h-9 cursor-pointer rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xl"
                      >
                        +
                      </button>
                      <input
                        type="number"
                        readOnly
                        value={item.quantity}
                        className="w-12 h-9 text-center border rounded-md text-lg font-bold"
                      />
                      <button //DEC QTY
                        onClick={async () => {
                          const updatedCart = await decreaseQty(
                            item._id,
                            item.quantity
                          );

                          if (updatedCart) {
                            // Convert object to array
                            const cartArray = Object.entries(updatedCart).map(
                              ([itemId, quantity]) => ({
                                itemId,
                                quantity,
                              })
                            );

                            dispatch(addToCart(cartArray)); // ✅ This updates Redux state
                          }
                        }}
                        className="w-9 h-9 cursor-pointer rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xl"
                      >
                        -
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* right Side ➡️ */}
            <div className="rightSide w-full sm:ml-8 sm:w-1/3 max-h-[400px] flex flex-col bg-white/80 shadow-2xl p-5 rounded-2xl backdrop-blur-md transition-all duration-300">
              <Title text1="GRAND" text2="TOTAL" />

              <div className="pt-4 space-y-2 text-gray-700">
                <h2 className="text-lg sm:text-xl">
                  Amount:{" "}
                  <span className="font-medium">
                    {Math.floor(totalAmount).toLocaleString()}/-
                  </span>
                </h2>
                <h2 className="text-lg sm:text-xl">
                  Delivery Fee:{" "}
                  <span className="font-medium">{deliveryFee}/-</span>
                </h2>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Total:{" "}
                  {Math.floor(totalAmount + deliveryFee).toLocaleString()}/-
                </h2>
              </div>

              <Link
                to="/place-order"
                className="mt-6 bg-blue-600 hover:bg-blue-500 text-white text-center text-sm sm:text-base px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out mx-auto w-full"
              >
                Check Out
              </Link>
            </div>
          </div>
        ) : (
          <h1 className="text-gray-500 text-3xl font-light text-center py-8">
            Your Cart is Empty 🙆‍♀️
          </h1>
        )}
      </div>
    </>
  );
};

export default Cart;
