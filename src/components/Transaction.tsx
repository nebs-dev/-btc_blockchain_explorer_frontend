import React from 'react'
import { TransactionInfoType } from '../types/transaction-info.type'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  currencyConversionSelector,
  selectedCurrencyState,
  totalBTCOutputState,
  totalBTCInputState,
} from '../store/currencies.store'
import { authTokenState } from '../store/auth.store'
import { subscriptionsState } from '../store/subscriptions.store'
import {
  createTransactionSubscription,
  deleteTransactionSubscription,
} from '../services/api/blockchain-api.services'
import { getSubscriptions } from '../services/api/subscriptions-api.services'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface TransactionProps {
  transactionInfo: TransactionInfoType
}

const Transaction: React.FC<TransactionProps> = ({ transactionInfo }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
  }

  const selectedCurrency = useRecoilValue(selectedCurrencyState)
  const authToken = useRecoilValue(authTokenState)
  const [subscriptions, setSubscriptions] = useRecoilState(subscriptionsState)
  const totalBTCOutput = useRecoilValue(totalBTCOutputState)
  const totalBTCInput = useRecoilValue(totalBTCInputState)

  const isSubscribed = subscriptions.filter(
    (subscription) =>
      subscription.transaction &&
      subscription.transaction.hash === transactionInfo.hash
  ).length

  const convertedValueOutput = useRecoilValue(
    currencyConversionSelector(totalBTCOutput)
  )
  const convertedValueInput = useRecoilValue(
    currencyConversionSelector(totalBTCInput)
  )

  const handleSubscribe = async () => {
    try {
      await createTransactionSubscription(authToken || '', transactionInfo.hash)

      const subscriptions = await getSubscriptions(authToken || '')

      setSubscriptions(subscriptions)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error
        toast.error(`Error subscribing to transaction: ${axiosError.message}`)
      }
    }
  }

  const handleUnsubscribe = async () => {
    try {
      await deleteTransactionSubscription(authToken || '', transactionInfo.hash)
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

  return (
    <div className="p-4 mb-4 text-center border rounded ">
      <h2 className="mb-2 text-xl font-bold">Transaction Details:</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Transaction Hash:</p>
          <p className="font-bold">{transactionInfo.hash}</p>
        </div>
        <div>
          <p className="text-gray-600">Block Height:</p>
          <p className="font-bold">{transactionInfo.block_height}</p>
        </div>
        <div>
          <p className="text-gray-600">Received Time:</p>
          <p className="font-bold">{formatDate(transactionInfo.received)}</p>
        </div>
        <div>
          <p className="text-gray-600">Status:</p>
          <p className="font-bold">{transactionInfo.confirmed}</p>
        </div>
        <div>
          <p className="text-gray-600">Size (in bytes):</p>
          <p className="font-bold">{transactionInfo.size}</p>
        </div>
        <div>
          <p className="text-gray-600">Number of Confirmations:</p>
          <p className="font-bold">{transactionInfo.confirmations}</p>
        </div>
        <div>
          <p className="text-gray-600">Total BTC Input:</p>
          <p className="font-bold">
            {convertedValueInput !== null
              ? `${convertedValueInput.toFixed(2)} ${selectedCurrency}`
              : 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Total BTC Output:</p>
          <p className="font-bold">
            {convertedValueOutput !== null
              ? `${convertedValueOutput.toFixed(2)} ${selectedCurrency}`
              : 'N/A'}
          </p>
        </div>
      </div>
      {authToken && (
        <div>
          {!isSubscribed ? (
            <button
              onClick={handleSubscribe}
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Subscribe to Transaction Updates
            </button>
          ) : (
            <div>
              <p className="mt-4 text-green-600">
                Subscribed to Transaction Updates
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

export default Transaction
