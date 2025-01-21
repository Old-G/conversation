import { createThirdwebClient } from 'thirdweb'
import { ConnectButton } from 'thirdweb/react'
import { createWallet, inAppWallet } from 'thirdweb/wallets'
import { ModeToggle } from './mode-toggle'

const client = createThirdwebClient({
	clientId: '1b1e02b0a86b8e6819a1798f30b6d76b',
})

const wallets = [
	inAppWallet({
		auth: {
			options: [
				'google',
				'discord',
				'telegram',
				'email',
				'x',
				'passkey',
				'phone',
				'github',
			],
		},
	}),
	createWallet('io.metamask'),
	createWallet('com.coinbase.wallet'),
	createWallet('me.rainbow'),
	createWallet('io.rabby'),
	createWallet('io.zerion.wallet'),
	createWallet('com.okex.wallet'),
	createWallet('com.trustwallet.app'),
	createWallet('com.binance'),
]

const Navbar = () => {
	return (
		<div className='flex w-full items-center justify-between'>
			<ModeToggle />

			<div>
				<ConnectButton
					client={client}
					wallets={wallets}
					connectButton={{ label: 'Connect Wallet' }}
					connectModal={{
						size: 'compact',
						showThirdwebBranding: false,
					}}
				/>
			</div>
		</div>
	)
}
export default Navbar
