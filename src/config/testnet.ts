import CetusBurnSDK, { SdkOptions } from '../main'

export const burn_testnet: SdkOptions = {
  fullRpcUrl: 'https://fullnode.testnet.sui.io',
  burn: {
    package_id: '0x3b494006831b046481c8046910106e2dfbe0d1fa9bc01e41783fb3ff6534ed3a',
    published_at: '0x9c751fccc633f3ebad2becbe7884e5f38b4e497127689be0d404b24f79d95d71',
    manager_id: '0xd04529ef15b7dad6699ee905daca0698858cab49724b2b2a1fc6b1ebc5e474ef',
    clmm_global_config: '0x9774e359588ead122af1c7e7f64e14ade261cfeecdb5d0eb4a5b3b4c8ab8bd3e',
    clmm_global_vault_id: '0xf78d2ee3c312f298882cb680695e5e8c81b1d441a646caccc058006c2851ddea',
    burn_pool_handle: '0x20262dac8853ab8f63c98e0b17bfb1c758efc33d0092ac3c5f204dfb7ba81ac5',
  },
}

export const TestnetSDK = new CetusBurnSDK(burn_testnet)

/**
 * Initialize the testnet SDK
 * @param fullNodeUrl. If provided, it will be used as the full node URL.
 * @returns
 */
export function initTestnetSDK(fullNodeUrl?: string): CetusBurnSDK {
  if (fullNodeUrl) {
    burn_testnet.fullRpcUrl = fullNodeUrl
  }
  const sdk = new CetusBurnSDK(burn_testnet)
  return sdk
}
