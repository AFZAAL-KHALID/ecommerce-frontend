import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdKeyboardArrowRight } from "react-icons/md"; //icon
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const allProducts = useSelector((state) => state.counter.allProducts);
  const [filteredArray, setfilteredArray] = useState([]);
  const [showFilter, setshowFilter] = useState(false);
  const [category, setcategory] = useState([]);
  const [sortType, setsortType] = useState("relevent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory((prev) => prev.filter((item) => item !== e.target.value)); // remove if already exist
    } else {
      setcategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = allProducts.slice();
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
    );
  }
  setfilteredArray(productsCopy);
  };

  const sortProduct = () => {
    let filterCopy = filteredArray.slice();

    switch (sortType) {
      case "low-high":
        setfilteredArray(filterCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setfilteredArray(filterCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  const notify = ()=>{
    toast.success('Item added to cart');
  }

  useEffect(() => {
    setfilteredArray(allProducts);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [category]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);




  return (
    <div className="flex flex-col sm:flex-row  gap-1 sm:gap-10 pt-10 border-t">
      {/* filter opetions */}

      <div className="min-w-60">
        <p
          onClick={() => {
            setshowFilter(!showFilter);
          }}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 transition-all"
        >
          FILTERS
          <MdKeyboardArrowRight
            className={`transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </p>

        {/* category filter */}

        <div
          className={`transition-all duration-300 ${
            showFilter ? "" : "hidden"
          } border border-gray-300 pl-5 py-3 mt-6`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className=" flex flex-col gap2 text-sm font-light text-gray-600">
            <p className="flex ga2 cursor-pointer hover:text-gray-900 hover:font-semibold">
              <input
                onChange={toggleCategory}
                className="w-3 mr-3"
                type="checkbox"
                value={"men"}
              />
              Men
            </p>

            <p className="flex ga2 cursor-pointer hover:text-gray-900 hover:font-semibold">
              <input
                onChange={toggleCategory}
                className="w-3 mr-3"
                type="checkbox"
                value={"women"}
              />
              WoMen
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Products sort */}
          <select
            onChange={(e) => {
              setsortType(e.target.value);
            }}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevent">sort by: Relevant</option>
            <option value="low-high">sort by: Low to High</option>
            <option value="high-low">sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products  */}
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filteredArray.map((product, index) => {
            return (
              <ProductItem
                key={product.id || index}
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;
