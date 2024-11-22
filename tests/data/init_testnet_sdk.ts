import CetusBurnSDK, { SdkOptions } from '../../src'

export const burn_testnet: SdkOptions = {
  fullRpcUrl: 'https://fullnode.testnet.sui.io',
  simulationAccount: {
    address: '0xcd0247d0b67e53dde69b285e7a748e3dc390e8a5244eb9dd9c5c53d95e4cf0aa',
  },
  burn: {
    package_id: '0x3b494006831b046481c8046910106e2dfbe0d1fa9bc01e41783fb3ff6534ed3a',
    published_at: '0xaf89f8215c5b07eaac8b77c7745ce62f94cb76ef4bcb854e283f644c519ef43e',
    manager_id: '0xd04529ef15b7dad6699ee905daca0698858cab49724b2b2a1fc6b1ebc5e474ef',
    clmm_global_config: '0x9774e359588ead122af1c7e7f64e14ade261cfeecdb5d0eb4a5b3b4c8ab8bd3e',
    clmm_global_vault_id: '0xf78d2ee3c312f298882cb680695e5e8c81b1d441a646caccc058006c2851ddea',
    burn_pool_handle: "0x20262dac8853ab8f63c98e0b17bfb1c758efc33d0092ac3c5f204dfb7ba81ac5"
  }
}

export const TestnetSDK = new CetusBurnSDK(burn_testnet)
