import React from "react";
import Title from "./Title";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
// import Allproducts from '../../public/Assests/Allproducts'

const BestSeller = () => {
  const allProducts = useSelector((state) => state.counter.allProducts);
  const bestSellerFilter = allProducts.filter((item) => item.bestSeller);
  

  return (
    <>
     <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Best"} text2={"selling"} />
        <p className="3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
          animi explicabo,{" "}
        </p>
      </div>

      {/* Rendering Produts ;  */}
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellerFilter.map((product, index) => (
          
          <ProductItem
            key={product._id || index} 
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
    </>
   
  );
};

export default BestSeller;
