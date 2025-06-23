import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setToken } from "../features/ProductSlice";
import { useNavigate} from "react-router-dom";



const Login = () => {
  const [currentState, setcurrentState] = useState("Login");
  const token = useSelector((state) => state.counter.token);
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        //----------call SIGN UP api--------------------
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          dispatch(setToken(response.data.token)); //putting token in user redux store

          localStorage.setItem("token", JSON.stringify(response.data.token));
        } else {
          toast.error(response.data.message, {
            autoClose: 1500,
          });
        }
      } else {
        //----------call LOGIN api------------------
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        

        if (response.data.success) {
         dispatch(setToken(response.data.token)); //putting token in user redux store

          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message, {
            autoClose: 1500,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    if (token) {
    navigate('/');
       }
  }, [token])
  
  return (
    <>
      <form
        action=""
        onSubmit={submitHandler}
        className="flex flex-col mb-8 items-center w-[90%] sm:max-w-96 m-auto mt-1 gap-4 text-black"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {/* Name */}
        {currentState === "Login" ? (
          ""
        ) : (
          <input
            onChange={(e) => setname(e.target.value)}
            value={name}
            type="text"
            required
            className="w-full px-3 py2 border border-gray-800 py-1"
            placeholder="Name"
          />
        )}

        {/* Email */}
        <input
          onChange={(e) => setemail(e.target.value)}
          value={email}
          type="Email"
          required
          className="w-full px-3 py2 border border-gray-800 py-1"
          placeholder="Email"
        />

        {/* Password */}
        <input
          onChange={(e) => setpassword(e.target.value)}
          value={password}
          type="Password"
          required
          className="w-full px-3 py2 border border-gray-800 py-1"
          placeholder="Password"
        />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer ">Forgot your Password?</p>

          {/* toggle - SignIn/ Loging */}
          {currentState === "Login" ? (
            <p
              onClick={() => setcurrentState("Sign Up")}
              className="cursor-pointer "
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setcurrentState("Login")}
              className="cursor-pointer "
            >
              Login Here
            </p>
          )}
        </div>
        {/* Singup Button */}
        <button type="submit" className="bg-black text-white px-6 mt-4 py-2">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </>
  );
};

export default Login;
