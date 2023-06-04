import { atom } from 'recoil'
import { SubscriptionType } from '../types/subscription.type'
import { localStorageEffect } from './effects/local-storage-effect-store'

// Define the atom to store the subscriptions state
export const subscriptionsState = atom<SubscriptionType[]>({
  key: 'subscriptionsState',
  default: [],
  effects: [localStorageEffect('subscriptions')],
})
