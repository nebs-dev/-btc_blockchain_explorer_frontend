import { AddressType } from './address.type'
import { TransactionType } from './transaction.type'
import { UserType } from './user.type'

export interface SubscriptionType {
  address?: AddressType
  transaction?: TransactionType
  user: UserType
}
