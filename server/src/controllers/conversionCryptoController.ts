import axios from 'axios'
import redis from '../config/redis'

const conversionHistory: any[] = []

const getCryptoExchangeRate = async (
	from: string,
	to: string
): Promise<number> => {
	console.log('📌 Fetching crypto:', { from, to })

	const cacheKey = `cryptoRate:${from}-${to}`

	try {
		const cachedRate = await redis.get(cacheKey)
		if (cachedRate) {
			console.log('✅ Cache hit (crypto):', from, '->', to)
			return parseFloat(cachedRate)
		}

		console.log(`🔄 Fetching crypto rate: ${from} → ${to}`)

		const cryptoMap: Record<string, string> = {
			BTC: 'bitcoin',
			ETH: 'ethereum',
			LTC: 'litecoin',
		}

		const fromSymbol = cryptoMap[from.toUpperCase()]
		const toSymbol = cryptoMap[to.toUpperCase()]

		if (!fromSymbol || !toSymbol) {
			console.error(`❌ Unsupported currency: ${from} or ${to}`)
			throw new Error(`Unsupported currency: ${from} or ${to}`)
		}

		const response = await axios.get(
			'https://api.coingecko.com/api/v3/simple/price',
			{
				params: {
					ids: `${fromSymbol},${toSymbol}`,
					vs_currencies: 'usd',
				},
			}
		)

		console.log('🔍 API Response:', JSON.stringify(response.data, null, 2))

		const fromRate = response.data[fromSymbol]?.usd
		const toRate = response.data[toSymbol]?.usd

		if (!fromRate || !toRate) {
			console.error(`❌ Crypto exchange rate not found for ${from} to ${to}`)
			throw new Error(`Crypto exchange rate not found for ${from} to ${to}`)
		}

		const rate = fromRate / toRate

		await redis.set(cacheKey, rate.toString(), { EX: 600 })
		console.log(`✅ Converted rate: ${from} → ${to} = ${rate}`)
		return rate
	} catch (error) {
		console.error('❌ Error fetching crypto exchange rate:', error)
		throw new Error('Failed to fetch crypto exchange rate.')
	}
}

export const convertCryptoCurrency = async (req: any, res: any) => {
	try {
		console.log('🟡 Incoming Crypto Request:', req.body)

		const { fromCurrency, toCurrency, amount } = req.body

		if (!fromCurrency || !toCurrency || !amount || isNaN(Number(amount))) {
			res.status(400).json({
				message: 'Invalid input. Please provide valid currencies and amount.',
			})
			return
		}

		const exchangeRate = await getCryptoExchangeRate(fromCurrency, toCurrency)
		const convertedAmount = (parseFloat(amount) * exchangeRate).toFixed(1)

		console.log('✅ Conversion Success:', {
			fromCurrency,
			toCurrency,
			exchangeRate,
			convertedAmount,
		})

		res.json({
			fromCurrency,
			toCurrency,
			amount,
			exchangeRate,
			convertedAmount,
		})
	} catch (error) {
		console.error('❌ Error converting crypto:', error)
		res.status(500).json({
			message: 'Failed to process crypto conversion.',
		})
	}
}

export const getConversionHistory = async (req: any, res: any) => {
	res.json(conversionHistory)
}
