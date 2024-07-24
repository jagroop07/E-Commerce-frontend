import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon,StarIcon ,FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductAsync, fetchAllFilterProductsAsync, fetchBrandsAsync, fetchCategoriesAsync, selectAllproducts, selectBrands, selectCategories, selectTotalItems } from '../Productlist/ProductListSlice'
import { ITEMS_PER_PAGE } from '../../app/constants'
import { Link } from 'react-router-dom'
import Pagination from '../common/Pagination'
import { toast, ToastContainer } from 'react-toastify'

const sortOptions = [
  { name: 'Best Rating', sort: 'rating', value: -1, current: false },
  { name: 'Price: Low to High', sort: 'price', value: 1,  current: false },
  { name: 'Price: High to Low', sort: 'price', value: -1, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminProductList() {
    const dispatch=useDispatch()
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [filter, setFilter] = useState({})
    const [sort , setSort] = useState({})
    const [page, setPage] = useState(1)
    const products = useSelector(selectAllproducts)
    const totalItems = useSelector(selectTotalItems)
    const categories = useSelector(selectCategories)
    const brands = useSelector(selectBrands)

    const filters = [
        {
          id: 'category',
          name: 'Category',
          options: categories,
        },
        {
          id: 'brand',
          name: 'Brand',
          options: brands,
        },
    ]

    function handleFilter(e,section, option){
        const newfilter = {...filter}
        if(e.target.checked){
            if(newfilter[section.id]){
                newfilter[section.id].push(option.value)
            }
            else{
                newfilter[section.id] = [option.value]
            }
        }
        else{
            const index = newfilter[section.id].findIndex(e => e === option.value)
            newfilter[section.id].splice(index,1)
        }
        setFilter(newfilter)
    }

    function handleSort(option){
        const newSort = { _sort: option.sort, _order: option.value}
        setSort(newSort)
    }

    function handlePage(page){
        setPage(page)
    }

    useEffect(()=>{
        const pagination = {_page: page, _per_page: ITEMS_PER_PAGE}
        dispatch(fetchAllFilterProductsAsync({filter, sort, pagination}))
    },[dispatch, filter, sort, page, totalItems])

    useEffect(()=>{
        setPage(1)
    },[totalItems, sort])

    useEffect(()=>{
        dispatch(fetchCategoriesAsync())
        dispatch(fetchBrandsAsync())
    },[dispatch])

    function handleDeleteProduct(id){
      // const product = products.find(e => e.id === id)
      // const updateProduct = {...product}
      // updateProduct.delete = true
      // dispatch(updateProductAsync(updateProduct))       //we can use this and just filter out the product from the 
                                                          //backend and show the delete message to the admin
      dispatch(deleteProductAsync(id))
      toast.error('product deleted successfully')
    }

  return (
    <div className="bg-white">
      <ToastContainer/>
      <div>
        <MobileFilter filters={filters} handleFilter={handleFilter} mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen}></MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 ">
            <h1 className="lg:text-3xl mb-2 text-2xl font-bold mt-16 tracking-tight text-gray-900">All Products</h1>

            <div className="flex mb-2 items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (

                      <MenuItem key={option.name}>
                        {({ focus }) => (
                          <a
                            href={option.href}
                            onClick={() => handleSort(option)}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              focus ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm',
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
                >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter filters={filters} handleFilter={handleFilter}></DesktopFilter>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductGrid handleDeleteProduct={handleDeleteProduct} products={products}></ProductGrid>
              </div>
            </div>
          </section>

          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <Pagination
                handlePage={handlePage}
                page={page}
                totalItems={totalItems}
            >
            </Pagination>
          </div>
        </main>
      </div>
    </div>
  )
}

function ProductGrid({products, handleDeleteProduct}){
    return(
        <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
          <div className='my-8'><Link to='/admin/product-form/new' className="px-5 py-2 text-sm font-semibold tracking-wide bg-green-500 text-white rounded-md hover:bg-green-600">Add New Product</Link></div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
            {products.map((product) => /*!product.delete &&*/ <div className='rounded-lg border-[2px] p-2'>
              <Link to={`/admin/product-details/${product.id}`} key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-fit w-fit object-cover object-center lg:h-fit lg:w-fit"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                       <div href={product.thumbnail}>   {/* href={product.href} */}
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </div>
                    </h3>
                    <p className="mt-1 inline text-sm text-gray-500">{product.category} -</p>
                    <p className="mt-1 ms-3 inline text-sm text-gray-500"><StarIcon className='h-4 w-4 inline mt-[-4px] me-1'/>{product.rating}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
              </Link>
              <div className='flex flex-row justify-between my-2'>
                  <Link
                    to={`/admin/product-form/${product.id}`}
                    className="px-5 py-1 text-sm font-semibold tracking-wide bg-blue-500 text-white rounded-md hover:bg-blue-600">Edit</Link>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    type='button'
                    className="px-5 py-1 text-sm font-semibold tracking-wide bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
              </div></div>
            )}
          </div>
        </div>
      </div>
    )
}

function DesktopFilter({handleFilter, filters}){
    return(
        <form className="hidden lg:block">
        {filters.map((section) => (
          <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">{section.name}</span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          onChange={(e) => handleFilter(e,section, option)}
                          defaultChecked={option.checked}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    )
}

function MobileFilter({mobileFiltersOpen,setMobileFiltersOpen, handleFilter, filters}){
    return(
        <Dialog className="relative z-40 lg:hidden" open={mobileFiltersOpen} onClose={setMobileFiltersOpen}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  onChange={(e) => handleFilter(e,section, option)}
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>
    )
}