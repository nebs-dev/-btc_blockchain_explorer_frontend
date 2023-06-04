import axios, { AxiosRequestConfig } from 'axios'
import { SubscriptionType } from '../../types/subscription.type'

const BASE_URL = import.meta.env.VITE_API_URL

export const getSubscriptions = async (
  authToken: string
): Promise<SubscriptionType[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }

  const response = await axios.get(`${BASE_URL}/subscriptions`, config)
  return response.data
}
