import rateLimit from 'express-rate-limit'
import { convertCryptoCurrency } from '../controllers/conversionCryptoController'
import router from '../routes/conversion'

const cryptoLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 10,
	message: {
		status: 429,
		message: 'Too many requests to CoinGecko. Try again later.',
	},
	headers: true,
})

router.post('/convert-crypto', cryptoLimiter, convertCryptoCurrency)
