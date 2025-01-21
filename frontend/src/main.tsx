import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThirdwebProvider } from 'thirdweb/react'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ErrorBoundary>
				<ThirdwebProvider>
					<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
						<App />
					</ThemeProvider>
				</ThirdwebProvider>
			</ErrorBoundary>
		</QueryClientProvider>
	</StrictMode>
)
