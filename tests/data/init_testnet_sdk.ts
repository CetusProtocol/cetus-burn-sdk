import CetusBurnSDK, { SdkOptions } from '../../src'

export const burn_testnet: SdkOptions = {
  fullRpcUrl: 'https://fullnode.testnet.sui.io',
  simulationAccount: {
    address: '0xcd0247d0b67e53dde69b285e7a748e3dc390e8a5244eb9dd9c5c53d95e4cf0aa',
  },
  burn: {
    package_id: '0xa30fd3413b56173930bc1c66defb0f9a0a6af407ac31dc6f27afae800d9a7cf9',
    published_at: '0xa30fd3413b56173930bc1c66defb0f9a0a6af407ac31dc6f27afae800d9a7cf9',
    manager_id: '0xd1214ad679070438292b78537cf7965202fd67afa26a73caac6a429b7e58c3b4',
    clmm_global_config: '0x6f4149091a5aea0e818e7243a13adcfb403842d670b9a2089de058512620687a',
    clmm_global_vault_id: '0xf3114a74d54cbe56b3e68f9306661c043ede8c6615f0351b0c3a93ce895e1699',
    burn_pool_handle:"0x8aa61eef2ac1f3172e21aed28343f7c6c633227bfdcc811b6494302959e56980"
  }
}

export const TestnetSDK = new CetusBurnSDK(burn_testnet)
