import ccxt, { Ticker } from 'ccxt'
import { toast } from 'react-toastify'

export const getExchangeTicker = async (
  currency: string
): Promise<Ticker | undefined> => {
  try {
    // Create an instance of the ccxt exchange object
    const exchange = new ccxt.binance()

    // Fetch the ticker information for BTC to the selected currency
    const ticker = await exchange.fetchTicker('BTC/' + currency)

    return ticker
  } catch (error) {
    if (error instanceof ccxt.BaseError) {
      toast.error(`Error fetching ticker: ${error.message}`)
      throw new Error(`Error fetching ticker: ${error.message}`)
    }
  }
}
