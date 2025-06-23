import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const LatestCollection = () => {
  const allProducts = useSelector((state) => state.counter.allProducts);
  const [latestProduct, setlatestProduct] = useState([]);



  useEffect(() => {
    setlatestProduct(allProducts.slice(0, 10));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Latest"} text2={"Collectios"} />
        <p className="3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
          animi explicabo,{" "}
        </p>
      </div>

      {/* Rendering Produts  */}
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((product, index) => (
           (
            <ProductItem
              key={product._id || index}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
