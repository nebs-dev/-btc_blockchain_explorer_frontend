import React, { useState } from 'react'

interface SearchFormProps {
  onSearch: (query: string, type: 'transaction' | 'address') => void
  onSearchTypeChange: () => void
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  onSearchTypeChange,
}: SearchFormProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'transaction' | 'address'>(
    'transaction'
  )

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSearch(searchQuery, searchType)
  }

  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchQuery('')
    onSearchTypeChange()
    setSearchType(event.target.value as 'transaction' | 'address')
  }

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <select
        value={searchType}
        onChange={(event) =>
          handleSearchTypeChange(event as React.ChangeEvent<HTMLSelectElement>)
        }
        className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="transaction">Transaction</option>
        <option value="address">Address</option>
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Enter search query"
        className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!searchQuery}
      >
        Search
      </button>
    </form>
  )
}

export default SearchForm
