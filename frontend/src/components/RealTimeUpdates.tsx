import React, { useEffect, useState } from 'react'

const WEBSOCKET_URL = 'ws://localhost:5173'

const RealTimeUpdates: React.FC = () => {
	const [message, setMessage] = useState<string | null>(null)

	useEffect(() => {
		const ws = new WebSocket(WEBSOCKET_URL)

		ws.onmessage = event => {
			const data = JSON.parse(event.data)
			if (data.type === 'UPDATE') {
				setMessage(data.message)
				setTimeout(() => setMessage(null), 5000)
			}
		}

		return () => ws.close()
	}, [])

	return message ? (
		<div className='bg-blue-500 p-2 text-center'>{message}</div>
	) : null
}

export default RealTimeUpdates
