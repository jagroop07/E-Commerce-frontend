import { api } from '../../utils/api'

export const fetchBrands = async() => {
    try {
        return api.get('/brands')
    } catch (error) {
        return console.log(error.message)
    }
}

export const fetchProductbyId = async(id) => {
    try {
        return api.get('/products/'+id)
    } catch (error) {
        return console.log(error.message)
    }
}

export const fetchCategories = async() => {
    try {
        return api.get('/categories')
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

    return api.get('/products?'+queryString)
}

export const updateProduct = async(update)=>{
    try {
        return api.patch('/products/'+update.id, update)
    } catch (error) {
        return console.log(error.message)
    }
}

export const addProduct = async(product) => {
    try {
        return api.post('/products', product)
    } catch (error) {
        return console.log(error.message)
    }
}

export const deleteProduct = async(id) => {
    try {
        return api.delete('/products/'+id)
    } catch (error) {
        return console.log(error.message)
    }
}