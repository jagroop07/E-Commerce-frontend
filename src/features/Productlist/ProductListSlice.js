import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addProduct, deleteProduct, fetchAllFilterProducts, /*fetchAllproducts,*/ fetchBrands, fetchCategories, fetchProductbyId, updateProduct } from "./PorductListApi"

const initialState = {
    products: [],
    status: 'idle',
    error: null,
    totalItems: 0,
    brands: [],
    categories: [],
    selectedProduct: null
}

export const fetchAllFilterProductsAsync = createAsyncThunk(
    'products/fetchAllfilters',
    async({filter, sort, pagination})=>{
        const response = await fetchAllFilterProducts(filter, sort, pagination)
        console.log(response)
        return {products: response.data.data, totalItems: +response.data.items}
    }
)

export const fetchBrandsAsync = createAsyncThunk(
    'products/fetchBrands',
    async()=>{
        const response = await fetchBrands()
        return response.data
    }
)

export const fetchCategoriesAsync = createAsyncThunk(
    'products/fetchCategories',
    async()=>{
        const response = await fetchCategories()
        return response.data
    }
)

export const fetchProductbyIdAsync = createAsyncThunk(
    'product/fetchProductbyId',
    async(id)=>{
        const response = await fetchProductbyId(id)
        return response.data
    }
)

export const updateProductAsync = createAsyncThunk(
    'product/updateProduct',
    async(update)=>{
        const response = await updateProduct(update)
        return response.data
    }
)

export const addProductAsync = createAsyncThunk(
    'product/addProduct',
    async(product)=>{
        const response = await addProduct(product)
        return response.data
    }
)

export const deleteProductAsync = createAsyncThunk(
    'product/deleteProduct',
    async(id) => {
        const response = await deleteProduct(id)
        return response.data
    }
)

const productListSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builders) =>{
        builders
                .addCase(fetchAllFilterProductsAsync.pending, (state)=>{
                    state.status = "loading"
                })
                .addCase(fetchAllFilterProductsAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    state.products = action.payload.products
                    state.totalItems = action.payload.totalItems
                })
                .addCase(fetchAllFilterProductsAsync.rejected, (state, action) => {
                    state.status = "rejected"
                    state.error = action.error.message
                })
                .addCase(fetchBrandsAsync.pending, (state)=>{
                    state.status = "loading"
                })
                .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    state.brands = action.payload
                })
                .addCase(fetchBrandsAsync.rejected, (state, action) => {
                    state.status = "rejected"
                    state.error = action.error.message
                })
                .addCase(fetchCategoriesAsync.pending, (state)=>{
                    state.status = "loading"
                })
                .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    state.categories = action.payload
                })
                .addCase(fetchCategoriesAsync.rejected, (state, action) => {
                    state.status = "rejected"
                    state.error = action.error.message
                })
                .addCase(fetchProductbyIdAsync.pending, (state)=>{
                    state.status = "loading"
                })
                .addCase(fetchProductbyIdAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    console.log(action.payload)
                    state.selectedProduct = action.payload
                })
                .addCase(fetchProductbyIdAsync.rejected, (state, action) => {
                    state.status = "rejected"
                    state.error = action.error.message
                })
                .addCase(updateProductAsync.pending, (state)=>{
                    state.status = "loading"
                })
                .addCase(updateProductAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    const index = state.products.findIndex(e => e.id === action.payload.id)
                    state.products[index] = action.payload

                })
                .addCase(addProductAsync.pending, (state)=>{
                    state.status = "loading"
                })
                .addCase(addProductAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    state.products.push(action.payload)
                })
                .addCase(deleteProductAsync.pending, (state)=>{
                    state.status = "loading"
                })
                .addCase(deleteProductAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    const index = state.products.findIndex(e => e.id === action.payload.id)
                    state.products.splice(index,1)
                    state.totalItems = state.totalItems - 1
                })
    }
})

export const selectAllproducts = (state) => state.Product.products
export const selectTotalItems = (state) => state.Product.totalItems
export const selectCategories = (state) => state.Product.categories
export const selectBrands = (state) => state.Product.brands
export const selectProduct = (state) => state.Product.selectedProduct

export default productListSlice.reducer

