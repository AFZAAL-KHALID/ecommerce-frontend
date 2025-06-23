import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const [orderDataBackend, setorderDataBackend] = useState([]);

  const backendUrl = useSelector((state) => state.counter.backendUrl);
  const token = useSelector((state) => state.counter.token);
  const currency = useSelector((state) => state.counter.currency);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/Order/userOrders",
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        response.data.orders.map((singleOrder) => {});

        setorderDataBackend(response.data.orders);
        console.log(response.data.orders);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <>
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>

        <div>
          {orderDataBackend.map((order, index) => (
            <div
              key={index}
              className="py-4 px-2 shadow-2xl border-t border-b text-gray-700 flex flex-col  md:flex-row  md:items-center md:justify-between gap-4"
            >
              {order.items.map((item) =>
                item.map((singleItem) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start gap-2 text-sm w-full justify-left"
                  >
                    <img src={`${singleItem.image}`} className="w-16 sm:w-20" />

                    <div className="text-black font-semibold">
                      <p className="font-medium sm:text-base">
                        {singleItem.name}
                      </p>

                      <div className="flex flex-col items-start gap-1 mt-2 text-base text-gray-700">
                        <p className="">
                          Quantity:{" "}
                          <span className="text-gray-400">
                            {singleItem.quantity}
                          </span>
                        </p>
                      </div>
                      <p className="mt-2">
                        Date:{" "}
                        <span className="text-gray-400">
                          {new Date(singleItem.date).toLocaleDateString()}
                        </span>
                      </p>
                    </div>

                  </div>
                ))
              )}
                    <p className="font-bold">
                      {currency} {Math.floor(order.amount)}
                    </p>
              {/* ready to ship 🟢 */}
              <div className="my-auto  md:w-1/2 flex justify-between items-center ">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base ">{order.Status}</p>
                </div>
              </div>

              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium  rounded-sm my-auto cursor-pointer bg-gray-700 hover:bg-gray-500 text-white text-nowrap">
                Track Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Order;
