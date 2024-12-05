import { api } from '../../utils/api'

export const createUser = async singUpInfo => {
  try {
    return api.post('/auth/signup', singUpInfo)
  } catch (error) {
    return console.log(error.message)
  }
}

export const loginUser = async loginInfo => {
  try {
    const response = await api.post('/auth/login', loginInfo)
    return response
  } catch (error) {
    throw Error(error.response?.data?.message)
  }
}

export const isAuth = async () => {
  try {
    const response = await api.get('/users/check')
    return response
  } catch (error) {
    console.log(error.message)
  }
}

export const signOut = async () => {
  return api.get('/auth/logout')
}
