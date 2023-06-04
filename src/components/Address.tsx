import React from 'react'
import { AddressInfoType } from '../types/address-info.type'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  currencyConversionSelector,
  selectedCurrencyState,
} from '../store/currencies.store'
import { authTokenState } from '../store/auth.store'
import { subscriptionsState } from '../store/subscriptions.store'
import {
  createAddressSubscription,
  deleteAddressSubscription,
} from '../services/api/blockchain-api.services'
import { getSubscriptions } from '../services/api/subscriptions-api.services'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface AddressProps {
  addressInfo: AddressInfoType
}

const Address: React.FC<AddressProps> = ({ addressInfo }) => {
  const selectedCurrency = useRecoilValue(selectedCurrencyState)
  const authToken = useRecoilValue(authTokenState)
  const [subscriptions, setSubscriptions] = useRecoilState(subscriptionsState)

  const isSubscribed = subscriptions.filter(
    (subscription) =>
      subscription.address &&
      subscription.address.address === addressInfo.address
  ).length

  const convertedTotalReceived = useRecoilValue(
    currencyConversionSelector(addressInfo.total_received)
  )
  const convertedTotalBalance = useRecoilValue(
    currencyConversionSelector(addressInfo.balance)
  )
  const convertedUnconfirmedBalance = useRecoilValue(
    currencyConversionSelector(addressInfo.unconfirmed_balance)
  )
  const convertedCurrentBalance = useRecoilValue(
    currencyConversionSelector(addressInfo.final_balance)
  )

  const handleSubscribe = async () => {
    try {
      await createAddressSubscription(authToken || '', addressInfo.address)

      const subscriptions = await getSubscriptions(authToken || '')
      setSubscriptions(subscriptions)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error
        toast.error(`Error subscribing to address: ${axiosError.message}`)
      }
    }
  }

  const handleUnsubscribe = async () => {
    try {
      await deleteAddressSubscription(authToken || '', addressInfo.address)
      const subscriptions = await getSubscriptions(authToken || '')
      setSubscriptions(subscriptions)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error
        toast.error(`Error unsubscribing from address: ${axiosError.message}`)
      }
    }
  }

  return (
    <div className="p-4 mb-4 border rounded">
      <h2 className="mb-2 text-xl font-bold text-center">Address Details:</h2>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <span className="font-bold">Number of Confirmed Transactions:</span>{' '}
          {addressInfo.n_tx}
        </p>
        <p>
          <span className="font-bold">Total BTC Received:</span>{' '}
          {convertedTotalReceived} {selectedCurrency}
        </p>
        <p>
          <span className="font-bold">Total BTC Balance:</span>{' '}
          {convertedTotalBalance} {selectedCurrency}
        </p>
        <p>
          <span className="font-bold">Total BTC Unconfirmed Balance:</span>{' '}
          {convertedUnconfirmedBalance} {selectedCurrency}
        </p>
        <p>
          <span className="font-bold">Current Address Balance:</span>{' '}
          {convertedCurrentBalance} {selectedCurrency}
        </p>
      </div>
      {authToken && (
        <div className="text-center">
          {!isSubscribed ? (
            <button
              onClick={handleSubscribe}
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Subscribe to Address Updates
            </button>
          ) : (
            <div>
              <p className="mt-4 text-green-600">
                Subscribed to Address Updates
              </p>
              <button
                onClick={handleUnsubscribe}
                className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Unsubscribe
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Address
