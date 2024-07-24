import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUserOrdersAsync, selectUserOrder } from '../userSlice'
import { selectLoggedUser } from '../../auth/authSlice'

function UserOrder() {
    const orders = useSelector(selectUserOrder)
    const user = useSelector(selectLoggedUser)
    const dispatch = useDispatch()

    const chooseColor = (status) => {
        switch(status){
            case "pending":
                return 'text-purple-400';
            case "cancelled":
                return 'text-red-400';
            case "dispatched":
                return 'text-yellow-400';
            case "delivered":
                return 'text-green-400';
            default:
                return 'text-purple-400 ';
        }
    }

    useEffect(() => {
        if (user) {
            dispatch(fetchLoggedInUserOrdersAsync())
        }
    }, [dispatch,user])

    return (
        <div className='pb-8'>
            <div className='bg-white mx-auto border-b-[1px] max-w-7xl px-4 sm:px-6 lg:px-8 mt-3'>
                <h1 className="text-2xl py-7 font-bold tracking-tight text-gray-900">My Orders</h1>
            </div>
            {orders.map((order) => <>
                <div className="bg-white border-[2px] rounded-2xl mt-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flow-root">
                            <div className='flex flex-wrap justify-between items-center mb-10'>
                                <h1 className="text-xl font-bold tracking-tight text-gray-900">Order <span className='text-blue-600 text-sm lg:text-xl md:text-xl sm:text-xl'>#{order.id}</span></h1>
                                <h4 className={`${chooseColor(order.status)}`}><span className='font-semibold'>Order Status: </span>{order.status}</h4>
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-gray-900 mt-8 mb-10">Items: </h3>
                            <ul className="-my-6 divide-y divide-gray-200">
                                {order.products.map((item) => (
                                    <li key={item.id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href={item.product.href}>{item.product.title}</a>
                                                    </h3>
                                                    <p className="ml-4">${item.totalAmount.toFixed(2)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div>
                                                    <label htmlFor="quantity" className="inline text-sm font-medium leading-6 text-gray-900">
                                                        Qty: {item.quantity}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${order.totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                            <p>Total Items in Cart</p>
                            <p>{order.totalItems} items</p>
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 mt-8 mb-10">Shipping Address: </h3>
                        <div>
                            <div key={order.selectedAddress.email} className='grid sm:grid-cols-8 border-[2px] pt-0 p-4 mt-5'>
                                <div className='col-span-4'>
                                    <p className='mt-4'><span className='font-semibold'>Name:</span> {order.selectedAddress.name}</p>
                                    <p className='mt-4'><span className='font-semibold'>Street:</span> {order.selectedAddress.streetAddress}</p>
                                    <p className='mt-4'><span className='font-semibold'>City:</span>  {order.selectedAddress.city}</p>
                                </div>
                                <div className='col-span-4 lg:text-end md:text-end'>
                                    <p className='mt-4'><span className='font-semibold'>Phone No.</span> {order.selectedAddress.number}</p>
                                    <p className='mt-4'><span className='font-semibold'>State:</span> {order.selectedAddress.state}</p>
                                    <p className='mt-4'>{order.selectedAddress.pincode}</p>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 mt-8 mb-10">Payment Method: <span className='text-base ms-3 font-normal'>{order.paymentMethod.toUpperCase()}</span></h3>
                    </div>
                </div>
            </>)}
        </div>
    )
}

export default UserOrder
