import React, { Suspense, useState } from 'react'
import Layout from '../components/layouts/Layout'
import { AddressInfoType } from '../types/address-info.type'
import { TransactionInfoType } from '../types/transaction-info.type'
import {
  fetchAddress,
  fetchTransaction,
} from '../services/api/blockchain-api.services'
import Loader from '../components/Loader'
import SearchForm from '../components/forms/SearchForm'
import { TopSearch } from '../components/TopSearch'
// Import Transaction component
const Transaction = React.lazy(() => import('../components/Transaction'))
// Import Address component
const Address = React.lazy(() => import('../components/Address'))

const HomePage: React.FC = () => {
  const [addressResult, setAddressResult] = useState<AddressInfoType | null>(
    null
  )
  const [transactionResult, setTransactionResult] =
    useState<TransactionInfoType | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (
    query: string,
    type: 'transaction' | 'address'
  ) => {
    setAddressResult(null)
    setTransactionResult(null)
    setIsLoading(true)

    try {
      if (type === 'transaction') {
        const result = await fetchTransaction(query)
        setTransactionResult(result)
      } else {
        const result = await fetchAddress(query)
        setAddressResult(result)
      }
    } catch (error) {
      setTransactionResult(null)
      setAddressResult(null)
    }

    setIsLoading(false)
  }

  const handleSearchTypeChange = () => {
    setAddressResult(null)
    setTransactionResult(null)
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-screen mt-12">
        <div className="flex flex-col items-center">
          <h1 className="mb-6 text-4xl font-bold text-blue-500">
            BTC Blockchain Explorer
          </h1>
          <Suspense fallback={<Loader />}>
            <SearchForm
              onSearch={handleSearch}
              onSearchTypeChange={handleSearchTypeChange}
            />
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {transactionResult && (
                  <Transaction transactionInfo={transactionResult} />
                )}
                {addressResult && <Address addressInfo={addressResult} />}
              </>
            )}
          </Suspense>

          <TopSearch loadingResults={isLoading} />
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
