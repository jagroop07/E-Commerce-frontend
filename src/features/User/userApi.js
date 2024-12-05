import { api } from '../../utils/api'

export const fetchLoggedInUserOrders = async() => {
    try {
        return api.get('/order/fetch')
    } catch (error) {
        return console.log(error.message)
    }
}

export const fetchLoggedInUser = async() => {
    try {
        return api.get('/users')
    } catch (error) {
        return console.log(error.message)
    }
}

export const updateUser = async(update) => {
    try {
        return api.patch('/users/update', update)
    } catch (error) {
        return console.log(error.message)
    }
}