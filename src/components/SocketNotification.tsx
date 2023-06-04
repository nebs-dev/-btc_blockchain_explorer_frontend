import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import io from 'socket.io-client'
import { subscriptionsState } from '../store/subscriptions.store'

const SocketNotification = () => {
  const subscriptions = useRecoilValue(subscriptionsState)

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_SOCKET_URL) // Connect to the server with the /api prefix

    socket.on('push_notification', (notification) => {
      let toastNotification = ''

      // If notification is a transaction
      if (notification.hash && notification.confirmations) {
        const existingSubscription = subscriptions.find(
          (subscription) =>
            subscription.transaction &&
            subscription.transaction.hash === notification.hash
        )

        if (existingSubscription) {
          toastNotification = JSON.stringify(notification)
          console.log('TRANSACTION NOTIFICATION:', toastNotification)
          toast.info(toastNotification, {
            autoClose: 10 * 1000,
          })
        }
      }

      // If notification is an address
      if (notification.address && notification.balance) {
        const existingSubscription = subscriptions.find(
          (subscription) =>
            subscription.address &&
            subscription.address.address === notification.address
        )

        if (existingSubscription) {
          toastNotification = JSON.stringify(notification)
          console.log('ADDRESS NOTIFICATION:', toastNotification)
          toast.info(toastNotification, {
            autoClose: 10 * 1000,
          })
        }
      }

      console.log('Received notification:', notification)
    })

    return () => {
      socket.disconnect() // Disconnect socket when component unmounts
    }
  }, [subscriptions])

  return null
}

export default SocketNotification
