export const getCryptoCurrencies = async () => {
	const response = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd'
	)

	if (!response.ok) {
		throw new Error(`Failed to fetch crypto currencies: ${response.status}`)
	}

	const data = await response.json()
	return {
		BTC: data.bitcoin.usd,
		ETH: data.ethereum.usd,
		LTC: data.litecoin.usd,
	}
}
