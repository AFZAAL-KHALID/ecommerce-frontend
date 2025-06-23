import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const currency = useSelector((state) => state.counter.currency);
  // console.log(price, id, name);
  
  return (
    <>
      <div className="bg-[#e4e5e43d] py-2 px-2">
        <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
          <div className=" overflow-hidden ">
            <img
              src={`${image}`}
              className="hover:scale-110  transition ease-in-out"
            />
          </div>
          <p className="pt-3 pb-1 text-sm text-gray-500">{name}</p>
          <p className="pt-3 pb-1  text-sm text-black font-medium">
            {currency}
            {price}
          </p>
        </Link>
      </div>
    </>
  );
};

export default ProductItem;
