import { api } from '../../utils/api'

export const addOrder = async(order) => {
    try {
        return api.post('/order', order)
    } catch (error) {
        return console.log(error.message)
    }
}

export const fetchAllOrders = async({sort, pagination}) => {
    try {
        let queryString = ''

        for(let key in pagination){
            queryString+= `${key}=${pagination[key]}&`
        }

        for(let key in sort){
            queryString+=`${key}=${sort[key]}&`
        }

        console.log(queryString)

        return api.get('/order?'+queryString)
    } catch (error) {
        return console.log(error.message)
    }
}

export const updateOrderEdit = async(order) => {
    try {
        console.log(order)
        return api.patch('/order/'+order.id, order)
    } catch (error) {
        return console.log(error.message)
    }
}