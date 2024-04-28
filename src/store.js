import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import searchReducer from './searchSlice'
export default configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
})
