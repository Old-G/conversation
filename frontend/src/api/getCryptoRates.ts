export const getCryptoRates = async () => {
	const response = await fetch(
		'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,ripple,cardano,solana,polkadot,dogecoin,litecoin,chainlink&vs_currencies=usd'
	)

	if (!response.ok) {
		throw new Error(`Failed to fetch crypto rates: ${response.status}`)
	}

	const data = await response.json()
	return data
}
