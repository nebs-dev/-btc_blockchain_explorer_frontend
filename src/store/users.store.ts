import { atom } from 'recoil'
import { localStorageEffect } from './effects/local-storage-effect-store'

interface User {
  email: string
  name: string
}

export const userState = atom<User | null>({
  key: 'user',
  default: null,
  effects: [localStorageEffect('user')],
})
