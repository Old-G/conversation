import { createClient } from 'redis'

const client = createClient({
	username: 'default',
	password: 'P9jEG1K9CucB3nte8TukncS8kyG6o0xe',
	socket: {
		host: 'redis-16701.c300.eu-central-1-1.ec2.redns.redis-cloud.com',
		port: 16701,
	},
})

client.on('error', err => console.error('❌ Redis Connection Error:', err))

const connectRedis = async () => {
	try {
		await client.connect()
		console.log('✅ Connected to Redis Cloud!')
	} catch (error) {
		console.error('❌ Redis Cloud Connection Failed:', error)
		process.exit(1)
	}
}

connectRedis()

export default client
