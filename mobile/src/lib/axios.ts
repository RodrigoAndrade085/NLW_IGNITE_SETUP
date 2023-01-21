import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.0.0.195:3333',
  // baseURL: 'http://localhost:3333',
  headers: {
    Accept: 'application/json',
   'Content-Type': 'application/json; charset=utf-8'
 }
})