import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { fetchExchangeRate } from '../api/fetchExchangeRate'
import { useCurrencyStore } from '../store/useCurrencyStore'
import ConversationHistory from './ConversationHistory'
import CurrencySelector from './CurrencySelector'
import Loader from './Loader'
import MarqueeTicker from './MarqueeTicker'
import { Button } from './ui/button'

const schema = z.object({
	amount: z
		.string()
		.nonempty('Amount is required')
		.refine(value => !isNaN(Number(value)) && Number(value) > 0, {
			message: 'Amount must be a positive number',
		}),
	fromCurrency: z.string().nonempty('Please select a currency'),
	toCurrency: z.string().nonempty('Please select a currency'),
})

type FormData = z.infer<typeof schema>

const CurrencyConverter: React.FC = () => {
	const {
		fromCurrency,
		toCurrency,
		setFromCurrency,
		setToCurrency,
		currencyList,
		loadCurrencies,
		isCrypto,
		setIsCrypto,
		addToHistory,
	} = useCurrencyStore()

	const [data, setData] = useState<null | {
		convertedAmount: string
		exchangeRate: number
	}>(null)
	const [isFetching, setIsFetching] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			amount: '',
			fromCurrency: fromCurrency,
			toCurrency: toCurrency,
		},
	})

	useEffect(() => {
		if (currencyList.length === 0) {
			loadCurrencies()
		}

		const newFromCurrency = isCrypto ? 'BTC' : 'USD'
		const newToCurrency = isCrypto ? 'ETH' : 'EUR'

		console.log(`🔄 Update currencies: ${newFromCurrency} → ${newToCurrency}`)

		setFromCurrency(newFromCurrency)
		setToCurrency(newToCurrency)

		setValue('fromCurrency', newFromCurrency)
		setValue('toCurrency', newToCurrency)
	}, [
		isCrypto,
		currencyList,
		loadCurrencies,
		setFromCurrency,
		setToCurrency,
		setValue,
	])

	const fetchRate = async (formData: FormData) => {
		try {
			setIsFetching(true)
			setError(null)

			const response = await fetchExchangeRate(
				formData.fromCurrency,
				formData.toCurrency,
				Number(formData.amount),
				isCrypto
			)

			setData(response)

			addToHistory({
				timestamp: new Date().toLocaleString(),
				from: formData.fromCurrency,
				to: formData.toCurrency,
				amount: formData.amount,
				exchangeRate: response.exchangeRate,
				convertedAmount: response.convertedAmount,
			})

			reset({ amount: '' })
		} catch (err) {
			setError('Error fetching exchange rate.')
			console.error('❌ Fetch Error:', err)
		} finally {
			setIsFetching(false)
		}
	}

	// Обработчик отправки формы
	const onSubmit = async (formData: FormData) => {
		console.log('🔹 Sending request:', formData)
		await fetchRate(formData)
	}

	const filteredCurrencyList = useMemo(() => {
		return isCrypto
			? currencyList.filter(c => ['BTC', 'ETH', 'LTC'].includes(c))
			: currencyList.filter(c => !['BTC', 'ETH', 'LTC'].includes(c))
	}, [isCrypto, currencyList])

	return (
		<div className='flex flex-col max-w-4xl w-full space-y-24'>
			<MarqueeTicker />

			<div className='max-w-sm w-full mx-auto p-6 bg-white text-black shadow-lg rounded-lg space-y-5'>
				<h2 className='text-xl font-bold text-center'>Currency Converter</h2>

				<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className='block'>Amount:</label>
						<input
							type='text'
							{...register('amount')}
							className='w-full p-2 border rounded'
						/>
						{errors.amount && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.amount.message}
							</p>
						)}
					</div>

					<div className='flex items-center gap-4'>
						<CurrencySelector
							label='From'
							value={fromCurrency}
							onChange={e => {
								setFromCurrency(e.target.value)
								setValue('fromCurrency', e.target.value)
							}}
							options={filteredCurrencyList}
						/>

						<button
							className='bg-gray-200 py-2 px-3 self-end rounded-full hover:bg-gray-300 transition'
							type='button'
							onClick={() => {
								const newFrom = toCurrency
								const newTo = fromCurrency

								console.log(`🔄 Меняем валюты: ${newFrom} → ${newTo}`)

								setFromCurrency(newFrom)
								setToCurrency(newTo)

								setValue('fromCurrency', newFrom)
								setValue('toCurrency', newTo)
							}}
						>
							🔄
						</button>

						<CurrencySelector
							label='To'
							value={toCurrency}
							onChange={e => {
								setToCurrency(e.target.value)
								setValue('toCurrency', e.target.value)
							}}
							options={filteredCurrencyList}
						/>
					</div>

					<div className='flex flex-col space-y-3'>
						<Button
							className='w-full'
							type='button'
							onClick={() => setIsCrypto(!isCrypto)}
						>
							{isCrypto ? 'Switch to Fiat' : 'Switch to Crypto'}
						</Button>

						<Button
							className='w-full bg-green-500 py-2 rounded hover:bg-green-600 transition'
							type='submit'
						>
							{isFetching ? 'Loading...' : 'Convert'}
						</Button>
					</div>
				</form>

				{error && <p className='text-red-500 text-center mt-2'>{error}</p>}

				{isFetching && <Loader />}

				{data && (
					<p className='text-center text-lg mt-4 font-bold'>
						Converted Amount: {data.convertedAmount} {toCurrency}
					</p>
				)}
			</div>

			<ConversationHistory />
		</div>
	)
}

export default CurrencyConverter
