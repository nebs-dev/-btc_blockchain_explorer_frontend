import axios, { AxiosRequestConfig } from 'axios'
import { AddressType } from '../../types/address.type'

const BASE_URL = import.meta.env.VITE_API_URL

export const getAddresses = async (): Promise<AddressType[]> => {
  const config: AxiosRequestConfig = {}
  const response = await axios.get(`${BASE_URL}/addresses`, config)
  return response.data
}
