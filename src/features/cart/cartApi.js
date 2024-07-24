import axios from "axios"

export const addToCart = async(items) =>{
    try {
        return axios.post('/cart', items)
    } catch (error) {
        return console.log(error.message)
    }
}

export const fetchCartItemsbyUserId = async() => {
    try {
        return await axios.get('/cart')
    } catch (error) {
        return console.log(error.message)
    }
}

export const deleteCartItembyId = async(id) => {
    try {
        const response = await axios.delete('/cart/'+id)
        return response
    } catch (error) {
        if(error.response && error.response.status === 404){
            console.log(`item not found with id: ${id}`)
        }
        else{
            console.log(error.message)
        }  
    }
}

export const updateCart = async(item) => {
    try {
        return axios.patch('/cart/'+item.id, item)
    } catch (error) {
        return console.log(error.message)
    }
}

export const resetCart = async() => {
    try {
        const response = await fetchCartItemsbyUserId()
        const items = response.data
        for(let item of items){
            await deleteCartItembyId(item.id)
        }
        return {status: 'success'}
    } catch (error) {
        return console.log(error.message)
    }
}