import React, { useState } from "react";
import Title from "../components/Title";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/ProductSlice";
import { toast } from "react-toastify";


const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // {backendUrl, token, Cart, deliveryFee, allProducts, getCartAmount}   from Redus Store.👇
  const backendUrl = useSelector(state => state.counter.backendUrl)
  const token = useSelector(state => state.counter.token)
  const Cart = useSelector(state => state.counter.Cart)
  const deliveryFee = useSelector(state => state.counter.deliveryFee)
  // const allProducts = useSelector(state => state.counter.allProducts)
  const totalAmount = useSelector(state => state.counter.getCartAmount)



  const [Method, setMethod] = useState("");
  
  const [formData, setformData] = useState({ //address object
    FirstName: "",
    LastName: "",
    Email: "",
    Street: "",
    City: "",
    State: "",
    ZipCode: "",
    Country: "",
    Phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setformData((prev) => ({ ...prev, [name]: value }));
  };

 const onSubmitHandler = async (event)=>  {
    event.preventDefault()

    try {
   
      if (Cart.length > 0) {
         let orderData = { //creating object to send body.req
          Address: formData,
          items: Cart,
          amount: totalAmount + deliveryFee,
         }


         if (Method === 'COD') {
            //api for COD order
            const response = await axios.post(backendUrl + '/api/Order/place', {...orderData}, {headers: {token}})
            if (response.data.success) {
               dispatch(addToCart([])) //remove Cart data frontend
               console.log(response.data.createOrder);
               
              navigate('/orders');


            }else{
              toast.error(response.data.message)
              console.log(response.data.message) 
            }
         }
        //  else if (Method === '') { FIXME:
          
        //  }
         
        
      }



    } catch (error) {
      console.log({'PlaceOrder': error.message});
    }

  }

  return (
    <>
    <form 
    onSubmit={onSubmitHandler}
    className="flex flex-col sm:flex-row mb-4 justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/*----------------- Left Side */}
      <div className="flex flex-col w-full max-w-[480px]">
        <div className=" text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        {/* ------------Form--------- */}
        <div className="flex  flex-col gap-3  ">
          <div className=" flex gap-3">
            <input //FirstName
              required
              onChange={(event) => onChangeHandler(event)}
              name="FirstName"
              value={formData.FirstName}
              type="text"
              className="border border-gray-300 rounded py-1.5  px-3.5 w-full "
              placeholder="First Name"
            />

            <input //LastName
              required
              onChange={(event) => onChangeHandler(event)}
              name="LastName"
              value={formData.LastName}
              type="text"
              className="border border-gray-300 rounded py-1.5  px-3.5 w-full "
              placeholder="Last Name"
            />
          </div>

          <input //Email
            required
            onChange={(event) => onChangeHandler(event)}
            name="Email"
            value={formData.Email}
            type="email"
            className="border border-gray-300 rounded py-1.5  px-3.5 w-full "
            placeholder="Email address"
          />

          <input //street
            required
            onChange={(event) => onChangeHandler(event)}
            name="Street"
            value={formData.Street}
            type="text"
            className="border border-gray-300 rounded py-1.5  px-3.5 w-full "
            placeholder="Street"
          />

          {/* city */}
          <div className=" flex gap-3">
            <input
              required
              onChange={(event) => onChangeHandler(event)}
              name="City"
              value={formData.City}
              type="text"
              className="border border-gray-300 rounded py-1.5  px-3.5 w-full "
              placeholder="City"
            />

            <input //state
              required
              onChange={(event) => onChangeHandler(event)}
              name="State"
              value={formData.State}
              type="text"
              className="border border-gray-300 rounded py-1.5  px-3.5 w-full "
              placeholder="State"
            />
          </div>

          {/* zipCode */}
          <div className=" flex gap-3">
            <input
              required
              onChange={(event) => onChangeHandler(event)}
              name="ZipCode"
              value={formData.ZipCode}
              type="number"
              className="border border-gray-300 rounded py-1.5  px-3.5 w-full "
              placeholder="ZipCode"
            />

            <input //Country
              required
              onChange={(event) => onChangeHandler(event)}
              name="Country"
              value={formData.Country}
              type="text"
              className="border border-gray-300 rounded py-1.5  px-3.5 w-full "
              placeholder="Country"
            />
          </div>

          <input //Phone
            required
            onChange={(event) => onChangeHandler(event)}
            name="Phone"
            value={formData.Phone}
            type="phone"
            className="border border-gray-300 rounded py-1.5  px-3.5 w-full "
            placeholder="Phone"
          />
        </div>
      </div>

      {/*  ------------------Right Side */}
      <div className="div mt-8 min-w-80 ">
        <Title text1={"PAYMENT"} text2={"METHOD"} />
        {/* Payment Method Selection */}

        <div className="flex gap-3 mt-6">
          <div
            onClick={() => setMethod("Stripe")}
            className="flex items-center py-2  w-2/4 rounded justify-center gap-1 px-2 border border-gray-300  flex-row"
          >
            <p
              className={` ${
                Method === "Stripe" ? "bg-green-500 " : ""
              } cursor-pointer min-w-3.5 h-3.5 border border-gray-300 rounded-full`}
            ></p>
            <Link className="">Stripe</Link>
          </div>

          <div
            onClick={() => setMethod("RazerPay")}
            className="flex  py-2 items-center w-2/4 rounded justify-center px-2 gap-1 border border-gray-300 flex-row"
          >
            <p
              className={`${
                Method === "RazerPay" ? "bg-green-500 " : ""
              } cursor-pointer min-w-3.5 h-3.5 border rounded-full border-gray-300 `}
            ></p>
            <Link className="">RazerPay</Link>
          </div>
        </div>
        <div
          onClick={() => setMethod("COD")}
          className="flex  py-2 mt-6 items-center w-full rounded justify-center px-2 gap-1 border border-gray-300 flex-row"
        >
          <p
            className={`${
              Method === "COD" ? "bg-green-500 " : ""
            } cursor-pointer min-w-3.5 h-3.5 border rounded-full border-gray-300`}
          ></p>
          <Link className="">Cash On Delivery</Link>
        </div>

        <div className="w-full text-end mt-8">
          <button
            // to={"/orders"}
            type="submit"
            className="bg-black cursor-pointer pointer-coarse: text-white text-sm  px-4 sm:px-8 py-2 sm:py-4"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
    </>
  );
};

export default PlaceOrder;
