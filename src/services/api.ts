import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://burger-myapi.herokuapp.com'
})
