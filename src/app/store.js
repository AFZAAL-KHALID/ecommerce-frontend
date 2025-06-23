import { configureStore } from '@reduxjs/toolkit';
import ProductSlice from '../features/ProductSlice'; // product Slice (mini Store in Main Store)

export const store = configureStore({
  reducer: {
    counter: ProductSlice,
  },
});
