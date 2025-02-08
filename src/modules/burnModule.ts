import { Transaction, TransactionObjectArgument } from '@mysten/sui/transactions'
import { IModule } from '../interfaces/IModule'
import { CetusBurnSDK } from '../sdk'
import { BurnParams, CollectFeeParams, CollectRewardParams } from '../types/burn'
import { CLOCK_ADDRESS } from '../types/sui'
import { BurnUtils, CachedContent } from '../utils'

export class BurnModule implements IModule {
  protected _sdk: CetusBurnSDK

  private readonly _cache: Record<string, CachedContent> = {}

  constructor(sdk: CetusBurnSDK) {
    this._sdk = sdk
  }

  get sdk() {
    return this._sdk
  }

  /**
   * @description Get the list of pools that have been burned.
   * @returns
   */
  async getHaveBurnPoolList() {
    try {
      const { package_id, manager_id } = this._sdk.sdkOptions.burn
      const object: any = await this._sdk.fullClient.getObject({
        id: manager_id,
        options: {
          showType: true,
          showContent: true,
        },
      })

      console.log('🚀 ~ file: burnModule.ts:32 ~ BurnModule ~ getHaveBurnPoolList ~ object:', object)

      const positionTableId = object?.data?.content?.fields?.position?.fields?.id?.id

      const positionTableData = await this._sdk.fullClient.getDynamicFieldsByPage(positionTableId)

      const haveBurnPools = positionTableData?.data?.map((item: any) => {
        return item?.name?.value
      })

      return haveBurnPools
    } catch (error: any) {
      console.log('getHaveBurnPoolList ~ error:', error)
      return []
    }
  }

  /**
   * @description Get the position handle for a given pool.
   * @param pool - The pool ID.
   * @returns
   */
  private async getPositionHandle(pool: string) {
    const { burn_pool_handle } = this._sdk.sdkOptions.burn
    const cacheKey = `getPosHandle_${pool}`
    let posHandle = this._sdk.getCache<string>(cacheKey)
    if (posHandle) {
      return posHandle
    }

    const posHandleRes: any = await this._sdk.fullClient.getDynamicFieldObject({
      parentId: burn_pool_handle,
      name: {
        type: '0x2::object::ID',
        value: pool,
      },
    })
    posHandle = posHandleRes.data.content.fields.value.fields.id.id

    if (posHandle) {
      this._sdk.updateCache(cacheKey, posHandle)
    }

    return posHandle
  }

  /**
   * @description Get the list of burned positions for a given pool.
   * @param pool - The pool ID.
   * @returns
   */
  async getPoolBurnPositionList(pool: string) {
    try {
      const posHandle = await this.getPositionHandle(pool)
      if (posHandle === undefined) {
        throw Error('Not found posHandle')
      }

      const positionTableData = await this._sdk.fullClient.getDynamicFieldsByPage(posHandle)

      const warpPosIds = positionTableData?.data?.map((item: any) => {
        return item.objectId
      })

      if (warpPosIds.length > 0) {
        const warpPosRes = await this._sdk.fullClient.batchGetObjects(warpPosIds, { showContent: true })

        const burnedPositionIds = warpPosRes.map((item: any) => {
          return item.data.content.fields.value.fields.burned_position_id
        })

        const burnedPositionsRes = await this._sdk.fullClient.batchGetObjects(burnedPositionIds, { showContent: true })

        const burnPositionList = burnedPositionsRes?.map((item: any) => {
          const info = BurnUtils.buildBurnPositionNFT(item?.data?.content?.fields)
          return info
        })
        return burnPositionList
      }

      return []
    } catch (error: any) {
      console.log('getPoolBurnPositionList ~ error:', error)
      return []
    }
  }

  /**
   * @description Get the list of burned positions for a given account.
   * @param account - The account address.
   * @returns
   */
  async getBurnPositionList(account: string) {
    const { package_id } = this._sdk.sdkOptions.burn
    const ownerRes = await this._sdk.fullClient.getOwnedObjectsByPage(account, {
      options: { showType: true, showContent: true, showOwner: true, showDisplay: true },
      filter: {
        MatchAny: [
          {
            StructType: `${package_id}::lp_burn::CetusLPBurnProof`,
          },
        ],
      },
    })
    const burnPositionList = ownerRes?.data?.map((item: any) => {
      const info = BurnUtils.buildBurnPositionNFT(item?.data?.content?.fields)
      return info
    })
    return burnPositionList
  }

  /**
   * @description Get the burned position information for a given position ID.
   * @param posId - The position ID.
   * @returns
   */
  async getBurnPositon(posId: string) {
    const object: any = await this._sdk.fullClient.getObject({ id: posId, options: { showContent: true, showType: true } })

    if (object?.data?.content?.fields) {
      const info = BurnUtils.buildBurnPositionNFT(object?.data?.content?.fields)
      return info
    }

    return null
  }

  /**
   * @description Create a burn payload for a given pool and position.
   * @param params - The burn parameters.
   * @param tx - The transaction object.
   * @returns
   */
  createBurnPayload(params: BurnParams, tx?: Transaction) {
    tx = tx || new Transaction()

    const positionArg = typeof params.pos === 'string' ? tx.object(params.pos) : params.pos

    const { published_at, manager_id } = this._sdk.sdkOptions.burn
    const target = `${published_at}::lp_burn::burn`
    tx.moveCall({
      target,
      arguments: [tx.object(manager_id), tx.object(params.pool), positionArg],
      typeArguments: [params.coinTypeA, params.coinTypeB],
    })

    return tx
  }

  /**
   * Creates a transaction payload for burning an LP position.
   *
   * @param {string | TransactionObjectArgument} pos - The LP position to be burned,
   *        either as an object argument or its ID (string).
   * @param {Transaction} [tx] - An optional `Transaction` object; if not provided, a new one is created.
   * @returns {Transaction} - The transaction object containing the `burn_lp_v2` method call.
   */
  createBurnLPV2Payload(pos: string | TransactionObjectArgument, tx?: Transaction) {
    tx = tx || new Transaction()

    const positionArg = typeof pos === 'string' ? tx.object(pos) : pos

    const { published_at, manager_id } = this._sdk.sdkOptions.burn
    const target = `${published_at}::lp_burn::burn_lp_v2`
    tx.moveCall({
      target,
      arguments: [tx.object(manager_id), positionArg],
      typeArguments: [],
    })

    return tx
  }

  /**
   * @description Create a collect fee payload for a given pool and position.
   * @param params - The collect fee parameters.
   * @param tx - The transaction object.
   * @returns
   */
  createCollectFeePaylaod(params: CollectFeeParams, tx?: Transaction) {
    tx = tx || new Transaction()
    const { published_at, manager_id, clmm_global_config } = this._sdk.sdkOptions.burn
    const target = `${published_at}::lp_burn::collect_fee`

    const coins = tx.moveCall({
      target,
      arguments: [tx.object(manager_id), tx.object(clmm_global_config), tx.object(params.pool), tx.object(params.pos)],
      typeArguments: [params.coinTypeA, params.coinTypeB],
    })
    tx.transferObjects([coins[0]], tx.pure.address(params.account))
    tx.transferObjects([coins[1]], tx.pure.address(params.account))

    return tx
  }

  /**
   * @description Create a collect reward payload for a given pool and position.
   * @param params - The collect reward parameters.
   * @param tx - The transaction object.
   * @returns
   */
  crateCollectRewardPayload(params: CollectRewardParams, tx?: Transaction) {
    tx = tx || new Transaction()
    const { published_at, manager_id, clmm_global_config, clmm_global_vault_id } = this._sdk.sdkOptions.burn
    const target = `${published_at}::lp_burn::collect_reward`

    for (let i = 0; i < params.rewarderCoinTypes?.length; i++) {
      const item = params.rewarderCoinTypes?.[i]
      const coin = tx.moveCall({
        target,
        arguments: [
          tx.object(manager_id),
          tx.object(clmm_global_config),
          tx.object(params.pool),
          tx.object(params.pos),
          tx.object(clmm_global_vault_id),
          tx.object(CLOCK_ADDRESS),
        ],
        typeArguments: [params.coinTypeA, params.coinTypeB, item],
      })

      tx.transferObjects([coin], tx.pure.address(params.account))
    }

    return tx
  }

  /**
   * @description Create a collect fee payload for a given pool and position.
   * @param params - The collect fee parameters.
   * @param tx - The transaction object.
   * @returns
   */
  createCollectFeesPaylaod(params: CollectFeeParams[], tx?: Transaction) {
    tx = tx || new Transaction()
    const { published_at, manager_id, clmm_global_config } = this._sdk.sdkOptions.burn
    const target = `${published_at}::lp_burn::collect_fee`

    for (let i = 0; i < params.length; i++) {
      const item = params[i]
      const coins = tx.moveCall({
        target,
        arguments: [tx.object(manager_id), tx.object(clmm_global_config), tx.object(item.pool), tx.object(item.pos)],
        typeArguments: [item.coinTypeA, item.coinTypeB],
      })
      tx.transferObjects([coins[0]], tx.pure.address(item.account))
      tx.transferObjects([coins[1]], tx.pure.address(item.account))
    }

    return tx
  }

  /**
   * @description Create a collect reward payload for a given pool and position.
   * @param params - The collect reward parameters.
   * @param tx - The transaction object.
   * @returns
   */
  crateCollectRewardsPayload(params: CollectRewardParams[], tx?: Transaction) {
    tx = tx || new Transaction()
    const { published_at, manager_id, clmm_global_config, clmm_global_vault_id } = this._sdk.sdkOptions.burn
    const target = `${published_at}::lp_burn::collect_reward`
    for (let j = 0; j < params.length; j++) {
      const item = params[j]
      for (let i = 0; i < item.rewarderCoinTypes?.length; i++) {
        const items = item.rewarderCoinTypes?.[i]
        const coin = tx.moveCall({
          target,
          arguments: [
            tx.object(manager_id),
            tx.object(clmm_global_config),
            tx.object(item.pool),
            tx.object(item.pos),
            tx.object(clmm_global_vault_id),
            tx.object(CLOCK_ADDRESS),
          ],
          typeArguments: [item.coinTypeA, item.coinTypeB, items],
        })

        tx.transferObjects([coin], tx.pure.address(item.account))
      }
    }

    return tx
  }
}
