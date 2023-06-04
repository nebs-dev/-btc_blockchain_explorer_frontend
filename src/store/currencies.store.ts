import { atom, selectorFamily } from 'recoil'
import { getExchangeTicker } from '../services/exchange-ticker.services'
import { toast } from 'react-toastify'

export const selectedCurrencyState = atom({
  key: 'selectedCurrency',
  default: 'BTC',
})

export const totalBTCOutputState = atom({
  key: 'totalBTCOutput',
  default: 0,
})

export const totalBTCInputState = atom({
  key: 'totalBTCInput',
  default: 0,
})

export const currencyConversionSelector = selectorFamily({
  key: 'currencyConversion',
  get:
    (btcAmount: number) =>
    async ({ get }) => {
      const selectedCurrency = get(selectedCurrencyState)
      if (selectedCurrency === 'BTC') return btcAmount

      try {
        const ticker = await getExchangeTicker(selectedCurrency)

        // Check if ticker data is available
        if (!ticker || !ticker.last) {
          throw new Error('Ticker data not available')
        }

        // Perform the currency conversion
        const convertedValue = btcAmount * ticker.last

        return convertedValue
      } catch (error) {
        toast.error('Error performing currency conversion')
        return null
      }
    },
})
