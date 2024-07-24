import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUser, isAuth, loginUser, signOut } from "./authApi"

const initialState = {
    loggedUser: null,
    message: null,
    checkUser:  false,
    status: 'idle',
    error: null,
    signUp: false
}

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async(data)=>{
        const response = await createUser(data)
        return response.data
    }
)

export const loginUserAsync = createAsyncThunk(
    'user/loginUser',
    async(data)=>{
        const response = await loginUser(data)
        return response.data
    }
)

export const isAuthAsync = createAsyncThunk(
    'user/isAuth',
    async() => {
        const response = await isAuth()
        return response.data
    }
)

export const signOutAsyc = createAsyncThunk(
    'user/logOut',
    async()=>{
        const response = await signOut()
        return response.data
    }
)

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders
                .addCase(createUserAsync.pending, (state) => {
                    state.status = 'loading'
                })
                .addCase(createUserAsync.fulfilled, (state, action) => {
                    state.status = 'success'
                    state.signUp = true
                })
                .addCase(createUserAsync.rejected, (state, action) => {
                    state.status = 'rejected'
                    state.error = action.error.message
                })
                .addCase(loginUserAsync.pending, (state) => {
                    state.status = 'loading'
                })
                .addCase(loginUserAsync.fulfilled, (state, action) => {
                    state.status = 'success'
                    state.loggedUser = action.payload
                })
                .addCase(loginUserAsync.rejected, (state, action) => {
                    state.status = 'rejected'
                    state.error = action.error.message
                })
                .addCase(isAuthAsync.pending, (state) => {
                    state.status = 'loading'
                })
                .addCase(isAuthAsync.fulfilled, (state, action) => {
                    state.status = 'success'
                    state.loggedUser = action.payload
                    state.checkUser = true
                })
                .addCase(isAuthAsync.rejected, (state, action) => {
                    state.status = 'rejected'
                    state.checkUser = true
                })
                .addCase(signOutAsyc.pending, (state) => {
                    state.status = 'loading'
                })
                .addCase(signOutAsyc.fulfilled, (state, action) => {
                    state.status = 'success'
                    state.loggedUser = null
                })
    }
})

export const selectCheckUser = (state) => state.User.checkUser
export const selectsignUp = (state) => state.User.signUp
export const selectRegisteredUser = (state) => state.User.registeredUser
export const selectLoggedUser = (state) => state.User.loggedUser
export const selectError = (state) => state.User.error

export default UserSlice.reducer