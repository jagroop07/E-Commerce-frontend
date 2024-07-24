import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrdersAsync, selectAllOrders, updateOrderEditAsync, selectTotalOrders} from '../Order/orderSlice'
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline'
import { ITEMS_PER_PAGE } from '../../app/constants'
import Pagination from '../common/Pagination'

function AdminOrder() {
    const AllOrders = useSelector(selectAllOrders)
    const totalOrders = useSelector(selectTotalOrders)
    const [selectedOrderEdit, setSelectedOrderEdit] = useState(null)
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState({})
    const dispatch = useDispatch()

    function handleEdit(order) {
        setSelectedOrderEdit(order.id)
    }

    function handleSort(updateSort){
        const sortOne = {_sort: updateSort.Sort, _order: updateSort.Order}
        setSort(sortOne)
    }

    function handlePage(page){
        setPage(page)
    }

    function handleView(){
        console.log("view")
    }

    useEffect(() => {
        const pagination = { _page: page, _per_page: ITEMS_PER_PAGE }
        dispatch(fetchAllOrdersAsync({sort, pagination}))
    }, [dispatch, page, sort])

    const chooseColor = (status) => {
        switch(status){
            case "pending":
                return 'bg-purple-400 text-white';
            case "cancelled":
                return 'bg-red-400 text-white';
            case "dispatched":
                return 'bg-yellow-400 text-white';
            case "delivered":
                return 'bg-green-400 text-white';
            default:
                return 'bg-purple-400 text-white';
        }
    }

    function handleUpdateOrder(e, order) {
        const updateOrder = { ...order }
        updateOrder.status = e.target.value
        dispatch(updateOrderEditAsync(updateOrder))
        setSelectedOrderEdit(null)
    }

    return (
        <div>
            <section className='border-b-[1px] pb-8'>
                {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24"> */}
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center border border-black border-1 border-collapse bg-white w-full">
                            <thead className='bg-blue-100'>
                                <tr className='border-black border-[1px]'>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-black py-3 text-xs uppercase border-l-1 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Order Number
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-black py-3 text-xs uppercase border-l-1 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Items
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-black py-3 text-xs uppercase border-l-1 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Shipping Address
                                    </th>
                                    <th onClick={() => handleSort({Sort: "totalAmount",Order: sort._order=== 1? -1: 1})} className="px-6 bg-blueGray-50 cursor-pointer text-blueGray-500 align-middle border border-solid border-black py-3 text-xs uppercase border-l-1 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Total Amount
                                        {sort._sort === "totalAmount" ?<ArrowUpIcon className='inline mt-[-4px] ms-3 h-4 w-4'/>:
                                        <ArrowDownIcon className='h-4 w-4 ms-3 mt-[-4px] inline'/>}
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-black py-3 text-xs uppercase border-l-1 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Status
-                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-black py-3 text-xs uppercase border-l-1 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {AllOrders.map((order) => <tr key={order.id}>
                                    <th className="px-6 border border-black align-middle border-1 text-blue-700 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        {order.id}
                                    </th>
                                    <td className="px-6 align-middle border border-black border-1 text-xs whitespace-nowrap p-4 ">
                                        {order.products.map((item) => <li key={item.id} className="flex py-6">
                                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.title}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-xs font-medium text-gray-900">
                                                        <h3>
                                                            <a href={item.product.href}>{item.product.title}</a>
                                                        </h3>
                                                        <p className="ml-4">${item.totalAmount.toFixed(2)}</p>
                                                    </div>
                                                    <p className="mt-1 text-xs text-gray-500">{item.product.brand}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div>
                                                        <label htmlFor="quantity" className="inline text-xs font-medium leading-6 text-gray-900">
                                                            Qty: {item.quantity}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>)}
                                    </td>
                                    <td className="px-6 align-center border border-black border-1  text-xs whitespace-nowrap p-4">
                                        <div className='flex flex-col'>
                                            <strong>{order.selectedAddress.streetAddress},</strong>
                                            <div>{order.selectedAddress.city},</div>
                                            <div>{order.selectedAddress.state},</div>
                                            <div>{order.selectedAddress.pincode},</div>
                                            <div>{order.selectedAddress.number}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 align-middle border border-black border-1  text-xs whitespace-nowrap p-4">
                                        ${order.totalAmount}
                                    </td>
                                    <td className="px-6 align-middle border border-black border-1  text-xs whitespace-nowrap p-4">
                                        {selectedOrderEdit !== order.id? <div className={`${chooseColor(order.status)} px-1 py-2 text-center rounded-xl`}>{order.status}</div> :
                                            <select value={order.status} className='w-full h-8 rounded-xl px-2 py-1 text-xs' onChange={e => handleUpdateOrder(e, order)}>
                                                <option value="pending">Pending</option>
                                                <option value="dispatched">Dispatched</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>}
                                    </td>
                                    <td className="px-6 align-middle border border-black border-1  text-xs whitespace-nowrap p-4">
                                        <div className='inline-flex hover:text-blue-800 cursor-pointer' onClick={handleView}><EyeIcon className='h-6 w-6' /></div>
                                        <div className=' ms-5 inline-flex hover:text-red-700 cursor-pointer' onClick={() => handleEdit(order)}><PencilIcon className='h-6 w-6' /></div>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* </div> */}
            </section>
            <div className='bg-white p-5'>
                <Pagination
                    page= {page}
                    handlePage={handlePage}
                    totalItems={totalOrders}>
                </Pagination>
            </div>
        </div>
    )
}

export default AdminOrder
