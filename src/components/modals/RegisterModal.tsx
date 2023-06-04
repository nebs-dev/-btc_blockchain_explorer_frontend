import React from 'react'
import RegisterForm from '../forms/RegisterForm'
import { XMarkIcon } from '@heroicons/react/20/solid'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null
  }

  const handleRegister = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative p-8 bg-white rounded-md">
        <button
          onClick={onClose}
          className="absolute text-gray-500 transition duration-200 hover:text-gray-600 focus:outline-none top-2 right-2"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
        <h2 className="mb-4 text-2xl font-bold text-center text-blue-500">
          Register
        </h2>
        <RegisterForm onSubmit={handleRegister} />{' '}
      </div>
    </div>
  )
}

export default RegisterModal
