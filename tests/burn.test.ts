// buildTestAccount
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { SdkEnv, buildSdk, buildTestAccount } from './data/init_test_data'
describe('burn', () => {
  const sdk = buildSdk(SdkEnv.mainnet)
  console.log('🚀 ~ describe ~ sdk:', sdk)
  let sendKeypair: Ed25519Keypair
  let account: string

  beforeEach(async () => {
    sendKeypair = buildTestAccount()
    account = sendKeypair.getPublicKey().toSuiAddress()
  })

  test('getHaveBurnPoolList', async () => {
    const res = await sdk.Burn.getHaveBurnPoolList()
    console.log('getHaveBurnPoolList res:', res)
  })

  test('getPoolBurnPositionList', async () => {
    const res = await sdk.Burn.getPoolBurnPositionList('0xcf994611fd4c48e277ce3ffd4d4364c914af2c3cbb05f7bf6facd371de688630')
    console.log('getBurnPositionList res:', res)
  })

  test('getBurnPositionList', async () => {
    const res = await sdk.Burn.getBurnPositionList(account)
    console.log('getBurnPositionList res:', res)
  })

  test('getBurnPositon', async () => {
    const posId = '0x88678e4cd2681bf41b7f2afdd49c1583a1ca0ae8d6c8f5581bf1db1e021a1e48'
    const res = await sdk.Burn.getBurnPositon(posId)
    console.log('getBurnPositon res:', res)
  })

  test('burn lock', async () => {
    const pool = '0xc41621d02d5ee00a7a993b912a8550df50524c9b2494339691e5896936ff269b'
    const pos = '0x4e1970683fc49de834478339724509a051764e7f34d55b4dc4d2a37b7034669c' // is burn success
    const coinTypeA = '26b3bc67befc214058ca78ea9a2690298d731a2d4309485ec3d40198063c4abc::usdc::USDC'
    const coinTypeB = '26b3bc67befc214058ca78ea9a2690298d731a2d4309485ec3d40198063c4abc::cetus::CETUS'
    const txb = await sdk.Burn.createBurnPayload({
      pool,
      pos,
      coinTypeA,
      coinTypeB,
    })

    const simulateRes = await sdk.fullClient.devInspectTransactionBlock({
      transactionBlock: txb,
      sender: account,
    })
  })

  test('claim', async () => {
    const pool = '0xc41621d02d5ee00a7a993b912a8550df50524c9b2494339691e5896936ff269b'
    const pos = '0x2f10a5816747fd02218dd7a3a7d0417d287da55ccee5943eb5c94f5a6b552299' // is wrap pos id
    const coinTypeA = '26b3bc67befc214058ca78ea9a2690298d731a2d4309485ec3d40198063c4abc::usdc::USDC'
    const coinTypeB = '26b3bc67befc214058ca78ea9a2690298d731a2d4309485ec3d40198063c4abc::cetus::CETUS'

    const rewarderCoinTypes = ['0x26b3bc67befc214058ca78ea9a2690298d731a2d4309485ec3d40198063c4abc::cetus::CETUS']
    let txb = sdk.Burn.createCollectFeePaylaod({
      pool,
      pos,
      coinTypeA,
      coinTypeB,
      account,
    })

    txb = sdk.Burn.crateCollectRewardPayload({
      pool,
      pos,
      coinTypeA,
      coinTypeB,
      rewarderCoinTypes,
      account,
    })

    const simulateRes = await sdk.fullClient.devInspectTransactionBlock({
      transactionBlock: txb,
      sender: account,
    })
  })
})
