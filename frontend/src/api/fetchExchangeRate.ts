export const fetchExchangeRate = async (
	fromCurrency: string,
	toCurrency: string,
	amount: number,
	isCrypto: boolean = false
) => {
	console.log('🔹 Sending request:', {
		fromCurrency,
		toCurrency,
		amount,
		isCrypto,
	})

	if (!amount || isNaN(amount)) {
		console.error('❌ Amount is invalid or missing:', amount)
		return
	}

	const url = isCrypto
		? 'http://localhost:5555/api/convert-crypto'
		: 'http://localhost:5555/api/convert'

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ fromCurrency, toCurrency, amount }),
	})

	if (!response.ok) {
		throw new Error(`❌ Failed to fetch exchange rate: ${response.status}`)
	}

	const data = await response.json()
	console.log('🟢 Response received:', data)
	return data
}
