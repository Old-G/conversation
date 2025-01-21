import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getCryptoCurrencies } from '../api/getCryptoCurrencies'
import { getCurrencies } from '../api/getCurrencies'

interface ConversionHistoryItem {
	timestamp: string
	from: string
	to: string
	amount: string
	exchangeRate: number
	convertedAmount: string
}

interface CurrencyState {
	fromCurrency: string
	toCurrency: string
	amount: string
	currencyList: string[]
	isCrypto: boolean
	history: ConversionHistoryItem[]
	setFromCurrency: (currency: string) => void
	setToCurrency: (currency: string) => void
	setAmount: (amount: string) => void
	setCurrencyList: (list: string[]) => void
	loadCurrencies: () => Promise<void>
	setIsCrypto: (isCrypto: boolean) => void
	addToHistory: (entry: ConversionHistoryItem) => void
}

export const useCurrencyStore = create<CurrencyState>()(
	persist(
		(set, get) => ({
			fromCurrency: 'USD',
			toCurrency: 'EUR',
			amount: '',
			currencyList: [],
			isCrypto: false,
			history: [],

			setFromCurrency: currency => set({ fromCurrency: currency }),
			setToCurrency: currency => set({ toCurrency: currency }),
			setAmount: amount => set({ amount }),
			setCurrencyList: list => set({ currencyList: list }),

			setIsCrypto: async isCrypto => {
				console.log('🔄 Переключение режима:', isCrypto ? 'Крипто' : 'Фиат')

				// Очистка валют перед загрузкой
				set({ isCrypto, currencyList: [] })

				// Ждем загрузки новых валют перед установкой дефолтных значений
				await get().loadCurrencies()

				// Устанавливаем валюты по умолчанию
				if (isCrypto) {
					set({ fromCurrency: 'BTC', toCurrency: 'ETH' })
				} else {
					set({ fromCurrency: 'USD', toCurrency: 'EUR' })
				}
			},
			loadCurrencies: async () => {
				if (get().currencyList.length > 0) return // Если уже загружено, не запрашиваем повторно

				try {
					console.log(
						'🔄 Загружаем валюты, режим:',
						get().isCrypto ? 'Крипто' : 'Фиат'
					)

					const currencies = get().isCrypto
						? await getCryptoCurrencies()
						: await getCurrencies()

					set({ currencyList: Object.keys(currencies) })
					console.log('✅ Загруженные валюты:', Object.keys(currencies))
				} catch (error) {
					console.error('❌ Ошибка загрузки валют', error)
				}
			},
			addToHistory: entry => {
				set(state => ({
					history: [entry, ...state.history].slice(0, 10),
				}))
			},
		}),
		{ name: 'currency-storage' }
	)
)
