import express from 'express'
import { convertCurrency } from '../controllers/conversionController'
import {
	convertCryptoCurrency,
	getConversionHistory,
} from '../controllers/conversionCryptoController'

const router = express.Router()

router.post('/convert', convertCurrency)
router.post('/convert-crypto', convertCryptoCurrency)
router.get('/history', getConversionHistory)

export default router
