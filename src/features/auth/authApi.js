import axios from "axios"

export const createUser = async(singUpInfo) => {
    try {
        return axios.post('/auth/signup', singUpInfo)
    } catch (error) {
        return console.log(error.message)
    }
}

export const loginUser = async(loginInfo) => {
    try {
        const response = await axios.post('/auth/login',loginInfo)
        return response
    } catch (error) {
        throw Error(error.response?.data?.message)
    }
}

export const isAuth = async() => {
    try {
        const response = await axios.get('/users/check')
        return response
    } catch (error) {
        console.log(error.message)
    }
}

export const signOut = async() => {
    return axios.get('/auth/logout')
}