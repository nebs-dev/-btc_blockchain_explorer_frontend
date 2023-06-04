import React, { Suspense, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SubscriptionsPage from './pages/SubscriptionsPage'

import './styles/index.css'
import { useRecoilValue } from 'recoil'
import { authTokenState } from './store/auth.store'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import SocketNotification from './components/SocketNotification'

const ProtectedRoute = ({ children }: any) => {
  const authToken = useRecoilValue(authTokenState)
  const navigate = useNavigate()

  useEffect(() => {
    if (!authToken) {
      navigate('/', { replace: true })
    }
  }, [authToken, navigate])

  return children
}

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer />
      <SocketNotification />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/subscriptions"
            element={
              <ProtectedRoute>
                <SubscriptionsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App
