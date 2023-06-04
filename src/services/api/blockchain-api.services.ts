import axios, { AxiosError } from 'axios'
import { SubscriptionType } from '../../types/subscription.type'
import { toast } from 'react-toastify'

const BASE_URL = import.meta.env.VITE_API_URL

export const fetchAddress = async (address: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/blockchain/address`, {
      params: { address },
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error
      toast.error(`Error fetching address: ${axiosError.message}`)
    }

    throw error
  }
}

export const fetchTransaction = async (hash: string) => {
  try {
    // Make an HTTP request using Axios
    const response = await axios.get(`${BASE_URL}/blockchain/transaction`, {
      params: { hash },
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error
      toast.error(`Error fetching transaction: ${axiosError.message}`)
    }

    throw error
  }
}

export const createTransactionSubscription = async (
  authToken: string,
  hash: string
): Promise<SubscriptionType> => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }

  const response = await axios.post(
    `${BASE_URL}/blockchain/transaction/subscribe`,
    { hash },
    config
  )
  return response.data
}

export const deleteTransactionSubscription = async (
  authToken: string,
  hash: string
): Promise<boolean> => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }

  const response = await axios.post(
    `${BASE_URL}/blockchain/transaction/unsubscribe`,
    { hash },
    config
  )
  return response.data
}

export const createAddressSubscription = async (
  authToken: string,
  address: string
): Promise<SubscriptionType> => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }

  const response = await axios.post(
    `${BASE_URL}/blockchain/address/subscribe`,
    { address },
    config
  )

  return response.data
}

export const deleteAddressSubscription = async (
  authToken: string,
  address: string
): Promise<boolean> => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }

  const response = await axios.post(
    `${BASE_URL}/blockchain/address/unsubscribe`,
    { address },
    config
  )
  return response.data
}
