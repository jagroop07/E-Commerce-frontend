import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { deleteCartItembyIdAsync, selectCartItems, updateCartAsync } from '../cart/cartSlice'
import { useForm } from 'react-hook-form'
import { addOrderAsync, selectCurrentOrder } from '../Order/orderSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { selectLoggedUserInfo, updateUserAsync } from '../User/userSlice'

export const CheckOut = () => {
    const products = useSelector(selectCartItems)
    const user = useSelector(selectLoggedUserInfo)
    const currentorder = useSelector(selectCurrentOrder)
    const dispatch = useDispatch()
    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentMethod, setpaymentMethod] = useState('')


    const totalAmount = products.reduce((amount, item) => item.product.price * item.quantity + amount, 0)
    const totalItems = products.reduce((total, item) => item.quantity + total, 0)

    function handleDelete(id) {
        dispatch(deleteCartItembyIdAsync(id))
    }

    function handleUpdate(e, item) {
        dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value, totalAmount: +e.target.value * item.product.price }))
    }

    function handleUserUpdate(data) {
        console.log(user)
        dispatch(updateUserAsync({ addresses: [...user.addresses, data] }))
        reset()
    }

    function handleAddress(index) {
        const address = user.addresses[index]
        setSelectedAddress(address)
    }

    function handleOrder() {
        //TODO
        //redirect to orderSuccess Page
        //clear Cart
        //subtract purchased quantity from the stock
        if (selectedAddress && paymentMethod) {
            const order = {
                products,
                selectedAddress,
                paymentMethod,
                status: 'pending',  //admin can change this and there can be various status like dispatched delived shipped
                totalAmount,
                totalItems
            }
            dispatch(addOrderAsync(order))
        }
        else {
            toast.error('Please Select Address and PaymentMethod')
        }

    }

    return (
        <>
            {!products.length && <Navigate to='/' replace={true}></Navigate>}
            {currentorder && currentorder.paymentMethod === "cash" && <Navigate to={`/order-success/${currentorder.id}`}></Navigate>}
            {currentorder && currentorder.paymentMethod === "card" && <Navigate to={`/stripe-checkout`}></Navigate>}
            <ToastContainer />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className='lg:col-span-3'>
                        <div className="font-sans bg-white mt-6">
                            <div className="bg-gray-50 p-8 max-w-5xl mx-auto">
                                <div className="text-center">
                                    <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-gray-800 pb-1">Checkout</h2>
                                </div>

                                <div className="mt-12">
                                    <form noValidate onSubmit={handleSubmit(handleUserUpdate)}>
                                        <div className="grid pb-6 border-b-[2px] md:grid-cols-3 gap-4">
                                            <div>
                                                <h3 className="text-3xl font-bold text-gray-300">01</h3>
                                                <h3 className="text-xl font-bold text-gray-800 mt-1">Personal Details</h3>
                                            </div>

                                            <div className="md:col-span-2">
                                                <div className='mb-4'>
                                                    <input type="text" {...register('name', { required: 'name is required' })} placeholder="Full name"
                                                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                                    <p className='text-red-600'>{errors.name && errors.name.message}</p>
                                                </div>
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <input type="email" {...register('email', { required: "email is required" })} placeholder="Email address"
                                                            className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                                        <p className='text-red-600'>{errors.email && errors.email.message}</p>
                                                    </div>
                                                    <div>
                                                        <input type="number" {...register('number', { required: "Phone no. is required" })} placeholder="Phone number"
                                                            className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                                        <p className='text-red-600'>{errors.number && errors.number.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4 mt-12">
                                            <div>
                                                <h3 className="text-3xl font-bold text-gray-300">02</h3>
                                                <h3 className="text-xl font-bold text-gray-800 mt-1">Shopping Address</h3>
                                            </div>

                                            <div className="md:col-span-2">
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <input type="text" {...register('streetAddress', { required: "Street Address is required" })} placeholder="Street address"
                                                            className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                                        <p className='text-red-600'>{errors.streetAddress && errors.streetAddress.message}</p>
                                                    </div>
                                                    <div>
                                                        <input type="text" {...register('city', { required: 'city is required' })} placeholder="City"
                                                            className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                                        <p className='text-red-600'>{errors.city && errors.city.message}</p>
                                                    </div>
                                                    <div>
                                                        <input type="text" {...register('state', { required: 'state is required' })} placeholder="State"
                                                            className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                                        <p className='text-red-600'>{errors.state && errors.state.message}</p>
                                                    </div>
                                                    <div>
                                                        <input type="number" {...register('pincode', { required: 'Zip Code is required' })} placeholder="Zip Code"
                                                            className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                                                        <p className='text-red-600'>{errors.pincode && errors.pincode.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-end mt-12">
                                            <Link
                                                to='/user-cart'
                                                className="px-6 py-3 me-4 text-sm font-semibold tracking-wide bg-gray-500 text-white rounded-md hover:bg-gray-700">Cancel</Link>
                                            <button type="submit"
                                                className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <h2 className='text-xl px-8 font-bold my-6'>Choose from the following Addresses:</h2>
                            <ul className='border-b-[2px] px-8 pb-6'>
                                {
                                    user.addresses && user.addresses.map((address, index) => <li key={index} className='grid sm:grid-cols-8 rounded-xl border-[2px] p-4 mt-5'>
                                        <input onChange={() => handleAddress(index)} className='col-span-1' type="radio" name="address" />
                                        <div className='col-span-4'>
                                            <p><span className='font-semibold'>Name:</span> {address.name}</p>
                                            <p><span className='font-semibold'>Street:</span> {address.streetAddress}</p>
                                            <p><span className='font-semibold'>City:</span>  {address.city}</p>
                                        </div>
                                        <div className='col-span-3 lg:text-end md:text-end'>
                                            <p><span className='font-semibold'>Phone No.</span> {address.number}</p>
                                            <p><span className='font-semibold'>State:</span> {address.state}</p>
                                            <p>{address.pincode}</p>
                                        </div>
                                    </li>)
                                }
                            </ul>

                            <div class="grid md:grid-cols-3 p-8 gap-4 mt-12">
                                <div>
                                    <h3 class="text-xl font-bold text-gray-800 mt-1">Payment method:</h3>
                                </div>

                                <div class="md:col-span-2">
                                    <div class="grid gap-4 sm:grid-cols-2">
                                        <div class="flex items-center">
                                            <input onChange={() => setpaymentMethod('card')} type="radio" name='payment' class="w-5 h-5 cursor-pointer" id="card" checked={paymentMethod === "card"} />
                                            <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                                                <img src="https://readymadeui.com/images/visa.webp" class="w-12" alt="card1" />
                                                <img src="https://readymadeui.com/images/american-express.webp" class="w-12" alt="card2" />
                                                <img src="https://readymadeui.com/images/master.webp" class="w-12" alt="card3" />
                                            </label>
                                        </div>

                                        <div class="flex items-center">
                                            <input onChange={() => setpaymentMethod('cash')} type="radio" name='payment' class="w-5 h-5 cursor-pointer" id="cash" />
                                            <label for="cash" class="ml-4 flex gap-2 cursor-pointer font-semibold">
                                                Cash
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='lg:col-span-2'>
                        {products && <div className="bg-gray-50 mt-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
                            <div className="border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flow-root">
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-10">Shopping Cart</h1>
                                    <ul className="-my-6 divide-y divide-gray-200">
                                        {products.map((item) => (
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
                                                    <div className="flex flex-1 mt-3 items-end justify-between text-sm">
                                                        <div>
                                                            <label htmlFor="quantity" className="inline text-sm font-medium leading-6 text-gray-900">
                                                                Qty
                                                            </label>
                                                            <select className='ms-4' onChange={(e) => handleUpdate(e, item)} value={item.quantity}>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                            </select>
                                                        </div>
                                                        <div className="flex">
                                                            <button onClick={() => handleDelete(item.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                Remove
                                                            </button>
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
                                    <p>${totalAmount.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                    <p>Total Items in Cart</p>
                                    <p>{totalItems} items</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <div
                                        onClick={handleOrder}
                                        className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Order Now
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <Link to='/'>
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}