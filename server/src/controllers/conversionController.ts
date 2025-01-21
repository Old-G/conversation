import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import redis from '../config/redis'

const FIAT_API_URL = `https://v6.exchangerate-api.com/v6/ca9f6c173d4de98724cb0194/latest/`
const CRYPTO_API_URL = 'https://api.coingecko.com/api/v3/simple/price'

const getFiatRates = async (from: string, to: string): Promise<number> => {
	const cacheKey = `fiatRate:${from}-${to}`

	try {
		const cachedRate = await redis.get(cacheKey)
		if (cachedRate) {
			console.log('✅ Cache hit (fiat):', from, '->', to)
			return parseFloat(cachedRate)
		}

		console.log(`🔄 Fetching fiat rate: ${from} → ${to}`)
		const response = await axios.get(`${FIAT_API_URL}${from}`)

		if (!response.data || !response.data.conversion_rates) {
			throw new Error(
				`❌ Invalid API response: ${JSON.stringify(response.data)}`
			)
		}

		const rate = response.data.conversion_rates[to]
		if (!rate) {
			throw new Error(`❌ Fiat exchange rate not found for ${from} to ${to}`)
		}

		await redis.set(cacheKey, rate.toString(), { EX: 3600 }) // Кэшируем на 1 час
		return rate
	} catch (error) {
		console.error('❌ Error fetching fiat rate:', error)
		throw new Error('Failed to fetch fiat exchange rate.')
	}
}

const getCryptoRates = async (from: string, to: string): Promise<number> => {
	const cacheKey = `cryptoRate:${from}-${to}`

	try {
		const cachedRate = await redis.get(cacheKey)
		if (cachedRate) {
			console.log('✅ Cache hit (crypto):', from, '->', to)
			return parseFloat(cachedRate)
		}

		console.log(`🔄 Fetching crypto rate: ${from} → ${to}`)
		const response = await axios.get(CRYPTO_API_URL, {
			params: {
				ids: from.toLowerCase(),
				vs_currencies: to.toLowerCase(),
			},
		})

		const rate = response.data[from.toLowerCase()]?.[to.toLowerCase()]
		if (!rate) {
			throw new Error(`❌ Crypto exchange rate not found for ${from} to ${to}`)
		}

		await redis.set(cacheKey, rate.toString(), { EX: 600 }) // Кэшируем на 10 минут
		return rate
	} catch (error) {
		console.error('❌ Error fetching crypto rate:', error)
		throw new Error('Failed to fetch crypto exchange rate.')
	}
}

const getExchangeRate = async (from: string, to: string): Promise<number> => {
	// Если обе валюты — фиатные, используем API фиатных курсов
	if (!from.startsWith('crypto_') && !to.startsWith('crypto_')) {
		return getFiatRates(from, to)
	}

	// Если хотя бы одна из валют — криптовалюта, используем API криптовалют
	const fromSymbol = from.replace('crypto_', '').toLowerCase()
	const toSymbol = to.replace('crypto_', '').toLowerCase()
	return getCryptoRates(fromSymbol, toSymbol)
}

export const convertCurrency = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { fromCurrency, toCurrency, amount } = req.body

		console.log('🟡 Incoming request:', req.body)

		if (!fromCurrency || !toCurrency || !amount || isNaN(Number(amount))) {
			res.status(400).json({
				message: 'Invalid input. Please provide valid currencies and amount.',
			})
			return
		}

		const exchangeRate = await getExchangeRate(fromCurrency, toCurrency)
		const convertedAmount = (parseFloat(amount) * exchangeRate).toFixed(1) // ⬅ Округление до 1 знака

		res.json({
			fromCurrency,
			toCurrency,
			amount,
			exchangeRate,
			convertedAmount,
		})
	} catch (error) {
		next(error)
	}
}
