import { useCurrencyStore } from '@/store/useCurrencyStore'

const ConversationHistory = () => {
	const { history } = useCurrencyStore()
	return (
		<div className='max-w-xl mx-auto mt-8'>
			<h3 className='text-lg font-bold mb-2'>Conversion History</h3>
			<ul className='bg-gray-100 text-black p-4 rounded-lg'>
				{history.length === 0 ? (
					<p className=''>No conversion history yet.</p>
				) : (
					history.map((item, index) => (
						<li key={index} className='border-b last:border-none py-2'>
							{item.timestamp} - {item.amount} {item.from} →{' '}
							{item.convertedAmount} {item.to} (Rate: {item.exchangeRate})
						</li>
					))
				)}
			</ul>
		</div>
	)
}
export default ConversationHistory
