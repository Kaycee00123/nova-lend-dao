import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { sepolia, base } from 'viem/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import type { AppKitNetwork } from '@reown/appkit/networks'

// 1. Get projectId from https://cloud.reown.com
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

// 2. Set up Wagmi adapter with Sepolia and Base chains
const networks = [sepolia, base] as [AppKitNetwork, ...AppKitNetwork[]]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false
})

// 3. Create modal with metadata
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'NovaLend',
    description: 'Next-Generation DeFi Lending Protocol',
    url: 'https://novalend.app',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  features: {
    analytics: false
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#90EE90',
    '--w3m-accent': '#90EE90',
    '--w3m-border-radius-master': '8px'
  }
})

const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
