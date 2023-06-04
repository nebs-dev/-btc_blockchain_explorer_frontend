import React, { useState } from 'react'
import { login } from '../../services/api/auth-api.services'
import { useSetRecoilState } from 'recoil'
import { userState } from '../../store/users.store'
import { authTokenState } from '../../store/auth.store'
import { subscriptionsState } from '../../store/subscriptions.store'
import { getSubscriptions } from '../../services/api/subscriptions-api.services'

interface LoginFormProps {
  onSubmit: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const setUser = useSetRecoilState(userState)
  const setAuthToken = useSetRecoilState(authTokenState)
  const setSubscriptions = useSetRecoilState(subscriptionsState)

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await login(email, password)
      const { email: loggedInEmail, name, authToken } = response
      setUser({ email: loggedInEmail, name })
      setAuthToken(authToken)

      const subscriptions = await getSubscriptions(authToken)
      setSubscriptions(subscriptions)

      onSubmit()
    } catch (error) {
      setError('Invalid email or password')
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
      <div className="mb-4 text-black ">
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
        Login
      </button>
    </form>
  )
}

export default LoginForm
