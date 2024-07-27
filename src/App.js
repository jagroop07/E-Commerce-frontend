import React, { useEffect } from 'react';
import './App.css';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import CartPage from './Pages/CartPage';
import CheckOutPage from './Pages/CheckOutPage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import { fetchCartItemsbyUserIdAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthAsync, selectCheckUser, selectLoggedUser } from './features/auth/authSlice';
import PageNotFound from './Pages/404';
import OrderSuccess from './Pages/OrderSuccess';
import UserOrderPage from './Pages/UserOrderPage';
import UserProfilePage from './Pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/User/userSlice';
import Logout from './features/auth/components/Logout';
import ForgetPasswordPage from './Pages/ForgetPasswordPage';
import ProtectAdmin from './features/auth/components/ProtectAdmin';
import AdminProductDetailPage from './Pages/AdminProductDetailPage';
import AdminHome from './Pages/AdminHome';
import AdminProductFormPage from './Pages/AdminProductFormPage';
import AdminOrderPage from './Pages/AdminOrderPage';
import StripePaymentCheckout from './Pages/StripePaymentCheckout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home/></Protected>,
  },
  {
    path: "/admin",
    element: <ProtectAdmin><AdminHome/></ProtectAdmin>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/user-cart",
    element: <Protected><CartPage/></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><CheckOutPage/></Protected>,
  },
  {
    path: "/product-details/:id",
    element: <Protected><ProductDetailsPage/></Protected>,
  },
  {
    path: "/admin/product-details/:id",
    element: <ProtectAdmin><AdminProductDetailPage/></ProtectAdmin>,
  },
  {
    path: "/admin/orders",
    element: <ProtectAdmin><AdminOrderPage/></ProtectAdmin>,
  },
  {
    path: "/order-success/:id",
    element: <Protected><OrderSuccess/></Protected>,
  },
  {
    path: "/user-order",
    element: <Protected><UserOrderPage/></Protected>,
  },
  {
    path: "/user-profile",
    element: <Protected><UserProfilePage/></Protected>,
  },
  {
    path: "/logout",
    element: <Logout/>,
  },
  {
    path: "/forgetPassword",
    element: <ForgetPasswordPage/>,
  },
  {
    path: "/admin/product-form/:id",
    element: <ProtectAdmin><AdminProductFormPage/></ProtectAdmin>,
  },
  {
    path: "/stripe-checkout",
    element: <Protected><StripePaymentCheckout/></Protected>,
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>
  }
]);

function App() {
  const user = useSelector(selectLoggedUser)
  const checkUser = useSelector(selectCheckUser)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(isAuthAsync())
  }, [dispatch])

  useEffect(() => {
    if(user){
      dispatch(fetchCartItemsbyUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch, user])

  console.log(checkUser)

  return (
    <>
      {checkUser && <RouterProvider router={router}/>}
    </>
  );
}

export default App;
