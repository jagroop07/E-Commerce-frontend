import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addOrder, fetchAllOrders, updateOrderEdit } from "./orderApi"

const initialState = {
    status: "idle",
    orders: [],
    currentOrder: null,
    totalOrders: 0
}

export const addOrderAsync = createAsyncThunk(
    'order/addOrder',
    async(order)=>{
        const response = await addOrder(order)
        return response.data
    }
)

export const fetchAllOrdersAsync = createAsyncThunk(
    'order/fetchAllOrders',
    async({sort, pagination})=>{
        console.log(pagination, sort)
        const response = await fetchAllOrders({sort, pagination})
        return response.data
    }
)

export const updateOrderEditAsync = createAsyncThunk(
    'order/updateOrder',
    async(order) => {
        const response = await updateOrderEdit(order)
        return response.data
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrder: (state) => {
            state.currentOrder = null
        }
    },
    extraReducers: (builders) => {
        builders    
                .addCase(addOrderAsync.pending, (state) => {
                    state.status = "pending"
                })
                .addCase(addOrderAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    state.orders.push(action.payload)
                    state.currentOrder = action.payload
                })
                .addCase(fetchAllOrdersAsync.pending, (state) => {
                    state.status = "pending"
                })
                .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    state.orders = action.payload.data
                    state.totalOrders = +action.payload.items
                })
                .addCase(updateOrderEditAsync.pending, (state) => {
                    state.status = "pending"
                })
                .addCase(updateOrderEditAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    const index = state.orders.findIndex(e => e.id === action.payload.id)
                    state.orders[index] = action.payload
                })
    }
})

export const selectCurrentOrder = (state) => state.Order.currentOrder
export const selectAllOrders = (state) => state.Order.orders
export const selectTotalOrders = (state) => state.Order.totalOrders

export const {resetOrder} = orderSlice.actions
export default orderSlice.reducer

