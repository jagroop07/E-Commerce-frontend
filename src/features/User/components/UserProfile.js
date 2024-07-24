import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedUserInfo, updateUserAsync } from '../userSlice'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

function UserProfile() {
  const user = useSelector(selectLoggedUserInfo)
  const dispatch = useDispatch()
  const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm()
  const [editAddressIndex, setEditAddressIndex] = useState(-1)
  const [addNewForm, setAddNewForm] = useState(false)

  function handleEditform(index) {
    setEditAddressIndex(index)
    const address = user.addresses[index]
    setValue('name', address.name)
    setValue('email', address.email)
    setValue('number', address.number)
    setValue('streetAddress', address.streetAddress)
    setValue('pincode', address.pincode)
    setValue('state', address.state)
    setValue('city', address.city)
  }

  function handleEdit(updateAddress, index) {
    const newUser = {addresses: [...user.addresses]}
    newUser.addresses.splice(index , 1, updateAddress)
    dispatch(updateUserAsync(newUser))
    setEditAddressIndex(-1)
  }

  function handleRemove(index) {
    const newUser = { addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))
    toast.error('Address removed Successfully')
  }

  function handleNewAddress(data){
    const newUser = { addresses: [...user.addresses, data]}
    dispatch(updateUserAsync(newUser))
    toast.success('New Address Added Successfully')
    reset()
  }

  return (
    <div className='bg-gray-100'>
      <ToastContainer/>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-4'>
        <h1 className="text-2xl py-7 font-bold tracking-tight text-gray-900">My Profile</h1>
      </div>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7'>
        <h1 className="mb-4 text-gray-900"><span className='text-xl me-5 font-semibold'>Name:</span> {user.name ? user.name : "Guest User"}</h1>
        <h1 className="mb-4 text-gray-900"><span className='text-xl me-6 font-semibold'>Email:</span> {user.email}</h1>
        {user.role ==="admin"&& <h1 className="mb-4 text-gray-900"><span className='text-xl me-8 font-semibold'>Role:</span> {user.role}</h1>}
        {user.role !== "admin" && <> <h1 className="text-xl font-semibold tracking-tight text-gray-900">Addresses:</h1>
        <button onClick={()=> {
          setAddNewForm(true)
          setEditAddressIndex(-1)
          reset()
        }} type="submit"
          className="px-6 py-3 text-sm font-semibold tracking-wide my-4 bg-green-500 text-white rounded-md hover:bg-green-600">Add New Address</button>
        {addNewForm ? <form noValidate onSubmit={handleSubmit((data)=>handleNewAddress(data))}>
                <div className="grid mt-10 pb-6 border-b-[2px] md:grid-cols-3 gap-4">
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

                <div className="flex border-b-[2px] pb-6 flex-wrap justify-end mt-12">
                  <button
                    type='button'
                    onClick={() => {setAddNewForm(false)}}
                    className="px-6 py-3 me-4 text-sm font-semibold tracking-wide bg-gray-500 text-white rounded-md hover:bg-gray-700">Cancel</button>
                  <button type="submit"
                    className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
                </div>
              </form> : null}
        <ul>
          {
            user.addresses && user.addresses.map((address, index) => <>
              {editAddressIndex === index ? <form noValidate onSubmit={handleSubmit((data)=>handleEdit(data, index))}>
                <div className="grid mt-10 pb-6 border-b-[2px] md:grid-cols-3 gap-4">
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

                <div className="flex border-b-[2px] pb-6 flex-wrap justify-end mt-12">
                  <button
                    type='button'
                    onClick={() => setEditAddressIndex(-1)}
                    className="px-6 py-3 me-4 text-sm font-semibold tracking-wide bg-gray-500 text-white rounded-md hover:bg-gray-700">Cancel</button>
                  <button type="submit"
                    className="px-6 py-3 text-sm font-semibold tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
                </div>
              </form> : null}
              <li key={index} className='grid sm:grid-cols-8 border-[2px] pt-0 p-4 mt-5'>
                <div className='col-span-4'>
                  <p className='mt-4'><span className='font-semibold'>Name:</span> {address.name}</p>
                  <p className='mt-4'><span className='font-semibold'>Street:</span> {address.streetAddress}</p>
                  <p className='mt-4'><span className='font-semibold'>City:</span>  {address.city}</p>
                </div>
                <div className='col-span-3 lg:text-end md:text-end'>
                  <p className='mt-4'><span className='font-semibold'>Phone No.</span> {address.number}</p>
                  <p className='mt-4'><span className='font-semibold'>State:</span> {address.state}</p>
                  <p className='mt-4'>{address.pincode}</p>
                </div>
                <div className="col-span-1 flex flex-col justify-around">
                  <button onClick={() => handleEditform(index)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Edit
                  </button>
                  <button onClick={() => handleRemove(index)} type="button" className="font-medium text-red-600 hover:text-indigo-500">
                    Remove
                  </button>
                </div>
              </li></>)
          }
        </ul></>}
      </div>
    </div>
  )
}

export default UserProfile
