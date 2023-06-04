import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedCurrencyState } from '../store/currencies.store'
import { authTokenState } from '../store/auth.store'
import LoginModal from './modals/LoginModal'
import RegisterModal from './modals/RegisterModal'
import { userState } from '../store/users.store'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useRecoilState(
    selectedCurrencyState
  )
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [authToken, setAuthToken] = useRecoilState(authTokenState)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const user = useRecoilValue(userState)

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(event.target.value)
  }

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true)
  }

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setAuthToken(null)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <header className="flex items-center justify-between px-4 py-2 text-white bg-blue-500">
      <Link to="/" className="block mt-6 mb-6">
        <h1 className="text-2xl font-bold">BTC Blockchain Explorer</h1>
      </Link>
      <div className="flex items-center space-x-2">
        <p className="text-lg">Select Currency:</p>
        <select
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          className="px-3 py-1 text-blue-800 bg-white rounded-md"
        >
          <option value="BTC">BTC</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div>
        {authToken && user ? (
          <div className="relative">
            <button
              className="mr-4 font-medium text-white"
              onClick={toggleDropdown}
            >
              Hello, {user.name}
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 py-2 mt-2 text-black bg-white rounded shadow">
                <li>
                  <a
                    href="/subscriptions"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Subscriptions
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <>
            <button onClick={openRegisterModal} className="mr-4">
              Register
            </button>
            <button onClick={openLoginModal}>Login</button>
          </>
        )}
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
      />
    </header>
  )
}

export default Header
