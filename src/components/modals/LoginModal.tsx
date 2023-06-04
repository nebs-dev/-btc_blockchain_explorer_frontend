import React from 'react'
import LoginForm from '../forms/LoginForm'
import { XMarkIcon } from '@heroicons/react/20/solid'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, isOpen }) => {
  if (!isOpen) {
    return null
  }

  const handleLogin = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="relative p-4 bg-white rounded-lg">
        <div className="flex items-center mb-4">
          <button
            onClick={onClose}
            className="absolute text-gray-500 transition duration-200 hover:text-gray-600 focus:outline-none top-2 right-2"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <h2 className="mb-4 text-2xl font-bold text-center text-blue-500">
          Login
        </h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  )
}

export default LoginModal
