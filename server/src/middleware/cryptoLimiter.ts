import rateLimit from 'express-rate-limit'
import { convertCryptoCurrency } from '../controllers/conversionCryptoController'
import router from '../routes/conversion'

// Ограничение: 10 запросов в минуту на /convert-crypto
const cryptoLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 минута
	max: 10,
	message: {
		status: 429,
		message: 'Too many requests to CoinGecko. Try again later.',
	},
	headers: true,
})

router.post('/convert-crypto', cryptoLimiter, convertCryptoCurrency)
