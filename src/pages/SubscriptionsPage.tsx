import React from 'react'
import Layout from '../components/layouts/Layout'
import { subscriptionsState } from '../store/subscriptions.store'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  deleteAddressSubscription,
  deleteTransactionSubscription,
} from '../services/api/blockchain-api.services'
import { authTokenState } from '../store/auth.store'
import { getSubscriptions } from '../services/api/subscriptions-api.services'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const SubscriptionsPage: React.FC = () => {
  const authToken = useRecoilValue(authTokenState)
  const setSubscriptions = useSetRecoilState(subscriptionsState)

  const subscriptions = useRecoilValue(subscriptionsState)

  const transactionsSub = subscriptions.filter(
    (subscription) => subscription.transaction
  )
  const addressesSub = subscriptions.filter(
    (subscription) => subscription.address
  )

  const handleTransactionUnsubscribe = async (hash?: string) => {
    if (hash) {
      try {
        await deleteTransactionSubscription(authToken || '', hash)
        const subscriptions = await getSubscriptions(authToken || '')
        setSubscriptions(subscriptions)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError: AxiosError = error
          toast.error(
            `Error unsubscribing from transaction: ${axiosError.message}`
          )
        }
      }
    }
  }

  const handleAddressUnsubscribe = async (address?: string) => {
    if (address) {
      try {
        await deleteAddressSubscription(authToken || '', address)
        const subscriptions = await getSubscriptions(authToken || '')
        setSubscriptions(subscriptions)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError: AxiosError = error
          toast.error(`Error unsubscribing from address: ${axiosError.message}`)
        }
      }
    }
  }

  return (
    <Layout>
      <div className="container max-w-lg py-8 mx-auto">
        <div>
          <h2 className="mb-4 font-bold text-md">Transactions</h2>
          {transactionsSub.map((sub) => (
            <div
              key={sub.transaction?.hash}
              className="flex items-center justify-between mb-4"
            >
              <p className="text-xs">{sub.transaction?.hash}</p>
              <button
                className="px-2 py-2 ml-auto text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() =>
                  handleTransactionUnsubscribe(sub.transaction?.hash)
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="w-full">
          <h2 className="my-8 font-bold text-md">Addresses</h2>
          {addressesSub.map((sub) => (
            <div
              className="flex items-center justify-between mb-4"
              key={sub.address?.address}
            >
              <p className="text-xs">{sub.address?.address}</p>
              <button
                className="px-2 py-2 ml-auto text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => handleAddressUnsubscribe(sub.address?.address)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default SubscriptionsPage
