import axios from "axios"

export const addOrder = async(order) => {
    try {
        return axios.post('/order', order)
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
            queryString+=`${key}=${sort[key]}`
        }

        console.log(queryString)

        return axios.get('/order?'+queryString)
    } catch (error) {
        return console.log(error.message)
    }
}

export const updateOrderEdit = async(order) => {
    try {
        console.log(order)
        return axios.patch('/order/'+order.id, order)
    } catch (error) {
        return console.log(error.message)
    }
}