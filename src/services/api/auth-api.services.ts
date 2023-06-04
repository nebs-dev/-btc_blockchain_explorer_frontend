import axios from 'axios'
import { LoginResponseType } from '../../types/login-response.type'

const BASE_URL = import.meta.env.VITE_API_URL

export const login = async (
  email: string,
  password: string
): Promise<LoginResponseType> => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  })

  return response.data
}

export const register = async (
  email: string,
  name: string,
  password: string
) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, {
    email,
    name,
    password,
  })

  return response.data
}
