import './App.css'
import CurrencyConverter from './components/CurrencyConverter'
import Navbar from './components/Navbar'

function App() {
	return (
		<div className='flex flex-col w-full justify-between min-h-screen px-4 py-8 space-y-10'>
			<Navbar />

			<div className='flex flex-col justify-center items-center'>
				<CurrencyConverter />
			</div>
			<div />
		</div>
	)
}

export default App
