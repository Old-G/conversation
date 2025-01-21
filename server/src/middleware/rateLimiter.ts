import rateLimit from 'express-rate-limit'

// limit the number of requests
const apiLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 10, // 10 requests per minute
	message: {
		status: 429,
		message: 'Too many requests. Please try again later.',
	},
	headers: true,
})

export default apiLimiter
