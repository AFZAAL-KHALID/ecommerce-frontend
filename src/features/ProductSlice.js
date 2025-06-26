// import Allproducts from "../../public/Assests/Allproducts.js";
import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart");
const parsedCart =
  savedCart && savedCart !== "undefined"
    ? JSON.parse(savedCart).filter((item) => item && Object.keys(item).length > 0)
    : [];
  export  const CartItemLength = savedCart.length
  

const initialState = {
  value: 0,
  currency: "Rs.",
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  allProducts: [],
  deliveryFee: 200,
  showSearchBar: false,
  getCartAmount:'',
  search: '',
  token: localStorage.getItem("token") || "",
  Cart: parsedCart || [],
  totalItemsCart: parsedCart.reduce((sum, item) => sum + item.quantity, 0),
};


const ProductSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    showHideSearchBar: (state) => {
      state.showSearchBar = !state.showSearchBar;
    },
    addToCart: (state, action) => {
      localStorage.setItem('cart', JSON.stringify([action.payload]))
      state.Cart = action.payload;

      state.totalItemsCart = action.payload.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.Cart = state.Cart.filter((item) => item.id !== action.payload);
      state.totalItemsCart--;
    },
    addDataFromBackend: (state, action) => {
      localStorage.setItem('cart', JSON.stringify([action.payload]))
      state.allProducts = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },
    getCartAmount: (state, action) => {
      state.getCartAmount = action.payload;
    },

   
  },
});

export const {
  showHideSearchBar,
  addToCart,
  addDataFromBackend,
  setToken,
  getCartAmount,
} = ProductSlice.actions;
export default ProductSlice.reducer;
