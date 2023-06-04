import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { TransactionType } from '../../types/transaction.type'
import { toast } from 'react-toastify'

const BASE_URL = import.meta.env.VITE_API_URL

export const getTransactions = async (): Promise<TransactionType[]> => {
  const config: AxiosRequestConfig = {}

  try {
    const response = await axios.get(`${BASE_URL}/transactions`, config)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error
      toast.error(`Error fetching transactions: ${axiosError.message}`)
    }

    throw error
  }
}
