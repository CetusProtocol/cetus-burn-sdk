import { SuiAddressType, SuiObjectIdType } from './sui'

export type burnConfigs = {
  package_id: string
  published_at: string
  manager_id: string
  clmm_global_config: string
  clmm_global_vault_id: string
  burn_pool_handle: string
}

type commonParams = {
  pool: string
  pos: string
  coinTypeA: string
  coinTypeB: string
}

export type BurnParams = commonParams

export type CollectFeeParams = commonParams & { account: string }

export type CollectRewardParams = commonParams & {
  rewarderCoinTypes: string[]
  account: string
}

/**
 * Represents a coin asset with address, object ID, and balance information.
 */
export type CoinAsset = {
  /**
   * The address type of the coin asset.
   */
  coinAddress: SuiAddressType

  /**
   * The object identifier of the coin asset.
   */
  coinObjectId: SuiObjectIdType

  /**
   * The balance amount of the coin asset.
   */
  balance: bigint
}

/**
 * Represents a faucet coin configuration.
 */
export type FaucetCoin = {
  /**
   * The name or identifier of the transaction module.
   */
  transactionModule: string

  /**
   * The supply ID or object identifier of the faucet coin.
   */
  suplyID: SuiObjectIdType

  /**
   * The number of decimal places used for the faucet coin.
   */
  decimals: number
}
