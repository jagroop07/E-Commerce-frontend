import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from "./userApi"

const initialState = {
    status: 'idle',
    orders: [],
    userInfo: null
}

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    'orders/fetchUserOrders',
    async()=>{
        const response = await fetchLoggedInUserOrders()
        return response.data
    }
)

export const fetchLoggedInUserAsync = createAsyncThunk(
    'user/LoggedUser',
    async()=>{
        const response = await fetchLoggedInUser()
        return response.data
    }
)
export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async(update)=>{
        const response = await updateUser(update)
        return response.data
    }
)

const userSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders
                .addCase(fetchLoggedInUserOrdersAsync.pending, (state)=>{
                    state.status = "pending"
                })
                .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    state.orders = action.payload
                })
                .addCase(updateUserAsync.pending, (state)=>{
                    state.status = "pending"
                })
                .addCase(updateUserAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    state.userInfo = action.payload
                })
                .addCase(fetchLoggedInUserAsync.pending, (state)=>{
                    state.status = "pending"
                })
                .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
                    state.status = "success"
                    state.userInfo = action.payload
                })
    }
})

export const selectLoggedUserInfo = (state) => state.UserOrder.userInfo
export const selectUserOrder = (state) => state.UserOrder.orders

export default userSlice.reducer