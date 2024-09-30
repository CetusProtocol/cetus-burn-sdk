import { extractStructTagFromType } from '../utils/contracts'
import { asIntN } from '../utils'

export class BurnUtils {
  static buildBurnPositionNFT(fields: any): any {
    const burnFields = fields.position.fields
    const name = `Cetus Burned LP | Pool${burnFields.name.split('Pool')?.[1]}`
    const burnPositinNft: any = {
      id: fields.id.id,
      url: burnFields.url,
      pool_id: burnFields.pool,
      coinTypeA: extractStructTagFromType(burnFields.coin_type_a.fields.name).full_address,
      coinTypeB: extractStructTagFromType(burnFields.coin_type_b.fields.name).full_address,
      description: burnFields.description,
      // name: burnFields.name,
      name,
      liquidity: burnFields.liquidity,
      clmm_position_id: burnFields.id.id,
      clmm_pool_id: burnFields.pool,
      tick_lower_index: asIntN(BigInt(burnFields.tick_lower_index.fields.bits)),
      tick_upper_index: asIntN(BigInt(burnFields.tick_upper_index.fields.bits)),
      index: burnFields.index,
      is_lp_burn: true,
    }
    return burnPositinNft
  }
}
