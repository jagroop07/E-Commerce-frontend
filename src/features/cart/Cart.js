import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteCartItembyIdAsync, selectCartCheck, selectCartItems, updateCartAsync } from './cartSlice'
import { toast, ToastContainer } from 'react-toastify'

export default function Cart() {
    const products = useSelector(selectCartItems)
    const cartLoaded = useSelector(selectCartCheck)
    const dispatch = useDispatch()

    const totalAmount = products.reduce((amount, item) => item.product.price*item.quantity + amount, 0)
    const totalItems = products.reduce((total, item) => item.quantity + total, 0)

    function handleDelete(id){
        dispatch(deleteCartItembyIdAsync(id))
        toast.error('Item removed from Cart')
    }

    function handleUpdate(e, item){
        dispatch(updateCartAsync({id: item.id, quantity: +e.target.value, totalAmount: +e.target.value*item.product.price}))
        toast.success('Cart updated')
    }

    return (
        <div className='pt-12'>
            <ToastContainer position='top-left'/>
            {products.length && cartLoaded && products ? <div className="bg-gray-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                                        <div className="flex flex-1 items-end justify-between text-sm">
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
                                                <button onClick={()=>handleDelete(item.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
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
                        <Link
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Checkout
                        </Link>
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
            </div>: 
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <p className="text-2xl font-semibold text-indigo-600">Cart is Empty</p>
              <p className="mt-6 text-base leading-7 text-gray-600">there is no item present in the cart</p>
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
          </main>}
        </div>
    )
}
