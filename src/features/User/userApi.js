import axios from "axios"

export const fetchLoggedInUserOrders = async() => {
    try {
        return axios.get('/order/fetch')
    } catch (error) {
        return console.log(error.message)
    }
}

export const fetchLoggedInUser = async() => {
    try {
        return axios.get('/users')
    } catch (error) {
        return console.log(error.message)
    }
}

export const updateUser = async(update) => {
    try {
        return axios.patch('/users/update', update)
    } catch (error) {
        return console.log(error.message)
    }
}