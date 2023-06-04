import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { register } from '../../services/api/auth-api.services'
import { userState } from '../../store/users.store'
import { authTokenState } from '../../store/auth.store'
import { subscriptionsState } from '../../store/subscriptions.store'
import { getSubscriptions } from '../../services/api/subscriptions-api.services'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface RegisterFormProps {
  onSubmit: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')

  const setUser = useSetRecoilState(userState)
  const setAuthToken = useSetRecoilState(authTokenState)
  const setSubscriptions = useSetRecoilState(subscriptionsState)
  const [error, setError] = useState('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await register(email, name, password)
      const {
        email: registeredEmail,
        name: registeredName,
        authToken,
      } = response
      setUser({ email: registeredEmail, name: registeredName })
      setAuthToken(authToken)
      const subscriptions = await getSubscriptions(authToken)
      setSubscriptions(subscriptions)

      onSubmit()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error
        toast.error(`Error registering a user: ${axiosError.message}`)
      }

      setError('Failed to register a user')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="text-left">
      <div className="mb-4 text-black">
        <label htmlFor="email" className="block mb-2 text-blue-500">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4 text-black">
        <label htmlFor="name" className="block mb-2 text-blue-500">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4 text-black">
        <label htmlFor="password" className="block mb-2 text-blue-500">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="px-4 py-2 border rounded-md"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md"
      >
        Register
      </button>
    </form>
  )
}

export default RegisterForm
