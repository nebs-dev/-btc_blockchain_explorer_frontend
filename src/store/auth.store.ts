import { atom } from 'recoil'
import { localStorageEffect } from './effects/local-storage-effect-store'

export const authTokenState = atom({
  key: 'authToken',
  default: null,
  effects: [localStorageEffect('authToken')],
})
