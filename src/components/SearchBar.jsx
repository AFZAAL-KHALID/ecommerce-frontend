import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx"; //icon
import { showHideSearchBar } from ".././features/ProductSlice";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
   const location = useLocation().pathname;  
   
  let search = useSelector((state) => {
    state.counter.search;
  });
  let showSearchBar = useSelector((state) => state.counter.showSearchBar);
  const dispatch = useDispatch();

  return showSearchBar ? (
    <div className={`${location === '/collection' ? 'flex justify-center items-center' : 'hidden'}  bg-gray-50 text-center`}>
        <div className='inline-flex items-center justify-center border w-3/4 my-2 border-y-gray-400 rounded-2xl px-5'>

            <input type="text" value={search} className="flex-1  outline-none py-1 bg-inherit text-sm " placeholder="Seach" />

        </div>

          <RxCross1 className="inline ml-3 hover:text-red-500 cursor-pointer" onClick={()=> dispatch(showHideSearchBar())} />

    </div>
 
  ) : null;
};

export default SearchBar;
