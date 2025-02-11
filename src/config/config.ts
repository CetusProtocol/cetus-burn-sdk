import { CetusBurnSDK } from '../main'
import { initMainnetSDK } from './mainnet'
import { initTestnetSDK } from './testnet'

interface InitBurnSDKOptions {
  network: 'mainnet' | 'testnet'
  fullNodeUrl?: string
}

/**
 * Helper function to initialize the Cetus SDK
 * @param env - The environment to initialize the SDK in. One of 'mainnet' or 'testnet'.
 * @param fullNodeUrl - The full node URL to use.
 * @returns The initialized Cetus SDK.
 */
export function initBurnSDK(options: InitBurnSDKOptions): CetusBurnSDK {
  const { network, fullNodeUrl } = options
  return network === 'mainnet' ? initMainnetSDK(fullNodeUrl) : initTestnetSDK(fullNodeUrl)
}
