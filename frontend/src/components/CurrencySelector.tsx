import React from 'react'

interface CurrencySelectorProps {
	label: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	options: string[]
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
	label,
	value,
	onChange,
	options,
}) => {
	return (
		<div className='w-1/2'>
			<label className='block'>{label}</label>
			<select
				value={value}
				onChange={onChange}
				className='w-full p-2 border rounded'
			>
				{options.map((currency, index) => (
					<option key={index} value={currency}>
						{currency}
					</option>
				))}
			</select>
		</div>
	)
}

export default CurrencySelector
