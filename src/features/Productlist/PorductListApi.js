import axios from "axios"

export const fetchBrands = async() => {
    try {
        return axios.get('/brands')
    } catch (error) {
        return console.log(error.message)
    }
}

export const fetchProductbyId = async(id) => {
    try {
        return axios.get('/products/'+id)
    } catch (error) {
        return console.log(error.message)
    }
}

export const fetchCategories = async() => {
    try {
        return axios.get('/categories')
    } catch (error) {
        return console.log(error.message)
    }
}

export const fetchAllFilterProducts = async(filter,sort, pagination)=>{
    console.log(filter, sort)
    let queryString = ''
    for(let key in filter){
        const categoryFilter = filter[key]
        if(categoryFilter.length>0){
            const lastValue = categoryFilter[categoryFilter.length-1]
            queryString += `${key}=${lastValue}&`
        }
    }

    for(let key in sort){
        queryString += `${key}=${sort[key]}&`
    }

    for(let key in pagination){
        queryString += `${key}=${pagination[key]}&`
    }

    return axios.get('/products?'+queryString)
}

export const updateProduct = async(update)=>{
    try {
        return axios.patch('/products/'+update.id, update)
    } catch (error) {
        return console.log(error.message)
    }
}

export const addProduct = async(product) => {
    try {
        return axios.post('/products', product)
    } catch (error) {
        return console.log(error.message)
    }
}

export const deleteProduct = async(id) => {
    try {
        return axios.delete('/products/'+id)
    } catch (error) {
        return console.log(error.message)
    }
}