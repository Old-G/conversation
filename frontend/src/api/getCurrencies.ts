export const getCurrencies = async () => {
	const response = await fetch(
		'https://v6.exchangerate-api.com/v6/ca9f6c173d4de98724cb0194/latest/USD'
	)

	if (!response.ok) {
		throw new Error(`Failed to fetch currencies: ${response.status}`)
	}

	const data = await response.json()
	return data.conversion_rates
}
