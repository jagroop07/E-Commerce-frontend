import { configureStore } from '@reduxjs/toolkit';
import ProductListSlice from '../features/Productlist/ProductListSlice';
import authSlice from '../features/auth/authSlice';
import cartSlice from '../features/cart/cartSlice';
import orderSlice from '../features/Order/orderSlice';
import userSlice from '../features/User/userSlice';

export const store = configureStore({
  reducer: {
      Product: ProductListSlice,
      User: authSlice,
      Cart: cartSlice,
      Order: orderSlice,
      UserOrder: userSlice,
  }
});
