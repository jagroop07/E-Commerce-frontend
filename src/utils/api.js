import axios from 'axios'

export const api = axios.create({
  baseURL: '', // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json'
  }
})


