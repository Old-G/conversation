import { NextFunction, Request, Response } from 'express'

const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	console.error('❌ Error:', err.message)
	res.status(500).json({ message: err.message || 'Internal Server Error' })
}

export default errorHandler
