import { useEffect, useState } from 'react'
import { AddressType } from '../types/address.type'
import { TransactionType } from '../types/transaction.type'
import { getAddresses } from '../services/api/addresses.services'
import { getTransactions } from '../services/api/transactions.services'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface TopSearchProps {
  loadingResults: boolean
}

export const TopSearch = ({ loadingResults }: TopSearchProps) => {
  const [topAddresses, setTopAddresses] = useState<AddressType[]>([])
  const [topTransactions, setTopTransactions] = useState<TransactionType[]>([])

  const fetchTopSearches = async () => {
    try {
      const topAddressesData = await getAddresses()
      const topTransactionsData = await getTransactions()

      setTopAddresses(topAddressesData)
      setTopTransactions(topTransactionsData)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error
        toast.error(`Error fetching top searches: ${axiosError.message}`)
      }
    }
  }

  useEffect(() => {
    fetchTopSearches()
  }, [loadingResults])

  return (
    <div className="my-12">
      <div className="mt-8">
        <h2 className="text-lg font-bold">Top Searched Addresses:</h2>
        {topAddresses.length > 0 ? (
          <ul className="space-y-2">
            {topAddresses.slice(0, 5).map((address) => (
              <li
                key={address.address}
                className="flex items-center justify-between px-4 py-2 bg-white rounded-md shadow-sm"
              >
                <span className="text-gray-800">{address.address}</span>
                <span className="pl-2 text-gray-500">{address.counter}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No top searched addresses found.</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold">Top Searched Transactions:</h2>
        {topTransactions.length > 0 ? (
          <ul className="space-y-2">
            {topTransactions.slice(0, 5).map((transaction) => (
              <li
                key={transaction.hash}
                className="flex items-center justify-between px-4 py-2 bg-white rounded-md shadow-sm"
              >
                <span className="text-gray-800">{transaction.hash}</span>
                <span className="pl-6 text-gray-500">
                  {transaction.counter}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No top searched transactions found.</p>
        )}
      </div>
    </div>
  )
}
