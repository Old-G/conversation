import React from 'react'

const Loader: React.FC = () => (
	<div className='flex justify-center items-center mt-4'>
		<div className='animate-spin rounded-full h-10 w-10 border-b-2 border-green-500'></div>
	</div>
)

export default Loader
