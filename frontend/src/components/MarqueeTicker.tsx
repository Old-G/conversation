import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import styles from '../components/styles/ticker.module.css'
import { useCurrencyStore } from '../store/useCurrencyStore'

import { getCryptoCurrencies } from '@/api/getCryptoCurrencies'
import { getCurrencies } from '@/api/getCurrencies'

const MarqueeTicker: React.FC = () => {
	const { isCrypto, loadCurrencies } = useCurrencyStore()

	useEffect(() => {
		loadCurrencies()
	}, [isCrypto, loadCurrencies])

	const {
		data: rates,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['exchangeRates', isCrypto],
		queryFn: isCrypto ? getCryptoCurrencies : getCurrencies,
		staleTime: 600000,
	})

	if (isLoading) return <div className='ticker'>Loading rates...</div>
	if (error) return <div className='ticker'>Failed to load rates</div>
	if (!rates) return null

	const tickerContent = Object.entries(rates)
		.map(([currency, rate]) => `${currency}: ${(Number(rate) || 0).toFixed(4)}`)
		.join(' • ')

	return (
		<div
			className={`bg-green-500 w-full overflow-hidden text-white p-3 whitespace-nowrap relative rounded-lg`}
		>
			<div className={styles.ticker_content}>{tickerContent}</div>
		</div>
	)
}

export default MarqueeTicker
