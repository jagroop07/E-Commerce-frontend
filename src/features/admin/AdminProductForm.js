import { useDispatch, useSelector } from 'react-redux'
import {useNavigate, useParams } from 'react-router-dom'
import { addProductAsync, selectAllproducts, selectBrands, selectCategories, updateProductAsync } from '../Productlist/ProductListSlice'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function AdminProductForm() {
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const products = useSelector(selectAllproducts)
    let {register, reset, handleSubmit, setValue, formState: {errors}} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let {id} = useParams()

    function handleAdminProduct(data){
        const product = {...data}
        product.images = [product.image1, product.image2, product.image3]
        delete product['image1']
        delete product['image2']
        delete product['image3']
        product.price = +product.price
        product.discountPercentage = +product.discountPercentage
        product.stock = +product.stock

        if(id!=="new"){
            product.id = id
            dispatch(updateProductAsync(product));
            navigate('/admin')
        }
        else{
            product.rating = 4
            dispatch(addProductAsync(product))
            toast.success('New product added')
            reset()
        }
    }

    useEffect(()=>{
        if(id!=="new"){ 
            const product = products.find(e => e.id===id)         //we can also call fetchProductById to get the  product
            setValue('title', product.title)                     //and use selectedProduct state for the product
            setValue('description', product.description)
            setValue('price', product.price)
            setValue('discountPercentage', product.discountPercentage)
            setValue('stock', product.stock)
            setValue('brand', product.brand)
            setValue('category', product.category)
            setValue('thumbnail', product.thumbnail)
            setValue('image1', product.images[0])
            setValue('image2', product.images[1]?product.images[1]:'')
            setValue('image3', product.images[2]?product.images[2]:'')
        }
    },[id, setValue, products])

  return (
    <form noValidate onSubmit={handleSubmit(handleAdminProduct)} className='bg-white p-10'>
      <ToastContainer/>
      <div className="space-y-12">
        <div>
          {id==="new"?<h2 className="text-xl font-semibold leading-7 text-gray-900">Add Product</h2>: <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Product</h2>}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                    id="title"
                    {...register('title', {required: 'product name is required'})}
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register('description', {required: 'description is required'})}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about product.</p>
            </div>

            {/* <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="3">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  {...register('price', {required: 'price is required'})}
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Discount
              </label>
              <div className="mt-2">
                <input
                  id="discountPercentage"
                  {...register('discountPercentage', {required: 'discount is required'})}
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.discountPercentage && <p className='text-red-500'>{errors.discountPercentage.message}</p>}
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Stock
              </label>
              <div className="mt-2">
                <input
                  id="stock"
                  {...register('stock', {required: 'stock is required'})}
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.stock && <p className='text-red-500'>{errors.stock.message}</p>}
            </div>

            <div className="sm:col-span-3 me-4">
              <label htmlFor="brands" className="block text-sm font-medium leading-6 text-gray-900">
                Brands
              </label>
              <div className="mt-2">
                <select
                  id="brands"
                  {...register('brand',{required: 'brand is required'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">-----choose brand------</option>
                  {brands.map(brand => <option value={brand.value}>{brand.label}</option>)}
                </select>
              </div>
              {errors.brand && <p className='text-red-500'>{errors.brand.message}</p>}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  {...register('category', {required: 'category is required'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">-----choose category------</option>
                  {categories.map(brand => <option value={brand.value}>{brand.label}</option>)}
                </select>
              </div>
              {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
            </div>

            <div className="col-span-full">
              <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                Thumbnail
              </label>
              <div className="mt-2">
                <input
                  id="thumbnail"
                  {...register('thumbnail', {required: 'thumbnail is required'})}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.thumbnail && <p className='text-red-500'>{errors.thumbnail.message}</p>}
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="image-1" className="block text-sm font-medium leading-6 text-gray-900">
                Image-1
              </label>
              <div className="mt-2">
                <input
                  id="image-1"
                  {...register('image1', {required: 'image is required'})}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.image1 && <p className='text-red-500'>{errors.image1.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="image-2" className="block text-sm font-medium leading-6 text-gray-900">
                Image-2
              </label>
              <div className="mt-2">
                <input
                  id="image-2"
                  {...register('image2')}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="image-3" className="block text-sm font-medium leading-6 text-gray-900">
                Image-3
              </label>
              <div className="mt-2">
                <input
                  id="image-3"
                  {...register('image3')}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border-b border-gray-900/10 pb-12">

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div> */}
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={() => navigate('/admin')} type='button' className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
