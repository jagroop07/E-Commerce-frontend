import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addToCart, deleteCartItembyId, fetchCartItemsbyUserId, resetCart, updateCart } from "./cartApi"

const initialState = {
    items: [],
    cartCheck: false,
    state: 'idle',
    error: null
}

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async(items)=>{
        const response = await addToCart(items)
        return response.data
    }
)

export const fetchCartItemsbyUserIdAsync = createAsyncThunk(
    'cart/fetchCartbyUserId',
    async()=>{
        const response = await fetchCartItemsbyUserId()
        return response.data
    }
)

export const updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async(item) => {
        const response = await updateCart(item)
        return response.data
    }
)

export const deleteCartItembyIdAsync = createAsyncThunk(
    'cart/deleteCartItem',
    async(id) => {
        const response = await deleteCartItembyId(id)
        return response.data
    }
)

export const resetCartAsync = createAsyncThunk(
    'cart/resetCart',
    async() => {
        const response = await resetCart()
        return response.data
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders    
                .addCase(addToCartAsync.pending,(state)=>{
                    state.status = 'pending'
                })
                .addCase(addToCartAsync.fulfilled,(state, action)=>{
                    state.status = 'success'
                    state.items.push(action.payload)
                })
                .addCase(addToCartAsync.rejected, (state, action) => {
                    state.status = 'rejected'
                    state.error = action.error.message
                })
                .addCase(fetchCartItemsbyUserIdAsync.pending,(state)=>{
                    state.status = 'pending'
                })
                .addCase(fetchCartItemsbyUserIdAsync.fulfilled,(state, action)=>{
                    state.status = 'success'
                    state.items = action.payload
                    state.cartCheck = true
                })
                .addCase(fetchCartItemsbyUserIdAsync.rejected, (state, action) => {
                    state.status = 'rejected'
                    state.error = action.error.message
                    state.cartCheck = true
                })
                .addCase(updateCartAsync.pending,(state)=>{
                    state.status = 'pending'
                })
                .addCase(updateCartAsync.fulfilled,(state, action)=>{
                    state.status = 'success'
                    const index = state.items.findIndex(el => el.id === action.payload.id)
                    state.items[index] = action.payload
                })
                .addCase(deleteCartItembyIdAsync.pending,(state)=>{
                    state.status = 'pending'
                })
                .addCase(deleteCartItembyIdAsync.fulfilled,(state, action)=>{
                    state.status = 'success'
                    const index = state.items.findIndex(el => el.id === action.payload.id)
                    state.items.splice(index, 1)
                })
                .addCase(resetCartAsync.pending,(state)=>{
                    state.status = 'pending'
                })
                .addCase(resetCartAsync.fulfilled,(state, action)=>{
                    state.status = 'success'
                    state.items = []
                })
    }
})

export const selectCartCheck = (state) => state.Cart.cartCheck
export const selectCartItems = (state) => state.Cart.items

export default cartSlice.reducer