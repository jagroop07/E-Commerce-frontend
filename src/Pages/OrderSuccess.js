import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectLoggedUser } from "../features/auth/authSlice";
import { resetCartAsync } from "../features/cart/cartSlice";
import { resetOrder } from "../features/Order/orderSlice";

export default function OrderSuccess() {
   const {id} = useParams()
   const dispatch = useDispatch()
   const user = useSelector(selectLoggedUser)

   useEffect(()=>{
      if(user){
        dispatch(resetCartAsync())
        dispatch(resetOrder())
      }
   },[dispatch, user])

    return (
      <>
        <main className="grid min-h-full place-items-center bg-white px-6 py-18 sm:py-32 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-44 h-44 text-green-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order Successfully Placed</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Order Number <span className="font-semibold">#{id}</span></p>
            <p className="mt-6 text-base leading-7 text-gray-600">you can check your Order in My Account {'>'} <Link to='/user-order' className="text-blue-500 underline">My Orders</Link></p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                replace={true}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }
  