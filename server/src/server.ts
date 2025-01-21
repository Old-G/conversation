import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import errorHandler from './middleware/errorHandler'
import apiLimiter from './middleware/rateLimiter'
import conversionRoutes from './routes/conversion'

// load configuration
dotenv.config()

const app = express()

// Middleware
app.use(express.json())

app.use(cors())

app.use('/api', apiLimiter)

app.use('/api', conversionRoutes)

app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5555
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
