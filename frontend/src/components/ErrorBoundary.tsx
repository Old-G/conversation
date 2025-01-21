import React, { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
	children: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.error('❌ Error caught by ErrorBoundary:', error, errorInfo)
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return (
				<div className='p-4 bg-red-500 text-white text-center'>
					<h2>Something went wrong.</h2>
					<p>Please refresh the page or try again later.</p>
				</div>
			)
		}
		return this.props.children
	}
}

export default ErrorBoundary
